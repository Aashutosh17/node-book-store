const express = require("express");
const router = express.Router();
const bookController = require("../controllers/books_controller");
const reviewController = require("../controllers/reviews_controller");
const {verifyUser} = require("../middleware/auth");

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(verifyUser, bookController.createBook)
  .put((req, res) => {
    res.status(501).json({ reply: "Put Req not supported" });
  })
  .delete(verifyUser, bookController.deleteAllBooks);

router
  .route("/:id")
  .get(bookController.getBookById)
  .post((req, res) => {
    res.status(501).json({ reply: "Not implemented" });
  })
  .put(bookController.updateBookById)
  .delete(bookController.deleteBookById);

router
  .route("/:id/reviews")
  .get(reviewController.getAllReviews)
  .post(reviewController.createReview)
  .put((req, res) => {
    res.status(501).json({ reply: "Not implemented" });
  })
  .delete(reviewController.deleteAllReviews);

router
  .route("/:id/reviews/:review_id")
  .get(reviewController.getReviewsById)
  .post((req, res) => {
    res.status(501).json({ reply: "Not implemented" });
  })
  .put(reviewController.updateReviewsById)
  .delete(reviewController.deleteReviewsById);

module.exports = router;
