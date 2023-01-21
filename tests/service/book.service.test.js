const { expect } = require('chai');
const sinon = require('sinon');

const { book } = require('../../src/models');
const bookService = require('../../src/services/book.service');
const { mockBook, bookToCreate } = require('./mocks/book.service.mock');

describe('BookService', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('getAll function', function () {
    describe('no books recorded', function () {
      it('if it returns an empty array', async function () {
        sinon.stub(book, 'findAll').resolves([]);

        const result = await bookService.getAll();
        expect(book.findAll.calledOnce).to.be.equal(true);
        expect(result).to.be.an('array');
        expect(result).to.be.empty;
      });
    });

    describe('with book recorded', function () {
      it('if it returns an array with books', async function () {
        sinon.stub(book, 'findAll').resolves([mockBook]);

        const result = await bookService.getAll();
        expect(book.findAll.calledOnce).to.be.equal(true);
        expect(result).to.be.an('array');
        expect(result).to.deep.equal([mockBook]);
      });
    });
  });

  describe('getById function', function () {
    it('if it returns a book', async function () {
      const expected = { type: null, message: mockBook }
      sinon.stub(book, 'findByPk').resolves(mockBook);

      const result = await bookService.getById(1);
      expect(book.findByPk.calledOnce).to.be.equal(true);
      expect(result).to.deep.equal(expected);
    });

    it('if a book cound\'t be found', async function () {
      const expected = { type: 404, message: 'Book not found' }
      sinon.stub(book, 'findByPk').resolves(null);

      const result = await bookService.getById(999);
      expect(book.findByPk.calledOnce).to.be.equal(true);
      expect(result).to.deep.equal(expected);
    });
  });

  describe('createBook function', function () {
    it('if it returns the created book', async function () {
      sinon.stub(book, 'create').resolves(mockBook);

      const result = await bookService.createBook(bookToCreate);
      expect(book.create.calledOnce).to.be.equal(true);
      expect(result).to.deep.equal(mockBook);
      expect(result).to.include(mockBook);
    });
  });
});