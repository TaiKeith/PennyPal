const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const redisClient = require('../config/redisConnect');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check redis if token is still valid
      const savedToken = await redisClient.get(decoded.id);
      if (!savedToken || savedToken !== token) {
        return res.status(401).json({ message: 'Session Expired. Please login again.' });
      }

      // Get user from the token excluding the password
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not Authorized. Token Failed!' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not Authorized. No Token!' });
  }
};

export default protect;
