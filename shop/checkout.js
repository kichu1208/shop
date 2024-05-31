document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function removeFromCart(event) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        const cartItemIndex = cart.findIndex(item => item.id === productId);
        cart.splice(cartItemIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

 

function increaseQuantity(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const cartItem = cart.find(item => item.id === productId);

    // Assuming there's a limit on available stock
    const maxQuantity = 5; // for example
    if (cartItem.quantity < maxQuantity) {
        cartItem.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    } else {
        alert('Quantity exceeds available stock');
    }
}

   



    function decreaseQuantity(event) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem.quantity > 1) {
            cartItem.quantity--;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        } else {
            removeFromCart(event);
        }
    }

    function displayCart() {
        const cartContainer = document.getElementById('cart-items');
        cartContainer.innerHTML = '';
        cart.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price}</div>
                    <div class="quantity-controls">
                        <button class="decrease-quantity" data-id="${product.id}">-</button>
                        <span>${product.quantity}</span>
                        <button class="increase-quantity" data-id="${product.id}">+</button>
                    </div>
                </div>
                <button class="remove-from-cart" data-id="${product.id}">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
        });

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });

        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });

        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });

        const total = cart.reduce((acc, product) => acc + product.quantity * parseFloat(product.price.replace('₹', '')), 0);
        document.getElementById('total').textContent = `Total: ₹${total.toFixed(2)}`;
    }

    displayCart();

    document.getElementById('checkout').addEventListener('click', function() {
        alert('Checkout functionality is not implemented in this demo.');
    });
});
