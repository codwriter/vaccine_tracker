const jwt = require ('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get the token from header
    const token = req.header('x-auth-token');

    // check if token exists
    if(!token) {
        return res.status(401).json({ msg: 'No token provided, authorization stopped'});
    }
    //if token exists ----> verify
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch(err) {
        return res.status(401).json({ msg: 'Token is not valid'});
    }
}