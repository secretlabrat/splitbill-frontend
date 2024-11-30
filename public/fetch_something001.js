function fetchfunction() {
    console.log("Fetching products...");
    
    fetch("https://splitbill-api.kidkrub.me/v1/history")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            renderProductCards(data);
        })
        .catch(error => console.error("Error fetching data:", error));
}

function renderProductCards(data) {
    const productListContainer = document.getElementById("product-list-container");
    productListContainer.innerHTML = ""; // Clear any previous content

    data.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("productcard");
        
        productCard.innerHTML = `
        <h2>${product.billNo}</h2>
        <p class="Date">${product.billDate}</p>
        <p>Name: ${product.billName}</p>
    `;
        // Toggle the details section when the card is clicked
        productCard.addEventListener("click", () => {
            productCard.classList.toggle("show-details");
        });
        
        productListContainer.appendChild(productCard);
    });
}
