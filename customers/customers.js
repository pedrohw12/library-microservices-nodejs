const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://<username>:<password>@cluster0-qdb3t.mongodb.net/customerservice?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

require("./Customer");
const Customer = mongoose.model("Customer");

// POST
app.post("/customer", (req, res) => {
  var newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };

  var customer = new Customer(newCustomer);

  customer
    .save()
    .then(() => {
      res.send("New customer registered");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

//GET
app.get("/customers", (req, res) => {
  Customer.find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// GET ONDE CUSTOMER
app.get("/customers/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((customer) => {
      if (customer) {
        res.json(customer);
      } else {
        res.send("Invalid ID");
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// DELETE CUSTOMER
app.delete("/customers/:id", (req, res) => {
  Customer.findOneAndRemove(req.params.id)
    .then(() => {
      res.send("Customer removed");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.listen("5555", () => {
  console.log("Server runnning on port 5555");
});
