// Intersection Observer para animações on scroll
document.addEventListener('DOMContentLoaded', function() {
    
    // Configurações do observer
    const observerOptions = {
        threshold: 0.1, // 10% do elemento visível
        rootMargin: '0px 0px -50px 0px' // Dispara 50px antes do elemento aparecer
    };

    // Lista de todas as classes de animação para observar
    const animationClasses = [
        'slide-left',
        'slide-right', 
        'fade-in-1',
        'fade-in-2',
        'fade-in-3',
        'fade-in-4',
        'fade-in-5',
        'fade-in-6',
        'slideup-fade',
        'slideup-fade2',
        'word-reveal',
        'typing-text2',
        'pendulum',
        'subtle-pulse'
    ];

    // Função para pausar animações inicialmente
    function pauseAnimations() {
        const style = document.createElement('style');
        style.id = 'pause-animations';
        style.textContent = `
            .slide-left,
            .slide-right,
            .fade-in-1,
            .fade-in-2,
            .fade-in-3,
            .fade-in-4,
            .fade-in-5,
            .fade-in-6,
            .slideup-fade,
            .slideup-fade2,
            .typing-text2,
            .pendulum,
            .subtle-pulse {
                animation-play-state: paused !important;
                opacity: 0;
            }
            
            .word-reveal .word {
                animation-play-state: paused !important;
                opacity: 0;
                transform: translateY(20px) rotateX(90deg);
            }
            
            /* Classes que serão adicionadas quando o elemento ficar visível */
            .animate-slide-left {
                animation: slide-left 1s ease-out forwards !important;
            }
            
            .animate-slide-right {
                animation: slide-right 1s ease-out forwards !important;
            }
            
            .animate-fade-in-1 {
                animation: fadeIn 1s ease-in-out 0s forwards !important;
            }
            
            .animate-fade-in-2 {
                animation: fadeIn 1s ease-in-out 0.5s forwards !important;
            }
            
            .animate-fade-in-3 {
                animation: fadeIn 1s ease-in-out 1s forwards !important;
            }
            
            .animate-fade-in-4 {
                animation: fadeIn 1s ease-in-out 1.5s forwards !important;
            }
            
            .animate-fade-in-5 {
                animation: fadeIn 1s ease-in-out 2s forwards !important;
            }
            
            .animate-fade-in-6 {
                animation: fadeIn 1s ease-in-out 2.5s forwards !important;
            }
            
            .animate-slideup-fade {
                animation: slideInFade 1s ease-out forwards !important;
            }
            
            .animate-slideup-fade2 {
                animation: slideInFade 1s ease-out 0.3s forwards !important;
            }
            
            .animate-typing-text2 {
                animation: typing 1.2s steps(30, end) !important;
            }
            
            .animate-pendulum {
                animation: pendulum 10s ease-in-out infinite !important;
            }
            
            .animate-subtle-pulse {
                animation: subtle-pulse 5s ease-in-out infinite !important;
            }
            
            .animate-word-reveal .word {
                animation: wordReveal 0.6s ease-out forwards !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Função para ativar animação baseada na classe original
    function activateAnimation(element) {
        // Mapear classes originais para classes de animação
        const classMap = {
            'slide-left': 'animate-slide-left',
            'slide-right': 'animate-slide-right',
            'fade-in-1': 'animate-fade-in-1',
            'fade-in-2': 'animate-fade-in-2',
            'fade-in-3': 'animate-fade-in-3',
            'fade-in-4': 'animate-fade-in-4',
            'fade-in-5': 'animate-fade-in-5',
            'fade-in-6': 'animate-fade-in-6',
            'slideup-fade': 'animate-slideup-fade',
            'slideup-fade2': 'animate-slideup-fade2',
            'typing-text2': 'animate-typing-text2',
            'pendulum': 'animate-pendulum',
            'subtle-pulse': 'animate-subtle-pulse',
            'word-reveal': 'animate-word-reveal'
        };

        // Verificar qual classe de animação o elemento possui e ativar
        animationClasses.forEach(animClass => {
            if (element.classList.contains(animClass)) {
                const animateClass = classMap[animClass];
                if (animateClass) {
                    element.classList.add(animateClass);
                    // Remove a opacidade 0 para elementos que não são fade
                    if (!animClass.includes('fade')) {
                        element.style.opacity = '1';
                    }
                }
            }
        });
    }

    // Callback do Intersection Observer
    function handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Elemento ficou visível, ativar animação
                activateAnimation(entry.target);
                
                // Parar de observar este elemento (animação única)
                observer.unobserve(entry.target);
            }
        });
    }

    // Criar o observer
    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Inicializar
    function init() {
        // Pausar todas as animações primeiro
        pauseAnimations();
        
        // Encontrar todos os elementos com classes de animação
        const elementsToObserve = [];
        
        animationClasses.forEach(className => {
            const elements = document.querySelectorAll(`.${className}`);
            elements.forEach(el => {
                if (!elementsToObserve.includes(el)) {
                    elementsToObserve.push(el);
                }
            });
        });

        // Começar a observar todos os elementos
        elementsToObserve.forEach(element => {
            observer.observe(element);
        });

        console.log(`🎬 Observando ${elementsToObserve.length} elementos para animações on scroll`);
    }

    // Inicializar quando a página carregar
    init();

    // Função para reativar observação (caso precise)
    window.reactivateScrollAnimations = function() {
        // Remove o estilo que pausa as animações
        const pauseStyle = document.getElementById('pause-animations');
        if (pauseStyle) {
            pauseStyle.remove();
        }
        
        // Reinicializa
        setTimeout(init, 100);
    };
});