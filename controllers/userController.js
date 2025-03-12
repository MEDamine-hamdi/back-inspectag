const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
}

exports.addUser = async (req, res) => {
  try {
      const { nom, email, role, mot } = req.body;

      // Simple validation
      if (!nom || !email || !role || !mot) {
          return res.status(400).json({ message: "All fields are required" });
      }

      const newUser = new User({ id: generateUniqueId(), nom, email, role, mot });
      await newUser.save();
      res.status(201).json({ message: "User added successfully" });
  } catch (error) {
      console.error("❌ Error adding user:", error);
      res.status(500).json({ message: "Server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // fetch all users from DB
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};
exports.deleteUser = async (req, res) => {
  const { id } = req.params; // Get the user ID from the request parameters
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: id }); // Use findByIdAndDelete to remove the user
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add this updateUser method to your userController
exports.updateUser = async (req, res) => {
  const { id } = req.params; // Get the user ID from the URL
  const { nom, email, role, mot } = req.body; // Get updated fields

  // Basic validation
  if (!nom || !email || !role || !mot) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { nom, email, role, mot },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "Agent d'impression" }, "nom");
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};