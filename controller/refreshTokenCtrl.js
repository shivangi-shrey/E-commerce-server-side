// refreshToken.js

const jwt = require('jsonwebtoken');

const{createAccessToken} = require('./tokenHelper')
// Refresh token logic
const refreshtoken = async (req, res) => {
    try {
        // Get the refresh token from cookies
        const rf_token = req.cookies.refreshtoken;

        // If no refresh token exists, prompt user to login/register
        if (!rf_token) {
            return res.status(400).json({ msg: "Please login or register" });
        }

        // Verify the refresh token
        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(400).json({ msg: "Invalid refresh token, please login or register" });
            }

            // Create new access token
            const accessToken = createAccessToken({ id: user.id });

            // Send the user data and new access token
            res.json({ user, accessToken });
        });

    } catch (err) {
        console.error("Error during refresh token:", err);
        return res.status(500).json({ msg: err.message });
    }
};

// Export refreshtoken directly
module.exports = { refreshtoken };
