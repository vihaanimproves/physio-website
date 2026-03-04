// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // MOBILE NAVIGATION TOGGLE
    // ========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('nav');

    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
            }
            if (nav) {
                nav.classList.remove('active');
            }
            document.body.style.overflow = '';
        });
    });

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty hashes or hash-bang
            if (href === '#' || href === '#!') {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // SCROLL REVEAL ANIMATION
    // ========================================
    
    // Add 'reveal-on-scroll' class to elements that should animate
    const elementsToReveal = [
        '.stat-card',
        '.feature-card',
        '.service-card',
        '.testimonial-card',
        '.contact-item',
        '.cert-item',
        '.timeline-item',
        '.philosophy-item',
        '.qualification-card',
        '.about-page-content',
        '.story-content',
        '.service-detail-content',
        '.intro-content'
    ];
    
    // Apply reveal class to all specified elements
    elementsToReveal.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (!el.classList.contains('reveal-on-scroll')) {
                el.classList.add('reveal-on-scroll');
            }
        });
    });
    
    // Intersection Observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal-active');
                }, 50); // Reduced from 100ms
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with reveal-on-scroll class
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // HERO SECTION INITIAL ANIMATION
    // ========================================
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText) {
        setTimeout(() => {
            heroText.classList.add('hero-fade-in');
        }, 50); // Reduced from 100ms
    }
    
    if (heroImage) {
        setTimeout(() => {
            heroImage.classList.add('hero-fade-in');
        }, 150); // Reduced from 300ms
    }

    // ========================================
    // COUNTER ANIMATION FUNCTION
    // ========================================
    function animateCounter(element, target) {
        const originalText = element.textContent;
        const suffix = originalText.replace(/^[0-9.]+/, '');
        
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        const isDecimal = target % 1 !== 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const displayValue = isDecimal ? current.toFixed(1) : Math.floor(current);
            element.textContent = displayValue + suffix;
        }, stepTime);
    }

    // ========================================
    // HERO STATS COUNTER ANIMATION
    // ========================================
    const heroStatValues = document.querySelectorAll('.hero-stats .stat-value');
    
    // Trigger animation when page loads
    setTimeout(() => {
        heroStatValues.forEach(stat => {
            const text = stat.textContent;
            const number = parseFloat(text);
            
            if (!isNaN(number)) {
                animateCounter(stat, number);
            }
        });
    }, 400); // Start after hero fade-in

    // ========================================
    // PAGE TRANSITION EFFECT
    // ========================================
    // Add fade-in effect when navigating between pages
    setTimeout(() => {
        document.body.classList.add('page-fade-in');
    }, 10); // Reduced from 50ms
    
    // Add fade-out effect when clicking internal links
    const internalLinks = document.querySelectorAll('a[href^="index.html"], a[href^="about.html"], a[href^="services.html"], a[href^="testimonials.html"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only if not opening in new tab
            if (!e.ctrlKey && !e.metaKey) {
                const destination = this.getAttribute('href');
                const currentPage = window.location.pathname.split('/').pop();
                const destinationPage = destination.split('#')[0];
                
                // Check if navigating to a different page
                if (currentPage !== destinationPage) {
                    e.preventDefault();
                    
                    document.body.classList.remove('page-fade-in');
                    document.body.classList.add('page-fade-out');
                    
                    setTimeout(() => {
                        window.location.href = destination;
                    }, 300); // Reduced from 500ms
                }
                // If same page with hash (anchor link), let default behavior happen
                // No fade-out animation for same-page navigation
            }
        });
    });

    // ========================================
    // STAGGERED ANIMATION FOR GRIDS
    // ========================================
    const addStaggerDelay = (selector) => {
        const items = document.querySelectorAll(selector);
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.05}s`; // Reduced from 0.1s
        });
    };
    
    addStaggerDelay('.stat-card');
    addStaggerDelay('.feature-card');
    addStaggerDelay('.service-card');
    addStaggerDelay('.testimonial-card');
    addStaggerDelay('.contact-item');
    addStaggerDelay('.timeline-item');
    addStaggerDelay('.philosophy-item');

    // ========================================
    // STATS COUNTER ANIMATION (for non-hero stats)
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseFloat(text);
                
                if (!isNaN(number)) {
                    animateCounter(target, number);
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ========================================
    // WHATSAPP LINKS
    // ========================================
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href.includes('text=')) {
            link.setAttribute('href', href + '?text=Hi, I would like to book a consultation for physiotherapy treatment.');
        }
    });

    // ========================================
    // CLICK TRACKING
    // ========================================
    function trackButtonClick(buttonName) {
        console.log('Button clicked:', buttonName);
    }

    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim();
            trackButtonClick(buttonText);
        });
    });

    // ========================================
    // ACTIVE NAVIGATION STATE
    // ========================================
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    });

    // ========================================
    // PREVENT FOUC
    // ========================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // ========================================
    // CONSOLE BRANDING
    // ========================================
    console.log('%cHealActive Physiotherapy Clinic', 'font-size: 20px; font-weight: bold; color: #9d1f3c;');
    console.log('%cWebsite developed with care for optimal patient experience', 'font-size: 12px; color: #666;');

    // ========================================
    // PERFORMANCE MONITORING
    // ========================================
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        });
    }
    

    // ========================================
    // MOBILE DROPDOWN MENU
    // ========================================
    const navDropdown = document.querySelector('.nav-dropdown');
    
    if (navDropdown && window.innerWidth <= 768) {
        const dropdownLink = navDropdown.querySelector('.nav-link');
        if (dropdownLink) {
            dropdownLink.addEventListener('click', (e) => {
                e.preventDefault();
                navDropdown.classList.toggle('active');
            });
        }
    }

    // ========================================
    // SMOOTH SCROLL TO SERVICE SECTIONS
    // ========================================
    // Handle hash navigation on page load
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

}); // End DOMContentLoaded

// ========================================
// RANDOM TESTIMONIALS DISPLAY (SEO-Friendly)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    
    if (testimonialsGrid) {
        // Get all testimonial cards
        const allCards = Array.from(testimonialsGrid.querySelectorAll('.testimonial-card[data-testimonial]'));
        
        if (allCards.length > 0) {
            // Function to shuffle array (Fisher-Yates shuffle)
            function shuffleArray(array) {
                const shuffled = [...array];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                return shuffled;
            }
            
            // Shuffle all cards
            const shuffled = shuffleArray(allCards);
            
            // Hide all cards first
            allCards.forEach(card => {
                card.style.display = 'none';
            });
            
            // Show only first 3 from shuffled array
            for (let i = 0; i < 3 && i < shuffled.length; i++) {
                shuffled[i].style.display = 'block';
                // Add stagger animation
                shuffled[i].style.opacity = '0';
                shuffled[i].style.transform = 'translateY(20px)';
                setTimeout(() => {
                    shuffled[i].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    shuffled[i].style.opacity = '1';
                    shuffled[i].style.transform = 'translateY(0)';
                }, i * 100);
            }
            
            console.log('Displaying 3 random testimonials from', allCards.length, 'total (all in HTML for SEO)');
        }
    }
});

// ========================================
// CONTACT FORM — Web3Forms + Stripe anim
// ========================================
(function () {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitBtn   = document.getElementById('submitBtn');
    const btnText     = submitBtn.querySelector('.btn-text');
    const modal       = document.getElementById('errorModal');
    const modalMsg    = document.getElementById('modal-message');
    const modalClose  = document.getElementById('modalClose');
    const textarea    = document.getElementById('description');
    const charCounter = document.getElementById('char-counter');

    // ── Live character counter ──────────────────────────────────
    if (textarea && charCounter) {
        textarea.addEventListener('input', () => {
            const len = textarea.value.length;
            charCounter.textContent = `${len} / 20 characters minimum`;
            charCounter.style.color = len >= 20 ? '#43a047' : 'var(--text-light)';
        });
    }

    // ── Inline validation helpers ──────────────────────────────
    // Track which fields the user has already interacted with
    const touchedFields = new Set();

    function setError(inputId, msg) {
        const el = document.getElementById(inputId);
        const err = document.getElementById(inputId + '-error');
        if (el)  el.classList.add('input-error');
        if (err) err.textContent = msg;
    }

    function clearError(inputId) {
        const el  = document.getElementById(inputId);
        const err = document.getElementById(inputId + '-error');
        if (el)  { el.classList.remove('input-error'); el.classList.add('input-valid'); }
        if (err) err.textContent = '';
    }

    function resetField(inputId) {
        const el  = document.getElementById(inputId);
        const err = document.getElementById(inputId + '-error');
        if (el)  el.classList.remove('input-error', 'input-valid');
        if (err) err.textContent = '';
    }

    // Validate a single field; returns true if valid
    function validateField(id) {
        if (id === 'name') {
            const el = document.getElementById('name');
            if (!el.value.trim()) { setError('name', 'Please enter your full name.'); return false; }
            clearError('name'); return true;
        }
        if (id === 'email') {
            const el = document.getElementById('email');
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!el.value.trim() || !re.test(el.value.trim())) { setError('email', 'Please enter a valid email address.'); return false; }
            clearError('email'); return true;
        }
        if (id === 'age') {
            const el = document.getElementById('age');
            const v  = parseInt(el.value, 10);
            if (!el.value || isNaN(v) || v < 1 || v > 120) { setError('age', 'Please enter a valid age (1–120).'); return false; }
            clearError('age'); return true;
        }
        if (id === 'gender') {
            const el = document.getElementById('gender');
            if (!el.value) { setError('gender', 'Please select a gender.'); return false; }
            clearError('gender'); return true;
        }
        if (id === 'concern') {
            const el = document.getElementById('concern');
            if (!el.value) { setError('concern', 'Please select a concern type.'); return false; }
            clearError('concern'); return true;
        }
        if (id === 'description') {
            const el = document.getElementById('description');
            if (el.value.trim().length < 20) { setError('description', 'Please describe your concern in at least 20 characters.'); return false; }
            clearError('description'); return true;
        }
        return true;
    }

    // Full-form validation (used on submit – touches all fields)
    function validateForm() {
        const ids = ['name','email','age','gender','concern','description'];
        ids.forEach(id => touchedFields.add(id)); // mark all as touched on submit
        return ids.map(id => validateField(id)).every(Boolean);
    }

    // ── Per-field blur: only validate fields the user has left ──
    ['name','email','age','gender','concern','description'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('blur', () => {
            touchedFields.add(id);
            validateField(id);
        });
        // Also re-validate on change/input once touched
        el.addEventListener('input', () => {
            if (touchedFields.has(id)) validateField(id);
        });
        el.addEventListener('change', () => {
            if (touchedFields.has(id)) validateField(id);
        });
    });

    // ── Submit handler ──────────────────────────────────────────
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        if (!validateForm()) {
            // Shake the button gently
            submitBtn.style.animation = 'shake 0.35s ease';
            submitBtn.addEventListener('animationend', () => { submitBtn.style.animation = ''; }, { once: true });
            return;
        }

        // Start loading animation
        submitBtn.classList.add('is-loading');
        btnText.textContent = 'Sending…';

        const formData = new FormData(form);
        const object   = Object.fromEntries(formData.entries());
        const json     = JSON.stringify(object);

        try {
            const res  = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: json
            });
            const data = await res.json();

            if (res.ok && data.success) {
                // Flash green then redirect
                submitBtn.classList.remove('is-loading');
                submitBtn.classList.add('is-success');
                btnText.textContent = '✓ Sent! Redirecting…';
                setTimeout(() => { window.location.href = 'success.html'; }, 1000);
            } else {
                throw new Error(data.message || 'Submission failed. Please try again.');
            }
        } catch (err) {
            submitBtn.classList.remove('is-loading');
            btnText.textContent = 'Send My Request';
            showModal(err.message || 'An unexpected error occurred. Please try again or call us directly.');
        }
    });

    // ── Modal helpers ───────────────────────────────────────────
    function showModal(msg) {
        if (modalMsg) modalMsg.textContent = msg;
        modal.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('modal-open');
        document.body.style.overflow = '';
    }

    if (modalClose)  modalClose.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('modal-open')) closeModal();
    });

})();


// ========================================
// PHONE / WHATSAPP MODAL (index.html)
// ========================================
(function () {
    const trigger = document.getElementById('phoneModalTrigger');
    const modal   = document.getElementById('phoneModal');
    const closeBtn= document.getElementById('phoneModalClose');
    if (!trigger || !modal) return;

    function openPhoneModal(e) {
        e.preventDefault();
        modal.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
    }
    function closePhoneModal() {
        modal.classList.remove('modal-open');
        document.body.style.overflow = '';
    }

    trigger.addEventListener('click', openPhoneModal);
    if (closeBtn) closeBtn.addEventListener('click', closePhoneModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closePhoneModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('modal-open')) closePhoneModal();
    });
})();