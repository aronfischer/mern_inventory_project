const express = require("express");
const router = express.Router();

// import controller
const {
  createNewInventory,
  readInventory,
  deleteInventory
} = require("../controllers/inventory");

// import validators

// routes
router.post("/inventory/create", createNewInventory);
router.get("/inventory", readInventory);
router.delete("/inventory", deleteInventory);

module.exports = router;
