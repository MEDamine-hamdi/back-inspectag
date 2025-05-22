const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes"); 
const printAgentRoutes = require("./routes/printAgentRoutes");  // Import the routes
const orderRouter = require("./routes/orderRoutes");
const statsRoutes = require("./routes/statsRoutes")
const commandeRoutes = require('./routes/commandeRoutes');
const compStatsRoutes = require('./routes/compStatsRoutes');
const path = require('path');

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
app.use('/api/stats', statsRoutes);
app.use('/api', commandeRoutes);
app.use('/detected', express.static(path.join('D:/PFE/detected')));
app.use('/detected', express.static(path.join(__dirname, 'detected')));
app.use('/tested', express.static(path.join('D:/PFE/tested')));
app.use('/api/comp-stats', compStatsRoutes);
app.use('/', orderRouter);
app.use("/api", orderRouter);
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
