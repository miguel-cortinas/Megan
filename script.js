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
    // setupScrollAnimations();
    setupCountdown();
    setupMusicBubble(); // Agregar esta línea
    initializeGalleryImproved();
    initializeSectionAnimations();
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

// =================================== 
// GALERÍA MEJORADA
// ===================================

let currentGalleryIndex = 0;
let galleryItems = [];
let isGalleryAutoPlay = true;
let galleryAutoPlayInterval = null;

function setupGalleryImproved() {
    const galleryGrid = document.getElementById('gallery-grid');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const indicators = document.querySelectorAll('.gallery-indicator');
    
    if (!galleryGrid) return;
    
    galleryItems = document.querySelectorAll('.gallery-item');
    
    // Configurar navegación con botones
    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateGallery('prev'));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateGallery('next'));
    }
    
    // Configurar indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => navigateGallery(index));
    });
    
    // Configurar click en imágenes para lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = item.querySelector('img');
            const title = item.querySelector('.gallery-overlay h4')?.textContent || `Foto ${index + 1}`;
            openLightboxImproved(img.src, title, index);
        });
    });
    
    // Configurar scroll del carrusel
    setupGalleryScroll();
    
    // Configurar auto-play (opcional)
    startGalleryAutoPlay();
    
    // Pausar auto-play cuando el usuario interactúa
    galleryGrid.addEventListener('mouseenter', stopGalleryAutoPlay);
    galleryGrid.addEventListener('mouseleave', startGalleryAutoPlay);
    
    // Configurar navegación con teclado
    document.addEventListener('keydown', handleGalleryKeyboard);
}

function navigateGallery(direction) {
    const totalItems = galleryItems.length;
    
    if (typeof direction === 'number') {
        currentGalleryIndex = direction;
    } else if (direction === 'next') {
        currentGalleryIndex = (currentGalleryIndex + 1) % totalItems;
    } else if (direction === 'prev') {
        currentGalleryIndex = (currentGalleryIndex - 1 + totalItems) % totalItems;
    }
    
    scrollToGalleryItem(currentGalleryIndex);
    updateGalleryIndicators();
    updateGalleryCounter();
}

function scrollToGalleryItem(index) {
    const galleryGrid = document.getElementById('gallery-grid');
    const targetItem = galleryItems[index];
    
    if (galleryGrid && targetItem) {
        const itemWidth = targetItem.offsetWidth;
        const gap = 25; // Gap entre items
        const scrollPosition = (itemWidth + gap) * index;
        
        galleryGrid.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
}

function updateGalleryIndicators() {
    const indicators = document.querySelectorAll('.gallery-indicator');
    
    indicators.forEach((indicator, index) => {
        if (index === currentGalleryIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function updateGalleryCounter() {
    const currentSpan = document.querySelector('.gallery-counter .current');
    if (currentSpan) {
        currentSpan.textContent = currentGalleryIndex + 1;
    }
}

function setupGalleryScroll() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    if (!galleryGrid) return;
    
    let isScrolling = false;
    let scrollTimeout;
    
    galleryGrid.addEventListener('scroll', function() {
        if (isScrolling) return;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateCurrentIndexFromScroll();
        }, 150);
    });
    
    // Soporte para touch/swipe
    let startX = 0;
    let isTouch = false;
    
    galleryGrid.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isTouch = true;
        stopGalleryAutoPlay();
    });
    
    galleryGrid.addEventListener('touchmove', function(e) {
        if (!isTouch) return;
        e.preventDefault();
    });
    
    galleryGrid.addEventListener('touchend', function(e) {
        if (!isTouch) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Mínimo swipe distance
            if (diff > 0) {
                navigateGallery('next');
            } else {
                navigateGallery('prev');
            }
        }
        
        isTouch = false;
        startGalleryAutoPlay();
    });
}

function updateCurrentIndexFromScroll() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    const scrollLeft = galleryGrid.scrollLeft;
    const itemWidth = galleryItems[0]?.offsetWidth || 320;
    const gap = 25;
    
    const newIndex = Math.round(scrollLeft / (itemWidth + gap));
    
    if (newIndex !== currentGalleryIndex && newIndex >= 0 && newIndex < galleryItems.length) {
        currentGalleryIndex = newIndex;
        updateGalleryIndicators();
        updateGalleryCounter();
    }
}

