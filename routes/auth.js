const express = require('express');
var router = express.Router();

const auth = require('../middleware/auth');
const user = require('../models/user');

const User = require('../models/user');

/* GET auth. */
router.get('/', auth, (req, res) => {
try{
    const user = await user.findById(req.user.id).select('-password');
    res.json(user);
} catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
}
});  
module.exports = router;
  