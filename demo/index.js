const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const logger = require("./logger");
const mongoose = require("mongoose");
const path = require("path");
const book_routes = require("./routes/books-routes");
const category_routes = require("./routes/category-routes");
const user_routes = require("./routes/user-routes");

const app = express();

const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/books-29B")
  .then(() => {
    console.log("Connected to MongoDB server");
    app.listen(port, () => {
      console.log(`App is running on the port: ${port}`);
    });
  })
  .catch((err) => console.log(err));

// 2. Express defined middleware
app.use(express.json());

//logger
// 1.  Application level middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  logger.log(`${req.method}\t${req.path}`);
  next();
});
// 2. Express defined middle
app.use(express.json());

//Home Page
app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// 3. Router level middleware
app.use("/users", user_routes);
app.use("/books", book_routes);
app.use("/categories", category_routes);

// 4. Error Handelling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ err: err.message });
});
