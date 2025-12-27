
function showAlert(message, type = 'info') {
    alert(message);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function formatPrice(price) {
    return '$' + price.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function() { 
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
        
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    updateCartCount();
});

function getCart() {
    const cart = sessionStorage.getItem('bookHavenCart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    sessionStorage.setItem('bookHavenCart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const countElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    countElements.forEach(el => {
        el.textContent = totalItems;
    });
}

function addToCart(item) {
    const cart = getCart();
    
    const existingIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingIndex !== -1) {
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    saveCart(cart);
    showAlert(`"${item.title}" has been added to your cart!`);
}

function removeFromCart(itemId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== itemId);
    saveCart(cart);
    renderCartItems();
}

function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        sessionStorage.removeItem('bookHavenCart');
        updateCartCount();
        renderCartItems();
        showAlert('Your cart has been cleared.');
    }
}

function processOrder() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showAlert('Your cart is empty. Add some books first!');
        return;
    }
    
    const orderProcessed = sessionStorage.getItem('orderProcessed');
    if (orderProcessed) {
        showAlert('Your order has already been processed!');
        return;
    }
    
    const total = cart.reduce((sum, item) => {
        return sum + (item.price * (item.quantity || 1));
    }, 0);
    
    sessionStorage.setItem('orderProcessed', 'true');
    
    showAlert(`Order processed successfully!\nTotal: ${formatPrice(total)}\nThank you for shopping at Book Haven!`);
    
    sessionStorage.removeItem('bookHavenCart');
    updateCartCount();
    renderCartItems();
    closeCartModal();
}

