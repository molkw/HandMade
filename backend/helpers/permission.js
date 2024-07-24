const User = require('../models/userModel');

const uploadProductPermission = async (userId) => {
    try {
        const user = await User.findByPk(userId);

        if (user && user.role === 'ADMIN') {
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error finding user:', error);
        return false;
    }
}

module.exports = uploadProductPermission;
