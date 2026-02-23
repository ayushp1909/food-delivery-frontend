const menuItems = [
    // Pizzas
    { id: 1, name: "Margherita Pizza", category: "Pizza", price: 250, rating: 4.8, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80" },
    { id: 2, name: "Pepperoni Feast Pizza", category: "Pizza", price: 450, rating: 4.8, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80" },
    { id: 3, name: "BBQ Chicken Pizza", category: "Pizza", price: 500, rating: 4.7, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80" },
    { id: 13, name: "Veggie Supreme Pizza", category: "Pizza", price: 350, rating: 4.6, image: "https://images.unsplash.com/photo-1576458088443-04a19bb13da6?w=600&q=80" },
    { id: 14, name: "Paneer Tikka Pizza", category: "Pizza", price: 399, rating: 4.9, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80" },

    // Burgers
    { id: 4, name: "Classic Aloo Tikki Burger", category: "Burgers", price: 80, rating: 4.5, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80" },
    { id: 5, name: "Cheese Burger", category: "Burgers", price: 150, rating: 4.7, image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80" },
    { id: 6, name: "Double Chicken Burger", category: "Burgers", price: 250, rating: 4.9, image: "https://images.unsplash.com/photo-1594212586048-fbceffbeaf69?w=600&q=80" },
    { id: 15, name: "Paneer Maharaja Burger", category: "Burgers", price: 199, rating: 4.8, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80" },
    { id: 16, name: "Spicy Veggie Burger", category: "Burgers", price: 120, rating: 4.6, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&q=80" },

    // Indian
    { id: 7, name: "Chicken Biryani", category: "Indian", price: 280, rating: 4.9, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80" },
    { id: 8, name: "Tandoori Naan & Butter Chicken", category: "Indian", price: 350, rating: 4.8, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80" },
    { id: 9, name: "Paneer Butter Masala", category: "Indian", price: 260, rating: 4.8, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&q=80" },
    { id: 17, name: "Masala Dosa", category: "Indian", price: 120, rating: 4.7, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&q=80" },
    { id: 18, name: "Chole Bhature", category: "Indian", price: 150, rating: 4.9, image: "https://images.unsplash.com/photo-1626779475143-a6042afbd7cc?w=600&q=80" },

    // Desserts
    { id: 10, name: "Gulab Jamun (2 pcs)", category: "Desserts", price: 60, rating: 4.8, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80" },
    { id: 11, name: "Rasmalai", category: "Desserts", price: 120, rating: 4.9, image: "https://images.unsplash.com/photo-1624300629298-e9ad39c5952f?w=600&q=80" },
    { id: 12, name: "Chocolate Lava Cake", category: "Desserts", price: 149, rating: 4.7, image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80" },
    { id: 19, name: "Strawberry Cheesecake", category: "Desserts", price: 220, rating: 4.7, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80" },
    { id: 20, name: "Tiramisu", category: "Desserts", price: 250, rating: 4.9, image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80" }
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
                    <span class="price">₹${item.price}</span>
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
        subtotalEl.textContent = '₹0.00';
        deliveryEl.textContent = '₹0.00';
        totalEl.textContent = '₹0.00';
        return;
    }

    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p class="price">₹${item.price}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
        </div>
    `).join('');

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const delivery = 50; // Flat ₹50 delivery charge
    const total = subtotal + delivery;

    subtotalEl.textContent = `₹${subtotal}`;
    deliveryEl.textContent = `₹${delivery}`;
    totalEl.textContent = `₹${total}`;
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
    alert('Thank you for your order!');
    cart = [];
    renderCart();

    const homeBtn = document.querySelector('.nav-btn');
    if (homeBtn) homeBtn.click();
}

document.addEventListener('DOMContentLoaded', () => {

    renderMenu(menuItems);
    renderCart();

    const menuTitle = document.getElementById('menu-title');
    const showAllBtn = document.getElementById('show-all-btn');
    const categoryCards = document.querySelectorAll('.category-card');

    // Category Filtering Logic
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');


            const filteredItems = menuItems.filter(item => item.category === category);
            renderMenu(filteredItems);


            if (menuTitle) menuTitle.textContent = `${category} Menu`;
            if (showAllBtn) showAllBtn.style.display = 'inline-block';


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


    cartNavLink.addEventListener('click', (e) => {
        e.preventDefault();
        homeView.style.display = 'none';
        cartView.style.display = 'block';
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (homeView.style.display === 'none') {
                cartView.style.display = 'none';
                homeView.style.display = 'block';
            }
        });
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;


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
