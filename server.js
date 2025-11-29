const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Có thể giữ hoặc bỏ (vì đã có express.json)

// 1. NẠP MODELS (Khuôn mẫu dữ liệu)
// Bắt buộc phải nạp cả Vocab và User thì mới chạy được
global.Vocab = require('./server/api/models/vocabModel');
const User = require('./server/api/models/userModel'); // <--- BẠN ĐANG THIẾU DÒNG NÀY (QUAN TRỌNG ĐỂ LOGIN)

// 2. NẠP ROUTES (Đường dẫn)
const routes = require('./server/api/routes/vocabRoutes');
const authRoutes = require('./server/api/routes/authRoutes');

// 3. KẾT NỐI DATABASE (Sửa để chạy được cả trên Render)
mongoose.set('strictQuery', true);

// Dòng này cực quan trọng: Nó bảo Server ưu tiên dùng link MongoDB Atlas trên Render (biến môi trường),
// nếu không có thì mới dùng localhost.
const dbLink = process.env.MONGODB_URI || 'mongodb://localhost/vocab-builder';

mongoose.connect(dbLink)
  .then(() => console.log('Connected to MongoDB Successfully'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// 4. CẤU HÌNH SERVER
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 5. KÍCH HOẠT ROUTES
routes(app);
authRoutes(app);

// 6. XỬ LÝ LỖI 404 & KHỞI ĐỘNG
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});