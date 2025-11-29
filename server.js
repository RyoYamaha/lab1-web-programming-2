const express = require('express'); //lấy bố thư viện express và gán vào chương trình 
//express là bộ công cụ tạo server, nhận request và trả response 
//const tạo biến không đổi 
//express là tên biến để lưu công cụ Express
const cors = require('cors'); //áp dụng bộ thư viện cors vào chương trình 

const mongoose = require('mongoose'); //áp dụng thư viện mongoose vào (kết nối dữ liệu)  //tôi thấy file vocab gọi rồi thì ở đây cần cái này làm gì, tôi xóa đi được không ?
const bodyParser = require('body-parser');// không hiểu đóng vai trò gì trong đấy nếu thiếu nó sẽ điều gì xẩy ra
global.Vocab = require ('./server/api/models/vocabModel') //có phải đây là bước phân luồng nếu có yêu cầu được gửi đến 
const routes = require('./server/api/routes/vocabRoutes') // có phải đây là bước phân luồng nếu có yêu cầu được gửi đến 
const authRoutes = require('./server/api/routes/authRoutes');
mongoose.set('strictQuery', true); //thắt chặt dữ liệu đảm bảo dữ liệu nhận về sẽ được chính xác (lấy dữ liệu từ đâu)
mongoose.connect('mongodb://localhost/vocab-builder'); //kết nối với toàn bộ file? 

const port = process.env.PORT || 3000; //set up cổng 3000 là cổng chạy sever
const app =  express();  //đây là bộ công cụ giúp ta có thể sử dụng crud và nhiều thứ khác nhau

//nó có được trích xuất từ bộ thư viện express không hay đây là 1 câu lệnh hoàn toàn riêng biệt

app.use(cors()); //sử dụng cors,(được định nghĩa ở trên) để nhận lệnh từ file khác
app.use(express.json()); //chuyển đổi dữ liệu nhận từ front-end sang json để backend có thể xử lý



routes(app); //gửi app được định nghĩa bởi bộ cônng cụ express ở trên
authRoutes(app);
app.listen(port);  //chạy cái cổng đấy (ok biết là chạy nhưng nếu không có thì sever sập à)
app.use((req,res) => {
    res.status(404).send({url: `$(req.originalUrl) not found`});
});

console.log(`Sever started on port ${port}`); //in trongt terminator