document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: 'Red T-Shirt', price: '₹99', color: 'Red', gender: 'Unisex', type: 'Short Sleeve', quantity: 10, image: `https://source.unsplash.com/random/150x150/?tshirt&sig=${Math.random()}` },
        { id: 2, name: 'Blue T-Shirt', price: '₹249', color: 'Blue', gender: 'Male', type: 'Long Sleeve', quantity: 5, image: `https://source.unsplash.com/random/150x150/?tshirt&sig=${Math.random()}` },
        { id: 3, name: 'Green T-Shirt', price: '₹250', color: 'Green', gender: 'Female', type: 'Tank Top', quantity: 8, image: `https://source.unsplash.com/random/150x150/?tshirt&sig=${Math.random()}` },
        { id: 4, name: 'Yellow T-Shirt', price: '₹99', color: 'Yellow', gender: 'Unisex', type: 'Short Sleeve', quantity: 12, image: `https://source.unsplash.com/random/150x150/?tshirt&sig=${Math.random()}` },
        { id: 5, name: 'Black T-Shirt', price: '₹399', color: 'Black', gender: 'Male', type: 'Long Sleeve', quantity: 6, image: `https://source.unsplash.com/random/150x150/?tshirt&sig=${Math.random()}` },
        { id: 6, name: 'White T-Shirt', price: '₹249', color: 'White', gender: 'Female', type: 'Tank Top', quantity: 15, image: `https://source.unsplash.com/random/150x150/?tshirt&sig=${Math.random()}` },
        { id: 7, name: 'grey T-Shirt', price: '₹249', color: 'red', gender: 'Female', type: 'Tank Top', quantity: 7, image: `https://source.unsplash.com/random/150x150/?tshirt&sig=${Math.random()}` },

    ];

    let filteredProducts = [...products];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayProducts() {
        const productContainer = document.getElementById('product-list');
        productContainer.innerHTML = '';
        filteredProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productContainer.appendChild(productItem);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    function addToCart(event) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            if (cartItem.quantity < product.quantity) {
                cartItem.quantity++;
            } else {
                alert('Quantity exceeds available stock');
            }
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        document.getElementById('cart-count').textContent = cart.length;
    }

    document.getElementById('apply-filters').addEventListener('click', function() {
        const filters = {};
        document.querySelectorAll('.filter').forEach(filter => {
            if (filter.checked) {
                const filterType = filter.getAttribute('data-filter');
                if (!filters[filterType]) {
                    filters[filterType] = [];
                }
                filters[filterType].push(filter.value);
            }
        });

        filteredProducts = products.filter(product => {
            for (const filterType in filters) {
                if (!filters[filterType].includes(product[filterType])) {
                    return false;
                }
            }
            return true;
        });

        displayProducts();
    });

    document.getElementById('search-bar').addEventListener('input', function(event) {
        const searchQuery = event.target.value.toLowerCase();
        filteredProducts = products.filter(product => {
            return product.name.toLowerCase().includes(searchQuery) ||
                   product.color.toLowerCase().includes(searchQuery) ||
                   product.type.toLowerCase().includes(searchQuery);
        });
        displayProducts();
    });

    displayProducts();
    updateCartCount();
});
