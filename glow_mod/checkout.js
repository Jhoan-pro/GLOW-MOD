let cart = JSON.parse(localStorage.getItem("cart")) || [];


function renderCheckout(){

const container = document.getElementById("checkoutItems");

const totalEl = document.getElementById("checkoutTotal");

let total = 0;

container.innerHTML="";

cart.forEach(item=>{

const subtotal = item.price * item.qty;

total += subtotal;

container.innerHTML += `

<div class="caja-item">

<span>${item.name} x ${item.qty}</span>

<span>$${subtotal.toFixed(2)}</span>

</div>

`;

});

totalEl.innerText = "$"+total.toFixed(2);

}


function showPayment(){

document.getElementById("paymentModal").style.display="flex";

}


function closePayment(){

document.getElementById("paymentModal").style.display="none";

}


function pay(method){

alert("Pago realizado con "+method+" ✅");

localStorage.removeItem("cart");

window.location.href="index.html";

}


function cancelPurchase(){

if(confirm("¿Deseas cancelar la compra?")){

window.location.href="index.html";

}

}


renderCheckout();