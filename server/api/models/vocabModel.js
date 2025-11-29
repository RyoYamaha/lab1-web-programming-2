const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VocabSchema = new Schema({
    english: { type: String, required: 'English cannot be blank' },
    german: { type: String, required: 'German cannot be blank' },
    
    // --- BẮT BUỘC PHẢI CÓ ĐOẠN NÀY ---
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    // ---------------------------------
}, { collection: 'vocab' });

module.exports = mongoose.model('Vocab', VocabSchema);