const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  try {
    // Extract token from cookies
    const token = req.cookies?.token;

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        message: "Please Login...!",
        error: true,
        success: false
      });
    }

    // Verify token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("Error verifying token:", err);
        return res.status(403).json({
          message: "Invalid or expired token.",
          error: true,
          success: false
        });
      }

      console.log("Decoded:", decoded);

      // Attach user ID to request object
      req.userId = decoded?._id;

      // Proceed to the next middleware or route handler
      next();
    });

  } catch (err) {
    console.error("Error in authToken middleware:", err);
    res.status(400).json({
      message: err.message || "An error occurred during authentication.",
      error: true,
      success: false
    });
  }
}

module.exports = authToken;
