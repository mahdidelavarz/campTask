// ! ________________________________________________________________states
let actionList = [];
let inputValue;
const renderActionBtn = document.querySelector("#action-btn");
const actionsContainer = document.querySelector("#actions-container");
const price = document.querySelector("#price");
const priceIcon = document.querySelector("#price-icon");
const date = document.querySelector("#date");
const dateIcon = document.querySelector("#date-icon");
const tableBody = document.querySelector("#table-body");
const searchInput = document.querySelector("#search-input");
const searchDiv = document.querySelector("#search");
// ! _________________________________________________________________Listeners
renderActionBtn.addEventListener("click", handleGetActionList);
price.addEventListener("click", handleSortByPrice);
searchInput.addEventListener("input", handleSearch);
date.addEventListener("click", handleSortByDate);
// ! _________________________________________________________________Handlers
async function handleGetActionList() {
  await axios
    .get("http://localhost:3000/transactions")
    .then(({ data }) => {
      renderActionsInDom(data);
    })
    .catch((err) => {
      return err;
    });
}

async function handleSortByPrice() {
  if (searchInput.value) {
    if (priceIcon.classList.contains("spin")) {
      priceIcon.classList.toggle("spin");
      await axios
        .get(
          `http://localhost:3000/transactions?refId_like=${inputValue}&_sort=price&_order=asc`
        )
        .then(({ data }) => {
          renderActionsInDom(data);
        })
        .catch((err) => {
          return err;
        });
    } else {
      priceIcon.classList.toggle("spin");
      await axios
        .get(
          `http://localhost:3000/transactions?refId_like=${inputValue}&_sort=price&_order=desc`
        )
        .then(({ data }) => {
          renderActionsInDom(data);
        })
        .catch((err) => {
          return err;
        });
    }
  } else {
    if (priceIcon.classList.contains("spin")) {
      priceIcon.classList.toggle("spin");
      await axios
        .get("http://localhost:3000/transactions?_sort=price&_order=asc")
        .then(({ data }) => {
          renderActionsInDom(data);
        })
        .catch((err) => {
          return err;
        });
    } else {
      priceIcon.classList.toggle("spin");
      await axios
        .get("http://localhost:3000/transactions?_sort=price&_order=desc")
        .then(({ data }) => {
          renderActionsInDom(data);
        })
        .catch((err) => {
          return err;
        });
    }
  }
}
function handleSortByDate() {
  dateIcon.classList.toggle("spin");
}
async function handleSearch(e) {
  inputValue = e.target.value;
  await axios
    .get(`http://localhost:3000/transactions?refId_like=${inputValue}`)
    .then(({ data }) => {
      renderActionsInDom(data);
    })
    .catch((err) => {
      return err;
    });
}

function renderActionsInDom(data) {
  if (tableBody.childElementCount >= 1) {
    tableBody.replaceChildren();
  }
  data.forEach((item) => {
    let transactions = document.createElement("tr");
    transactions.classList.add("transactions");
    transactions.innerHTML = `
        <td class="w-80 py-8 flex justify-center border-b">${item.id}</td>
        <td class="w-80 py-8 flex justify-center border-b">${item.type}</td>
        <td class="w-80 py-8 flex justify-center border-b">${item.price}</td>
        <td class="w-80 py-8 flex justify-center border-b">${item.refId}</td>
        <td class="w-80 py-8 flex justify-center border-b">${new Date(
          item.date
        ).toLocaleDateString("fa-ir")}</td>`;

    tableBody.appendChild(transactions);
    renderActionBtn.classList.add("hidden");
    actionsContainer.classList.remove("hidden");
    searchDiv.classList.remove("hidden");
  });
}
