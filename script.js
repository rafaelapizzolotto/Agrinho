document.addEventListener('DOMContentLoaded', function() {
    // Animações na rolagem (mantido do código anterior)
    const sections = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll para o botão "Explorar Mais" (mantido do código anterior)
    const exploreButton = document.querySelector('.btn-primary');
    if (exploreButton) {
        exploreButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // --- Funcionalidades de Acessibilidade ---

    const body = document.body;
    const fontIncreaseBtn = document.getElementById('font-increase');
    const fontDecreaseBtn = document.getElementById('font-decrease');
    const toggleContrastBtn = document.getElementById('toggle-contrast');
    const resetAccessibilityBtn = document.getElementById('reset-accessibility');

    const STORAGE_KEY_FONT_SIZE = 'accessibility-font-size';
    const STORAGE_KEY_CONTRAST = 'accessibility-contrast';

    let currentFontSize = parseFloat(getComputedStyle(body).fontSize); // Pega o tamanho inicial da fonte
    const FONT_SIZE_INCREMENT = 2; // Quantos pixels aumentar/diminuir por clique
    const MIN_FONT_SIZE = 12;
    const MAX_FONT_SIZE = 24;

    // Função para aplicar o tamanho da fonte
    function applyFontSize(size) {
        body.style.fontSize = `${size}px`;
        localStorage.setItem(STORAGE_KEY_FONT_SIZE, size); // Salva no Local Storage
    }

    // Função para aplicar o contraste
    function applyContrast(isHighContrast) {
        if (isHighContrast) {
            body.classList.add('high-contrast');
            localStorage.setItem(STORAGE_KEY_CONTRAST, 'true');
        } else {
            body.classList.remove('high-contrast');
            localStorage.removeItem(STORAGE_KEY_CONTRAST); // Remove do Local Storage
        }
    }

    // Carregar configurações salvas ao carregar a página
    function loadAccessibilitySettings() {
        const savedFontSize = localStorage.getItem(STORAGE_KEY_FONT_SIZE);
        if (savedFontSize) {
            currentFontSize = parseFloat(savedFontSize);
            applyFontSize(currentFontSize);
        }

        const savedContrast = localStorage.getItem(STORAGE_KEY_CONTRAST);
        if (savedContrast === 'true') {
            applyContrast(true);
        }
    }

    // Chamar ao carregar a página
    loadAccessibilitySettings();

    // Event Listener para aumentar a fonte
    fontIncreaseBtn.addEventListener('click', function() {
        if (currentFontSize < MAX_FONT_SIZE) {
            currentFontSize += FONT_SIZE_INCREMENT;
            applyFontSize(currentFontSize);
        }
    });

    // Event Listener para diminuir a fonte
    fontDecreaseBtn.addEventListener('click', function() {
        if (currentFontSize > MIN_FONT_SIZE) {
            currentFontSize -= FONT_SIZE_INCREMENT;
            applyFontSize(currentFontSize);
        }
    });

    // Event Listener para alternar o contraste
    toggleContrastBtn.addEventListener('click', function() {
        const isHighContrast = body.classList.contains('high-contrast');
        applyContrast(!isHighContrast);
    });

    // Event Listener para resetar as configurações
    resetAccessibilityBtn.addEventListener('click', function() {
        // Redefinir tamanho da fonte para o padrão do CSS
        body.style.fontSize = ''; // Remove o inline style, voltando ao CSS
        currentFontSize = parseFloat(getComputedStyle(body).fontSize); // Atualiza para o padrão do CSS
        localStorage.removeItem(STORAGE_KEY_FONT_SIZE); // Remove do Local Storage

        // Redefinir contraste
        applyContrast(false); // Desativa o modo de alto contraste
        localStorage.removeItem(STORAGE_KEY_CONTRAST); // Remove do Local Storage
    });
});