function startGalleryAutoPlay() {
    if (!isGalleryAutoPlay) return;
    
    stopGalleryAutoPlay(); // Limpiar interval existente
    
    galleryAutoPlayInterval = setInterval(() => {
        navigateGallery('next');
    }, 4000); // Cambiar cada 4 segundos
}

function stopGalleryAutoPlay() {
    if (galleryAutoPlayInterval) {
        clearInterval(galleryAutoPlayInterval);
        galleryAutoPlayInterval = null;
    }
}

function handleGalleryKeyboard(e) {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox && lightbox.style.display !== 'none') return; // Si el lightbox está abierto, no manejar
    
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateGallery('prev');
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateGallery('next');
    }
}

// Lightbox mejorado
function openLightboxImproved(src, title, index) {
    // Crear lightbox si no existe
    let lightbox = document.querySelector('.lightbox');
    
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="" alt="">
                <button class="lightbox-close" aria-label="Cerrar">&times;</button>
                <div class="lightbox-nav">
                    <button class="lightbox-prev" aria-label="Anterior">‹</button>
                    <button class="lightbox-next" aria-label="Siguiente">›</button>
                </div>
                <div class="lightbox-info">
                    <h3></h3>
                    <p class="lightbox-counter"></p>
                </div>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Event listeners para el lightbox
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        closeBtn.addEventListener('click', closeLightboxImproved);
        prevBtn.addEventListener('click', () => navigateLightbox('prev'));
        nextBtn.addEventListener('click', () => navigateLightbox('next'));
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightboxImproved();
            }
        });
        
        // Navegación con teclado en lightbox
        document.addEventListener('keydown', handleLightboxKeyboard);
    }
    
    // Actualizar contenido
    const img = lightbox.querySelector('img');
    const titleElement = lightbox.querySelector('h3');
    const counter = lightbox.querySelector('.lightbox-counter');
    
    img.src = src;
    img.alt = title;
    titleElement.textContent = title;
    counter.textContent = `${index + 1} de ${galleryItems.length}`;
    
    // Mostrar lightbox
    lightbox.style.display = 'flex';
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 10);
    
    // Guardar índice actual para navegación
    lightbox.dataset.currentIndex = index;
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

function closeLightboxImproved() {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;
    
    lightbox.classList.remove('show');
    
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }, 400);
}

function navigateLightbox(direction) {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;
    
    let currentIndex = parseInt(lightbox.dataset.currentIndex);
    const totalItems = galleryItems.length;
    
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % totalItems;
    } else if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    }
    
    const item = galleryItems[currentIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-overlay h4')?.textContent || `Foto ${currentIndex + 1}`;
    
    // Actualizar lightbox
    const lightboxImg = lightbox.querySelector('img');
    const titleElement = lightbox.querySelector('h3');
    const counter = lightbox.querySelector('.lightbox-counter');
    
    lightboxImg.src = img.src;
    lightboxImg.alt = title;
    titleElement.textContent = title;
    counter.textContent = `${currentIndex + 1} de ${totalItems}`;
    lightbox.dataset.currentIndex = currentIndex;
}

function handleLightboxKeyboard(e) {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox || !lightbox.classList.contains('show')) return;
    
    e.preventDefault();
    
    switch(e.key) {
        case 'Escape':
            closeLightboxImproved();
            break;
        case 'ArrowLeft':
            navigateLightbox('prev');
            break;
        case 'ArrowRight':
            navigateLightbox('next');
            break;
    }
}

// Intersection Observer para animaciones de la galería
function setupGalleryAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('gallery-section')) {
                // Animar items de la galería con retraso escalonado
                const galleryItems = entry.target.querySelectorAll('.gallery-item');
                galleryItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    const gallerySection = document.querySelector('.gallery-section');
    if (gallerySection) {
        observer.observe(gallerySection);
    }
}

