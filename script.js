// Variables globales
let countdownInterval = null;
let backgroundMusic = null;
let musicInitialized = false;
const eventDate = new Date("September 19, 2025 18:00:00").getTime();

// Inicialización cuando la página carga
window.addEventListener('load', function() {
    initializeApp();
});

function initializeApp() {
    setupLetterOpening();
    setupNavigation();
    setupScrollAnimations();
    setupCountdown();
    setupMusicBubble(); // Agregar esta línea
}

// =================================== 
// BURBUJA DE MÚSICA
// ===================================

function setupMusicBubble() {
    const musicBubble = document.getElementById('music-bubble');
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    
    if (!musicBubble || !musicToggle || !backgroundMusic) {
        console.log('Elementos de música no encontrados');
        return;
    }

    // Mostrar la burbuja después de abrir la invitación
    setTimeout(() => {
        musicBubble.classList.add('show');
    }, 3000);

    // Click handler para toggle de música
    musicToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMusic();
    });

    // También hacer que toda la burbuja sea clickeable
    musicBubble.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMusic();
    });

    // Configurar el audio
    backgroundMusic.volume = 0.3; // Volumen al 30%
    backgroundMusic.preload = 'auto';
}

function toggleMusic() {
    const musicBubble = document.getElementById('music-bubble');
    const backgroundMusic = document.getElementById('background-music');
    
    if (!backgroundMusic || !musicBubble) return;

    if (backgroundMusic.paused) {
        // Reproducir música
        backgroundMusic.play().then(() => {
            musicBubble.classList.add('playing');
            console.log('Música iniciada');
        }).catch(error => {
            console.error('Error al reproducir música:', error);
            // Si no se puede reproducir, mostrar mensaje elegante al usuario
            showAutoplayMessage();
        });
    } else {
        // Pausar música
        backgroundMusic.pause();
        musicBubble.classList.remove('playing');
        console.log('Música pausada');
    }
}

function showAutoplayMessage() {
    // Crear notificación elegante para invitar a activar la música
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: linear-gradient(135deg, #133C87, #658ced);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-size: 14px;
        z-index: 2000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        max-width: 250px;
        font-family: 'Playfair Display', serif;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 18px;">🎵</span>
            <div>
                <div style="font-weight: bold; margin-bottom: 3px;">¡Música disponible!</div>
                <div style="font-size: 12px; opacity: 0.9;">Haz clic para activar</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Click para activar música
    notification.addEventListener('click', function() {
        const backgroundMusic = document.getElementById('background-music');
        const musicBubble = document.getElementById('music-bubble');
        
        if (backgroundMusic) {
            backgroundMusic.play().then(() => {
                musicBubble.classList.add('playing');
                // Ocultar notificación
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            });
        }
    });
    
    // Auto-ocultar después de 8 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 8000);
}

// =================================== 
// APERTURA DE CARTA
// ===================================

function setupLetterOpening() {
    const openLetterBtn = document.getElementById('open-letter-btn');
    const letterOpening = document.getElementById('letter-opening');
    const mainContent = document.getElementById('main-content');
    const navbar = document.getElementById('navbar');
    const envelopeWrapper = document.getElementById('envelope-wrapper');

    if (openLetterBtn && envelopeWrapper) {
        // Click en el botón
        openLetterBtn.addEventListener('click', function() {
            openInvitation(letterOpening, mainContent, navbar);
        });
        
        // Hacer que el sobre también sea clickeable
        envelopeWrapper.addEventListener('click', function() {
            openInvitation(letterOpening, mainContent, navbar);
        });
    }
}

function openInvitation(letterOpening, mainContent, navbar) {
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const openLetterBtn = document.getElementById('open-letter-btn');

    // Animar sobre
    envelopeWrapper.classList.add('opening');
    
    // Desvanecer botón
    openLetterBtn.style.opacity = '0';
    openLetterBtn.style.transform = 'scale(0.8)';

    setTimeout(() => {
        // Desvanecer pantalla de apertura
        letterOpening.classList.add('opening');
        
        setTimeout(() => {
            // Mostrar contenido principal
            letterOpening.style.display = 'none';
            mainContent.classList.add('show');
            navbar.classList.add('show');
            
            // Iniciar animaciones de entrada
            startHeroAnimations();
            
            // Mostrar burbuja de música y reproducir automáticamente
            setTimeout(() => {
                const musicBubble = document.getElementById('music-bubble');
                const backgroundMusic = document.getElementById('background-music');
                
                if (musicBubble) {
                    musicBubble.classList.add('show');
                }
                
                // Intentar reproducir música automáticamente
                if (backgroundMusic) {
                    backgroundMusic.play().then(() => {
                        console.log('Música iniciada automáticamente');
                        musicBubble.classList.add('playing');
                    }).catch(error => {
                        console.log('Autoplay bloqueado por el navegador:', error);
                        // Si no se puede reproducir automáticamente, mostrar un mensaje sutil
                        showAutoplayMessage();
                    });
                }
            }, 1500);
            
        }, 1000);
    }, 1000);
}

function startHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-subtitle, .hero-title, .hero-date');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 500);
    });

    // Mostrar indicador de scroll
    setTimeout(() => {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '1';
        }
    }, 2000);
}

