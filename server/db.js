import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'YOUR_MONGODB_ATLAS_CONNECTION_STRING_HERE';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
}

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.log('MongoDB disconnected');
});

export default mongoose;
