const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./model/user'); 

const app = express();
const port = 3000; 

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/webservice')
.then(() => {
  console.log("Connected to database");
})
.catch((error) => {
  console.error("Database connection error:", error);
});


app.post('/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const user = new User({ name, email, phone, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
