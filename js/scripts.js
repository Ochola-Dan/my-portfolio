document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.body;
    const skillItems = document.querySelectorAll('.skill-item');
    const contactForm = document.getElementById('contact-form');

    // Mobile Navigation Functions
    const toggleNavigation = () => {
        nav.classList.toggle('nav-active');
        body.style.overflow = nav.classList.contains('nav-active') ? 'hidden' : '';
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Toggle Burger Animation
        burger.classList.toggle('toggle');
    };

    const closeNavigation = () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        body.style.overflow = '';
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    };

    // Skills Animation Functions
    const initializeSkills = () => {
        skillItems.forEach(item => {
            const percent = item.getAttribute('data-percent');
            const progress = item.querySelector('.skill-progress');
            
            // Set skill level based on percentage
            let level = 'Beginner';
            if (percent >= 90) level = 'Expert';
            else if (percent >= 80) level = 'Advanced';
            else if (percent >= 70) level = 'Intermediate';
            
            // Set custom properties
            progress.style.setProperty('--percent', `${percent}%`);
            progress.setAttribute('data-tooltip', `${level} - ${percent}%`);
            item.classList.add(`skill-level-${Math.floor(percent / 10) * 10}`);
        });
    };

    const observeSkills = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('skill-animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillItems.forEach(skill => observer.observe(skill));
    };

     // Contact Form Handler
    const handleContactSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('.submit-button');
        
        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulated API call - Replace with your actual form submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error sending your message. Please try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    };

    // Event Listeners
    burger?.addEventListener('click', toggleNavigation);
    
    navLinks.forEach(link => {
        link.addEventListener('click', closeNavigation);
    });

    document.addEventListener('click', (e) => {
        if (nav.classList.contains('nav-active') && 
            !nav.contains(e.target) && 
            !burger.contains(e.target)) {
            closeNavigation();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeNavigation();
            closeModal();
        }
    });

    contactForm?.addEventListener('submit', handleContactSubmit);

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize
    initializeSkills();
    observeSkills();
});