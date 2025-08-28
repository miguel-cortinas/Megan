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
    setupScrollAnimations(); // REPLACED with new version
    setupCountdown();
    setupMusicBubble(); 
    initializeGalleryImproved();
    setupAdvancedForm();
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
    }, 1500);
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
// ANIMACIONES DE SCROLL (REVISED)
// ===================================

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Start loading a bit before it's fully in view
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Animate only once per element
            }
        });
    }, observerOptions);

    // Find all elements with the .scroll-animate class and observe them
    const elementsToAnimate = document.querySelectorAll('.scroll-animate');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
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

    // CAMBIO INICIA: Lógica mejorada para el estado del contador.
    if (distance < 0) {
        clearInterval(countdownInterval);
        const oneDay = 1000 * 60 * 60 * 24;
        // Si ha pasado más de un día desde el evento, muestra el mensaje de agradecimiento.
        if (Math.abs(distance) > oneDay) {
            showPartyOverMessage();
        } else {
            // Si es el día del evento, muestra el mensaje de celebración.
            showCountdownFinished();
        }
        return;
    }
    // CAMBIO TERMINA

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

// CAMBIO INICIA: Nueva función para el mensaje post-evento.
function showPartyOverMessage() {
    const countdownContainer = document.getElementById('countdown');
    if (countdownContainer) {
        countdownContainer.innerHTML = `
            <div class="countdown-finished">
                <h2>¡Gracias por haberme acompañado!</h2>
                <p>Espero que hayas disfrutado la celebración tanto como yo.</p>
            </div>
        `;
    }
}
// CAMBIO TERMINA

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
        
        // CAMBIO INICIA: Eliminación del "magic number" para el gap.
        // Lee el valor del 'gap' directamente desde las propiedades CSS del contenedor.
        const gridStyle = window.getComputedStyle(galleryGrid);
        const gap = parseFloat(gridStyle.getPropertyValue('gap')) || 25; // Usa 25 como fallback.
        // CAMBIO TERMINA

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
    
    let isScrolling;
    let scrollTimeout;
    
    galleryGrid.addEventListener('scroll', function() {
        if (isScrolling) return;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateCurrentIndexFromScroll();
        }, 150);
    });
    
    // --- INICIO DE LA SOLUCIÓN: Soporte para touch/swipe mejorado ---
    let startX = 0;
    let startY = 0; // Guardamos la posición Y inicial para comparar la dirección del gesto.
    let moveX = 0;
    let moveY = 0;
    let isTouch = false;
    
    galleryGrid.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY; // Guardamos la coordenada Y inicial.
        isTouch = true;
        moveX = 0; // Reiniciamos el contador de movimiento.
        moveY = 0; // Reiniciamos el contador de movimiento.
        stopGalleryAutoPlay();
    });
    
    galleryGrid.addEventListener('touchmove', function(e) {
        if (!isTouch) return;

        // Calculamos la distancia total del movimiento en X y Y.
        moveX = e.touches[0].clientX - startX;
        moveY = e.touches[0].clientY - startY;

        // ¡Esta es la lógica clave!
        // Solo prevenimos el scroll vertical si el movimiento horizontal es MAYOR que el vertical.
        // Esto permite que el scroll de la página funcione si el gesto es principalmente hacia arriba o abajo.
        if (Math.abs(moveX) > Math.abs(moveY)) {
            e.preventDefault();
        }
    });
    
    galleryGrid.addEventListener('touchend', function(e) {
        if (!isTouch) return;
        
        const diffX = startX - e.changedTouches[0].clientX;

        // Nos aseguramos de que el gesto fue principalmente horizontal antes de cambiar de imagen.
        if (Math.abs(diffX) > 50 && Math.abs(moveX) > Math.abs(moveY)) {
            if (diffX > 0) { // Si la diferencia es positiva, el swipe fue hacia la izquierda.
                navigateGallery('next');
            } else {
                navigateGallery('prev');
            }
        }
        
        isTouch = false;
        startGalleryAutoPlay();
    });
    // --- FIN DE LA SOLUCIÓN ---
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
// MANEJO DE FORMULARIO PERSONALIZADO (NUEVO)
// ===================================
let formSubmitted = false;

function showThankYouMessage() {
    const form = document.querySelector('.custom-form-container form');
    const thankYouMessage = document.getElementById('thank-you-message');
    
    if(form && thankYouMessage) {
        form.style.display = 'none';
        thankYouMessage.style.display = 'block';
    }
}

// =================================== 
// MANEJO AVANZADO DEL FORMULARIO DE CONFIRMACIÓN
// ===================================
function setupAdvancedForm() {
    const rsvpForm = document.getElementById('rsvp-form');
    const attendanceRadios = document.querySelectorAll('input[name="entry.877086558"]');
    const guestsInput = document.getElementById('invitados');

    if (!rsvpForm || !attendanceRadios.length || !guestsInput) {
        console.error('No se encontraron los elementos del formulario para la configuración avanzada.');
        return;
    }

    // --- Lógica para deshabilitar el campo de invitados ---
    const updateGuestField = () => {
        const selectedOption = document.querySelector('input[name="entry.877086558"]:checked');
        if (selectedOption && selectedOption.value === 'No puedo, lo siento') {
            guestsInput.disabled = true;
            guestsInput.required = false;
            guestsInput.value = '';
            guestsInput.style.backgroundColor = '#e9ecef';
            guestsInput.style.cursor = 'not-allowed';
        } else {
            guestsInput.disabled = false;
            guestsInput.required = true;
            guestsInput.style.backgroundColor = '';
            guestsInput.style.cursor = '';
        }
    };
    
    attendanceRadios.forEach(radio => radio.addEventListener('change', updateGuestField));
    updateGuestField(); // Ejecutar al inicio

    // --- Lógica simplificada para el envío ---
    rsvpForm.addEventListener('submit', function() {
        // Le damos un pequeño instante al formulario para que inicie el envío
        // antes de ocultarlo y mostrar el mensaje de agradecimiento.
        setTimeout(function() {
            const formContainer = document.querySelector('.custom-form-container form');
            const thankYouMessage = document.getElementById('thank-you-message');
            if (formContainer && thankYouMessage) {
                formContainer.style.display = 'none';
                thankYouMessage.style.display = 'block';
            }
        }, 100);
        
        // ¡No usamos event.preventDefault() para que el formulario se envíe correctamente!
    });
}