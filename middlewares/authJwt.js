const jwt = require("jsonwebtoken");
const { appConfig } = require("../config/config");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization") || "";
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token not found!"
    });
  }

  try {
    const decoded = jwt.verify(token, appConfig.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({
      success: false,
      message: "Invalid token!"
    });
  }
};

module.exports = verifyToken;
