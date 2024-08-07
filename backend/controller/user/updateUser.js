const User = require('../../models/userModel');

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId;
        const { userId, email, name, role } = req.body;

        // Validate that userId is provided
        if (!userId) {
            return res.status(400).json({
                message: 'User ID is required',
                error: true,
                success: false
            });
        }

        const payload = {
            ...(email && { email }),
            ...(name && { name }),
            ...(role && { role }),
        };

        // Find the current user (session user)
        const user = await User.findByPk(sessionUser);

        if (!user) {
            return res.status(404).json({
                message: 'Session user not found',
                error: true,
                success: false
            });
        }

        console.log("user.role", user.role);

        // Update the user with the provided userId
        const [updated] = await User.update(payload, {
            where: { id: userId }
        });

        if (!updated) {
            return res.status(404).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }

        
        const updatedUser = await User.findByPk(userId);

        res.json({
            data: updatedUser,
            message: "User Updated",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = updateUser;
