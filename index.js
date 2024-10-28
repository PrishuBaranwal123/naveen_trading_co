// Initialize cart count
let cartCount = JSON.parse(localStorage.getItem('cart'))?.length || 0;
document.getElementById('cart-count').innerText = cartCount;

// Add to Cart Function
function addToCart(productName) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.name === productName);

    if (itemIndex > -1) {
        // If item is already in the cart, increase its quantity
        cart[itemIndex].quantity += 1;
    } else {
        // If item is not in the cart, add it as a new entry
        cart.push({ name: productName, quantity: 1 });
    }

    // Update local storage with the updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count based on the number of unique items in the cart
    cartCount = cart.length;
    document.getElementById('cart-count').innerText = cartCount;
    
    // Show custom notification
    showAddToCartNotification(`${productName} added to cart!`);
}

// Custom Notification Function for Add to Cart
function showAddToCartNotification(message) {
    const notification = document.getElementById('add-to-cart-notification');
    notification.innerHTML = `<span class="notification-icon">✅</span> ${message}`;
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

// Toggle Like Function
function toggleLike(button) {
    const likeCountElement = button.querySelector('.like-count');
    let likeCount = parseInt(likeCountElement.innerText);

    if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        likeCount--;
    } else {
        button.classList.add('liked');
        likeCount++;
    }

    likeCountElement.innerText = likeCount;
}

// Show Diwali Wish Popup
function showWish() {
    document.getElementById('popup-overlay').style.display = 'flex';
}

// Close Diwali Wish Popup
function closeWish() {
    document.getElementById('popup-overlay').style.display = 'none';
}
