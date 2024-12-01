var items = [];
var payers = [];
var fetchProtectedRouteCache = null;

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  const closeButtons = document.querySelectorAll(".close");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all tab buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // Remove active class from all tab contents
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to the clicked tab button
      button.classList.add("active");

      // Add active class to the corresponding tab content
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.target.closest(".modal").style.display = "none";
    });
  });

  // Display the first tab by default
  tabButtons[0].click();

  const urlParams = new URLSearchParams(window.location.search);

  const id = urlParams.get("id") || "";
  if (id || id !== "") {
    fetchProtectedRoute(`http://localhost:8080/v1/histories/${id}`).then(
      (data) => {
        ({ items, payers } = data);
        calculateAmount();
      }
    );
  } else {
    calculateAmount();
  }
});

async function loadFetchProtectedRoute() {
  if (fetchProtectedRouteCache) return fetchProtectedRouteCache;
  try {
    const { fetchProtectedRoute } = await import("./utils.js");
    fetchProtectedRouteCache = fetchProtectedRoute;
    return fetchProtectedRouteCache;
  } catch (e) {
    console.error("Error loading the function:", e);
  }
}

async function fetchProtectedRoute(url) {
  const fetchProtectedRoute = await loadFetchProtectedRoute();
  return fetchProtectedRoute(url);
}

function getLatestId(arrays) {
  return arrays.reduce((max, obj) => (obj.id > max ? obj.id : max), 0);
}

function addPayer() {
  const name = document.getElementById("newMemberName");
  if (!name.value) return;
  let latestId = getLatestId(payers);
  payers.push({ id: latestId + 1, name: name.value, amount: 0 });
  name.value = "";
  calculateAmount();
}

function removePayer(id) {
  const personIndex = payers.findIndex((person) => person.id === id);
  payers.splice(personIndex, 1);
  items.forEach((item) => {
    const personIndex = item.payers.indexOf(id);
    if (personIndex !== -1) {
      item.payers.splice(personIndex, 1);
    }
  });
  calculateAmount();
}

function renderPayers() {
  const ul = document.querySelector("#memberDisplay ul");
  ul.innerHTML = "";
  payers.forEach((person) => {
    const li = document.createElement("li");
    li.innerHTML = `${person.name} - ${person.amount} <button onclick="removePayer(${person.id})">Remove</button>`;
    ul.appendChild(li);
  });
}

function addItem() {
  const itemName = document.getElementById("newFoodName");
  if (!itemName.value) return;
  document.getElementById("modalFoodNameDisplay").innerText =
    "Item Name: " + itemName.value;
  const checkboxesElement = document.getElementById("memberCheckboxes");
  checkboxesElement.innerHTML = "";
  payers.forEach((person) => {
    const personElement = document.createElement("input");
    const personLabelElement = document.createElement("label");
    const lineBreakElement = document.createElement("br");
    personElement.classList.add("memberCheckbox");
    personElement.type = "checkbox";
    personElement.value = person.id;
    personLabelElement.textContent = person.name;
    checkboxesElement.appendChild(personElement);
    checkboxesElement.appendChild(personLabelElement);
    checkboxesElement.appendChild(lineBreakElement);
  });

  document.getElementById("myModal").style.display = "block";
}

function confirmAddItem() {
  const itemName = document.getElementById("newFoodName");
  const itemPrice = document.getElementById("modalFoodPrice");
  const checkedBoxes = document.querySelectorAll(".memberCheckbox:checked");
  const selectPersonsId = Array.from(checkedBoxes).map((person) =>
    Number(person.value)
  );

  const latestId = getLatestId(items);
  items.push({
    id: latestId + 1,
    name: itemName.value,
    payers: selectPersonsId,
    price: Number(itemPrice.value),
  });

  calculateAmount();
  document.getElementById("myModal").style.display = "none";
  itemName.value = "";
  itemPrice.value = 0;
}

function removeItem(id) {
  const itemIndex = items.findIndex((item) => item.id === id);
  items.splice(itemIndex, 1);
  calculateAmount();
}

function editItem(id) {
  const item = items.find((item) => item.id === id);
  const itemName = document.getElementById("editFoodName");
  const itemPrice = document.getElementById("editFoodPrice");
  const checkboxesElement = document.getElementById("editMemberCheckboxes");
  checkboxesElement.innerHTML = "";
  itemName.value = item.name;
  itemPrice.value = item.price;
  payers.forEach((person) => {
    const personElement = document.createElement("input");
    const personLabelElement = document.createElement("label");
    const lineBreakElement = document.createElement("br");
    personElement.classList.add("editMemberCheckbox");
    personElement.type = "checkbox";
    personElement.value = person.id;
    personLabelElement.textContent = person.name;
    if (item.payers.includes(person.id)) {
      personElement.checked = true;
    }
    checkboxesElement.appendChild(personElement);
    checkboxesElement.appendChild(personLabelElement);
    checkboxesElement.appendChild(lineBreakElement);
  });

  document.getElementById("confirmEdit").onclick = () => confirmEditItem(id);

  document.getElementById("editModal").style.display = "block";
}

function confirmEditItem(id) {
  const itemName = document.getElementById("editFoodName");
  const itemPrice = document.getElementById("editFoodPrice");
  const checkedBoxes = document.querySelectorAll(".editMemberCheckbox:checked");
  const selectPersonsId = Array.from(checkedBoxes).map((person) =>
    Number(person.value)
  );

  items = items.map((item) =>
    item.id === id
      ? {
          id,
          name: itemName.value,
          payers: selectPersonsId,
          price: Number(itemPrice.value),
        }
      : item
  );
  calculateAmount();
  document.getElementById("editModal").style.display = "none";
}

function renderItems() {
  const ul = document.querySelector("#foodDisplay ul");
  let membersName = [];
  ul.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    if (payers.length) {
      membersName = item.payers.map((id) => {
        const item = payers.find((person) => person.id == id);
        return item.name;
      });
    }

    li.innerHTML = `${item.name} - ${item.price} (Members: ${membersName})
    <button onclick="removeItem(${item.id})">Remove</button>
    <button onclick="editItem(${item.id})">Edit</button>`;
    ul.appendChild(li);
  });
}

function calculateAmount() {
  payers.forEach((payer) => {
    payer.amount = 0;
  });

  items.forEach((item) => {
    const numberOfPayers = item.payers.length;
    let amountPerPayer = item.price / numberOfPayers;
    amountPerPayer = Math.ceil(amountPerPayer * 100) / 100;

    item.payers.forEach((payerId) => {
      const payer = payers.find((payer) => payer.id === payerId);
      if (payer) {
        payer.amount += amountPerPayer;
      }
    });
  });

  renderItems();
  renderPayers();
}

function saveHistory() {
  const urlParams = new URLSearchParams(window.location.search);

  const id = urlParams.get("id") || "";
  if(id || id!== "") {
    fetchProtectedRoute()
  }
}
