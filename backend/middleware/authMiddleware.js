// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from request header
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authorization token not found' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, 'secret_key');
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // Find user by id from decoded token
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Attach user object to request for further use
    
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }
};

module.exports = authMiddleware;
