# Technical Documentation

---

## Introduction

**Purpose:**
This technical documentation provides a comprehensive overview of the Wajd Alghamdi Portfolio website. It is intended for developers who need to understand, maintain, or extend the codebase.

**Project Overview:**
A responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript. The site showcases software engineering projects, technical skills, and provides a contact form for potential collaborators.

---

## Key Features

1. Semantic HTML5 structure
2. CSS with Flexbox and Grid layouts
3. JavaScript for interactivity
4. Dark/Light theme toggle with localStorage
5. Responsive design for all devices
6. Form validation with real-time feedback
7. Project filtering functionality
8. Animated skill progress bars
9. Time-based greeting message
10. Mobile-friendly hamburger menu

---

## System Architecture

-  Frontend Stack:

| Layer | Technology | File | Key Features |
|-------|------------|------|--------------|
| 📄 Structure | HTML5 | index.html | • Semantic structure<br>• SEO-friendly tags<br>• ARIA accessibility |
| 🎨 Styling | CSS3 | styles.css | • CSS Variables (theming)<br>• Flexbox & Grid layouts<br>• Media queries<br>• Keyframe animations |
| ⚡ Functionality | JavaScript | script.js | • DOM manipulation<br>• Event listeners<br>• Theme switching<br>• Mobile menu<br>• Form validation<br>• Project filtering<br>• Scroll animations |

- Browser APIs:

| API | Icon | Function | Implementation |
|-----|------|----------|----------------|
| LocalStorage | 🔧 | Theme persistence | Saves user theme preference across sessions |
| Intersection Observer | 👁️ | Skill animations | Triggers progress bars when scrolled into view |
| DOM API | 🖱️ | Element manipulation | Selects and modifies page elements |
| History API | 📜 | Smooth navigation | Handles anchor link scrolling |

- External Resources:

| Resource | Icon | Type | Usage |
|----------|------|------|-------|
| Google Fonts | 🔤 | Typography | Poppins font family for all text |
| Font Awesome | 🎯 | Icons | UI icons for navigation, skills, and social links |

---

## File Structure

| Directory | File | Description |
|-----------|------|-------------|
| / | README.md | Project overview and setup instructions |
| / | index.html | Main entry point / Homepage |
| /css/ | styles.css | All styling and themes |
| /js/ | script.js | All JavaScript functionality |
| /assets/images/ | PFP.png | Profile picture |
| /assets/images/ | KSIH.png | KFUPM Student Impact Hub project image |
| /assets/images/ | EBS.png | Event Booking System project image |
| /assets/images/ | KE.png | KFUPM Events project image |
| /docs/ | ai-usage-report.md | AI usage documentation |
| /docs/ | technical-documentation.md | Technical documentation |

---

## Component Documentation

1. Navigation Component (File Location: index.html (lines 18-46) | styles.css (lines 84-170) | script.js (lines 38-108)):

- HTML:
```html
<!--
<nav class="navbar">
    <div class="nav-container">
        <div class="logo">
            <a href="#home">Wajd Alghamdi</a>
        </div>
        <button class="hamburger" aria-label="Toggle menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>
        <ul class="nav-menu">
            <li><a href="#home" class="nav-link">Home</a></li>
            <li><a href="#about" class="nav-link">About</a></li>
            <li><a href="#projects" class="nav-link">Projects</a></li>
            <li><a href="#skills" class="nav-link">Skills</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
        </ul>
        <div class="theme-toggle">
            <button id="themeToggle"><i class="fas fa-moon"></i></button>
        </div>
    </div>
</nav>
-->
```

- Validation Rules:

| Field | Validation | Error Message |
|-------|------------|---------------|
| Name | Min 2 characters | "Please enter a valid name" |
| Email | Regex pattern | "Please enter a valid email" |
| Message | 10-1000 characters | "Message must be 10-1000 characters" |

---

##  JavaScript Functions Reference

1. Core Initialization Functions:

| Function | Purpose | Line |
|----------|---------|------|
| initThemeToggle() | Dark/light theme switching | 38 |
| initMobileMenu() | Hamburger menu functionality | 68 |
| initSmoothScroll() | Smooth anchor scrolling | 110 |
| initGreetingMessage() | Time-based greeting | 125 |
| initContactForm() | Form handling | 150 |
| initScrollSpy() | Active nav highlighting | 210 |
| initBackToTop() | Back to top button | 230 |
| initSkillLevels() | Skill bar animations | 250 |
| initProjectFilters() | Project filtering | 315 |

2. Utility Functions:

| Function | Purpose | Parameters |
|----------|---------|------------|
| showFieldError() | Display field error | (fieldId, message) |
| showNotification() | Display popup message | (message, type) |
| validateForm() | Form validation | (data) |
| debounce() | Performance optimization | (func, wait) |

---

##  CSS Architecture

1. CSS Variables:

```css
/*
:root {
    --primary-color: #2563eb;
    --text-color: #1f2937;
    --bg-color: #ffffff;
    --spacing-sm: 1rem;
    --spacing-lg: 2rem;
    --transition: all 0.3s ease;
}

[data-theme="dark"] {
    --primary-color: #60a5fa;
    --text-color: #f3f4f6;
    --bg-color: #111827;
}
*/
```

2. Grid Layouts:

```css
/*
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}
*/
```

3. Animation Keyframes:

```css
/*
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
*/
```
---

##  Performance Optimization
```html
<!--
<img loading="lazy" src="image.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="fonts.css" media="print" onload="this.media='all'">
-->
```
---

##  Accessibility Features

```html
<!-- ARIA Labels -->
<!--
<nav aria-label="Main navigation">
<button aria-label="Toggle menu">
-->
```

<!-- Keyboard Navigation -->
```css
/*
:focus-visible { outline: 2px solid blue; }
<!-- Reduced Motion -->
@media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; }
}
*/
```
---

##  Troubleshooting Guide

- Common Issues and Solutions:

| Issue | Solution |
|-------|----------|
| Images not loading | Check paths in assets/images/ folder |
| Theme not persisting | Enable localStorage in browser |
| Mobile menu not working | Check console for JavaScript errors |
| Form validation not showing | Add .error-message div after inputs |

---

##  References

1. Font Awesome
2. Google Fonts 