// Función para pausar/reanudar autoplay basado en visibilidad
function setupGalleryVisibilityHandlers() {
    // Pausar cuando la pestaña no está visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopGalleryAutoPlay();
        } else {
            if (isGalleryAutoPlay) {
                startGalleryAutoPlay();
            }
        }
    });
    
    // Pausar cuando se hace scroll fuera de la galería
    const gallerySection = document.querySelector('.gallery-section');
    if (gallerySection) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (isGalleryAutoPlay) {
                        startGalleryAutoPlay();
                    }
                } else {
                    stopGalleryAutoPlay();
                }
            });
        }, { threshold: 0.3 });
        
        sectionObserver.observe(gallerySection);
    }
}

// Función de inicialización principal de la galería
function initializeGalleryImproved() {
    setupGalleryImproved();
    setupGalleryAnimations();
    setupGalleryVisibilityHandlers();
    
    // Configurar lazy loading mejorado para imágenes de galería
    setupGalleryLazyLoading();
}

// Lazy loading específico para la galería
function setupGalleryLazyLoading() {
    const galleryImages = document.querySelectorAll('.gallery-item img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Agregar efecto de carga
                    // img.style.filter = 'blur(5px)';
                    img.style.transition = 'filter 0.5s ease';
                    
                    img.addEventListener('load', function() {
                        img.style.filter = 'none';
                        img.parentElement.classList.add('loaded');
                    });
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        galleryImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Funciones de utilidad adicionales
function toggleGalleryAutoPlay() {
    isGalleryAutoPlay = !isGalleryAutoPlay;
    
    if (isGalleryAutoPlay) {
        startGalleryAutoPlay();
    } else {
        stopGalleryAutoPlay();
    }
    
    // Opcional: mostrar notificación del estado
    showGalleryNotification(isGalleryAutoPlay ? 'Autoplay activado' : 'Autoplay desactivado');
}

function showGalleryNotification(message) {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(50px);
        background: rgba(19, 60, 135, 0.9);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 0.9em;
        z-index: 2500;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Auto-remover
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-30px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Función para centrar la galería en un elemento específico (útil para enlaces directos)
function centerGalleryOn(index) {
    if (index >= 0 && index < galleryItems.length) {
        currentGalleryIndex = index;
        scrollToGalleryItem(index);
        updateGalleryIndicators();
        updateGalleryCounter();
    }
}

// Función para obtener metadatos de la galería (útil para compartir)
function getGalleryMetadata() {
    return {
        currentIndex: currentGalleryIndex,
        totalItems: galleryItems.length,
        autoPlay: isGalleryAutoPlay,
        currentImage: {
            src: galleryItems[currentGalleryIndex]?.querySelector('img')?.src,
            alt: galleryItems[currentGalleryIndex]?.querySelector('img')?.alt,
            title: galleryItems[currentGalleryIndex]?.querySelector('.gallery-overlay h4')?.textContent
        }
    };
}

// Agregar estilos adicionales para el lightbox mejorado
const additionalLightboxStyles = `
    .lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        display: flex;
        justify-content: space-between;
        pointer-events: none;
        padding: 0 20px;
        z-index: 5;
    }
    
    .lightbox-prev,
    .lightbox-next {
        pointer-events: all;
        width: 50px;
        height: 50px;
        background: rgba(0, 0, 0, 0.7);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.5em;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    }
    
    .lightbox-prev:hover,
    .lightbox-next:hover {
        background: rgba(255, 215, 0, 0.8);
        transform: scale(1.1);
    }
    
    .lightbox-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
        color: white;
        padding: 30px 20px 20px;
        text-align: center;
    }
    
    .lightbox-info h3 {
        margin: 0 0 5px 0;
        font-size: 1.2em;
    }
    
    .lightbox-counter {
        margin: 0;
        font-size: 0.9em;
        opacity: 0.8;
    }
    
    .gallery-item.loaded {
        position: relative;
    }
    
    .gallery-item.loaded::after {
        content: '';
        position: absolute;
        top: 10px;
        right: 10px;
        width: 8px;
        height: 8px;
        background: var(--accent-color);
        border-radius: 50%;
        opacity: 0.8;
        box-shadow: 0 0 10px var(--accent-color);
    }
    
    @media (max-width: 768px) {
        .lightbox-nav {
            padding: 0 10px;
        }
        
        .lightbox-prev,
        .lightbox-next {
            width: 40px;
            height: 40px;
            font-size: 1.3em;
        }
        
        .lightbox-info {
            padding: 20px 15px 15px;
        }
        
        .lightbox-info h3 {
            font-size: 1.1em;
        }
    }
`;

// Agregar los estilos adicionales al documento
const additionalStyleSheet = document.createElement('style');
additionalStyleSheet.textContent = additionalLightboxStyles;
document.head.appendChild(additionalStyleSheet);

// Limpiar recursos al cerrar la página
window.addEventListener('beforeunload', function() {
    stopGalleryAutoPlay();
});

// =================================== 
// ANIMACIONES DE NAVEGACIÓN ENTRE SECCIONES
// ===================================

// Variables para el control de animaciones
let currentSection = 0;
let isAnimating = false;
let sectionObserver = null;
let parallaxElements = [];

// Inicializar animaciones de navegación
function setupSectionAnimations() {
    setupSmoothScroll();
    setupParallaxEffect();
    setupSectionTransitions();
    setupProgressIndicator();
    setupActiveNavigation();
    setupKeyboardNavigation();
}

// =================================== 
// SMOOTH SCROLL MEJORADO
// ===================================

function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-menu a, a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (isAnimating) return;
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                isAnimating = true;
                smoothScrollToSection(targetSection);
            }
        });
    });
}

