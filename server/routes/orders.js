import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import Order from '../models/Order.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Place order
router.post('/', authMiddleware, [
  body('items').isArray({ min: 1 }).withMessage('At least one item required'),
  body('deliveryDetails.fullName').trim().isLength({ min: 1, max: 100 }).withMessage('Name required'),
  body('deliveryDetails.mobile').matches(/^[6-9]\d{9}$/).withMessage('Valid mobile required'),
  body('deliveryDetails.address').trim().isLength({ min: 5, max: 500 }).withMessage('Address required'),
  body('paymentMethod').custom(v => { if (v && v.toLowerCase() !== 'cod') throw new Error('Only COD is accepted'); }).withMessage('Only COD is accepted'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const { items, deliveryDetails, paymentMethod } = req.body;
  const normalizedPayment = paymentMethod ? paymentMethod.toLowerCase() : 'cod';

  const subtotal = items.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
  const packingFee = 15;
  const isDeliveryFree = subtotal >= 200;
  const deliveryFee = isDeliveryFree ? 0 : 30;
  const total = subtotal + packingFee + deliveryFee;

  const orderId = 'SRD-' + Math.floor(10000 + Math.random() * 90000);
  const estimatedTime = isDeliveryFree ? '30 - 40 Mins' : '35 - 45 Mins';

  const order = await Order.create({
    orderId,
    userId: req.user.id,
    items,
    subtotal,
    packingCharges: packingFee,
    deliveryFee,
    total,
    deliveryDetails: {
      fullName: deliveryDetails.fullName.trim(),
      mobile: deliveryDetails.mobile,
      address: deliveryDetails.address.trim(),
      landmark: deliveryDetails.landmark || '',
      instructions: deliveryDetails.instructions || '',
    },
    paymentMethod: normalizedPayment,
    status: 'confirmed',
    estimatedTime,
  });

  const now = new Date();
  res.status(201).json({
    id: order.orderId,
    _id: order._id,
    items: order.items,
    subtotal: order.subtotal,
    packingCharges: order.packingCharges,
    deliveryFee: order.deliveryFee,
    total: order.total,
    deliveryDetails: order.deliveryDetails,
    paymentMethod: order.paymentMethod,
    status: order.status,
    estimatedTime: order.estimatedTime,
    createdAt: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    date: now.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
  });
});

// Get my orders
router.get('/my', authMiddleware, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id, deleted: false }).sort({ createdAt: -1 });
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

// Get single order
router.get('/:id', authMiddleware, async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.id, userId: req.user.id });
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// Cancel order
router.put('/:id/cancel', authMiddleware, async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.id, userId: req.user.id });
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  if (!['confirmed', 'preparing'].includes(order.status)) {
    return res.status(400).json({ error: 'Order cannot be cancelled at this stage' });
  }

  order.status = 'cancelled';
  await order.save();

  res.json({
    id: order.orderId,
    status: order.status,
    total: order.total,
  });
});

// Soft delete order
router.delete('/:id', authMiddleware, async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.id, userId: req.user.id });
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  order.deleted = true;
  await order.save();
  res.json({ message: 'Order deleted' });
});

export default router;
