const { expect } = require('chai');
const { book } = require('../../src/models');
const { sequelize, dataTypes, checkModelName, checkPropertyExists } = require('sequelize-test-helpers');

const bookModel = require('../../src/models/book.model');

// using sequelize-test-helpers
describe('Book Model', function () {
  const book = bookModel(sequelize, dataTypes);
  const newBook = new book();

  describe('has the name "Book"', function () {
    checkModelName(book)('book');
  });

  describe('has the properties "title", "author", "pageQuantity" and "publisher"', function () {
    ['title', 'author', 'pageQuantity', 'publisher'].forEach(checkPropertyExists(newBook));
  });
});

// método tradicional com chai
describe('Book Model\'s unit tests', function () {
  it('has "title" property', function () {
    const newBook = new book();
    expect(newBook).to.have.property('title');
  });

  it('has "author" property', function () {
    const newBook = new book();
    expect(newBook).to.have.property('author');
  });

  it('has "pageQuantity" property', function () {
    const newBook = new book();
    expect(newBook).to.have.property('pageQuantity');
  });

  it('has "publisher" property', function () {
    const newBook = new book();
    expect(newBook).to.have.property('publisher');
  });
});