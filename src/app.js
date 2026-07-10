const express = require("express");
const app = express();

// GET Request
app.get("/User", (req, res) => {
    res.send("Hello from the User route!");
});

// POST Request
app.post("/User", (req, res) => {
    res.send("Data received!");
});

// DELETE Request
app.delete("/User", (req, res) => {
    res.send("User deleted!");
});

// Test Route
app.get("/test", (req, res) => {
    res.send("Hello from the test route!");
});

// Hello Route
app.get("/hello", (req, res) => {
    res.send("Hello ji from the hello route!");
});

// Default Route (optional)
app.get("/", (req, res) => {
    res.send("Welcome to Express Server!");
});

// Start Server
app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000");
});