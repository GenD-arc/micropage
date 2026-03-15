document.addEventListener('DOMContentLoaded', function() {

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    const videoWrapper = document.querySelector('.video-wrapper');
    const video = document.querySelector('.video-element');

    if (video && videoWrapper) {
        videoWrapper.classList.add('loading');

        video.addEventListener('loadeddata', function() {
            videoWrapper.classList.remove('loading');
        });

        video.addEventListener('error', function() {
            videoWrapper.classList.remove('loading');
            console.error('Video failed to load. Please check the source.');
        });

        if (video.readyState >= 2) {
            videoWrapper.classList.remove('loading');
        }

        video.addEventListener('fullscreenchange', handleFullscreenChange);
        video.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        video.addEventListener('mozfullscreenchange', handleFullscreenChange);
        video.addEventListener('MSFullscreenChange', handleFullscreenChange);

        function handleFullscreenChange() {
            if (document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement) {
                video.style.objectFit = 'contain';
            } else {
                video.style.objectFit = 'contain';
            }
        }

        window.addEventListener('resize', function() {
            if (document.fullscreenElement) {
                video.style.objectFit = 'contain';
            }
        });
    }

    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                const cards = entry.target.querySelectorAll('.card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('active');
                    }, index * 80);
                });
                
                if (entry.target.classList.contains('grid-4') || 
                    entry.target.classList.contains('grid-3')) {
                    const childCards = entry.target.querySelectorAll('.card');
                    childCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('active');
                        }, index * 80);
                    });
                }
            } else {
                entry.target.classList.remove('active');
                
                const cards = entry.target.querySelectorAll('.card');
                cards.forEach(card => card.classList.remove('active'));
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const headerHeight = header.offsetHeight;
            if (scrolled < headerHeight) {
                header.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }, { passive: true });
    }

    const statBanner = document.querySelector('.stat-banner');
    if (statBanner) {
        statBanner.addEventListener('mousemove', (e) => {
            const rect = statBanner.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            statBanner.style.setProperty('--mouse-x', `${x * 20}px`);
            statBanner.style.setProperty('--mouse-y', `${y * 20}px`);
        });
    }

    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVH);
    setVH();

    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            if (video) {
                video.style.display = 'none';
                video.offsetHeight;
                video.style.display = 'block';
            }
        }, 200);
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
    });

    const btnPrimary = document.querySelector('.btn-primary');
    if (btnPrimary) {
        btnPrimary.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

});
