let main = document.querySelector(".cartMain");
let continueBtn = document.querySelector(".continueBtn");
let orderBtn = document.querySelector(".orderBtn");

function updateCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length > 0) {
    let itemsHtml = cart
      .map(
        (product) => `
       <div class="itemDetails" data-id="${product.id}">
              <h4 class="title">${product.title}</h4>
              <div class="details">
                  <span class="price">$${product.price} ×</span>
                  <div class="minus">−</div>
                  <span class="quantity">${product.quantity}</span>
                  <div class="plus">+</div>
                  <span>=</span>
                  <span class="totalPrice">$${
                    product.price * product.quantity
                  }</span>
              </div>
              <button class="remove">Remove</button>
          </div>
          <br>
          <hr>
    
    `
      )
      .join("");
    let total = cart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    let footerHtml = `
  <div class="footer">
    <button class="continueBtn">⬅ Continue Shopping</button>

    <div class="rightSide">
      <h3>Total: $${total.toFixed(2)}</h3>
      <button class="orderBtn">✔ Continue to Order</button>
    </div>
  </div>
`;

    main.innerHTML = itemsHtml + footerHtml;

    document.querySelector(".continueBtn").addEventListener("click", () => {
      window.location.href = "../index.html";
    });

    document.querySelector(".orderBtn").addEventListener("click", () => {
      alert(" cart purchased ");
    });
  } else {
    main.innerHTML = "<p>No products selected yet!</p>";
  }
}

main.addEventListener("click", (e) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let itemDiv = e.target.closest(".itemDetails");
  if (!itemDiv) return;

  let id = Number(itemDiv.dataset.id);
  let product = cart.find((p) => p.id === id);

  if (!product) return;

  if (e.target.classList.contains("plus")) {
    product.quantity++;
  } else if (e.target.classList.contains("minus")) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  } else if (e.target.classList.contains("remove")) {
    cart = cart.filter((p) => p.id !== id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
});

updateCart();
