const jwt = require ('jsonwebtoken')

const generateAccessToken = (userId) => {
    const payload = { userId };
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    const options = { expiresIn: '1d' };
    return jwt.sign(payload, secretKey, options);
}

module.exports = generateAccessToken
