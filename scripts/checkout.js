import { getproduct, products } from "../data/products.js";
import { cart, deleteFromCart, updateQuantityAfterSave ,SaveDeliveryOption} from "./cart.js";
import { formatCurrency } from "./util/money.js";
import { UpdateCartQuantity } from "./util/updateCart.js";
import { checkoutnumber } from "./util/checkoutnumber.js";
import dayJS from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryoptions.js";

let CartSummaryHTML = "";
cart.forEach((cartitem) => {
  let productId = cartitem.productId;
  let matchingProduct= getproduct(productId);

  const deliveryoptionId=cartitem.deliveryoptionId;

  let deliveryOption;
  deliveryOptions.forEach((element) => {
    if (element.id===deliveryoptionId){
      deliveryOption=element;
    }
})
  const todayDate=dayJS();
    let deliveryDate=todayDate.add(deliveryOption.deliveryDate,'days')
    const dateString = deliveryDate.format(
      'dddd, MMMM D')
  console.log(dateString)
  CartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${
    matchingProduct.id
  }">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label${
                      matchingProduct.id
                    }">${cartitem.quantity}</span>
                  </span>
                  <span class="update-quantity-link 
                   link-primary"
                  data-product-id=${matchingProduct.id}>
                    Update
                  </span>
                  <input class="quantity-input quantity-input-${
                    matchingProduct.id
                  }">
            <span class="save-quantity-link link-primary"
            data-product-id=${matchingProduct.id}>Save</span>
                  <span class="delete-quantity-link link-primary"
                  data-product-id=${matchingProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
               ${updatedeliveroption(matchingProduct , cartitem)}
              </div>
            </div>
          </div>`;
});
document.querySelector(".order-summary").innerHTML = CartSummaryHTML;





function updatedeliveroption(matchingProduct,cartitem){
  let html=''
deliveryOptions.forEach((element) => {
  const todayDate=dayJS();
  let deliveryDate=todayDate.add(element.deliveryDate,'days')
deliveryDate=deliveryDate.format('dddd MMMM D')
let price=element.priceCents===0
?'FREE'
:`$${formatCurrency(element.priceCents)}`

let ischecked = element.id === cartitem.deliveryoptionId;
console.log(ischecked)
html+=`<div class="delivery-option js-delivery-option
data-product-id=${matchingProduct.id}
data-deliveryoption-id=${element.id}">
  <input type="radio"
  ${ischecked?'checked':''}
    class="delivery-option-input"
    name="delivery-option-${matchingProduct.id}">
  <div>
    <div class="delivery-option-date">
      ${deliveryDate}
    </div>
    <div class="delivery-option-price">
      ${price} - Shipping
    </div>
  </div>
</div>`
});
  return html;
}

//deleting in card

document.querySelectorAll(".delete-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    //console.log(link);
    const productId = link.dataset.productId;
    //console.log(productId);
    let conatainer = document.querySelector(
      `.js-cart-item-container-${productId}`
    );deleteFromCart(productId);
    conatainer.remove();
    
    
    checkoutnumber(`${UpdateCartQuantity()}`);RenderPaymentSummary()
  });
});
checkoutnumber(`${UpdateCartQuantity()}`);

//update button
document.querySelectorAll(".update-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    let { productId } = link.dataset; //shortcut
    console.log(productId);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.add("is-editing-quantity");
  });
});
//save button
document.querySelectorAll(".save-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    let { productId } = link.dataset; //shortcut
    console.log(productId);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove("is-editing-quantity");
    let input = document.querySelector(`.quantity-input-${productId}`);
    input = Number(input.value);
    updateQuantityAfterSave(productId, input);
  });
});

document.querySelectorAll('.js-deliver-option').forEach((element)=>{
element.addEventListener('click',()=>
{ const[productId,deliveryoptionId]=element.dataset;
  SaveDeliveryOption(productId,deliveryoptionId);
  renderOrderSummary();
})
})

//cart price

let total=0;
let ShippingPriceCents=0;
let deliveryOption
let deliveryOptionPrice
RenderPaymentSummary()
function RenderPaymentSummary(){
    cart.forEach((element)=>{
        let matchingProduct= getproduct(element.productId);
     
    total += element.quantity*matchingProduct.priceCents
        //delivery charges
        const deliveryoptionId=element.deliveryoptionId
        deliveryOptions.forEach((option) => {
            if (option.id===deliveryoptionId){
              deliveryOption=option;
            }
        })
        deliveryOptionPrice = deliveryOption.priceCents
    })
    ShippingPriceCents=total+deliveryOptionPrice;
    console.log(deliveryOptionPrice)
    let taxpayment=(ShippingPriceCents)*(0.1);
    console.log(taxpayment)
    let Amountpaid = ShippingPriceCents+taxpayment;
      let paymentSummaryHTML=`  <div class="payment-summary-title">
            Order Summary
            </div>

            <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(total)}</div>
            </div>

            <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(deliveryOptionPrice)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(ShippingPriceCents)}</div>
            </div>

            <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxpayment)}</div>
            </div>

            <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(Amountpaid)}</div>
            </div>

            <button class="place-order-button button-primary">
            Place your order
            </button>`;
        
            document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML
        }