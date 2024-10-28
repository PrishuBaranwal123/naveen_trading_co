// Fetch cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display the cart
function displayCart() {
    const cartTable = document.getElementById('cart-items');
    cartTable.innerHTML = '';

    cartItems.forEach(item => {
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>
                    <button class="btn btn-danger" onclick="removeFromCart('${item.name}')">Remove</button>
                </td>
            </tr>
        `;
        cartTable.innerHTML += row;
    });

    // Update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    const itemIndex = cartItems.findIndex(item => item.name === productName);

    if (itemIndex > -1) {
        if (cartItems[itemIndex].quantity > 1) {
            // Reduce quantity by 1
            cartItems[itemIndex].quantity -= 1;
            showNotification(`One ${productName} removed from cart. Remaining: ${cartItems[itemIndex].quantity}`);
        } else {
            // Remove the item completely if quantity is 1
            cartItems.splice(itemIndex, 1);
            showNotification(`${productName} has been removed from your cart!`);
        }
        displayCart();
    }
}

function continueShopping() {
    showNotification("Take a look at more products!");

    // Redirect to homepage after 2 seconds
    setTimeout(() => {
        window.location.href = "index.html"; // Adjust the URL if your homepage is in a different location
    }, 2000); // Delay of 2 seconds before redirect
}

// Custom Notification Function
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.classList.remove('hidden');
    notification.classList.add('show');

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 300); // Wait for transition to complete
    }, 3000); // Notification duration
}

// Display initial cart items
displayCart();