function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total-price');
    
    if (!cartItemsContainer) return;
    
    const cart = getCart();
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <p>Your cart is empty</p>
                <p>Browse our collection and add some books!</p>
            </div>
        `;
        if (cartTotalElement) cartTotalElement.textContent = '$0.00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * (item.quantity || 1);
        total += itemTotal;
        
        html += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image || 'images/placeholder-book.jpg'}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-author">${item.author}</p>
                    <p class="cart-item-price">${formatPrice(item.price)} × ${item.quantity || 1}</p>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" aria-label="Remove ${item.title} from cart">
                    ✕ Remove
                </button>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = html;
    if (cartTotalElement) cartTotalElement.textContent = formatPrice(total);
}

function openCartModal() {
    const modal = document.querySelector('.cart-modal');
    if (modal) {
        modal.classList.add('active');
        renderCartItems();
        document.body.style.overflow = 'hidden';
    }
}

function closeCartModal() {
    const modal = document.querySelector('.cart-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('click', function(e) {
    const modal = document.querySelector('.cart-modal');
    if (e.target === modal) {
        closeCartModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCartModal();
    }
});

function handleSubscribe(e) {
    e.preventDefault();
    
    const form = e.target;
    const emailInput = form.querySelector('input[type="email"]');
    const messageEl = form.querySelector('.subscribe-message') || createMessageElement(form);
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showFormMessage(messageEl, 'Please enter your email address.', 'error');
        emailInput.focus();
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormMessage(messageEl, 'Please enter a valid email address.', 'error');
        emailInput.focus();
        return;
    }
    
    showFormMessage(messageEl, 'Thank you for subscribing! Check your inbox for updates.', 'success');
    emailInput.value = '';
}

function createMessageElement(form) {
    const div = document.createElement('div');
    div.className = 'subscribe-message';
    form.appendChild(div);
    return div;
}

function showFormMessage(element, message, type) {
    element.textContent = message;
    element.className = `subscribe-message ${type}`;
    element.style.display = 'block';
    
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', handleSubscribe);
    }
});

function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const messageEl = document.querySelector('.form-message');
    
    const data = {
        name: formData.get('name')?.trim(),
        email: formData.get('email')?.trim(),
        subject: formData.get('subject')?.trim(),
        message: formData.get('message')?.trim(),
        timestamp: new Date().toISOString()
    };
    
    let isValid = true;
    const errors = [];
    
    form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
    
    if (!data.name || data.name.length < 2) {
        errors.push('Please enter your name (at least 2 characters).');
        form.querySelector('[name="name"]')?.classList.add('invalid');
        isValid = false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address.');
        form.querySelector('[name="email"]')?.classList.add('invalid');
        isValid = false;
    }
    
    if (!data.subject) {
        errors.push('Please select a subject.');
        form.querySelector('[name="subject"]')?.classList.add('invalid');
        isValid = false;
    }
    
    if (!data.message || data.message.length < 10) {
        errors.push('Please enter a message (at least 10 characters).');
        form.querySelector('[name="message"]')?.classList.add('invalid');
        isValid = false;
    }
    
    if (!isValid) {
        if (messageEl) {
            messageEl.textContent = errors.join(' ');
            messageEl.className = 'form-message error';
        }
        return;
    }
    
    const submissions = JSON.parse(localStorage.getItem('bookHavenContacts') || '[]');
    submissions.push(data);
    localStorage.setItem('bookHavenContacts', JSON.stringify(submissions));
    
    if (messageEl) {
        messageEl.textContent = 'Thank you for your message! We\'ll get back to you soon.';
        messageEl.className = 'form-message success';
    }
    
    form.reset();
    
    console.log('Contact form submitted:', data);
    console.log('All submissions:', submissions);
}

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    items.forEach(item => {
        const itemCategory = item.dataset.category;
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = '';
            item.style.animation = 'fadeIn 0.3s ease';
        } else {
            item.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterGallery(this.dataset.category);
        });
    });
});

function calculateDiscount() {
    const originalPriceInput = document.querySelector('#original-price');
    const quantityInput = document.querySelector('#quantity');
    const membershipSelect = document.querySelector('#membership');
    const resultContainer = document.querySelector('.calculator-result');
    
    if (!originalPriceInput || !resultContainer) return;
    
    const originalPrice = parseFloat(originalPriceInput.value) || 0;
    const quantity = parseInt(quantityInput?.value) || 1;
    
    let discountPercent = 0;
    if (membershipSelect) {
        discountPercent = parseInt(membershipSelect.value) || 0;
    }
    
    let bulkDiscount = 0;
    if (quantity >= 10) {
        bulkDiscount = 10;
    } else if (quantity >= 5) {
        bulkDiscount = 5;
    }
    
    const totalDiscount = discountPercent + bulkDiscount;
    const subtotal = originalPrice * quantity;
    const savings = subtotal * (totalDiscount / 100);
    const finalPrice = subtotal - savings;
    
    const priceEl = resultContainer.querySelector('.result-price');
    const savingsEl = resultContainer.querySelector('.result-savings');
    
    if (priceEl) priceEl.textContent = formatPrice(finalPrice);
    if (savingsEl) {
        savingsEl.textContent = totalDiscount > 0 
            ? `You save ${formatPrice(savings)} (${totalDiscount}% off!)` 
            : 'Add more items or upgrade membership for discounts!';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const calculatorForm = document.querySelector('.calculator-form');
    if (calculatorForm) {
        calculatorForm.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', calculateDiscount);
            input.addEventListener('change', calculateDiscount);
        });
        
        calculateDiscount();
    }
});


document.addEventListener('DOMContentLoaded', function() {
    
    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.book-card, .gallery-item');
            
            if (card) {
                const item = {
                    id: card.dataset.id || 'book-' + Date.now(),
                    title: card.querySelector('.book-title, .gallery-item-title')?.textContent || 'Unknown Book',
                    author: card.querySelector('.book-author, .gallery-item-author')?.textContent || 'Unknown Author',
                    price: parseFloat(card.querySelector('.book-price, .gallery-item-price')?.textContent?.replace('$', '')) || 0,
                    image: card.querySelector('img')?.src || ''
                };
                
                addToCart(item);
            }
        });
    });
    
    document.querySelectorAll('.cart-btn, [data-action="view-cart"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openCartModal();
        });
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.5s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.book-card, .gallery-item, .value-card, .team-card, .tier-card, .offer-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

document.addEventListener('keydown', function(e) {
    
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.btn, .filter-btn, .cart-btn')) {
        e.preventDefault();
        e.target.click();
    }
});

function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const cartModal = document.querySelector('.cart-modal');
    if (cartModal) {
        trapFocus(cartModal);
    }
});
