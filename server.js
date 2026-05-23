// Import Express framework
const express = require("express");

// Import database connection
const db = require("./db");

// Create Express application
const app = express();

// Allows the server to understand JSON data
app.use(express.json());

// Makes files inside the public folder available to the browser
app.use(express.static("public"));

// Temporary basket stored in server memory
let basket = [];

// Test route to confirm the server is working
app.get("/test", (req, res) => {
    res.send("Server is working");
});

// Loads the homepage
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Gets all products from the MySQL database
app.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products", (error, results) => {
        if (error) {
            console.log("Error fetching products:", error);
            return res.status(500).json({ error: error.message });
        }

        // Send products back as JSON
        res.json(results);
    });
});

// Adds a product to the basket
app.post("/api/basket", (req, res) => {
    const product = req.body;
    basket.push(product);
    res.json(basket);
});

// Gets all basket items
app.get("/api/basket", (req, res) => {
    res.json(basket);
});

// Removes one product from the basket using its index
app.delete("/api/basket/:index", (req, res) => {
    const index = req.params.index;
    basket.splice(index, 1);
    res.json(basket);
});

// Clears the basket when checkout is completed
app.post("/api/checkout", (req, res) => {
    basket = [];
    res.json({ message: "Checkout completed successfully" });
});

// Starts the server on port 3000
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});