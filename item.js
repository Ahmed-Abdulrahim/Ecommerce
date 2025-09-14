let mainDiv = document.querySelector(".main");
async function getData() {
  try {
    let respone = await fetch("https://fakestoreapi.com/products");
    let data = await respone.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
let Items = [];
async function ShowItem() {
  Items = await getData();
  for (let i = 0; i < Items.length; i++) {
    mainDiv.innerHTML += `
    <div class="item">
        <img class = "img" width="170px" height="221px" src="${Items[i].image}">
       <div class="itemInformation">
         <h3>${Items[i].title}</h3>
        <p>${Items[i].description}</p>
        
        <h4 align = "left">$${Items[i].price}</h4>
          <button class="btn" id="${Items[i].id}">Add to Cart</button>
       </div>

    </div>
    `;
  }
}

mainDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    let productId = e.target.getAttribute("id");
    let selectedProduct = Items.find((item) => item.id == productId);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existing = cart.find((p) => p.id == selectedProduct.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      selectedProduct.quantity = 1;
      cart.push(selectedProduct);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "cartPage/cart.html";
  }
});
ShowItem();
