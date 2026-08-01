import { Router } from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { generateToken, authMiddleware } from '../middleware/auth.js';

const router = Router();
const SALT_ROUNDS = 10;

// Register
router.post('/register', [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required (max 100 chars)'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('mobile').matches(/^[6-9]\d{9}$/).withMessage('Valid 10-digit mobile number required'),
  body('password').isLength({ min: 6, max: 100 }).withMessage('Password must be 6-100 characters'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const { name, email, mobile, password } = req.body;

  const existingMobile = await User.findOne({ mobile });
  if (existingMobile) {
    return res.status(409).json({ error: 'Mobile number already registered. Please login.' });
  }

  const existingEmail = await User.findOne({ email: email.toLowerCase() });
  if (existingEmail) {
    return res.status(409).json({ error: 'Email already registered.' });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase(),
    mobile,
    passwordHash,
  });

  const token = generateToken({ id: user._id, role: 'user' });

  res.cookie('srd_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    user: { id: user._id, name: user.name, email: user.email, mobile: user.mobile },
    token,
  });
});

// Login
router.post('/login', [
  body('mobile').matches(/^[6-9]\d{9}$/).withMessage('Valid 10-digit mobile number required'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const { mobile, password } = req.body;

  const user = await User.findOne({ mobile });
  if (!user) {
    return res.status(401).json({ error: 'Invalid mobile number or password' });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid mobile number or password' });
  }

  const token = generateToken({ id: user._id, role: 'user' });

  res.cookie('srd_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    user: { id: user._id, name: user.name, email: user.email, mobile: user.mobile },
    token,
  });
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('srd_token');
  res.json({ message: 'Logged out successfully' });
});

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ id: user._id, name: user.name, email: user.email, mobile: user.mobile });
});

// Update profile
router.put('/profile', authMiddleware, [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const { name, email, currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (newPassword) {
    if (!currentPassword) {
      return res.status(400).json({ error: 'Current password is required to set new password' });
    }
    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    if (newPassword.length < 6 || newPassword.length > 100) {
      return res.status(400).json({ error: 'New password must be 6-100 characters' });
    }
  }

  const emailTaken = await User.findOne({ email: email.toLowerCase(), _id: { $ne: user._id } });
  if (emailTaken) {
    return res.status(409).json({ error: 'Email already in use' });
  }

  user.name = name.trim();
  user.email = email.toLowerCase();
  if (newPassword) {
    user.passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  }
  await user.save();

  res.json({ id: user._id, name: user.name, email: user.email, mobile: user.mobile });
});

// Migrate old localStorage users
router.post('/migrate', async (req, res) => {
  const { users } = req.body;

  if (!Array.isArray(users)) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  let migrated = 0;
  let skipped = 0;

  for (const oldUser of users) {
    try {
      if (!oldUser.mobile || !oldUser.password) {
        skipped++;
        continue;
      }

      const existing = await User.findOne({ mobile: oldUser.mobile });
      if (existing) {
        skipped++;
        continue;
      }

      const passwordHash = await bcrypt.hash(oldUser.password, SALT_ROUNDS);
      await User.create({
        name: oldUser.name || 'User',
        email: oldUser.email || '',
        mobile: oldUser.mobile,
        passwordHash,
      });
      migrated++;
    } catch {
      skipped++;
    }
  }

  res.json({ migrated, skipped, total: users.length });
});

export default router;
