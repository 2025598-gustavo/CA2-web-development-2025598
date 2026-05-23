// Fetch products from the server API
fetch("/api/products")
    .then(response => response.json())
    .then(products => {

        // Get the container where product cards will be displayed
        const productsContainer = document.getElementById("products");

        // Loop through each product from the database
        products.forEach(product => {

            // Create a card for each product
            const card = document.createElement("div");
            card.className = "card";

            // Add product information and Add to Basket button
            card.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: €${product.price}</p>
                <button onclick='addToBasket(${JSON.stringify(product)})'>Add to Basket</button>
            `;

            // Display the product card on the page
            productsContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.log("Error loading products:", error);
    });

// Adds selected product to the basket
function addToBasket(product) {
    fetch("/api/basket", {
        method: "POST",

        // Inform the server that JSON data is being sent
        headers: {
            "Content-Type": "application/json"
        },

        // Convert the product object into JSON
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        alert("Service added to basket");
    })
    .catch(error => {
        console.log("Error adding to basket:", error);
    });
}