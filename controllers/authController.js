
const User = require('../models/User');  // Adjust path if necessary

exports.loginUser = async (req, res) => {
    console.log("Received login request:", req.body); // Debugging

    const { nom, mot } = req.body;
    if (!nom || !mot) {
        return res.status(400).json({ message: 'Nom et mot de passe requis' });
    }

    try {
        const user = await User.findOne({ nom });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (mot === user.mot) {
            res.status(200).json({ message: 'Login successful', nom: user.nom ,role: user.role});
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
};