function smoothScrollToSection(targetSection) {
    // Calcular la posición del navbar
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    // Posición objetivo
    const targetPosition = targetSection.offsetTop - navbarHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = Math.min(Math.abs(distance) / 2, 1500); // Máximo 1.5s
    
    // Función de easing personalizada
    const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    
    let start = null;
    
    const step = (timestamp) => {
        if (!start) start = timestamp;
        
        const progress = Math.min((timestamp - start) / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            isAnimating = false;
            // Trigger entrance animations for the target section
            triggerSectionEntranceAnimations(targetSection);
        }
    };
    
    requestAnimationFrame(step);
}

// =================================== 
// EFECTOS PARALLAX
// ===================================

function setupParallaxEffect() {
    parallaxElements = [
        {
            element: document.querySelector('.hero-section'),
            speed: 0.5,
            type: 'background'
        },
        {
            element: document.querySelector('.invitation-bg'),
            speed: 0.3,
            type: 'background'
        },
        {
            element: document.querySelector('.countdown-bg'),
            speed: 0.4,
            type: 'background'
        },
        {
            element: document.querySelector('.rsvp-bg'),
            speed: 0.3,
            type: 'background'
        }
    ].filter(item => item.element !== null);
    
    // Parallax suave en scroll
    const handleParallax = () => {
        if (isAnimating) return;
        
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(item => {
            if (isElementInViewport(item.element)) {
                const elementTop = item.element.offsetTop;
                const elementHeight = item.element.offsetHeight;
                const windowHeight = window.innerHeight;
                
                // Calcular el offset parallax
                const yPos = -(scrolled - elementTop) * item.speed;
                
                if (item.type === 'background') {
                    item.element.style.transform = `translateY(${yPos}px)`;
                } else {
                    item.element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            }
        });
    };
    
    // Throttle para mejor performance
    let ticking = false;
    const requestTick = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// =================================== 
// TRANSICIONES ENTRE SECCIONES
// ===================================

function setupSectionTransitions() {
    const sections = document.querySelectorAll('section, .hero-section');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
    };
    
    sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-active');
                triggerSectionEntranceAnimations(entry.target);
                updateCurrentSection(entry.target);
            } else {
                entry.target.classList.remove('section-active');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.classList.add('section-fade');
        sectionObserver.observe(section);
    });
}

