const User = require("../models/User");
const generateToken = require("../utlis/generateToken");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const data = req.body;
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(200).json({
        code: 200,
        status: "failed",
        msg: "User already exists",
      });
    }
    const newUser = await User.create(data);
    const token = generateToken({
      name: newUser.name,
      _id: newUser._id,
    });
    return res.status(200).json({
      code: 200,
      status: "failed",
      data: {
        token,
        name: newUser.name,
        _id: newUser._id,
      },
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      msg: error,
    });
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken({
      name: user.name,
      _id: user._id,
    });
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  createUser,
  userLogin,
};
