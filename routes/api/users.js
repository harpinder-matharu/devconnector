const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'User router tested OK!' });
});

module.exports = router;
