const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app and use middleware
const app = express();
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/imageCarouselDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Define a Mongoose Schema for storing image URLs
const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
});

// Create a model
const Image = mongoose.model('Image', imageSchema);

// POST route to add new image URLs
app.post('/images', async (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ message: 'Image URL is required' });
  }

  try {
    const newImage = new Image({ url });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: 'Error saving image URL', error });
  }
});

// GET route to fetch all stored image URLs
app.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
