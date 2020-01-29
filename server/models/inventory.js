const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  category: { type: String, required: true, trim: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model("Inventory", inventorySchema);