function triggerSectionEntranceAnimations(section) {
    const sectionId = section.id;
    
    // Animaciones específicas por sección
    switch(sectionId) {
        case 'inicio':
            animateHeroElements();
            break;
        case 'invitacion':
            animateInvitationElements();
            break;
        case 'contador':
            animateCountdownElements();
            break;
        case 'confirmacion':
            animateRSVPElements();
            break;
        case 'ubicacion':
            animateLocationElements();
            break;
        case 'dresscode':
            animateDresscodeElements();
            break;
        case 'regalos':
            animateGiftsElements();
            break;
        case 'dedicatoria':
            animateDedicationElements();
            break;
        case 'galeria':
            animateGalleryElements();
            break;
    }
    
    // Animaciones generales para elementos comunes
    animateCommonElements(section);
}

// Animaciones específicas por sección
function animateHeroElements() {
    const elements = [
        '.hero-subtitle',
        '.hero-title', 
        '.hero-date',
        '.scroll-indicator'
    ];
    
    elements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}

function animateInvitationElements() {
    const textElements = document.querySelectorAll('.invitation-text');
    const signature = document.querySelector('.invitation-section .signature');
    
    textElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, index * 300);
    });
    
    if (signature) {
        setTimeout(() => {
            signature.style.opacity = '0';
            signature.style.transform = 'scale(0.8)';
            signature.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            signature.style.opacity = '1';
            signature.style.transform = 'scale(1)';
        }, 600);
    }
}

function animateCountdownElements() {
    const countdownItems = document.querySelectorAll('.countdown-item');
    
    countdownItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
            
            // Efecto de pulsación para los números
            const number = item.querySelector('span');
            if (number) {
                setTimeout(() => {
                    number.style.animation = 'numberPulse 0.8s ease';
                }, 200);
            }
        }, index * 150);
    });
}

function animateRSVPElements() {
    const content = document.querySelector('.rsvp-content p');
    const buttons = document.querySelectorAll('.rsvp-btn');
    
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(30px)';
        content.style.transition = 'all 0.6s ease';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }
    
    buttons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(30px) scale(0.9)';
        
        setTimeout(() => {
            btn.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0) scale(1)';
        }, (index + 1) * 200);
    });
}

function animateLocationElements() {
    const cards = document.querySelectorAll('.location-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateY(10deg)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotateY(0deg)';
        }, index * 200);
    });
}

function animateDresscodeElements() {
    const cards = document.querySelectorAll('.dresscode-card');
    const note = document.querySelector('.dresscode-note');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(' + (index % 2 === 0 ? '-50px' : '50px') + ')';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, index * 200);
    });
    
    if (note) {
        setTimeout(() => {
            note.style.opacity = '0';
            note.style.transform = 'translateY(30px)';
            note.style.transition = 'all 0.6s ease';
            note.style.opacity = '1';
            note.style.transform = 'translateY(0)';
        }, 400);
    }
}

function animateGiftsElements() {
    const intro = document.querySelector('.gifts-intro');
    const cards = document.querySelectorAll('.gift-card');
    
    if (intro) {
        intro.style.opacity = '0';
        intro.style.transform = 'translateY(20px)';
        intro.style.transition = 'all 0.6s ease';
        intro.style.opacity = '1';
        intro.style.transform = 'translateY(0)';
    }
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.9)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, (index + 1) * 150);
    });
}

function animateDedicationElements() {
    const intro = document.querySelector('.dedication-intro');
    const parentCards = document.querySelectorAll('.parent-card');
    const heart = document.querySelector('.dedication-heart');
    const message = document.querySelector('.dedication-message');
    const signature = document.querySelector('.dedication-signature');
    
    if (intro) {
        intro.style.opacity = '0';
        intro.style.transform = 'translateY(30px)';
        intro.style.transition = 'all 0.8s ease';
        intro.style.opacity = '1';
        intro.style.transform = 'translateY(0)';
    }
    
    setTimeout(() => {
        parentCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.8)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 200);
        });
        
        if (heart) {
            setTimeout(() => {
                heart.style.opacity = '0';
                heart.style.transform = 'scale(0)';
                heart.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                heart.style.opacity = '1';
                heart.style.transform = 'scale(1)';
            }, 300);
        }
    }, 300);
    
    if (message) {
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translateY(30px)';
            message.style.transition = 'all 0.8s ease';
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, 800);
    }
    
    if (signature) {
        setTimeout(() => {
            signature.style.opacity = '0';
            signature.style.transform = 'translateY(20px)';
            signature.style.transition = 'all 0.8s ease';
            signature.style.opacity = '1';
            signature.style.transform = 'translateY(0)';
        }, 1000);
    }
}

