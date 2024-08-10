const cart = [];

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        addToCart(name, price);
    });
});

function addToCart(name, price) {
    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if already in the cart
    } else {
        cart.push({ name, price, quantity: 1 }); // Add new item to the cart
    }
    updateCart(); // Update the cart display
}

function updateCart() {
    const cartItemsElement = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    cartItemsElement.innerHTML = ''; // Clear current cart items

    let total = 0;

    // Populate cart items and calculate the total
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${(item.price * item.quantity).toFixed(2)} (${item.quantity})
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsElement.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotalElement.textContent = total.toFixed(2); // Update total price
}

function removeFromCart(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity -= 1; // Decrease quantity if item exists
        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1); // Remove item if quantity is 0
        }
    }
    updateCart(); // Update the cart display
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    alert("Thank you for your purchase! Your order is being processed.");
    cart.length = 0; // Clear cart after checkout
    updateCart(); // Update the cart display
}
