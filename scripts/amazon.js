// save the data
import { cart, AddToCart } from "../scripts/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./util/money.js";
import { UpdateCartQuantity } from "./util/updateCart.js";
let html = "";

window.addEventListener("load", () => {
  console.log("load");
  document.querySelector(".cart-quantity").innerHTML =
    localStorage.getItem("cartQuantity") || 0;
});
//generate html
products.forEach((product) => {
  html += ` <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
     ${product.name}
    </div>

    <div class="product-rating-container">
    <img class="product-rating-stars"
    src="images/ratings/rating-${product.rating.stars * 10}.png">
  <div class="product-rating-count link-primary">
    ${product.rating.count}
  </div>

    </div>

    <div class="product-price">
      $${formatCurrency(product.priceCents)}
    </div>

    <div class="product-quantity-container ">
      <select class=product-quantity-selector-${product.id}>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary"
    data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>`;
});



document.querySelector(".products-grid").innerHTML = html;

document.querySelectorAll(".add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset; //kabab case to CamelCase
    AddToCart(productId);
    //added to cart msg display
    let addToCart = document.querySelector(`.added-to-cart-${productId}`);
    addToCart.classList.add('addToCartDisplay');
    let addedMessageTimeoutId;
    setTimeout(() => {
    // Check if a previous timeoutId exists. If it does,
    // we will stop it.
    if (addedMessageTimeoutId) {
      clearTimeout(addedMessageTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addToCart.classList.remove('addToCartDisplay');
    }, 2000);

    // Save the timeoutId so we can stop it later.
    addedMessageTimeoutId = timeoutId
    UpdateCartQuantity();

    console.log(cart);
    })

  });
});
