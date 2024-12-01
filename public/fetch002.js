function renderProductCards(data) {
    const productTableBody = document.querySelector("#product-list-container tbody");
    productTableBody.innerHTML = ""; // Clear any previous content

    data.forEach((product) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.billNo}</td>
            <td>${product.billDate}</td>
            <td>${product.billName}</td>
        `;
        
        productTableBody.appendChild(row);
    });
}
