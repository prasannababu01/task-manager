// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging purposes
    
    // Check if the error is a known type (e.g., Mongoose validation error)
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ success: false, errors });
    }
  
    // If the error is not a known type, send a generic error response
    res.status(500).json({ success: false, message: 'Internal server error' });
  };
  
  module.exports = errorHandler;
  