function animateGalleryElements() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const navButtons = document.querySelectorAll('.gallery-nav-btn');
    const indicators = document.querySelectorAll('.gallery-indicator');
    
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8) translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            item.style.opacity = '1';
            item.style.transform = 'scale(1) translateY(0)';
        }, index * 100);
    });
    
    setTimeout(() => {
        [...navButtons, ...indicators].forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.4s ease';
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }, index * 50);
        });
    }, 600);
}

function animateCommonElements(section) {
    // Animar separadores
    const separator = section.nextElementSibling;
    if (separator && separator.classList.contains('section-separator')) {
        separator.style.opacity = '0';
        separator.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            separator.style.transition = 'all 0.6s ease';
            separator.style.opacity = '1';
            separator.style.transform = 'scale(1)';
        }, 500);
    }
    
    // Animar títulos de sección
    const sectionHeader = section.querySelector('.section-header h2');
    if (sectionHeader) {
        sectionHeader.style.opacity = '0';
        sectionHeader.style.transform = 'translateY(-20px)';
        sectionHeader.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        sectionHeader.style.opacity = '1';
        sectionHeader.style.transform = 'translateY(0)';
    }
    
    const divider = section.querySelector('.section-divider');
    if (divider) {
        divider.style.width = '0';
        setTimeout(() => {
            divider.style.transition = 'width 0.8s ease';
            divider.style.width = '80px';
        }, 300);
    }
}

// =================================== 
// INDICADOR DE PROGRESO
// ===================================

function setupProgressIndicator() {
    // Crear indicador de progreso
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    const progressFill = progressBar.querySelector('.progress-fill');
    
    const updateProgress = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressFill.style.width = scrolled + '%';
    };
    
    window.addEventListener('scroll', updateProgress, { passive: true });
}

// =================================== 
// NAVEGACIÓN ACTIVA
// ===================================

function setupActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    const updateActiveNav = () => {
        const sections = document.querySelectorAll('section, .hero-section');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        let currentActive = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentActive = section.id || 'inicio';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentActive}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', updateActiveNav, { passive: true });
}

// =================================== 
// NAVEGACIÓN CON TECLADO
// ===================================

function setupKeyboardNavigation() {
    const sections = Array.from(document.querySelectorAll('section, .hero-section'));
    let currentSectionIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (isAnimating) return;
        
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                if (currentSectionIndex < sections.length - 1) {
                    currentSectionIndex++;
                    scrollToSectionByIndex(currentSectionIndex);
                }
                break;
                
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                if (currentSectionIndex > 0) {
                    currentSectionIndex--;
                    scrollToSectionByIndex(currentSectionIndex);
                }
                break;
                
            case 'Home':
                e.preventDefault();
                currentSectionIndex = 0;
                scrollToSectionByIndex(0);
                break;
                
            case 'End':
                e.preventDefault();
                currentSectionIndex = sections.length - 1;
                scrollToSectionByIndex(sections.length - 1);
                break;
        }
    });
}

function scrollToSectionByIndex(index) {
    const sections = document.querySelectorAll('section, .hero-section');
    const targetSection = sections[index];
    
    if (targetSection) {
        smoothScrollToSection(targetSection);
    }
}

// =================================== 
// UTILIDADES
// ===================================

function updateCurrentSection(section) {
    const sections = Array.from(document.querySelectorAll('section, .hero-section'));
    currentSection = sections.indexOf(section);
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// =================================== 
// EFECTOS ADICIONALES
// ===================================

// Efecto de ondas al hacer clic en botones
function setupRippleEffect() {
    const buttons = document.querySelectorAll('.rsvp-btn, .location-btn, .gift-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Inicializar todas las animaciones
function initializeSectionAnimations() {
    setupSectionAnimations();
    setupRippleEffect();
}

// Integrar con la función principal de inicialización
// Agregar esta línea al final de initializeApp() en el archivo script.js principal:
// initializeSectionAnimations();