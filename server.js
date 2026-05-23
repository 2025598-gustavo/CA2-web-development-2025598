console.log("THIS IS THE CORRECT SERVER FILE");

const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(express.static("public"));

let basket = [];

app.get("/test", (req, res) => {
    res.send("Server is working");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products", (error, results) => {
        if (error) {
            console.log("Error fetching products:", error);
            return res.status(500).json({ error: error.message });
        }

        res.json(results);
    });
});

app.post("/api/basket", (req, res) => {
    const product = req.body;
    basket.push(product);
    res.json(basket);
});

app.get("/api/basket", (req, res) => {
    res.json(basket);
});

app.delete("/api/basket/:index", (req, res) => {
    const index = req.params.index;
    basket.splice(index, 1);
    res.json(basket);
});

app.post("/api/checkout", (req, res) => {
    basket = [];
    res.json({ message: "Checkout completed successfully" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});