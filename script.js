let openShopping = document.querySelector(".fa-shopping-cart");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let navbar = document.querySelector(".navbar");
document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
};

let cartItems = {};

// Function to update the cart when a product is clicked
function updateCart(name, price, action) {
  let cartItem = cartItems[name];

  if (!cartItem) {
    cartItem = { quantity: 0, price: 0 };
  }

  if (action === "add") {
    cartItem.quantity++;
    cartItem.price += parseFloat(price);
  } else if (action === "subtract" && cartItem.quantity > 0) {
    cartItem.quantity--;
    cartItem.price -= parseFloat(price);
  }

  cartItems[name] = cartItem;

  updateCartUI();
}

// Function to update the cart UI
function updateCartUI() {
  listCard.innerHTML = "";
  let totalPrice = 0;
  let totalQuantity = 0;

  for (let itemName in cartItems) {
    let item = cartItems[itemName];
    if (item.quantity > 0) {
      let listItem = document.createElement("li");
      listItem.innerHTML = `${itemName} x${
        item.quantity
      } - $${item.price.toFixed(2)}`;
      listItem.style.fontSize = "16px";

      // Add buttons for adding and subtracting quantity
      let addButton = document.createElement("button");
      addButton.innerText = "+";
      addButton.addEventListener("click", () =>
        updateCart(itemName, item.price, "add")
      );

      let subtractButton = document.createElement("button");
      subtractButton.innerText = "-";
      subtractButton.addEventListener("click", () =>
        updateCart(itemName, item.price, "subtract")
      );

      listItem.appendChild(addButton);
      listItem.appendChild(subtractButton);

      listCard.appendChild(listItem);

      totalPrice += item.price;
      totalQuantity += item.quantity;
    }
  }

  total.innerText = `$${totalPrice.toFixed(2)}`;
  quantity.innerText = totalQuantity.toString();
}

// Add click event listeners to each product box
let productBoxes = document.querySelectorAll(".box");
productBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    let productName = box.getAttribute("data-name");
    let productPrice = box.getAttribute("data-price");
    updateCart(productName, productPrice, "add");
  });
});
