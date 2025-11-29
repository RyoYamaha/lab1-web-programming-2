const mongoose = require('mongoose');
const User = require('../models/userModel'); // Import Model vừa tạo
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Đăng ký
exports.register = async (req, res) => {
  try {
    // 1. Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    // 2. Tạo user mới
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    // 3. Lưu vào DB
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    // 1. Tìm user theo email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 2. So sánh mật khẩu
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // 3. Tạo token (chìa khóa)
    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).send(err);
  }
};