import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'srd_jwt_secret_key_2026_shri_ram_dhaba';
const JWT_EXPIRES = '7d';

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

export function authMiddleware(req, res, next) {
  const token = req.cookies?.srd_token || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export function adminMiddleware(req, res, next) {
  const token = req.cookies?.srd_admin_token || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Admin authentication required' });
  }

  try {
    const decoded = verifyToken(token);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired admin token' });
  }
}
