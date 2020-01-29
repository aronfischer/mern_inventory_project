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
