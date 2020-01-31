const express = require("express");
const router = express.Router();

// import controller
const {
  createNewInventory,
  readInventory,
  deleteInventory,
  updateInventory,
  getSingleItem
} = require("../controllers/inventory");

// import validators

// routes
router.post("/inventory/create", createNewInventory);
router.get("/inventory", readInventory);
router.delete("/inventory", deleteInventory);
router.post("/inventory/update", getSingleItem);
router.put("/inventory/update", updateInventory);

module.exports = router;
