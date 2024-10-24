// Function to add a product to localStorage  
function addToCart(productName, productPrice) {  
    console.log("Add to Cart function called");  
    console.log("Product Name:", productName);  
    console.log("Product Price:", productPrice);  

    // Create a cart object (if not already existing)  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];  

    // Check if product already exists in cart  
    const existingProductIndex = cart.findIndex(item => item.name === productName);  
    if (existingProductIndex >= 0) {  
        cart[existingProductIndex].quantity += 1; // Increment quantity if it exists  
    } else {  
        cart.push({  
            name: productName,  
            price: parseFloat(productPrice),  // Convert price to float  
            quantity: 1  
        });  
    }  

    // Store updated cart in localStorage  
    localStorage.setItem('cart', JSON.stringify(cart));  
    alert(productName + " has been added to your cart!");  
}  

// Load cart items and display them on the cart page  
function loadCart() {  
    const cartItemsContainer = document.getElementById('cart-items');  
    const cartTotalContainer = document.getElementById('cart-total');  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];  

    if (cart.length === 0) {  
        cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";  
    } else {  
        cartItemsContainer.innerHTML = '';  // Clear previous items  
        let total = 0;  
        cart.forEach((item, index) => {  
            const itemHTML = `<div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">  
                <div>
                    <p>${item.name} - €${item.price} (Quantity: ${item.quantity})</p>  
                </div>
                <div class="cart-item-buttons" style="display: flex; gap: 10px;">
                    <button onclick="decreaseQuantity(${index})">-</button>  
                    <button onclick="increaseQuantity(${index})">+</button>  
                    <button onclick="removeFromCart(${index})">Remove</button>  
                </div>
            </div>`;  
            cartItemsContainer.innerHTML += itemHTML;  
            total += parseFloat(item.price) * item.quantity; // Calculate total  
        });  

        cartTotalContainer.innerHTML = `<p>Total: €${total.toFixed(2)}</p>`;  
    }  
}  

// Function to remove 1 quantity of an item from the cart  
function removeFromCart(index) {  
    let cart = JSON.parse(localStorage.getItem('cart'));  
    if (cart && cart.length > 0) {
        cart.splice(index, 1);  // Remove the item
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage  
        loadCart(); // Refresh the cart display  
    }
}  

// Function to decrease the quantity of an item in the cart  
function decreaseQuantity(index) {  
    let cart = JSON.parse(localStorage.getItem('cart'));  
    if (cart && cart.length > 0) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;  // Decrement quantity by 1
        } else {
            cart.splice(index, 1);  // Remove the item if quantity is 1
        }
        localStorage.setItem('cart', JSON.stringify(cart));  // Update localStorage
        loadCart();  // Refresh the cart display
    }
}  

// Function to increase the quantity of an item in the cart  
function increaseQuantity(index) {  
    let cart = JSON.parse(localStorage.getItem('cart'));  
    if (cart && cart.length > 0) {
        cart[index].quantity += 1;  // Increment quantity by 1
        localStorage.setItem('cart', JSON.stringify(cart));  // Update localStorage
        loadCart();  // Refresh the cart display
    }
}  

// Function to clear the entire cart  
function clearCart() {  
    localStorage.removeItem('cart');  
    loadCart(); // Refresh the cart display  
}  

// Setup event listeners for Buy buttons  
function setupEventListeners() {  
    // Get all buy buttons  
    const buyButtons = document.querySelectorAll('.buy-button');  
    
    // Add click event listener to each buy button  
    buyButtons.forEach(button => {  
        button.addEventListener('click', function() {  
            // Find the closest product element  
            const productElement = this.closest('.product');  
            
            // Get product details  
            const productName = productElement.querySelector('.product-description').innerText;  
            const productPrice = productElement.querySelector('.product-price').innerText.replace('€', '');  

            // Add product to cart  
            addToCart(productName, productPrice);  
        });  
    });  
}  

// Setup event listeners when the DOM is fully loaded  
document.addEventListener('DOMContentLoaded', () => {  
    setupEventListeners();  
    loadCart(); // Load cart items if on the cart page  
});
