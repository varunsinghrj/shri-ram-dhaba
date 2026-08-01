import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  menuItem: { type: Object, required: true },
  quantity: { type: Number, required: true, min: 1 },
  notes: { type: String, default: '' },
}, { _id: false });

const deliveryDetailsSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true, trim: true },
  landmark: { type: String, default: '' },
  instructions: { type: String, default: '' },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  packingCharges: { type: Number, required: true },
  deliveryFee: { type: Number, required: true },
  total: { type: Number, required: true },
  deliveryDetails: deliveryDetailsSchema,
  paymentMethod: { type: String, default: 'cod' },
  status: {
    type: String,
    enum: ['confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'confirmed',
  },
  estimatedTime: { type: String, default: '' },
  deleted: { type: Boolean, default: false },
}, { timestamps: true });

orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ deleted: 1 });

export default mongoose.model('Order', orderSchema);
