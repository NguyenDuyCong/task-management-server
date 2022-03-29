const argon2 = require("argon2");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const { appConfig } = require("../config/config");
const User = require("../models/user.model");

const generateTokens = (payload) => {
  const { userId } = payload;

  // Create JWT
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20m"
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "2days"
  });

  return { accessToken, refreshToken };
};

const updateRefreshToken = async (userId, refreshToken) => {
  await User.findByIdAndUpdate(userId, { refreshToken });
};

// create new accessToken by refreshToken when accessToken is expired
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: "refreshToken is required!"
    });
  }

  // find user by refreshToken
  const user = User.findOne({ refreshToken });
  if (!user) {
    return res.status(403).json({
      success: false,
      message: "refreshToken invalid!"
    });
  }

  // update new refreshToken
  const tokens = generateTokens({ userId: user._id });
  await updateRefreshToken();

  res.json({
    success: true,
    tokens
  });
};

// base auth
const baseAuth = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");

  console.log(user);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found!"
    });
  }

  res.json({
    message: true,
    user: {
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role
    }
  });
};

// Register new user
const signUp = async (req, res) => {
  const { email, username, password } = req.body;
  console.log({ username, password });

  // check validation
  if (!username || !password || !email) {
    return res.status(400).json({
      success: false,
      message: "Missing username, password or email!"
    });
  }

  try {
    // check existing user
    let user = await User.findOne({ username }).select("-password");
    if (user) {
      return res.status(400).json({
        success: false,
        message: "username already existed!"
      });
    }

    // check existing email
    user = await User.findOne({ email }).select("-password");
    if (user) {
      return res.status(400).json({
        success: false,
        message: "email already existed!"
      });
    }
    // create new user
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hashedPassword,
      email
    });

    // save to database
    user = await newUser.save().select("-password");
    console.log(user);
    // get userId
    const userId = user._id;

    const tokens = generateTokens({ userId });

    // add refreshtoken
    await updateRefreshToken(userId, tokens.refreshToken);

    res.json({
      success: true,
      tokens
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!"
    });
  }
};

// sign in
const signIn = async (req, res) => {
  const { username, password } = req.body;

  // check user
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Incorect username or password!"
    });
  }

  // check password
  const passValid = argon2.verify(user.password, password);
  if (!passValid) {
    return res.status(400).json({
      success: false,
      message: "Incorect username or password!"
    });
  }

  // return tokens
  const tokens = generateTokens({ userId: user._id });

  // update refreshToken
  await updateRefreshToken(user._id, tokens.refreshToken);

  // response to client
  res.json({
    success: true,
    user: {
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role
    },
    tokens
  });
};

// log out
const signOut = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.userId },
    { refreshToken: "" }
  ).select("-password");

  console.log(user);

  res.json({
    success: true,
    message: "See you again!"
  });
};

module.exports = {
  baseAuth,
  refreshToken,
  signUp,
  signIn,
  signOut
};
