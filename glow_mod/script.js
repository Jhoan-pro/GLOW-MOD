/* ===============================
PRODUCTOS
================================= */

const products = [

{
name:"Sudadera Glow",
price:49.99,
image:"https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80"
},

{
name:"Chaqueta Urban",
price:79.99,
image:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80"
},

{
name:"Camiseta Classic",
price:29.99,
image:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80"
},

{
name:"Pantalón Street",
price:59.99,
image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80"
}

];


/* ===============================
LOGIN CHECK
================================= */

if(localStorage.getItem("isLogged") !== "true"){
window.location.replace("login.html");
}


/* ===============================
RENDER PRODUCTOS
================================= */

function renderProducts(){

const grid = document.getElementById("productGrid");

grid.innerHTML="";

products.forEach((product,index)=>{

grid.innerHTML+=`

<div class="card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>$${product.price}</p>

<button class="add-btn" onclick="addToCart(${index})">

Agregar al carrito

</button>

</div>

`;

});

}


/* ===============================
CARRITO
================================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];


function toggleCart(){

document.getElementById("sideCart").classList.toggle("active");

document.getElementById("overlay").classList.toggle("active");

}


/* AGREGAR PRODUCTO */

function addToCart(index){

const product = products[index];

const existing = cart.find(item => item.name === product.name);

if(existing){

existing.qty++;

}else{

cart.push({...product, qty:1});

}

saveCart();

renderCart();

toggleCart();

}


/* MOSTRAR CARRITO */

function renderCart(){

const container = document.getElementById("cartItems");

const subtotalEl = document.getElementById("cartSubtotal");

const totalEl = document.getElementById("cartTotal");

container.innerHTML="";

let subtotal = 0;

cart.forEach((item,index)=>{

const itemTotal = item.price * item.qty;

subtotal += itemTotal;

container.innerHTML += `

<div class="cart-item">

<img src="${item.image}">

<div class="cart-info">

<h4>${item.name}</h4>

<p class="unit-price">

Precio unidad: $${item.price}

</p>

<p class="item-total">

Subtotal: $${itemTotal.toFixed(2)}

</p>

<div class="qty-control">

<button onclick="changeQty(${index},-1)">-</button>

<span>${item.qty}</span>

<button onclick="changeQty(${index},1)">+</button>

</div>

<div class="remove-btn" onclick="removeItem(${index})">

Eliminar

</div>

</div>

</div>

`;

});

subtotalEl.innerText="$"+subtotal.toFixed(2);

totalEl.innerText="$"+subtotal.toFixed(2);

}


/* CAMBIAR CANTIDAD */

function changeQty(index,amount){

cart[index].qty += amount;

if(cart[index].qty <= 0){

cart.splice(index,1);

}

saveCart();

renderCart();

}


/* ELIMINAR */

function removeItem(index){

cart.splice(index,1);

saveCart();

renderCart();

}


/* CANCELAR CARRITO */

function clearCart(){

if(confirm("¿Deseas cancelar el carrito?")){

cart=[];

saveCart();

renderCart();

}

}


/* GUARDAR */

function saveCart(){

localStorage.setItem("cart",JSON.stringify(cart));

}


/* LOGOUT */

function logout(){

localStorage.removeItem("isLogged");

localStorage.removeItem("cart");

window.location.replace("login.html");

}


/* INIT */

renderProducts();

renderCart();
function goToCheckout(){

  if(cart.length === 0){
    alert("Tu carrito está vacío");
    return;
  }

  window.location.href="caja-panel.html";

}