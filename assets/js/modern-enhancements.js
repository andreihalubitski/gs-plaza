/**
 * GS-Plaza Business Center - Modern Enhancements
 * Version: 2.0
 * Last change: 15.01.2026
 * Author: Qwen AI Assistant
 * 
 * This file contains modern JavaScript enhancements for the GS-Plaza website
 * including improved accessibility, performance optimizations, and additional features.
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize all components
    initializeModernFeatures();
    initializeAccessibilityEnhancements();
    initializePerformanceOptimizations();
});

/**
 * Initialize modern features and enhancements
 */
function initializeModernFeatures() {
    // Enhanced form validation
    enhanceFormValidation();
    
    // Improved carousel controls
    enhanceCarousels();
    
    // Lazy loading for images
    implementLazyLoading();
    
    // Smooth scrolling with enhanced behavior
    enhanceSmoothScrolling();
    
    // Dynamic content loading indicators
    addLoadingIndicators();
}

/**
 * Enhance form validation with modern patterns
 */
function enhanceFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add real-time validation feedback
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add event listeners for real-time validation
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                clearValidationError(this);
            });
        });
        
        // Enhanced form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(form)) {
                submitFormWithFeedback(form);
            }
        });
    });
}

/**
 * Validate individual input fields
 */
function validateInput(input) {
    const value = input.value.trim();
    const fieldName = input.getAttribute('name') || input.id;
    let isValid = true;
    let errorMessage = '';
    
    // Check if field is required
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Это поле обязательно для заполнения';
    }
    
    // Validate email format
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Пожалуйста, введите действительный адрес электронной почты';
        }
    }
    
    // Validate phone format if needed
    if (input.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Пожалуйста, введите действительный номер телефона';
        }
    }
    
    if (!isValid) {
        showValidationError(input, errorMessage);
    }
    
    return isValid;
}

/**
 * Show validation error for an input
 */
function showValidationError(input, message) {
    // Remove existing error elements
    clearValidationError(input);
    
    // Create error element
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ff3530';
    errorElement.style.fontSize = '14px';
    errorElement.style.marginTop = '5px';
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');
    
    // Insert error message after the input
    input.parentNode.insertBefore(errorElement, input.nextSibling);
    
    // Add error class to input
    input.classList.add('input-error');
}

/**
 * Clear validation error for an input
 */
function clearValidationError(input) {
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.form-error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Remove error class
    input.classList.remove('input-error');
}

/**
 * Validate entire form
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isFormValid = true;
    
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

/**
 * Submit form with loading feedback
 */
function submitFormWithFeedback(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Отправка...';
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message alert alert-success mt-3';
        successMessage.textContent = 'Форма успешно отправлена!';
        successMessage.setAttribute('role', 'alert');
        successMessage.setAttribute('aria-live', 'polite');
        
        // Insert success message
        form.appendChild(successMessage);
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.remove();
            }
        }, 5000);
        
        // Reset form
        form.reset();
    }, 1500);
}

/**
 * Enhance carousels with additional controls and functionality
 */
function enhanceCarousels() {
    // Add keyboard navigation to carousels
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            triggerCarouselEvent('prev');
        } else if (e.key === 'ArrowRight') {
            triggerCarouselEvent('next');
        }
    });
    
    // Add touch swipe support for mobile
    addTouchSwipeSupport();
}

/**
 * Trigger carousel events
 */
function triggerCarouselEvent(direction) {
    const activeCarousel = document.querySelector('.owl-carousel.owl-loaded');
    if (activeCarousel) {
        const owlInstance = $(activeCarousel).data('owl.carousel');
        if (owlInstance) {
            if (direction === 'prev') {
                owlInstance.prev();
            } else {
                owlInstance.next();
            }
        }
    }
}

/**
 * Add touch swipe support for mobile devices
 */
function addTouchSwipeSupport() {
    // This would require a touch/swipe library in a real implementation
    // For now, we'll just add touch event listeners
    const carousels = document.querySelectorAll('.owl-carousel');
    
    carousels.forEach(carousel => {
        let startX = 0;
        let startY = 0;
        
        carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        carousel.addEventListener('touchend', function(e) {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only consider horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    $(this).trigger('next.owl.carousel');
                } else {
                    // Swipe right - prev slide
                    $(this).trigger('prev.owl.carousel');
                }
            }
        });
    });
}

/**
 * Implement lazy loading for images
 */
function implementLazyLoading() {
    // Use Intersection Observer API for efficient lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Load the actual image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        
                        // Remove loading attribute when loaded
                        img.addEventListener('load', function() {
                            this.classList.remove('lazy-loading');
                            this.classList.add('lazy-loaded');
                        });
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.classList.add('lazy-loading');
            imageObserver.observe(img);
        });
    }
}

