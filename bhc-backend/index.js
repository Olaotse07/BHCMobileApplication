const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let users = []; // In-memory storage for users

// Sign-up route
app.post("/api/signup", (req, res) => {
  const { email, password } = req.body;
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ email, password });
  res.status(201).json({ message: "User created successfully" });
});

// Login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
