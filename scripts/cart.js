 import { checkoutnumber } from "./util/checkoutnumber.js";
import { UpdateCartQuantity } from "./util/updateCart.js";

export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", //normalizing data or deduplicated
    quantity: 2,
    deliveryoptionId:'1',
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
    deliveryoptionId:'3',
  },
];
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function AddToCart(productId) {
  let productQuantity = document.querySelector(
    `.product-quantity-selector-${productId}`
  );
  let productQuantityValue = parseInt(productQuantity.value);

  let matchingitem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingitem = item;
    }
  });
  if (matchingitem) {
    matchingitem.quantity += productQuantityValue;
  } else {
    cart.push({
      productId: productId, //name can be same
      quantity: productQuantityValue,
      deliveryoptionId:'2',
    });
  }
  saveToStorage();
}

export function deleteFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) newCart.push(cartItem);
  });

  cart = newCart;
  saveToStorage();
  UpdateCartQuantity();
  //localStorage.removeItem('cartQuantity')
}
export function updateQuantityAfterSave(productId,quantity){
  let matchingitem;
cart.forEach((cartitem)=>{
 if(cartitem.productId === productId)
 {
  matchingitem=cartitem
 }
})
matchingitem.quantity=quantity
UpdateCartQuantity();
saveToStorage()
document.querySelector(`.quantity-label${productId}`).innerHTML=matchingitem.quantity;
checkoutnumber(`${UpdateCartQuantity()}`);
}

//delivery option selected save
export function SaveDeliveryOption(productId,deliveryoptionId){
  let matchingitem;
  cart.forEach((cartitem)=>{
   if(cartitem.productId === productId)
   {
    matchingitem=cartitem
   }
  })
  matchingitem.deliveryoptionId=deliveryoptionId;
  saveToStorage();
}