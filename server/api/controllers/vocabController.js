const mongoose = require('mongoose');
// Cách gọi Model an toàn nhất là gọi trực tiếp từ file (thay vì mongoose.model)
// Giả sử file model nằm ở ../models/vocabModel
const Vocab = require('../models/vocabModel'); 

exports.list_all_words = (req, res) => {
    Vocab.find({ userId: req.userData.id }, (err, words) => {
        if (err) return res.send(err); // <--- Đã thêm return
        res.json(words);
    });
};

exports.create_a_word = (req, res) => {
    const newWord = new Vocab(req.body);
    newWord.userId = req.userData.id; // Gán ID người dùng
    
    newWord.save((err, word) => {
        if (err) return res.send(err); // <--- Đã thêm return
        res.json(word);
    });
};

exports.read_a_word = (req, res) => {
    Vocab.findOne({ _id: req.params.wordId, userId: req.userData.id }, (err, word) => {
        if (err) return res.send(err); // <--- Đã thêm return
        res.json(word);
    });
};

exports.update_a_word = (req, res) => {
    Vocab.findOneAndUpdate(
        { _id: req.params.wordId, userId: req.userData.id },
        req.body,
        { new: true },
        (err, word) => {
            if (err) return res.send(err); // <--- Đã thêm return
            res.json(word);
        }
    );
};

exports.delete_a_word = (req, res) => {
    Vocab.deleteOne({ _id: req.params.wordId, userId: req.userData.id }, err => {
        if (err) return res.send(err); // <--- Đã thêm return
        res.json({ message: 'Word successfully deleted', _id: req.params.wordId });
    });
};

exports.search_words = (req, res) => {
    const query = req.query.q;
    if (!query) return res.json([]);

    Vocab.find(
        {
            userId: req.userData.id,
            $or: [
                { english: { $regex: query, $options: 'i' } },
                { german: { $regex: query, $options: 'i' } }
            ]
        },
        (err, words) => {
            if (err) return res.status(500).json({ error: err.message }); // Đã có return
            res.json(words);
        }
    );
};