/**
 * Enhance smooth scrolling with better behavior
 */
function enhanceSmoothScrolling() {
    // Enhanced smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate offset (considering fixed header)
                const headerOffset = 80; // Adjust based on your header height
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                // Scroll smoothly to target
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Add loading indicators to improve UX
 */
function addLoadingIndicators() {
    // Add loading indicators to buttons during async operations
    const buttons = document.querySelectorAll('button[type="submit"], .btn-loading');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-loading')) {
                showButtonLoader(this);
            }
        });
    });
}

/**
 * Show loading indicator on button
 */
function showButtonLoader(button) {
    const originalContent = button.innerHTML;
    button.innerHTML = '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Загрузка...';
    button.disabled = true;
    
    // Reset after 2 seconds (adjust as needed)
    setTimeout(() => {
        button.innerHTML = originalContent;
        button.disabled = false;
    }, 2000);
}

/**
 * Initialize accessibility enhancements
 */
function initializeAccessibilityEnhancements() {
    // Add skip links for keyboard users
    addSkipLinks();
    
    // Enhance focus management
    enhanceFocusManagement();
    
    // Add ARIA attributes where needed
    addAriaAttributes();
    
    // Improve screen reader announcements
    setupScreenReaderNotifications();
}

/**
 * Add skip links for keyboard navigation
 */
function addSkipLinks() {
    const skipLinkHTML = `
        <div class="skip-links visually-hidden-focusable">
            <a href="#main-features" class="skip-link">Перейти к основным преимуществам</a>
            <a href="#new-apartments" class="skip-link">Перейти к апартаментам</a>
            <a href="#gallery" class="skip-link">Перейти к галерее</a>
            <a href="#contact" class="skip-link">Перейти к контактам</a>
        </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', skipLinkHTML);
}

/**
 * Enhance focus management
 */
function enhanceFocusManagement() {
    // Add visual focus indicators
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
}

/**
 * Add necessary ARIA attributes
 */
function addAriaAttributes() {
    // Add ARIA labels to carousel controls
    const carouselControls = document.querySelectorAll('.owl-nav button');
    carouselControls.forEach((control, index) => {
        if (index % 2 === 0) {
            control.setAttribute('aria-label', 'Предыдущий слайд');
        } else {
            control.setAttribute('aria-label', 'Следующий слайд');
        }
    });
    
    // Add ARIA roles to tab panels
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');
    tabPanels.forEach(panel => {
        panel.setAttribute('tabindex', '0');
    });
}

/**
 * Set up screen reader notifications
 */
function setupScreenReaderNotifications() {
    // Create a live region for dynamic updates
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only sr-only-focusable';
    liveRegion.id = 'live-region';
    
    document.body.appendChild(liveRegion);
    
    // Function to announce messages to screen readers
    window.announceToScreenReader = function(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    };
}

/**
 * Initialize performance optimizations
 */
function initializePerformanceOptimizations() {
    // Optimize animations
    optimizeAnimations();
    
    // Defer non-critical resources
    deferNonCriticalResources();
    
    // Implement resource hints
    implementResourceHints();
}

/**
 * Optimize animations for better performance
 */
function optimizeAnimations() {
    // Use CSS transforms and opacity for smoother animations
    const animatedElements = document.querySelectorAll('.animate, .block, .carousel-hero-slider .image img');
    
    animatedElements.forEach(el => {
        // Force hardware acceleration
        el.style.willChange = 'transform, opacity';
        el.style.backfaceVisibility = 'hidden';
        el.style.perspective = '1000px';
    });
}

/**
 * Defer non-critical resources
 */
function deferNonCriticalResources() {
    // Defer loading of non-critical CSS
    const nonCriticalCSS = [
        'assets/css/bootstrap-select.min.css',
        'assets/css/owl.carousel.css'
    ];
    
    // Non-critical CSS is already linked in HTML, so we can optimize loading
    // by using the loadCSS pattern (simplified version here)
    nonCriticalCSS.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        link.onload = () => {
            link.rel = 'stylesheet';
        };
        document.head.appendChild(link);
    });
}

/**
 * Implement resource hints for better performance
 */
function implementResourceHints() {
    // Add DNS prefetch for external resources
    const domainsToPrefetch = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
    ];
    
    domainsToPrefetch.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
    });
    
    // Preconnect to critical third-party origins
    const originsToPreconnect = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
    ];
    
    originsToPreconnect.forEach(origin => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = origin;
        document.head.appendChild(link);
    });
}

// Export functions for global use if needed
window.GSPlazaEnhancements = {
    validateForm: validateForm,
    validateInput: validateInput,
    announceToScreenReader: window.announceToScreenReader || function(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }
};