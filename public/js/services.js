fetch("/api/products")
    .then(response => response.json())
    .then(products => {
        const productsContainer = document.getElementById("products");

        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: €${product.price}</p>
                <button onclick='addToBasket(${JSON.stringify(product)})'>Add to Basket</button>
            `;

            productsContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.log("Error loading products:", error);
    });

function addToBasket(product) {
    fetch("/api/basket", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
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