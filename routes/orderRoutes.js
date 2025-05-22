const express = require("express");
const {  getAllOrders ,saveOrderController} = require("../controllers/orderController");
const router = express.Router();


// Route to fetch all orders (historique page functionality)
router.get("/commandes",getAllOrders);

router.post('/save-commande', saveOrderController);

module.exports = router;
