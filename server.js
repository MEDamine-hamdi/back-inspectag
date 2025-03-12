const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes"); 
const printAgentRoutes = require("./routes/printAgentRoutes");  // Import the routes

const app = express();
const port = process.env.PORT || 5000; // Use .env or default to 5000

// Middleware setup
app.use(cors());
app.use(express.json()); // body-parser is built-in in Express now

// Use the auth routes
app.use('/api', authRoutes);

app.use('/api/users', userRoutes);
app.use('/api', userRoutes);

app.use('/api/printagents', printAgentRoutes);

app.use("/api", require("./routes/orderRoutes"));
// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/inspectag', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Failed to connect to MongoDB', error));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
