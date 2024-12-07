const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'Token not found' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Token not found' });
    }

    try {
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token not found' });
    }
};

module.exports = verifyToken;
