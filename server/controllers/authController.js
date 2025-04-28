import User from '../models/usersModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import redisClient from '../config/redisConnect.js';

// Register User
export const registerUser = async (req, res) => {
  const { first_name, last_name, email, phone_number, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ first_name, last_name, email, phone_number, password });

  const token = generateToken(user._id);
  await redisClient.set(user._id.toString(), token, { EX: 7 * 24 * 60 * 60 });
  res.json({ token });
};

// Login User
export const loginUser = async (req, res) => {
  const { phone_number, password } = req.body;
  const user = await User.findOne({ phone });

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
