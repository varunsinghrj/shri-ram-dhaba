import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, lowercase: true, trim: true },
  mobile: { type: String, required: true, unique: true, match: /^[6-9]\d{9}$/ },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

userSchema.index({ email: 1 });

export default mongoose.model('User', userSchema);
