function loadBasket() {
    fetch("/api/basket")
        .then(response => response.json())
        .then(basket => {
            const basketItems = document.getElementById("basket-items");
            const totalElement = document.getElementById("total");

            basketItems.innerHTML = "";

            let total = 0;

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

            basket.forEach((item, index) => {
                total += Number(item.price);

                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p>Price: €${item.price}</p>
                    <button onclick="removeItem(${index})">Remove</button>
                `;

                basketItems.appendChild(card);
            });

            document.getElementById("checkout-btn").style.display = "inline-block";
            totalElement.innerHTML = `Total: €${total.toFixed(2)}`;
        });
}

function removeItem(index) {
    fetch(`/api/basket/${index}`, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data => {
            loadBasket();
        });
}

function checkout() {
    fetch("/api/checkout", {
        method: "POST"
    })
        .then(response => response.json())
        .then(data => {
            alert("Checkout completed successfully");
            loadBasket();
        });
}

loadBasket();