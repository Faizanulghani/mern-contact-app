const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controller/authController");
const protect = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/contact", protect, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to contact page",
    user: req.user,
  });
});

module.exports = router;
