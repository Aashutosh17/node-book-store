const Book = require("../models/Book");
const User = require("../models/User");

const getAllReviews = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      res.json(book.reviews);
    })
    .catch(next);
};

const createReview = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      let review = {
        body: req.body.body,
        reviewer: req.user.userId,
      };

      book.reviews.push(req.body);
      book.save().then((b) => res.status(201).json(b.reviews));
    })
    .catch(next);
};

const deleteAllReviews = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      book.reviews = [];
      book.save().then((b) => res.json(b.reviews));
    })
    .catch(next);
};

const getReviewsById = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      let review = book.reviews.find((item) => item.id == req.params.review_id);
      res.json(review);
    })
    .catch(next);
};

const updateReviewsById = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      let review = book.reviews.id(req.params.review_id);
      if (review.reviewer != req.user.userId) {
        res.status(403);
        return next(new Error("Not Authorized."));
      }

      let updatedReviews = book.reviews.map((item) => {
        if (item.id == req.params.review_id) {
          if (item.reviewer == req.user.userId) item.body = req.body.body;
        }
        return item;
      });
      book.reviews = updatedReviews;
      book.save().then((b) => res.json(b.reviews));
    })
    .catch(next);
};

const deleteReviewsById = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      let updatedReviews = book.reviews.filter(
        (item) => item.id != req.params.review_id
      );
      book.reviews = updatedReviews;
      book.save().then((b) => res.json(b.reviews));
    })
    .catch(next);
};

module.exports = {
  getAllReviews,
  createReview,
  deleteAllReviews,
  getReviewsById,
  updateReviewsById,
  deleteReviewsById,
};
