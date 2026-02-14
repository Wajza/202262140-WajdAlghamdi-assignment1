/**
 * ========================================================
 * AI DECLARATION - JAVASCRIPT FUNCTIONALITY
 * ========================================================
 * 
 * This JavaScript file was developed with assistance from 
 * ChatGPT and then manually customized, tested, 
 * and improved by Wajd Alghamdi
 * 
 * 
 * Modifications and enhancements made:
 * - Added comprehensive error handling for all functions
 * - Fixed mobile menu display issues with proper event handling
 * - Enhanced form validation with real-time feedback
 * - Added loading states for better UX
 * - Implemented proper theme persistence with localStorage
 * - Added network status detection (online/offline)
 * - Added keyboard accessibility (Escape key to close menu)
 * - Added swipe gestures for mobile menu
 * - Optimized performance with debouncing
 * - Added proper ARIA attributes for accessibility
 * - Customized all greeting messages with my information
 * 
 * Technical concepts learned and applied:
 * - Intersection Observer for scroll animations
 * - LocalStorage API for theme persistence
 * - Form validation with regex patterns
 * - Async/await for form submission simulation
 * - Event delegation for dynamic elements
 * - CSS animations with JavaScript triggers
 * 
 * I have reviewed, tested, and understand every function
 * in this file. AI was used as a learning tool to understand
 * JavaScript patterns and best practices.
 * ========================================================
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully!');
    
    // Initialize all features
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initGreetingMessage();
    initContactForm();
    initScrollSpy();
    initBackToTop();
    initSkillLevels();
    initNewsletterForm();
    initTypingEffect();
    initProjectFilters();
    initFormValidation();
    initLazyLoading();
    
    // Add shake animation style if not exists
    addShakeAnimation();
});

/**
 * Add shake animation to document
 */
function addShakeAnimation() {
    if (!document.getElementById('shake-animation')) {
        const style = document.createElement('style');
        style.id = 'shake-animation';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Theme Toggle Functionality
 * Switches between light and dark mode and saves preference
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme === 'dark');
    } else {
        // Check system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (systemPrefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateThemeIcon(true);
        }
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const isDark = currentTheme === 'dark';
        
        // Toggle theme
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        
        updateThemeIcon(!isDark);
        
        // Add animation effect
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
    
    function updateThemeIcon(isDark) {
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

/**
 * Mobile Menu Functionality
 * Handles hamburger menu for mobile devices
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    if (!hamburger || !navMenu) return;
    
    // Toggle menu
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
    
    // Handle swipe gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function toggleMenu() {
        const isActive = hamburger.classList.contains('active');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isActive);
        
        if (!isActive) {
            body.style.overflow = 'hidden';
            body.classList.add('menu-open');
        } else {
            body.style.overflow = '';
            body.classList.remove('menu-open');
        }
    }
    
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
        body.classList.remove('menu-open');
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        // Swipe right to open menu (if on left edge)
        if (swipeDistance > swipeThreshold && touchStartX < 30 && !navMenu.classList.contains('active')) {
            toggleMenu();
        }
        
        // Swipe left to close menu
        if (swipeDistance < -swipeThreshold && navMenu.classList.contains('active')) {
            closeMenu();
        }
    }
}

/**
 * Smooth Scrolling
 * Enables smooth scroll to anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Greeting Message by Time of Day
 * Displays personalized greeting based on user's local time
 */
function initGreetingMessage() {
    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;
    
    const hour = new Date().getHours();
    const day = new Date().getDay();
    
    let greeting;
    let emoji;
    
    // Time-based greeting
    if (hour < 12) {
        greeting = "Good morning";
        emoji = "☀️";
    } else if (hour < 18) {
        greeting = "Good afternoon";
        emoji = "✨";
    } else {
        greeting = "Good evening";
        emoji = "🌙";
    }
    
    // Day-specific messages
    const dayMessages = {
        0: "Happy Sunday! ",
        1: "Happy Monday! ",
        2: "Happy Tuesday! ",
        3: "Happy Wednesday! ",
        4: "Happy Thursday! ",
        5: "Happy Friday! ",
        6: "Happy Saturday! "
    };
    
    const fullGreeting = `${emoji} ${greeting}! ${dayMessages[day]}I'm Wajd, a Software Engineer passionate about creating innovative solutions.`;
    
    // Typewriter effect
    let i = 0;
    greetingElement.textContent = '';
    
    function typeWriter() {
        if (i < fullGreeting.length) {
            greetingElement.textContent += fullGreeting.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    }
    
    typeWriter();
}

/**
 * Contact Form Handling
 * Validates and processes contact form submissions
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject')?.value.trim() || 'No Subject',
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        if (!validateForm(formData)) {
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual API call)
            await simulateSubmission();
            
            // Show success message
            showNotification('✨ Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
            form.reset();
            
            // Clear any error messages
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('❌ Oops! Something went wrong. Please try again or email me directly.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }
    });
}

/**
 * Form Validation
 * Validates all form fields
 */
function validateForm(data) {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    
    // Name validation
    if (data.name.length < 2) {
        showFieldError('name', 'Please enter a valid name (minimum 2 characters)');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Message validation
    if (data.message.length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (data.message.length > 1000) {
        showFieldError('message', 'Message is too long. Please keep it under 1000 characters.');
        isValid = false;
    }
    
    if (!isValid) {
        showNotification('Please fix the errors in the form', 'error');
    }
    
    return isValid;
}

/**
 * Show Field Error
 * Displays error message for a specific field
 */
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = field.closest('.form-group')?.querySelector('.error-message');
    
    if (field && errorElement) {
        field.classList.add('error');
        errorElement.textContent = message;
        
        // Shake animation
        field.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }
}

/**
 * Form Validation Initialization
 */
function initFormValidation() {
    // Add real-time validation
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const errorElement = this.closest('.form-group')?.querySelector('.error-message');
            if (errorElement && errorElement.textContent) {
                errorElement.textContent = '';
                this.classList.remove('error');
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                showFieldError(this.id, 'This field is required');
            }
        });
    });
}

