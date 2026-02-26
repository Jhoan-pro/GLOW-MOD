let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleCart() {
    document.getElementById("sideCart").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

function addToCart(name, price, image) {

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, image, qty: 1 });
    }

    saveCart();
    renderCart();
    toggleCart();
}

function renderCart() {

    const container = document.getElementById("cartItems");
    const totalEl = document.getElementById("cartTotal");

    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}">
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price}</p>

                    <div class="qty-control">
                        <button onclick="changeQty(${index}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button onclick="changeQty(${index}, 1)">+</button>
                    </div>

                    <div class="remove-btn" onclick="removeItem(${index})">
                        Eliminar
                    </div>
                </div>
            </div>
        `;
    });

    totalEl.innerText = "Total: $" + total.toFixed(2);
}

function changeQty(index, amount) {
    cart[index].qty += amount;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

renderCart();