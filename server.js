const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 


global.Vocab = require('./server/api/models/vocabModel');
const User = require('./server/api/models/userModel'); 


const routes = require('./server/api/routes/vocabRoutes');
const authRoutes = require('./server/api/routes/authRoutes');


mongoose.set('strictQuery', true);


const dbLink = process.env.MONGODB_URI || 'mongodb://localhost/vocab-builder';

mongoose.connect(dbLink)
  .then(() => console.log('Connected to MongoDB Successfully'))
  .catch(err => console.error('Could not connect to MongoDB', err));


const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


routes(app);
authRoutes(app);


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});