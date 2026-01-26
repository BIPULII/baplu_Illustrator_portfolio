/* ============================================
   CHILDREN'S ILLUSTRATOR PORTFOLIO
   JavaScript - Interactive Features
   ============================================ */

/**
 * DOM READY - Initialize all features when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeParallax();
    initializePortfolioFilters();
    initializeFormSubmission();
    initializeSmoothScroll();
    initializeButtonAnimations();
});

/* ============================================
   NAVIGATION - Hamburger Menu & Link Handling
   ============================================ */
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger Toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when link clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', function(event) {
        const isClickInsideNav = event.target.closest('.nav-container');
        if (!isClickInsideNav && hamburger?.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu?.classList.remove('active');
        }
    });
}

/* ============================================
   SMOOTH SCROLL - Smooth scrolling to sections
   ============================================ */
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    const ctaButtons = document.querySelectorAll('[data-section]');

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // CTA buttons
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const target = document.getElementById(sectionId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ============================================
   SCROLL ANIMATIONS - Reveal elements on scroll
   ============================================ */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe specific elements
    const elementsToObserve = [
        ...document.querySelectorAll('.portfolio-item'),
        ...document.querySelectorAll('.work-card'),
        ...document.querySelectorAll('.step'),
        ...document.querySelectorAll('.testimonial-card'),
        ...document.querySelectorAll('.stat-box'),
        ...document.querySelectorAll('.info-card')
    ];

    elementsToObserve.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });
}

/* ============================================
   PARALLAX - Mouse and scroll parallax effects
   ============================================ */
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    // Mouse move parallax
    document.addEventListener('mousemove', function(event) {
        const mouseX = (event.clientX / window.innerWidth) * 100;
        const mouseY = (event.clientY / window.innerHeight) * 100;

        parallaxElements.forEach(element => {
            const depth = parseFloat(element.getAttribute('data-parallax'));
            const moveX = (mouseX - 50) * depth * 0.1;
            const moveY = (mouseY - 50) * depth * 0.1;
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', function() {
        parallaxElements.forEach(element => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

/* ============================================
   PORTFOLIO FILTERS - Category filtering
   ============================================ */
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items with animation
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInScale 0.6s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

/* ============================================
   BUTTON ANIMATIONS - Hover and click effects
   ============================================ */
function initializeButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
        });

        button.addEventListener('click', function() {
            // Wiggle animation on click
            this.style.animation = 'wiggle 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });

    // Portfolio items with lightbox
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            openLightbox();
        });
    });
}

/* ============================================
   LIGHTBOX - Image preview modal
   ============================================ */
function openLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.add('active');

        const closeBtn = lightbox.querySelector('.lightbox-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

/* ESC key to close lightbox */
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});

/* ============================================
   FORM SUBMISSION - Contact form handling
   ============================================ */
function initializeFormSubmission() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Email validation
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // In a real application, you would send this data to a server
                console.log('Form Data:', { name, email, subject, message });

                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon. 🎉', 'success');

                // Reset form
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

/* ============================================
   UTILITIES - Helper functions
   ============================================ */

