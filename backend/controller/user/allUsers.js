const User = require('../../models/userModel');

async function allUsers(req, res) {
  try {
    console.log("userid all Users", req.userId);

    const allUsers = await User.findAll();
    
    res.json({
      message: "All Users",
      data: allUsers,
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

module.exports = allUsers;
