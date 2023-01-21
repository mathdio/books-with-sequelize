require('dotenv').config();
const express = require('express');
const bookController = require('./controllers/book.controller');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/books', bookController.getAll);

app.get('/books/:id', bookController.getById);

app.post('/books', bookController.createBook);

app.put('/books/:id', bookController.updateBook);

app.delete('/books/:id', bookController.removeBook);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));