/**
 * Validate email format
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#98FF98' : '#FF9999'};
        color: ${type === 'success' ? '#2d5016' : '#8b0000'};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

/* ============================================
   MOBILE MENU - Advanced mobile navigation
   ============================================ */
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    // Create mobile menu styling if needed
    if (window.innerWidth < 768) {
        navMenu.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            gap: 0;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            box-shadow: 0 4px 15px rgba(200, 180, 220, 0.2);
        `;

        const originalDisplay = navMenu.style.display;

        hamburger.addEventListener('click', function() {
            if (navMenu.style.maxHeight === '0px' || !navMenu.style.maxHeight) {
                navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
            } else {
                navMenu.style.maxHeight = '0';
            }
        });
    }
}

/* ============================================
   WINDOW RESIZE HANDLER
   ============================================ */
window.addEventListener('resize', function() {
    // Handle responsive behavior on resize
    if (window.innerWidth >= 768) {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navMenu.style.maxHeight = '';
        }
    }
});

/* ============================================
   SCROLL INDICATOR ANIMATION
   ============================================ */
function handleScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (window.scrollY > 100) {
        scrollIndicator?.style.setProperty('opacity', '0');
        scrollIndicator?.style.setProperty('pointer-events', 'none');
    } else {
        scrollIndicator?.style.setProperty('opacity', '1');
        scrollIndicator?.style.setProperty('pointer-events', 'auto');
    }
}

window.addEventListener('scroll', handleScrollIndicator);

/* ============================================
   PERFORMANCE OPTIMIZATION - Lazy loading
   ============================================ */
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        // Observe all lazy-loadable images
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/* ============================================
   ACCESSIBILITY - Focus management
   ============================================ */
function initializeAccessibility() {
    // Keyboard navigation support
    const buttons = document.querySelectorAll('button, a[href], input, textarea, select');

    buttons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            // Enter or Space to activate buttons
            if (this.tagName === 'BUTTON' && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Focus visible for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-focus');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-focus');
    });
}

// Initialize accessibility features
initializeAccessibility();

/* ============================================
   PERFORMANCE TRACKING
   ============================================ */
function logPerformanceMetrics() {
    if (window.performance) {
        window.addEventListener('load', function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page Load Time:', pageLoadTime + 'ms');
        });
    }
}

logPerformanceMetrics();

/* ============================================
   INTERACTION TRACKING
   ============================================ */
function trackInteractions() {
    // Track filter button clicks
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Filter applied:', this.getAttribute('data-filter'));
        });
    });

    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.hero-cta .btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('CTA clicked:', this.textContent);
        });
    });

    // Track form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            console.log('Contact form submitted');
        });
    }
}

trackInteractions();

/* ============================================
   PARALLAX ENHANCEMENT - Advanced parallax
   ============================================ */
function initializeAdvancedParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', function() {
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
            const depth = parseFloat(element.getAttribute('data-parallax'));
            const offset = scrollProgress * depth * 20;

            element.style.transform = `translateY(${offset}px)`;
        });
    });
}

initializeAdvancedParallax();

/* ============================================
   EASTER EGG - Secret feature
   ============================================ */
function initializeEasterEgg() {
    let keySequence = [];
    const secretCode = ['c', 'r', 'e', 'a', 't', 'i', 'v', 'e'];

    document.addEventListener('keydown', function(e) {
        keySequence.push(e.key.toLowerCase());

        // Keep only last 8 keys
        if (keySequence.length > secretCode.length) {
            keySequence.shift();
        }

        // Check if secret code entered
        if (keySequence.join('') === secretCode.join('')) {
            triggerEasterEgg();
            keySequence = [];
        }
    });

    function triggerEasterEgg() {
        console.log('🎨 Easter Egg Activated! You found the creative magic! 🎨');
        
        // Add rainbow animation to title
        const title = document.querySelector('.hero-title');
        if (title) {
            title.style.animation = 'rainbow-text 2s ease infinite';
        }

        // Show fun message
        showNotification('🎨 You found the creative magic! Great eye for details! ✨', 'success');
    }
}

initializeEasterEgg();

/* ============================================
   CUSTOM ANIMATIONS - Additional animations
   ============================================ */
function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow-text {
            0% {
                background: linear-gradient(90deg, #FFB3D9, #87CEEB, #98FF98, #FFEB99, #E6D5E8);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                background-position: 0%;
            }
            50% {
                background-position: 100%;
            }
            100% {
                background: linear-gradient(90deg, #E6D5E8, #FFB3D9, #87CEEB, #98FF98, #FFEB99);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                background-position: 100%;
            }
        }

        .keyboard-focus *:focus {
            outline: 3px solid #FFB3D9;
            outline-offset: 2px;
        }

        @media (max-width: 768px) {
            .nav-menu.active {
                max-height: 500px !important;
            }

            .nav-menu.active .nav-link {
                padding: 10px 0;
                display: block;
            }
        }
    `;
    document.head.appendChild(style);
}

addCustomStyles();

/* ============================================
   INITIALIZATION COMPLETE
   ============================================ */
console.log('🎨 Children\'s Illustrator Portfolio initialized successfully!');
