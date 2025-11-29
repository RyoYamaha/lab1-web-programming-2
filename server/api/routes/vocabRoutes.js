const checkAuth = require('../middleware/authMiddleware');
const vocabBuilder = require('../controllers/vocabController'); //yêu cầu trích xuất từ vocabcontroller để áp dụng vào hệ thống 
module.exports = app =>{
    app
    .route('/words') //set đường dẫn /words
    .get(checkAuth,vocabBuilder.list_all_words) //thực hiện hành động  list toàn bộ ra 
    .post(checkAuth,vocabBuilder.create_a_word); // post là hành động kiểu tạo ra một cái gì đó mới 
    // routes/vocabRoutes.js
app.get('/words/search', checkAuth, vocabBuilder.search_words);
    app
    .route('/words/:wordId') //set đường dẫn,: dấu 2 chấm là đường dẫn có thể bị thay đổi 
    .get(checkAuth,vocabBuilder.read_a_word)//đọc dữ liệu 
    .put(checkAuth,vocabBuilder.update_a_word)//update dữ liệu mới 
    .delete(checkAuth,vocabBuilder.delete_a_word); //delete dữ liệu đó




};