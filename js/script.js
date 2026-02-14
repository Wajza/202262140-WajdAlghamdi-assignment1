/**
 * Wajd Alghamdi - Software Engineer Portfolio
 * JavaScript functionality for interactive features
 * Author: Wajd Alghamdi
 * Date: 2024
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
});

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
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Smooth Scrolling
 * Enables smooth scroll to anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
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
            setTimeout(typeWriter, 50);
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
            
            // Track form submission (analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'contact',
                    'event_label': 'contact_form'
                });
            }
            
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
    // Name validation
    if (data.name.length < 2) {
        showNotification('Please enter a valid name (minimum 2 characters)', 'error');
        highlightField('name');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        highlightField('email');
        return false;
    }
    
    // Message validation
    if (data.message.length < 10) {
        showNotification('Message must be at least 10 characters long', 'error');
        highlightField('message');
        return false;
    }
    
    if (data.message.length > 1000) {
        showNotification('Message is too long. Please keep it under 1000 characters.', 'error');
        highlightField('message');
        return false;
    }
    
    return true;
}

/**
 * Highlight Invalid Field
 * Adds visual indication for invalid fields
 */
function highlightField(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.style.borderColor = '#ef4444';
        field.style.animation = 'shake 0.5s ease';
        
        setTimeout(() => {
            field.style.borderColor = '';
            field.style.animation = '';
        }, 2000);
    }
}

/**
 * Simulate API Call
 * Mimics server submission
 */
function simulateSubmission() {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
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
    notification.innerHTML = message;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        font-weight: 500;
        z-index: 9999;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#notification-keyframes')) {
        const style = document.createElement('style');
        style.id = 'notification-keyframes';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        notification.style.transform = 'translateX(100%)';
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
    const sections = document.querySelectorAll('section');
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
            const href = link.getAttribute('href').substring(1); // Remove #
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
        
        const email = form.querySelector('input[type="email"]').value;
        const submitBtn = form.querySelector('button');
        const originalContent = submitBtn.innerHTML;
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
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
            setTimeout(typeTagline, 100);
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
                    project.style.display = 'block';
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
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
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
 * Add CSS animations for skill levels
 */
const style = document.createElement('style');
style.textContent = `
    [data-theme="dark"] .skill-level {
        background: linear-gradient(90deg, #60a5fa, #a78bfa);
    }
    
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 99;
        box-shadow: var(--shadow-lg);
    }
    
    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        transform: translateY(-5px);
    }
    
    .notification {
        z-index: 9999;
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .project-card {
        transition: opacity 0.3s ease, transform 0.3s ease, display 0.3s ease;
    }
    
    img.loaded {
        animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

document.head.appendChild(style);