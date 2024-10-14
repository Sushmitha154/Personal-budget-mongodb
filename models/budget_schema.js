const mongoose = require('mongoose');

const budgetDataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
        match: /^#[0-9A-Fa-f]{6}$/,
    },
});

module.exports = mongoose.model('budget', budgetDataSchema);