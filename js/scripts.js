document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger?.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        burger.classList.toggle('toggle');
    });

    // Skills Animation
    const skillItems = document.querySelectorAll('.skill-item');
    
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
            
            // Add color class based on level
            item.classList.add(`skill-level-${Math.floor(percent / 10) * 10}`);
        });
    };

    // Intersection Observer for scroll animations
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

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('.submit-button');
        
        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Add your form submission logic here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            alert('There was an error sending your message. Please try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });

    // Initialize everything
    initializeSkills();
    observeSkills();
});