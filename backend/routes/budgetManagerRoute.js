const express = require('express');
const Budget = require('../models/BudgetManager');
const router = express.Router();

// Get the current budget
router.get('/', async (req, res) => {
    try {
        const budget = await Budget.findOne();
        res.json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update the budget
router.put('/', async (req, res) => {
    const { amount } = req.body;
    try {
        const budget = await Budget.findOneAndUpdate({}, { amount }, { new: true, upsert: true });
        res.json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;