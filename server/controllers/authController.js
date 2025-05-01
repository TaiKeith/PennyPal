import User from '../models/usersModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import redisClient from '../config/redisConnect.js';

// Register User
export const registerUser = async (req, res) => {
  const { first_name, last_name, email, phone_number, password } = req.body;

  try {
    // Check for existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { phone_number }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email or phone number already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email,
      phone_number,
      password: hashedPassword,
    });

    const token = generateToken(user._id);
    await redisClient.set(user._id.toString(), token, { EX: 7 * 24 * 60 * 60 });

    res.status(201).json({ token });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      const duplicatedField = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        message: `A user with this ${duplicatedField} already exists`
      });
    }

    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { phone_number, password } = req.body;
  const user = await User.findOne({ phone_number });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    await redisClient.set(user._id.toString(), token, { EX: 7 * 24 * 60 * 60 });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid Credentials!' });
  }
};

// Logout User
export const logoutUser = async (req, res) => {
  const userId = req.user._id;
  await redisClient.del(userId.toString());
  res.json({ message: 'Logged Out Successfully' });
};
