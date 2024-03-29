const express = require('express');

const router = express.Router();

// Test Route for Render
router.get('/', async (req, res) => {
  res.json({
    message: 'Testing to see if Users Route works'
  })
})