// =================================== 
// NAVEGACIÓN
// ===================================

function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle menú hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// =================================== 
// ANIMACIONES DE SCROLL
// ===================================

function setupScrollAnimations() {
    // Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animaciones específicas para elementos del contador
                if (entry.target.classList.contains('countdown-section')) {
                    animateCountdownItems();
                }
                
                // Animaciones para tarjetas de galería
                if (entry.target.classList.contains('gallery-section')) {
                    animateGalleryItems();
                }
            }
        });
    }, observerOptions);

    // Observar todas las secciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

function animateCountdownItems() {
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

function animateGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, index * 100);
    });
}

// =================================== 
// CONTADOR REGRESIVO
// ===================================

function setupCountdown() {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        showCountdownFinished();
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualizar elementos con animación
    updateCountdownElement('days', days);
    updateCountdownElement('hours', hours);
    updateCountdownElement('minutes', minutes);
    updateCountdownElement('seconds', seconds);
}

function updateCountdownElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        const formattedValue = value.toString().padStart(2, '0');
        if (element.textContent !== formattedValue) {
            element.style.transform = 'scale(1.1)';
            element.textContent = formattedValue;
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
        }
    }
}

function showCountdownFinished() {
    const countdownContainer = document.getElementById('countdown');
    if (countdownContainer) {
        countdownContainer.innerHTML = `
            <div class="countdown-finished">
                <h2>¡Ya es el día de la fiesta! 🎉</h2>
                <p>¡Nos vemos en la celebración!</p>
            </div>
        `;
    }
}

// =================================== 
// EFECTOS ADICIONALES
// ===================================

// Parallax effect para hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection && window.innerWidth > 768) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Efecto de typing para el título
function typewriterEffect(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    
    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    }
    
    typeChar();
}

// Lazy loading para imágenes de galería
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Funciones de utilidad
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimización de scroll
const optimizedScroll = debounce(() => {
    // Lógica de scroll optimizada
}, 16);

window.addEventListener('scroll', optimizedScroll);

// =================================== 
// INTERACCIONES ADICIONALES
// ===================================

// Click en elementos de galería
document.addEventListener('click', function(e) {
    if (e.target.closest('.gallery-item')) {
        const item = e.target.closest('.gallery-item');
        const img = item.querySelector('img');
        openLightbox(img.src, img.alt);
    }
});

function openLightbox(src, alt) {
    // Crear lightbox simple
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Cerrar lightbox
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            document.body.removeChild(lightbox);
        }
    });
    
    // Animar entrada
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 10);
}

// Estilos para lightbox (agregar al final del CSS)
const lightboxStyles = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox.show {
        opacity: 1;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2em;
        cursor: pointer;
    }
`;

// Agregar estilos al head
const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxStyles;
document.head.appendChild(styleSheet);

// Limpiar interval al cerrar la página
window.addEventListener('beforeunload', function() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
});

// Función para manejar autoplay en móviles y mejorar compatibilidad
document.addEventListener('DOMContentLoaded', function() {
    // Preparar audio para autoplay
    const backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic) {
        // Configurar el audio para mejor compatibilidad
        backgroundMusic.volume = 0.4;
        backgroundMusic.muted = false;
        
        // Precargar el audio
        backgroundMusic.load();
        
        // Intentar "calentar" el contexto de audio en la primera interacción
        const enableAudio = () => {
            // Crear y reproducir un audio silencioso para activar el contexto
            backgroundMusic.play().then(() => {
                backgroundMusic.pause();
                backgroundMusic.currentTime = 0;
            }).catch(() => {
                // Si falla, no hacer nada
            });
        };
        
        // Escuchar la primera interacción para preparar el audio
        document.addEventListener('click', enableAudio, { once: true });
        document.addEventListener('touchstart', enableAudio, { once: true });
    }
});