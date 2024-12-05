import { authStateListener, getAccessToken, logout } from "./auth.js";
import { fetchProtectedRoute } from "./utils.js";

window.addEventListener("load", () => {
  authStateListener();
  const token = getAccessToken();
  if (token) {
    fetchUsersData();
    const welcomeMessageElement = document.getElementById("welcome-message");
    welcomeMessageElement.innerText = `Welcome, ${sessionStorage.getItem(
      "email"
    )}`;
  }

  document.getElementById("logout").addEventListener("click", logout);
});

async function fetchUsersData() {
  console.log("Fetching products...");

  fetchProtectedRoute("https://splitbill-api.kidkrub.me/v1/histories")
    .then((data) => {
      console.log(data);
      renderProductCards(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function renderProductCards(data) {
  const tableBody = document
    .getElementById("historyTable")
    .querySelector("tbody");
  tableBody.innerHTML = "";
  data.forEach((item) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = item.billName || "N/A";
    nameCell.addEventListener("click", () => {
      openDetailsPage(item);
    });
    row.appendChild(nameCell);

    const dateCell = document.createElement("td");
    const billDate = new Date(item.billDate);
    dateCell.textContent =
      billDate.toLocaleDateString() + " " + billDate.toLocaleTimeString() ||
      "N/A";
    dateCell.addEventListener("click", () => {
      openDetailsPage(item);
    });
    row.appendChild(dateCell);

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.onclick = () => {
      deleteRecord(item.billNo);
    };
    deleteButton.innerHTML = "Delete";
    deleteCell.appendChild(deleteButton);

    row.appendChild(deleteCell);

    tableBody.appendChild(row);
  });
}

function deleteRecord(billNo) {
  fetchProtectedRoute(
    `https://splitbill-api.kidkrub.me/v1/histories/${billNo}`,
    {
      method: "DELETE",
    }
  ).then(fetchUsersData());
}

function openDetailsPage(item) {
  const url = `detail.html?id=${item.billNo}`;
  window.location.href = url;
}
