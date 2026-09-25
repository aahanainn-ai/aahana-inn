/**
 * Aahana Inn - Facilities Page JavaScript
 * Premium Luxury Hotel Animations and Interactivity
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===== PRELOADER (FIXED) =====
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(function() {
            preloader.classList.add('hidden');
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 500); 
    }

    // ===== CUSTOM CURSOR & MAGNETIC BUTTONS (Desktop Only) =====
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (window.matchMedia('(hover: hover)').matches && cursorFollower && cursorDot) {
        let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX; mouseY = e.clientY;
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

        const hoverElements = document.querySelectorAll('a, button, .facility-card, .hours-card, .treatment-card, .glass-contact-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                cursorFollower.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                cursorDot.style.backgroundColor = '#ffffff';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            el.addEventListener('mouseleave', function() {
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

    // ===== NAVBAR SCROLL EFFECT & PARALLAX =====
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    const heroBg = document.querySelector('.facilities-hero-bg');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        if (navbar) {
            if (scrollY > 50) { navbar.classList.add('scrolled', 'glass-nav'); } 
            else { navbar.classList.remove('scrolled', 'glass-nav'); }
        }
        
        if(heroBg && scrollY < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
        
        if (backToTop) {
            if (scrollY > 600) { backToTop.classList.add('visible'); } 
            else { backToTop.classList.remove('visible'); }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const menuClose = document.querySelector('.menu-close');

    const closeMenu = () => {
        if(menuToggle) {
            menuToggle.classList.remove('active');
            const lines = menuToggle.querySelectorAll('.menu-line');
            if(lines.length === 3) {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[1].style.transform = 'none';
                lines[2].style.transform = 'none';
            }
        }
        if(fullscreenMenu) fullscreenMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (menuToggle && fullscreenMenu && menuClose) {
        menuToggle.addEventListener('click', function() {
            if(!this.classList.contains('active')) {
                this.classList.add('active');
                fullscreenMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
                const lines = this.querySelectorAll('.menu-line');
                if(lines.length === 3) {
                    lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    lines[1].style.opacity = '0';
                    lines[1].style.transform = 'translateX(-20px)';
                    lines[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
                }
            } else { closeMenu(); }
        });
        menuClose.addEventListener('click', closeMenu);
    }

    // ===== AOS INITIALIZATION =====
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, easing: 'ease-out-quint', once: true, offset: 50 });
    }

    // ===== SWIPER TREATMENTS =====
    if (document.querySelector('.treatmentsSwiper')) {
        const treatmentsSwiper = new Swiper('.treatmentsSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // ===== HOURS CARD ANIMATION =====
    const hoursCards = document.querySelectorAll('.hours-card');
    hoursCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.hours-icon');
            if(icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.hours-icon');
            if(icon) icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});
