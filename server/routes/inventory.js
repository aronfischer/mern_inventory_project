const express = require("express");
const router = express.Router();

// import controller
const { createNewInventory } = require("../controllers/inventory");

// import validators

// routes
router.post("/inventory/create", createNewInventory);

module.exports = router;
