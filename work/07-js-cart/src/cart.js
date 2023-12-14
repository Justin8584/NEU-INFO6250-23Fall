import products from './products';

let cart = [];

function getCart() {
    return cart;
};

function addToCart(productID) {
    const prodInCart = cart.find(p => p.id === productID);
    if (prodInCart) {
        prodInCart.quantity += 1;
    } else {
        cart.push({ id: productID, quantity: 1 });
    }
};

function updateCart(productID, quantity) {
    const prodInCart = cart.find(p => p.id === productID);
    if (prodInCart) {
        prodInCart.quantity = quantity;
        if (quantity === 0) {
            const index = cart.indexOf(prodInCart);
            cart.splice(index, 1);
        }
    }
};

function getTotalItems() {
    return cart.reduce((total, item) => total + item.quantity, 0);
};

function getTotalPrice() {
    return cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.id);
        return total + (item.quantity * product.price);
    }, 0);
}

function clearCart() {
    cart = [];
};

export { getCart, addToCart, updateCart, getTotalItems, getTotalPrice, clearCart };