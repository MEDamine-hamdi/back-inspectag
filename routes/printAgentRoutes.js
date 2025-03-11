const express = require("express");
const router = express.Router();
const printAgentController = require("../controllers/printAgentController");

router.post("/", printAgentController.addPrinter);
router.delete('/agents/:id', printAgentController.deleteAgent);
router.get('/printers', printAgentController.getAllPrinters);
module.exports = router;
