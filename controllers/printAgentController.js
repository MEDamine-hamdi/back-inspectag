const Printer = require("../models/PrintAgent"); // Assuming PrintAgent is your model for p

// Function to add a printer
exports.addPrinter = async (req, res) => {
  try {
    const { nom } = req.body; // Access the 'nom' field from the request body

    if (!nom) {
      return res.status(400).json({ error: "Nom is required" }); // Check if 'nom' is provided
    }

    const newPrinter = new Printer({ nom }); // Create a new Printer using the model
    await newPrinter.save(); // Save the new printer to the database

    res.status(201).json({ message: "Printer added successfully", printer: newPrinter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding printer" });
  }
};

// Function to get all printers
exports.getAllPrinters = async (req, res) => {
  try {
    const printers = await Printer.find(); // Use the correct model to fetch printers
    res.status(200).json(printers);
  } catch (error) {
    console.error('Error fetching printers:', error);
    res.status(500).json({ message: 'Error fetching printers' });
  }
};

// Function to delete an agent
exports.deleteAgent = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Printer.findByIdAndDelete(id); // Make sure the correct model is being used
    if (!result) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.status(200).json({ message: 'Agent supprimé avec succès!' });
  } catch (error) {
    console.error('Error deleting agent:', error); // Log the error for debugging
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'agent.', error });
  }
};
