// ==================== EVENT HANDLERS ====================
function downloadLauncher(platform) {
    const downloads = {
        windows: {
            name: 'Windows',
            file: 'VinoLauncher-Setup-2.5.1.exe',
            size: '15.2 MB'
        },
        macos: {
            name: 'macOS',
            file: 'VinoLauncher-2.5.1.dmg',
            size: '16.8 MB'
        },
        linux: {
            name: 'Linux',
            file: 'VinoLauncher-2.5.1.AppImage',
            size: '14.5 MB'
        }
    };

    const download = downloads[platform];
    if (download) {
        alert(`Downloading Vino Launcher for ${download.name}...\n\nFile: ${download.file}\nSize: ${download.size}\n\nThis is a demo. In a real website, this would trigger a file download.`);
        
        // In a real implementation, you would:
        // window.location.href = `/downloads/${download.file}`;
        // or use fetch to trigger download
    }
}

function scrollToDownloads() {
    const element = document.querySelector('#download');
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Navigation smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Smooth scroll
                if (href === '#home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    smoothScroll(href);
                }
            }
        });
    });

    // Update active nav link on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollPosition = window.scrollY + 100;
                
                const sections = ['#download', '#features', '#about'];
                let currentSection = '#home';
                
                sections.forEach(section => {
                    const element = document.querySelector(section);
                    if (element && element.offsetTop <= scrollPosition) {
                        currentSection = section;
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === currentSection) {
                        link.classList.add('active');
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .download-card, .stat-item, .about-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add entrance animation delay for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add entrance animation delay for download cards
    const downloadCards = document.querySelectorAll('.download-card');
    downloadCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - scrolled / 600;
        }
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn, .download-platform-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Counter animation for stats
    const animateCounter = (element, target) => {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString() + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString() + '+';
            }
        };
        
        updateCounter();
    };

    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const text = statNumber.textContent;
                const value = parseInt(text.replace(/\D/g, ''));
                
                if (value && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(statNumber, value);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    console.log('🍷 Vino Launcher website initialized successfully!');
    console.log('✨ Advanced animations loaded!');
});

// Add ripple animation to CSS
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

// Make functions available globally
window.downloadLauncher = downloadLauncher;
window.scrollToDownloads = scrollToDownloads;
