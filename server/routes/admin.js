import { Router } from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { generateToken, adminMiddleware } from '../middleware/auth.js';

const router = Router();
const SALT_ROUNDS = 10;

// Admin credentials
const ADMIN_USERNAME = 'admin';
let adminPasswordHash = null;

async function getAdminPasswordHash() {
  if (!adminPasswordHash) {
    adminPasswordHash = await bcrypt.hash('admin@12', SALT_ROUNDS);
  }
  return adminPasswordHash;
}

// Admin login
router.post('/login', [
  body('username').trim().notEmpty().withMessage('Username required'),
  body('password').notEmpty().withMessage('Password required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const { username, password } = req.body;

  if (username !== ADMIN_USERNAME) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const hash = await getAdminPasswordHash();
  const valid = await bcrypt.compare(password, hash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken({ username, role: 'admin' });

  res.cookie('srd_admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ token, message: 'Admin logged in' });
});

// Admin logout
router.post('/logout', adminMiddleware, (req, res) => {
  res.clearCookie('srd_admin_token');
  res.json({ message: 'Admin logged out' });
});

// Check admin auth
router.get('/me', adminMiddleware, (req, res) => {
  res.json({ authenticated: true, username: req.admin.username });
});

// Get all orders
router.get('/orders', adminMiddleware, async (req, res) => {
  const { status } = req.query;
  const query = { deleted: false };
  if (status && status !== 'all') {
    query.status = status;
  }

  const orders = await Order.find(query).sort({ createdAt: -1 });

  const formatted = orders.map(o => ({
    id: o.orderId,
    _id: o._id,
    userId: o.userId,
    items: o.items,
    subtotal: o.subtotal,
    packingCharges: o.packingCharges,
    deliveryFee: o.deliveryFee,
    total: o.total,
    deliveryDetails: o.deliveryDetails,
    paymentMethod: o.paymentMethod,
    status: o.status,
    estimatedTime: o.estimatedTime,
    createdAt: new Date(o.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    date: new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
  }));

  res.json(formatted);
});

// Update order status
router.put('/orders/:id/status', adminMiddleware, [
  body('status').isIn(['confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled']).withMessage('Invalid status'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const order = await Order.findOne({ orderId: req.params.id });
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  order.status = req.body.status;
  await order.save();

  res.json({
    id: order.orderId,
    status: order.status,
    total: order.total,
  });
});

// Delete order (soft delete)
router.delete('/orders/:id', adminMiddleware, async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.id });
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  order.deleted = true;
  await order.save();
  res.json({ message: 'Order deleted' });
});

// Get all users
router.get('/users', adminMiddleware, async (req, res) => {
  const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
  const formatted = users.map(u => ({
    id: u._id,
    name: u.name,
    email: u.email,
    mobile: u.mobile,
    createdAt: u.createdAt,
  }));
  res.json(formatted);
});

// Delete user
router.delete('/users/:id', adminMiddleware, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Get stats
router.get('/stats', adminMiddleware, async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalOrders = await Order.countDocuments({ deleted: false });
  const todayOrders = await Order.countDocuments({ deleted: false, createdAt: { $gte: today } });

  const revenueResult = await Order.aggregate([
    { $match: { deleted: false, status: 'delivered' } },
    { $group: { _id: null, total: { $sum: '$total' } } },
  ]);
  const totalRevenue = revenueResult[0]?.total || 0;

  const todayRevenueResult = await Order.aggregate([
    { $match: { deleted: false, status: 'delivered', createdAt: { $gte: today } } },
    { $group: { _id: null, total: { $sum: '$total' } } },
  ]);
  const todayRevenue = todayRevenueResult[0]?.total || 0;

  const totalUsers = await User.countDocuments();

  res.json({ totalOrders, todayOrders, totalRevenue, todayRevenue, totalUsers });
});

export default router;
