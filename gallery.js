/**
 * Aahana Inn - Gallery Page JavaScript
 * Handles 3D Background, Lightbox, Filtering, and Responsive Navbar
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
        }, 800); 
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

        const hoverElements = document.querySelectorAll('a, button, .gallery-item, .glass-contact-item');
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

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        if (navbar) {
            if (scrollY > 50) { navbar.classList.add('scrolled', 'glass-nav'); } 
            else { navbar.classList.remove('scrolled', 'glass-nav'); }
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

    // ===== THREE.JS 3D HERO BACKGROUND =====
    const hero3DContainer = document.getElementById('hero-3d-container');
    if (hero3DContainer && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        hero3DContainer.appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 800;
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 15;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.03,
            color: 0xD4AF37,
            transparent: true,
            opacity: 0.6
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;
            renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // ===== GALLERY DATA & RENDERING =====
    const galleryData = [
        { id: 1, title: "Presidential Suite", category: "rooms", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", size: "normal" },
        { id: 2, title: "Luxury King Room", category: "rooms", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80", size: "tall" },
        { id: 3, title: "Fine Dining Hall", category: "restaurant", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", size: "wide" },
        { id: 5, title: "Infinity Pool", category: "amenities", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80", size: "normal" },
        { id: 6, title: "Luxury Spa", category: "amenities", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80", size: "normal" },
        { id: 8, title: "Hotel Exterior", category: "exterior", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", size: "wide" },
        { id: 10, title: "Bar & Lounge", category: "restaurant", image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80", size: "normal" },
        { id: 11, title: "Fitness Center", category: "amenities", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80", size: "normal" },
        { id: 13, title: "Deluxe Room", category: "rooms", image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80", size: "normal" },
        { id: 15, title: "Poolside Dining", category: "restaurant", image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=800&q=80", size: "normal" }
    ];

    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        galleryData.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item', item.size);
            galleryItem.setAttribute('data-category', item.category);
            galleryItem.setAttribute('data-aos', 'fade-up');
            
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="gallery-item-img">
                <div class="gallery-item-icon"><i class="fas fa-expand"></i></div>
                <div class="gallery-overlay">
                    <h3 class="gallery-item-title">${item.title}</h3>
                    <p class="gallery-item-category">${item.category}</p>
                </div>
            `;
            galleryGrid.appendChild(galleryItem);
        });
    }

    // ===== GALLERY FILTER =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItemsRendered = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            galleryItemsRendered.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
            setTimeout(() => { if (typeof AOS !== 'undefined') AOS.refresh(); }, 400);
        });
    });

    // ===== LIGHTBOX FUNCTIONALITY =====
    const lightboxModal = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCategory = document.getElementById('lightbox-category');
    
    let currentImageIndex = 0;

    function openLightbox(item) {
        const imgSrc = item.querySelector('.gallery-item-img').src;
        const title = item.querySelector('.gallery-item-title').textContent;
        const category = item.querySelector('.gallery-item-category').textContent;
        
        lightboxImg.src = imgSrc;
        lightboxTitle.textContent = title;
        lightboxCategory.textContent = category;
        
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    galleryItemsRendered.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox(item);
        });
    });

    document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev')?.addEventListener('click', () => {
        const visibleItems = Array.from(galleryItemsRendered).filter(item => !item.classList.contains('hidden'));
        currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
        openLightbox(visibleItems[currentImageIndex]);
    });
    document.getElementById('lightbox-next')?.addEventListener('click', () => {
        const visibleItems = Array.from(galleryItemsRendered).filter(item => !item.classList.contains('hidden'));
        currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
        openLightbox(visibleItems[currentImageIndex]);
    });

    lightboxModal?.addEventListener('click', (e) => {
        if (e.target === lightboxModal) closeLightbox();
    });

    // ===== AOS INITIALIZATION =====
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, easing: 'ease-out-quint', once: true, offset: 50 });
    }
});