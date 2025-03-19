const jwt = require ('jsonwebtoken');
// Helper functions to create JWT tokens
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
};

module.exports = {createAccessToken,createRefreshToken};
