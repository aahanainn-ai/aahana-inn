/**
 * Aahana Inn - Premium Homepage JavaScript
 * Enhanced with Exact Preloader Synchronization and Web3Forms AJAX Submission
 */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ===== INTELLIGENT PRELOADER (FIXED) =====
    // Forces the spinner to wait until the primary background image is 100% loaded.
    const preloader = document.getElementById('preloader');
    const heroBgImage = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1920&q=80';

    if (preloader) {
        const img = new Image();
        img.src = heroBgImage;

        const hidePreloader = () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.classList.add('hidden');
                preloader.style.display = 'none';

                // Initialize text animations ONLY AFTER the background is visible
                if (typeof AOS !== 'undefined') {
                    AOS.init({ duration: 1000, easing: 'ease-out-quint', once: true, offset: 50 });
                }
            }, 800);
        };

        // If the image is already cached
        if (img.complete) {
            hidePreloader();
        } else {
            // Strictly wait for the image to load
            img.addEventListener('load', hidePreloader);
            // Fallback just in case of an error so the site doesn't hang
            img.addEventListener('error', hidePreloader);
        }
    }

    // ===== CUSTOM CURSOR & MAGNETIC BUTTONS =====
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorDot = document.querySelector('.cursor-dot');

    if (window.matchMedia('(hover: hover)').matches && cursorFollower && cursorDot) {
        let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateCursor() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const hoverElements = document.querySelectorAll('a, button, .room-card-premium, .review-card, .gallery-item, select, input, textarea, .glass-contact-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', function () {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                cursorFollower.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                cursorDot.style.backgroundColor = '#ffffff';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            el.addEventListener('mouseleave', function () {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.borderColor = 'var(--primary-gold)';
                cursorFollower.style.backgroundColor = 'transparent';
                cursorDot.style.backgroundColor = 'var(--primary-gold)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });

        const magneticBtns = document.querySelectorAll('.magnetic-btn');
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }

    // ===== HERO IMAGE SLIDER =====
    if (document.querySelector('.hero-swiper')) {
        const heroSwiper = new Swiper('.hero-swiper', {
            effect: 'fade',
            speed: 2500,
            autoplay: { delay: 5000, disableOnInteraction: false },
            loop: true,
            allowTouchMove: false
        });
    }

    // ===== PARALLAX & NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    const heroParallax = document.getElementById('hero-parallax');

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

        if (navbar) {
            if (scrollY > 50) { navbar.classList.add('scrolled', 'glass-nav'); }
            else { navbar.classList.remove('scrolled', 'glass-nav'); }
        }
        if (heroParallax && scrollY < window.innerHeight) {
            heroParallax.style.transform = `translateY(${scrollY * 0.4}px)`;
        }
        if (backToTop) {
            if (scrollY > 600) { backToTop.classList.add('visible'); }
            else { backToTop.classList.remove('visible'); }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const menuClose = document.querySelector('.menu-close');
    const menuLinks = document.querySelectorAll('.menu-link');

    const closeMenu = () => {
        if (menuToggle) {
            menuToggle.classList.remove('active');
            const lines = menuToggle.querySelectorAll('.menu-line');
            if (lines.length === 3) {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[1].style.transform = 'none';
                lines[2].style.transform = 'none';
            }
        }
        if (fullscreenMenu) fullscreenMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (menuToggle && fullscreenMenu && menuClose) {
        menuToggle.addEventListener('click', function () {
            if (!this.classList.contains('active')) {
                this.classList.add('active');
                fullscreenMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
                const lines = this.querySelectorAll('.menu-line');
                if (lines.length === 3) {
                    lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    lines[1].style.opacity = '0';
                    lines[1].style.transform = 'translateX(-20px)';
                    lines[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
                }
            } else { closeMenu(); }
        });
        menuClose.addEventListener('click', closeMenu);
        menuLinks.forEach(link => link.addEventListener('click', closeMenu));
    }

    // ===== WEB3FORMS CONTACT SUBMISSION (AJAX / NO REDIRECT) =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Stop the browser from navigating away

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            // UI Loading State
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.style.pointerEvents = 'none';

            const formData = new FormData(contactForm);

            // Fetch request sends the data silently in the background
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                        // Success UI State
                        btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
                        btn.style.background = 'linear-gradient(135deg, #27AE60, #2ECC71)';
                        btn.style.color = '#fff';
                        contactForm.reset();
                    } else {
                        console.log(response);
                        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error Sending';
                    }
                })
                .catch(error => {
                    console.log(error);
                    btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Network Error';
                })
                .finally(() => {
                    // Reset button completely after 4 seconds
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.style.color = '';
                        btn.style.pointerEvents = 'auto';
                    }, 4000);
                });
        });
    }
});
