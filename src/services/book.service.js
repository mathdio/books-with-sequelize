const { Op } = require('sequelize');
const { book } = require('../models');

const getAll = async () => {
  const books = await book.findAll({
    order: [
      ['title', 'ASC']
    ]
  });

  return books;
};

const getById = async (id) => {
  const result = await book.findByPk(id);
  if (!result) return { type: 404, message: 'Book not found' };

  return { type: null, message: result };
};

const createBook = async ({ title, author, pageQuantity, publisher }) => {
  const result = await book.create({ title, author, pageQuantity, publisher });

  return result;
}

const updateBook = async (id, { title, author, pageQuantity, publisher }) => {
  const result = await book.update({ title, author, pageQuantity, publisher }, {
    where: { id },
  });

  return result;
};

const removeBook = async (id) => {
  await book.destroy({ where: { id } });
};

const getByAuthor = async (author) => {
  const result = await book.findAll({
    where: { author: { [Op.substring]: author } },
    order: [
      ['title', 'ASC']
    ]
  });

  return result;
};

module.exports = {
  getAll,
  getById,
  createBook,
  updateBook,
  removeBook,
  getByAuthor,
};