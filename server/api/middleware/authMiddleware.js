const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // 1. Lấy token từ header (Frontend gửi lên dạng: "Bearer <token>")
    const token = req.headers.authorization.split(" ")[1];
    
    // 2. Giải mã token để lấy User ID
    const decoded = jwt.verify(token, 'secretKey'); // 'secretKey' phải giống bên authController
    
    // 3. Gán ID vào biến req để các hàm sau dùng
    req.userData = decoded; 
    
    next(); // Cho phép đi tiếp
  } catch (error) {
    return res.status(401).json({ message: 'Auth failed' });
  }
};