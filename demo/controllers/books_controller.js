// const books = require("../data/books")
const Book = require("../models/Book");

const getAllBooks = (req, res, next) => {
  Book.find()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => next(err));
};

const createBook = (req, res, next) => {
  let abook = {
    title: req.body.title,
    author: req.body.author,
  };

  Book.create(abook)
    .then((book) => {
      res.status(201).json(book);
    })
    .catch(next);
};

const updateBookById = (req, res, next) => {
  Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((book) => {
      res.json(book);
    })
    .catch(next);
};

const deleteAllBooks = (req, res, next) => {
  Book.deleteMany()
    .then((reply) => {
      res.json(reply);
    })
    .catch(console.log);
};

const getBookById = (req, res, next) => {
  Book.findById(req.params.id)
  .populate('category')
    .then((book) => {
      res.json(book);
    })
    .catch(next);
};

// const updateBook = (req, res) => {
//   let updatedBooks = books.map((item) => {
//     if (item.id == req.params.id) {
//       item.title = req.body.title;
//       item.author = req.body.author;
//     }
//     return item;
//   });
//   res.json(updatedBooks);
// };

const deleteBookById = (req, res) => {
  Book.findByIDAndDelete(req.params.id)
    .then((reply) => {
      res.json(reply);
    })
    .catch(next);
};

module.exports = {
  getAllBooks,
  createBook,
  deleteAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
