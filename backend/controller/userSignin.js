const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // Correct import
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false,
            });
        }

        if (!password) {
            return res.status(400).json({
                message: "Please provide password",
                error: true,
                success: false,
            });
        }

        // Use User model
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
            const tokenData = {
                id: user.id, // Use id field
                email: user.email,
            };
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

            const tokenOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Set secure based on environment
            };

            return res.cookie('token', token, tokenOptions).status(200).json({
                message: "Login successful",
                data: token,
                success: true,
                error: false,
            });
        } else {
            return res.status(401).json({
                message: "Invalid password",
                error: true,
                success: false,
            });
        }

    } catch (err) {
        console.error('Error in sign-in controller:', err);
        return res.status(500).json({
            message: err.message || 'Internal Server Error',
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
