import { cart } from "../cart.js";

export function UpdateCartQuantity() {
    let cartquantity = 0;
    cart.forEach((item) => {
      let quantity = parseInt(item.quantity);
      cartquantity += quantity;
    });
  
    localStorage.setItem("cartQuantity", JSON.stringify(cartquantity));
    const cartIco =document.querySelector(".cart-quantity")
    if(cartIco){
  cartIco.innerHTML =
      localStorage.getItem("cartQuantity");
    }
    return cartquantity;
  }