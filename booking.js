/**
 * Aahana Inn - Booking Page JavaScript
 * Handles Dynamic Price Calculation, Form Validation, and WhatsApp Redirect
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.display = 'none', 800);
            }
        }, 500);
    });

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

        const hoverElements = document.querySelectorAll('a, button, input, select, textarea, .addon-checkbox');
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

    // ===== BOOKING LOGIC & DYNAMIC CALCULATION =====
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const roomTypeSelect = document.getElementById('roomType');
    const addonInputs = document.querySelectorAll('.addon-input');
    
    // UI Elements for Summary
    const summaryRoomName = document.getElementById('summaryRoomName');
    const summaryCheckin = document.getElementById('summaryCheckin');
    const summaryCheckout = document.getElementById('summaryCheckout');
    const summaryNights = document.getElementById('summaryNights');
    const calcNights = document.getElementById('calcNights');
    const summaryRoomPrice = document.getElementById('summaryRoomPrice');
    const summaryAddonsPrice = document.getElementById('summaryAddonsPrice');
    const summaryTaxes = document.getElementById('summaryTaxes');
    const summaryTotal = document.getElementById('summaryTotal');
    const summaryRoomImg = document.getElementById('summaryRoomImg');

    // Room Image Map based on value
    const roomImages = {
        "2999": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80",
        "4999": "https://www.theleela.com/prod/content/assets/aio-banner/dekstop/Executive%20Suite_1920x950_2.webp?VersionId=.kCoSyanxZv93FGz6aylspbrO6ABiv8d",
        "5999": "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=400&q=80",
        "6999": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80",
        "12999": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=400&q=80"
    };

    const formatCurrency = (amount) => {
        return '₹' + amount.toLocaleString('en-IN');
    };

    const calculateTotals = () => {
        // 1. Calculate Nights
        let nights = 1;
        if (checkinInput.value && checkoutInput.value) {
            const date1 = new Date(checkinInput.value);
            const date2 = new Date(checkoutInput.value);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            if (diffDays > 0) nights = diffDays;
            
            summaryCheckin.textContent = date1.toLocaleDateString();
            summaryCheckout.textContent = date2.toLocaleDateString();
        }
        
        summaryNights.textContent = `${nights} Night(s)`;
        calcNights.textContent = nights;

        // 2. Room Price Calculation
        const roomBasePrice = parseInt(roomTypeSelect.value) || 0;
        const totalRoomPrice = roomBasePrice * nights;
        
        const selectedOption = roomTypeSelect.options[roomTypeSelect.selectedIndex];
        summaryRoomName.textContent = selectedOption.getAttribute('data-name');
        summaryRoomPrice.textContent = formatCurrency(totalRoomPrice);
        if(roomImages[roomBasePrice]) {
            summaryRoomImg.src = roomImages[roomBasePrice];
        }

        // 3. Add-ons Calculation
        let addonsTotal = 0;
        addonInputs.forEach(input => {
            if(input.checked) {
                addonsTotal += parseInt(input.value);
            }
        });
        summaryAddonsPrice.textContent = formatCurrency(addonsTotal);

        // 4. Taxes & Grand Total (18% GST)
        const subtotal = totalRoomPrice + addonsTotal;
        const tax = Math.round(subtotal * 0.18);
        const grandTotal = subtotal + tax;

        summaryTaxes.textContent = formatCurrency(tax);
        summaryTotal.textContent = formatCurrency(grandTotal);
    };

    // Setup Default Dates
    if (checkinInput && checkoutInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const formatDate = (date) => date.toISOString().split('T')[0];
        
        checkinInput.value = formatDate(today);
        checkoutInput.value = formatDate(tomorrow);
        checkinInput.setAttribute('min', formatDate(today));
        
        checkinInput.addEventListener('change', function() {
            const newCheckin = new Date(this.value);
            newCheckin.setDate(newCheckin.getDate() + 1);
            checkoutInput.setAttribute('min', formatDate(newCheckin));
            if(new Date(checkoutInput.value) <= new Date(this.value)) {
                checkoutInput.value = formatDate(newCheckin);
            }
            calculateTotals();
        });

        checkoutInput.addEventListener('change', calculateTotals);
    }

    if(roomTypeSelect) roomTypeSelect.addEventListener('change', calculateTotals);
    addonInputs.forEach(input => input.addEventListener('change', calculateTotals));
    calculateTotals();

    // ===== WHATSAPP FORM SUBMISSION =====
    const bookingForm = document.getElementById('mainBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect Form Data
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const adults = document.getElementById('adultsCount').value;
            const children = document.getElementById('childrenCount').value;
            const roomName = roomTypeSelect.options[roomTypeSelect.selectedIndex].getAttribute('data-name');
            
            const addons = [];
            addonInputs.forEach(input => {
                if(input.checked) addons.push(input.getAttribute('data-name'));
            });
            const addonsText = addons.length > 0 ? addons.join(', ') : 'None';
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('guestEmail').value;
            const phone = document.getElementById('guestPhone').value;
            const requests = document.getElementById('specialRequests').value || 'None';
            const totalEstimate = document.getElementById('summaryTotal').textContent;

            // Construct WhatsApp Message Text
            const message = `*New Booking Request - Aahana Inn* 🏨\n\n` +
                            `*Guest Details:*\n` +
                            `Name: ${firstName} ${lastName}\n` +
                            `Phone: ${phone}\n` +
                            `Email: ${email}\n\n` +
                            `*Reservation Details:*\n` +
                            `Check-in: ${checkin}\n` +
                            `Check-out: ${checkout}\n` +
                            `Guests: ${adults} Adult(s), ${children} Child(ren)\n` +
                            `Room Type: ${roomName}\n` +
                            `Add-ons: ${addonsText}\n` +
                            `Special Requests: ${requests}\n\n` +
                            `*Estimated Total:* ${totalEstimate}\n\n` +
                            `Please confirm my reservation.`;
                            
            // WhatsApp API URL (Phone number 91 98765 43210)
            const whatsappUrl = `https://wa.me/9204843479?text=${encodeURIComponent(message)}`;

            // Button UI Animation
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
            btn.disabled = true;
            
            setTimeout(() => {
                // Open WhatsApp
                window.open(whatsappUrl, '_blank');
                
                // Reset Button UI
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 1000);
            }, 800);
        });
    }

    // ===== AOS INITIALIZATION =====
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, easing: 'ease-out-quint', once: true, offset: 50 });
    }
});