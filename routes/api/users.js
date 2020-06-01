const express = require('express');
const gravatar = require('gravatar');
const router = express.Router();
const User = require('../../models/User');
const passport = require('passport');

// @desc      Register User
// @route     POST /api/user/register
// @access    Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ err: 'User alread exists' });
  } else {
    const avatar = gravatar.url(email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm', // Default
    });

    user = await User.create({
      name,
      email,
      password,
      avatar,
    });
    const token = user.getSignedJwtToken();
    res.json({ user, token });
  }
  // if(user)
});

// @desc      Login User
// @route     POST /api/user/login
// @access    Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ err: 'User not exists' });
  }

  // check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ err: 'Invalid credentials' });
  }
  const token = user.getSignedJwtToken();
  res.json({ user, token: token });
  // if(user)
});

// @desc      Return current User
// @route     GET /api/user/current
// @access    Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ msg: 'success' });
  }
);

module.exports = router;
