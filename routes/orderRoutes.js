const express = require("express");
const { createOrder, getAllOrders ,updateCommandeStatus} = require("../controllers/orderController");
const router = express.Router();

// Route to create a new order
router.post("/commande", createOrder);

// Route to fetch all orders (historique page functionality)
router.get("/commandes", getAllOrders);

router.post("/updateCommandeStatus", updateCommandeStatus);

module.exports = router;
