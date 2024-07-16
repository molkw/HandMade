const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        console.log("checkPassword", checkPassword);

        if (checkPassword) {
            const tokenData = {
                id: user.id, // Ensure _id is included
                email: user.email,
            };

            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

            console.log("Generated token:", token);

            const tokenOption = {
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            };

            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false
            });

        } else {
            throw new Error("Please check Password");
        }

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
