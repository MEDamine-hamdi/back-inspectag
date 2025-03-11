const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    nom: { type: String, required: true },
    email: { type: String, required: true},
    role: { type: String, required: true },
    mot: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
