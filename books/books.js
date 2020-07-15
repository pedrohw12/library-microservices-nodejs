const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const mongoose = require("mongoose");

require("./Book");
const Book = mongoose.model("Book");

mongoose.connect(
  "mongodb+srv://<username>:<password>@cluster0-qdb3t.mongodb.net/booksservice?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

app.get("/", (req, res) => {
  res.send("This is our main endpoint");
});

// CREATE
app.post("/books", (req, res) => {
  var newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher,
  };

  var book = new Book(newBook);
  book
    .save()
    .then(() => {
      console.log("New book created");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
  res.send("New book created with success");
});

// GET ALL BOOKS
app.get("/books", (req, res) => {
  Book.find()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// GET ONE BOOK
app.get("/books/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      throw err;
    });
});

// DELETE BOOK
app.delete("/books/:id", (req, res) => {
  Book.findOneAndRemove(req.params.id)
    .then(() => {
      res.send("Book removed");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.listen(4545, () => {
  console.log("Server running on port 4545");
});