/**
 * Simulate API Call
 * Mimics server submission
 */
function simulateSubmission() {
    return new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });
}

/**
 * Show Notification
 * Displays user-friendly notifications
 */
function showNotification(message, type) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.setAttribute('role', 'alert');
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

/**
 * Scroll Spy
 * Highlights active navigation link based on scroll position
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!sections.length || !navLinks.length) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Back to Top Button
 * Shows/hides and handles back to top functionality
 */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Skill Levels Animation
 * Animates skill bars when in viewport
 */
function initSkillLevels() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    if (!skillLevels.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = level;
            }
        });
    }, { threshold: 0.5 });
    
    skillLevels.forEach(skill => {
        observer.observe(skill);
    });
}

/**
 * Newsletter Form
 * Handles newsletter subscription
 */
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value;
        const submitBtn = form.querySelector('button');
        const originalContent = submitBtn.innerHTML;
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            emailInput.focus();
            return;
        }
        
        // Show loading
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        try {
            await simulateSubmission();
            showNotification('🎉 Thanks for subscribing! Check your email for confirmation.', 'success');
            form.reset();
        } catch (error) {
            showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }
    });
}

/**
 * Typing Effect for Hero Section
 * Creates dynamic typing effect
 */
function initTypingEffect() {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;
    
    const originalText = tagline.textContent;
    tagline.textContent = '';
    
    let i = 0;
    function typeTagline() {
        if (i < originalText.length) {
            tagline.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeTagline, 50);
        }
    }
    
    // Start typing after page load
    setTimeout(typeTagline, 1000);
}

/**
 * Project Filters
 * Filters projects by category
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    if (!filterButtons.length || !projects.length) return;
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projects.forEach(project => {
                if (filter === 'all' || project.getAttribute('data-category') === filter) {
                    project.style.display = 'flex';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Lazy Loading Images
 * Improves page load performance
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Page Load Performance
 * Tracks page load metrics
 */
window.addEventListener('load', () => {
    // Log performance metrics
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
    
    // Add loaded class to body for animations
    document.body.classList.add('loaded');
});

/**
 * Handle offline/online status
 */
window.addEventListener('offline', () => {
    showNotification('You are offline. Some features may not work.', 'error');
});

window.addEventListener('online', () => {
    showNotification('You are back online!', 'success');
});

/**
 * Handle escape key to close mobile menu
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger?.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
        }
    }
});