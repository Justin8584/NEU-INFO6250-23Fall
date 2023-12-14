import products from "./products";
import { getCart, addToCart, updateCart, getTotalItems, getTotalPrice, clearCart } from "./cart";

const app = document.getElementById('app');

function renderProducts() {
    const showViewCartButton = true;
    let productsHTML = '<h1 class="products__list">Available Products</h1>';

    productsHTML += products.map(product => `
        <ul class="product">
            <img class="product-img" src="${product.imageUrl}" alt="${product.name}">
            <li class="product-name">${product.name}</li>
            <li class="product-price">$${product.price.toFixed(2)}</li>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </ul>
    `).join('');

    if (showViewCartButton) {
        const totalItems = getTotalItems();
        const btnText = totalItems > 0 ? `View Cart (${totalItems})` : 'View Cart';
        productsHTML += `<button class="view-cart" id="view-cart">${btnText}</button>`;
    }

    const productsContainer = document.getElementById('products');
    if (!productsContainer) {
        app.innerHTML += `<div class="products" id="products">${productsHTML}</div>`;
    } else {
        productsContainer.innerHTML = productsHTML;
    }
}

function renderCart() {
    const cartItems = getCart();
    let cartHTML = '<h1 class="cart__title">Your Cart</h1>';

    if (cartItems.length === 0) {
        cartHTML += '<p class="cart__msg">Nothing in the cart</p>';
    } else {
        cartHTML += cartItems.map(cartItem => {
            const product = products.find(p => p.id === cartItem.id);
            return (`<ul class="cart__item">
                        <li class="cart__item-name">${product.name}</li>
                        <img class="cart-img" src="${product.imageUrl}" alt="${product.name}">
                        <li class="cart__item-addMore">
                            <label class="cart__item-label">Quantity:</label> 
                            <input type="number" class="cart__item-quantity-input" data-id="${product.id}" value="${cartItem.quantity}" />
                        </li>
                        <li class="cart__item-total">Total: $${(cartItem.quantity * product.price).toFixed(2)}</li>
                </ul>`);
        }).join('');

        const overallTotalPrice = getTotalPrice();
        cartHTML += `<p class="cart-overall-total">Overall Total: $${overallTotalPrice.toFixed(2)}</p>`;

        cartHTML += '<button class="checkout" id="checkout">Checkout</button>';
    }

    cartHTML += '<button class="hide-cart" id="hide-cart">Hide Cart</button>';

    const cartContainer = document.getElementById('cart');
    if (!cartContainer) {
        app.innerHTML += `<div class="cart" id="cart">${cartHTML}</div>`;
    } else {
        cartContainer.innerHTML = cartHTML;
    }

    const viewCartButton = document.getElementById('view-cart');
    if (viewCartButton) {
        viewCartButton.style.display = 'none';
    }
};

app.addEventListener('input', (e) => {
    if (e.target.classList.contains('cart__item-quantity-input')) {
        const productID = parseInt(e.target.dataset.id, 10);
        let newQuantity = parseInt(e.target.value, 10);

        if (isNaN(newQuantity) || newQuantity < 0) {
            newQuantity = 0;
        }
        updateCart(productID, newQuantity);
        renderCart();
    }
});

app.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('add-to-cart')) {
        const productID = parseInt(e.target.dataset.id, 10);
        addToCart(productID);

        const cartContainer = document.getElementById('cart');
        if (cartContainer) {
            cartContainer.style.display = 'block';
        }
        renderCart();
    }

    if (e.target.id === 'view-cart') {
        const cartContainer = document.getElementById('cart');
        if (cartContainer) {
            cartContainer.style.display = 'block';
        }
        renderCart();
    }

    if (e.target.id === 'checkout') {
        clearCart();
        const cartContainer = document.getElementById('cart');
        if (cartContainer) {
            cartContainer.innerHTML = '';
            cartContainer.style.display = 'none';
        }
        renderProducts();
    }

    if (e.target.id === 'hide-cart') {
        const cartContainer = document.getElementById('cart');
        if (cartContainer) {
            cartContainer.innerHTML = '';
            cartContainer.style.display = 'none';
        }
        renderProducts();
    }
});

renderProducts();

