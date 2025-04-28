import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI);

    console.log(`Connected to Mongo Database Successfully`);
  } catch (err) {
    console.error(`Failed to connect to Mongo Database: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
