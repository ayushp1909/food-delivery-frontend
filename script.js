const menuItems = [
    { id: 1, name: "Margherita Pizza", category: "Pizza", price: 14.99, rating: 4.8, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80" },
    { id: 2, name: "Pepperoni Feast", category: "Pizza", price: 17.99, rating: 4.8, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80" },
    { id: 3, name: "BBQ Chicken Pizza", category: "Pizza", price: 18.99, rating: 4.7, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80" },
    { id: 4, name: "Classic Cheeseburger", category: "Burgers", price: 9.99, rating: 4.7, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80" },
    { id: 5, name: "Double Bacon Burger", category: "Burgers", price: 12.99, rating: 4.9, image: "https://images.unsplash.com/photo-1594212586048-fbceffbeaf69?w=600&q=80" },
    { id: 6, name: "Spicy Veggie Burger", category: "Burgers", price: 10.99, rating: 4.6, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&q=80" },
    { id: 7, name: "Chicken Tikka Masala", category: "Indian", price: 16.99, rating: 4.9, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80" },
    { id: 8, name: "Tandoori Naan & Curry", category: "Indian", price: 12.99, rating: 4.5, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80" },
    { id: 9, name: "Paneer Butter Masala", category: "Indian", price: 14.99, rating: 4.8, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&q=80" },
    { id: 10, name: "Chocolate Lava Cake", category: "Desserts", price: 7.99, rating: 4.6, image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80" },
    { id: 11, name: "Strawberry Cheesecake", category: "Desserts", price: 8.99, rating: 4.7, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80" },
    { id: 12, name: "Tiramisu", category: "Desserts", price: 9.99, rating: 4.9, image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80" }
];

const menuGrid = document.querySelector('.menu-grid');

function renderMenu(items) {
    if (!menuGrid) return;
    menuGrid.innerHTML = items.map(item => `
        <div class="food-card">
            <div class="card-img">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h3>${item.name}</h3>
                    <span class="rating"><i class="fas fa-star"></i> ${item.rating}</span>
                </div>
                <p class="category-tag">${item.category}</p>
                <div class="card-footer">
                    <span class="price">$${item.price.toFixed(2)}</span>
                    <button class="btn btn-add" onclick="addToCart(${item.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

let cart = [];

function renderCart() {
    const cartContainer = document.getElementById('cart-items-container');
    const badge = document.getElementById('cart-badge');
    const subtotalEl = document.getElementById('cart-subtotal');
    const deliveryEl = document.getElementById('cart-delivery');
    const totalEl = document.getElementById('cart-total');

    if (!cartContainer) return;

    badge.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="text-align:center; padding: 2rem;">Your cart is empty.</p>';
        subtotalEl.textContent = '$0.00';
        deliveryEl.textContent = '$0.00';
        totalEl.textContent = '$0.00';
        return;
    }

    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p class="price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
        </div>
    `).join('');

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const delivery = 5.00;
    const total = subtotal + delivery;

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    deliveryEl.textContent = `$${delivery.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
}

function changeQuantity(index, amount) {
    if (cart[index]) {
        cart[index].quantity += amount;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        renderCart();
    }
}

function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    if (item) {
        const existing = cart.find(i => i.id === id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        renderCart();

        // Show subtle feedback instead of alert
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Added!';
        btn.style.backgroundColor = 'var(--raw-sienna)';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
        }, 1000);
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your order! This is a demo.');
    cart = [];
    renderCart();
    // Go back to home view
    const homeBtn = document.querySelector('.nav-btn');
    if (homeBtn) homeBtn.click();
}

document.addEventListener('DOMContentLoaded', () => {
    // Render the initial menu
    renderMenu(menuItems);
    renderCart();

    const menuTitle = document.getElementById('menu-title');
    const showAllBtn = document.getElementById('show-all-btn');
    const categoryCards = document.querySelectorAll('.category-card');

    // Category Filtering Logic
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');

            // Filter items
            const filteredItems = menuItems.filter(item => item.category === category);
            renderMenu(filteredItems);

            // Update UI
            if (menuTitle) menuTitle.textContent = `${category} Menu`;
            if (showAllBtn) showAllBtn.style.display = 'inline-block';

            // Scroll to menu section
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                const headerHeight = document.querySelector('.header').offsetHeight || 80;
                const elementPosition = menuSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });

    // Show All Button Logic
    if (showAllBtn) {
        showAllBtn.addEventListener('click', () => {
            renderMenu(menuItems);
            if (menuTitle) menuTitle.textContent = 'Popular Items';
            showAllBtn.style.display = 'none';
        });
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // View Switching Logic
    const homeView = document.getElementById('home-view');
    const cartView = document.getElementById('cart-view');
    const cartNavLink = document.getElementById('cart-nav-link');
    const navBtns = document.querySelectorAll('.nav-btn');

    // Show cart view
    cartNavLink.addEventListener('click', (e) => {
        e.preventDefault();
        homeView.style.display = 'none';
        cartView.style.display = 'block';
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Show home view
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (homeView.style.display === 'none') {
                cartView.style.display = 'none';
                homeView.style.display = 'block';
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            // If it's a home-view targeted link but we are in cart view, 
            // the view switcher above handles the display toggle, 
            // we just need to wait a moment to scroll
            setTimeout(() => {
                const targetElement = document.querySelector(targetId);
                if (targetElement && document.getElementById('home-view').style.display !== 'none') {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }, 50);
        });
    });
});
