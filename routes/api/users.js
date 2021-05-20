const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const config = require('config');
const bigchaindriver = require('bigchaindb-driver');

router.post('/signup',
  [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Please enter a password with minimum 6 or more characters').isLength({ min: 6 }),
    check('firstname', 'The firstname of the User is required').notEmpty(),
    check('lastname', 'The lastname of the User is required').notEmpty()],
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
    check('amkaUser')
        .isLength({ min: 11, max: 11 })
        .withMessage('Amka must be 11 numbers')
        .matches(/^[0-9]+$/)
        .withMessage('Is not an Amka type')
        .notEmpty()
        .withMessage('Amka of User is required'),
    check('birthday', 'Birthday of User is required')
    .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/)
    .withMessage('Is not a date type dd/mm/yyyy')
    .notEmpty()
    .withMessage('Date of birth required')
    , async (req, res) => {
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

router.put('/:userId', auth, 
    check('firstname', 'The firstname of the user is required').notEmpty(),
    check('lastname', 'The lastname of the user is required').notEmpty(),
    check('amkaUser')
        .isLength({ min: 11, max: 11 })
        .withMessage('Amka must be 11 numbers')
        .matches(/^[0-9]+$/)
        .withMessage('Is not an Amka type')
        .notEmpty()
        .withMessage('Amka of User is required'),
    check('birthday', 'Birthday of User is required')
    .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/)
    .withMessage('Is not a date type dd/mm/yyyy')
    .notEmpty()
    .withMessage('Date of birth required'), async (req,res)  =>  {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      } else {
          User.findByIdAndUpdate(req.params.userId, {
              $set: req.body
          }, { new: true })
              .then((user) => {
                  res.statusCode = 200;
                  res.setHeader('Content-type', 'application/json');
                  res.json(user);
              }, (err) => next(err))
              .catch((err) => next(err));
      }
})

router.delete('/:userId', auth, async (req, res) => {
   if(req.user.id = req.params.userId){
    User.findByIdAndRemove(req.params.userId)
      .then((resp) => {
          res.statusCode = 200;
          res.setHeader('Content-type', 'application/json');
          res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
  }
});

module.exports = router;