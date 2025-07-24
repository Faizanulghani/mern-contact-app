const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, gender, username, password } = req.body;

    let exist = await userModel.findOne({ username });
    if (exist) {
      return res.json({ success: false, message: "User already exist" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    let user = await userModel.create({
      firstname,
      lastname,
      gender,
      username,
      password: hashedPassword,
    });

    const token = generateToken(user._id);
    res.cookie("token", token, { httpOnly: true });
    res.json({ success: true, message: "User Created Successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await userModel.findOne({ username });
    if (!user) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = generateToken(user._id);
    res.cookie("token", token, { httpOnly: true });
    res.json({ success: true, message: "Logged In Successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged Out Successfully" });
};
