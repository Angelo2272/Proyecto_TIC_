
const products = [
    { id: 1, name: 'Manzanas', category: 'frutas', price: 1.50, emoji: '🍎' },
    { id: 2, name: 'Plátanos', category: 'frutas', price: 0.80, emoji: '🍌' },
    { id: 3, name: 'Naranjas', category: 'frutas', price: 1.20, emoji: '🍊' },
    { id: 4, name: 'Lechuga', category: 'verduras', price: 0.90, emoji: '🥬' },
    { id: 5, name: 'Tomates', category: 'verduras', price: 1.10, emoji: '🍅' },
    { id: 6, name: 'Zanahorias', category: 'verduras', price: 0.70, emoji: '🥕' },
    { id: 7, name: 'Leche', category: 'lacteos', price: 1.30, emoji: '🥛' },
    { id: 8, name: 'Queso', category: 'lacteos', price: 2.50, emoji: '🧀' },
    { id: 9, name: 'Yogur', category: 'lacteos', price: 0.90, emoji: '🍶' },
    { id: 10, name: 'Pollo', category: 'carnes', price: 3.50, emoji: '🍗' },
    { id: 11, name: 'Carne de Res', category: 'carnes', price: 5.00, emoji: '🥩' },
    { id: 12, name: 'Cerdo', category: 'carnes', price: 4.00, emoji: '🐷' }
];


let cart = [];
let currentCategory = 'all';


const productContainer = document.getElementById('product-container');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const viewCartBtn = document.getElementById('view-cart');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close');
const cartItems = document.getElementById('cart-items');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout');


function loadProducts() {
    productContainer.innerHTML = '';
    
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(product => product.category === currentCategory);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">${product.emoji || '🛒'}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>Categoría: ${product.category}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
            </div>
        `;
        
        productContainer.appendChild(productCard);
    });
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}


function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
}


function updateCart() {
   
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
    
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">El carrito está vacío</p>';
        return;
    }
    
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">🗑️</button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
  
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}


function removeFromCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showCartItems();
}


function clearCart() {
    cart = [];
    updateCart();
    showCartItems();
}


function checkout() {
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    alert(`Gracias por tu compra! Total: $${cartTotal.textContent}`);
    clearCart();
    cartModal.style.display = 'none';
}


categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.getAttribute('data-category');
        loadProducts();
    });
});

viewCartBtn.addEventListener('click', () => {
    showCartItems();
    cartModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

clearCartBtn.addEventListener('click', clearCart);
checkoutBtn.addEventListener('click', checkout);


window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});


function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}


loadCartFromStorage();
loadProducts();