const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../models/userModel');
const {createAccessToken,createRefreshToken} = require('./tokenHelper')

const useCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Check if user already exists by email
            const user = await Users.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: "Email is already registered" });
            }

            // Password length validation
            if (password.length < 8) {
                return res.status(400).json({ msg: "Password must be at least 8 characters" });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);  // Generates a salt with 10 rounds
            const hashedPassword = await bcrypt.hash(password, salt);  // Hash the password with the salt

            // Create a new user object
            const newUser = new Users({
                name,
                email,
                password: hashedPassword,  // Store hashed password
            });

            // Save the new user to MongoDB
            await newUser.save();

            // Create JWT tokens for authentication
            const accesstoken = createAccessToken({ id: newUser._id });
            const refreshtoken = createRefreshToken({ id: newUser._id });

            // Set refresh token as a cookie
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token', // Make sure the cookie is accessible for all routes
            });

            // Send the access token in the response
            res.json({ accesstoken });

        } catch (err) {
            // Return any error that occurs
            return res.status(500).json({ msg: err.message });
        }
    },

    
};

module.exports = useCtrl