const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');  // Import cors
const app = express();
const port = 3000;

app.use(cors());  // Enable CORS
app.use(express.json());

const apiKey = 'Roblox_Script';  // Replace with your actual OpenAI API key
const chatEndpoint = 'https://api.openai.com/v1/chat/completions';

app.post('/chat', async (req, res) => {
    try {
        const response = await fetch(chatEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error communicating with OpenAI API');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});