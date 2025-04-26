/**
 * Savoria Restaurant Landing Page JavaScript
 * Adds interactivity and animations to enhance user experience
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    const testimonialDots = document.querySelectorAll('.dot');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevTestimonialBtn = document.querySelector('.prev-testimonial');
    const nextTestimonialBtn = document.querySelector('.next-testimonial');
    const reservationForm = document.getElementById('booking-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Initialize current testimonial index
    let currentTestimonialIndex = 0;
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Mobile Navigation Toggle
    hamburger.addEventListener('click', function() {
        this.classList.toggle('open');
        mobileNav.classList.toggle('open');
    });
    
    // Close mobile nav when clicking a link
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
        });
    });
    
    // Menu Tabs
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all menu categories
            menuCategories.forEach(category => {
                category.classList.remove('active');
            });
            
            // Show the selected menu category
            const menuCategory = document.getElementById(this.dataset.menu);
            menuCategory.classList.add('active');
        });
    });
    
    // Testimonial Slider
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected testimonial
        testimonialSlides[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        
        // Update current index
        currentTestimonialIndex = index;
    }
    
    // Next testimonial
    nextTestimonialBtn.addEventListener('click', function() {
        let nextIndex = currentTestimonialIndex + 1;
        if (nextIndex >= testimonialSlides.length) {
            nextIndex = 0;
        }
        showTestimonial(nextIndex);
    });
    
    // Previous testimonial
    prevTestimonialBtn.addEventListener('click', function() {
        let prevIndex = currentTestimonialIndex - 1;
        if (prevIndex < 0) {
            prevIndex = testimonialSlides.length - 1;
        }
        showTestimonial(prevIndex);
    });
    
    // Testimonial dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Auto-advance testimonials every 5 seconds
    setInterval(function() {
        let nextIndex = currentTestimonialIndex + 1;
        if (nextIndex >= testimonialSlides.length) {
            nextIndex = 0;
        }
        showTestimonial(nextIndex);
    }, 5000);
    
    // Reservation Form Submission
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Simulate form submission
            console.log('Reservation details:', formDataObj);
            
            // Show success message (in a real app, this would happen after server confirmation)
            alert('Thank you! Your reservation has been received. We will confirm shortly.');
            this.reset();
        });
    }
    
    // Newsletter Form Submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate form submission
            console.log('Newsletter signup:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .fade-in-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Gallery hover effect enhancement
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.gallery-overlay').style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.gallery-overlay').style.transform = 'translateY(100%)';
        });
    });
    
    // Current date for reservation form
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        
        const formattedToday = yyyy + '-' + mm + '-' + dd;
        dateInput.setAttribute('min', formattedToday);
    }
    
    // Dark Mode Toggle
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
        
        // Update toggle icon
        const iconClass = isDarkMode ? 'fa-sun' : 'fa-moon';
        darkModeToggle.innerHTML = `<i class="fas ${iconClass}"></i>`;
    }
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Dark mode toggle event listener
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});
