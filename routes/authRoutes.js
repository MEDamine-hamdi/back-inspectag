const express = require('express');
const authController = require('../controllers/authController');  // Adjust the path as needed

const router = express.Router();


// Login route
router.post('/login', authController.loginUser);  // This is the correct route


module.exports = router;
