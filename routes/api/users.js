const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');
const bigchaindriver = require('bigchaindb-driver');

router.post('/signup',
  [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Please enter a password with minimum 6 or more characters').isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      //Create the user
      user = new User({
        email,
        password
      });

      //Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      let key = new bigchaindriver.Ed25519Keypair();
      user.privateKey = key.privateKey;
      user.publicKey = key.publicKey;
        
      //Save the user
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

router.post('/login',
  [
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Password is required').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days'},
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
module.exports = router;