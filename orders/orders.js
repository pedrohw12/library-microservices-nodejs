const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://<username>:<password>@cluster0-qdb3t.mongodb.net/customerservice?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

require("./Order");
const Order = mongoose.model("Order");

//POST
app.post("/order", (req, res) => {
  var newOrder = {
    CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
    BookID: mongoose.Types.ObjectId(req.body.BookID),
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate,
  };

  var order = new Order(newOrder);

  order
    .save()
    .then(() => {
      res.send("Order created");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// GET ORDERS
app.get("/orders", (req, res) => {
  Order.find()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.listen(7777, () => {
  console.log("server running on port 7777");
});
