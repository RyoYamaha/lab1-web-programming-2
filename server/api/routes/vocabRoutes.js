const checkAuth = require('../middleware/authMiddleware');
const vocabBuilder = require('../controllers/vocabController'); 
module.exports = app =>{
    app
    .route('/words') 
    .get(checkAuth,vocabBuilder.list_all_words) 
    .post(checkAuth,vocabBuilder.create_a_word); 
    // routes/vocabRoutes.js
app.get('/words/search', checkAuth, vocabBuilder.search_words);
    app
    .route('/words/:wordId') 
    .get(checkAuth,vocabBuilder.read_a_word)
    .delete(checkAuth,vocabBuilder.delete_a_word); 




};