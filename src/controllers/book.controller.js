const bookService = require('../services/book.service');

const getAll = async (req, res) => {
  if (req.query.author) {
    const result = await bookService.getByAuthor(req.query.author);
    return res.status(200).json(result);
  }

  const books = await bookService.getAll();
  return res.status(200).json(books);
};

const getById = async (req, res) => {
  const id = Number(req.params.id);

  const { type, message } = await bookService.getById(id);
  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const createBook = async (req, res) => {
  const { title, author, pageQuantity, publisher } = req.body;

  const result = await bookService.createBook({ title, author, pageQuantity, publisher });

  return res.status(201).json(result);
};

const updateBook = async (req, res) => {
  const { title, author, pageQuantity, publisher } = req.body;
  const id = Number(req.params.id);

  await bookService.updateBook(id, { title, author, pageQuantity, publisher });
  return res.status(200).json('Book update!')
};

const removeBook = async (req, res) => {
  const id = Number(req.params.id);

  await bookService.removeBook(id);
  return res.status(200).json({ message: 'Book removed '});
};

module.exports = {
  getAll,
  getById,
  createBook,
  updateBook,
  removeBook,
};