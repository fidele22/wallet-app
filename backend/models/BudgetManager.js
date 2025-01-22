const mongoose = require('mongoose');

// Define the budget schema
const budgetSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true, // The budget amount is required
    },
}, { timestamps: true }); // Optional: Add timestamps for createdAt and updatedAt

// Create the Budget model
const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;