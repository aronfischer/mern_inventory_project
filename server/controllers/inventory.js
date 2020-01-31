const Inventory = require("../models/inventory");

exports.createNewInventory = (req, res) => {
  const { name, amount, category } = req.body;

  // Check if Inventory already exists
  Inventory.findOne({ name: name }, (err, inventory) => {
    // if so, send error message
    if (inventory) {
      return res.status(400).json({
        error: "Inventory already exists, please update, instead of recreating"
      });
      // if not, create new user and save in database
    } else {
      const inventory = new Inventory({
        name,
        amount,
        category
      });

      inventory.save((err, newInv) => {
        if (err) {
          console.log("SAVE INVENTORY IN DATABASE ERROR", err);
          return res.status(400).json({
            error: "Ups, something went wrong, please try again"
          });
        }
        return res.json({
          message: "You successfully created a new inventory"
        });
      });
    }
  });
};

exports.readInventory = (req, res) => {
  Inventory.find()
    .then(items => res.json(items))
    .catch(error => {
      console.log("ERROR WHEN GETTING INVENTORY FROM DATABASE", error);
      return res.status(400).json({
        error: "Ups, cannot get inventory, please refresh page"
      });
    });
};

exports.deleteInventory = (req, res) => {
  Inventory.findByIdAndDelete(req.body.id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(400).json({
        error:
          "Item can't be removed, you don't have the necessary authentication. Please log in."
      });
    });
};

exports.getSingleItem = (req, res) => {
  console.log("REQ.BODY", req.body);

  Inventory.findById(req.body.id)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.status(400).json({
        error: "Couldn't get item"
      });
    });
};

exports.updateInventory = (req, res) => {
  const { id, name, amount, category } = req.body;

  Inventory.findById(id).exec((err, item) => {
    if (err || !item) {
      return res.status(400).json({
        error: "User can't be updated, please go back and try again"
      });
    } else {
      item.name = name;
      item.amount = amount;
      item.category = category;

      item.save((err, updatedItem) => {
        if (err) {
          console.log("ITEM UPDATE ERROR", err);
          return res.status(400).json({
            error: "Item update failed"
          });
        }
        res.json({
          message: "Item updated successfully"
        });
      });
    }
  });
  console.log("Item is updated from Backend", req.body.id);
};
