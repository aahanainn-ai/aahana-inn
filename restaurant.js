/**
 * Sandhya Sagar Restaurant - JavaScript
 * Features Menu Filtering, Reservation Logic, Mobile Menu Fix, and Smooth Animations
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.classList.add('hidden');
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

        const hoverElements = document.querySelectorAll('a, button, .menu-item, .glass-contact-item, select, input');
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

    // ===== PARALLAX & NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    const heroParallax = document.getElementById('hero-parallax');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        if (navbar) {
            if (scrollY > 50) { navbar.classList.add('scrolled', 'glass-nav'); } 
            else { navbar.classList.remove('scrolled', 'glass-nav'); }
        }
        if(heroParallax && scrollY < window.innerHeight) {
            heroParallax.style.transform = `translateY(${scrollY * 0.4}px)`;
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

    // ===== MOBILE MENU TOGGLE (RESTORED FIX) =====
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

    // ===== MENU FILTERING LOGIC =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    if(filterBtns.length > 0 && menuItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                menuItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        if(filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            item.style.display = 'none';
                        }
                    }, 300);
                });
                
                setTimeout(() => {
                    if (typeof AOS !== 'undefined') AOS.refresh();
                }, 400);
            });
        });
    }

    // ===== RESERVATION FORM SUBMISSION =====
    const resDateInput = document.getElementById('resDate');
    if (resDateInput) {
        const today = new Date().toISOString().split('T')[0];
        resDateInput.setAttribute('min', today);
    }

    const tableForm = document.getElementById('tableForm');
    if (tableForm) {
        tableForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Securing Table...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Reservation Confirmed!';
                btn.style.background = 'linear-gradient(135deg, #27AE60, #2ECC71)';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    tableForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // ===== AOS INITIALIZATION =====
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, easing: 'ease-out-quint', once: true, offset: 50 });
    }
});