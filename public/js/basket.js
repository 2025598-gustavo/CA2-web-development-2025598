// Loads all basket items from the server
function loadBasket() {
    fetch("/api/basket")
        .then(response => response.json())
        .then(basket => {

            // Get the HTML elements where basket items and total price will appear
            const basketItems = document.getElementById("basket-items");
            const totalElement = document.getElementById("total");

            // Clear previous basket content before reloading
            basketItems.innerHTML = "";

            // Variable used to calculate the total basket price
            let total = 0;

            // If the basket is empty, display a message and hide the checkout button
            if (basket.length === 0) {

                basketItems.innerHTML = `
                <p style="margin-left: 0px;">
                    Your basket is empty.
                </p>
                `;

                totalElement.innerHTML = "";
                document.getElementById("checkout-btn").style.display = "none";
                return;
            }

            // Loop through each item in the basket
            basket.forEach((item, index) => {

                // Add item price to the total
                total += Number(item.price);

                // Create a card for each basket item
                const card = document.createElement("div");
                card.className = "card";

                // Add item details and remove button to the card
                card.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p>Price: €${item.price}</p>
                    <button onclick="removeItem(${index})">Remove</button>
                `;

                // Add the card to the basket page
                basketItems.appendChild(card);
            });

            // Show checkout button when the basket has items
            document.getElementById("checkout-btn").style.display = "inline-block";

            // Display the total price with two decimal places
            totalElement.innerHTML = `Total: €${total.toFixed(2)}`;
        });
}

// Removes one item from the basket based on its position
function removeItem(index) {
    fetch(`/api/basket/${index}`, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data => {
            // Reload basket after removing item
            loadBasket();
        });
}

// Sends checkout request to the server and clears the basket
function checkout() {
    fetch("/api/checkout", {
        method: "POST"
    })
        .then(response => response.json())
        .then(data => {
            alert("Checkout completed successfully");

            // Reload basket after checkout
            loadBasket();
        });
}

// Load basket items when the page opens
loadBasket();