const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Please provide password",
                error: true,
                success: false
            });
        }
        if (!name) {
            return res.status(400).json({
                message: "Please provide name",
                error: true,
                success: false
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists",
                error: true,
                success: false
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);
        if (!hashPassword) {
            throw new Error("Something went wrong while hashing the password");
        }

        const payload = {
           ...req.body,
           role:"GENERAL",
            password: hashPassword,
            
        };

        // Create a new user
        const newUser = await User.create(payload);

        res.status(201).json({
            data: newUser,
            success: true,
            error: false,
            message: "User created successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            error: true,
            success: false
        });
    }
}

module.exports = { userSignUpController };
