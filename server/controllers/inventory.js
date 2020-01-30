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
    .then(response => res.json(response))
    .catch(err => {
      res.status(400).json({
        error:
          "Item can't be removed, you don't have the necessary authentication. Please log in."
      });
    });
};
