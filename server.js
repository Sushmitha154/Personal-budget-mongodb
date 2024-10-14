const express = require('express');
const mongoose = require('mongoose');
const budgetData = require('./models/budget_schema'); 
const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017/myNewDatabase';

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/', express.static('public'));

// Database connection 
mongoose.connect(url)
    .then(() => console.log("Connected to the database"))
    .catch((connectionError) => console.error("Error while connecting to db", connectionError));

// Routes
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', async (req, res) => {
    try {
        const data = await budgetData.find({});
        res.json(data);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Error querying the database' });
    }
});

app.get('/example', async (req, res) => {
    try {
        const data = await budgetData.find({});
        res.json(data);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Error querying the database' });
    }
});

// POST route to add budget data
app.post('/addBudgetDataItem', async (req, res) => {
    try {
        const { title, budget, color } = req.body;

        // Ensure all required fields are provided
        if (!title || !budget || !color) {
            return res.status(400).json({ error: "Please provide title, budget, and color." });
        }

        // Create and save new budget data item using async/await
        const newBudgetDataItem = new budgetData({ title, budget, color });
        const savedItem = await newBudgetDataItem.save(); // Use await instead of a callback
        console.log('Budget item saved:', savedItem);
        res.status(201).json({ success: true, data: savedItem });
    } catch (err) {
        console.error('Error saving budget item:', err);
        res.status(500).json({ error: 'Error saving budget item', details: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});
