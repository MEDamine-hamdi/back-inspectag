const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes for users
router.post('/', userController.addUser);             // Add a new user
router.get('/', userController.getAllUsers);         // Get all users
router.delete('/:id', userController.deleteUser);     // Delete a user by ID
router.put('/:id', userController.updateUser);        // Update a user by ID

module.exports = router;
