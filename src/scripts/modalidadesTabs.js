import { gsap } from "gsap";

export function initModalidadesTabs() {
  const container = document.querySelector('[data-tab-container]');
  const tabs = document.querySelectorAll('.tab-button');
  const panels = document.querySelectorAll('[role="tabpanel"]');
  const indicator = document.querySelector('[data-tab-indicator]');
  
  if (!tabs.length || !panels.length || !indicator || !container) {
    console.error("Tab elements not found");
    return;
  }

  let currentTab = tabs[0];
  let isAnimating = false; // Prevenir cliques durante animação

  // Função para atualizar posição do indicador
  function updateIndicator(tab, animate = true) {
    const tabRect = tab.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    const left = tabRect.left - containerRect.left;
    const width = tabRect.width;
    
    if (animate) {
      gsap.to(container, {
        '--indicator-left': `${left}px`,
        '--indicator-width': `${width}px`,
        // Duração do indicador, se alterar aqui, alterar no .tab-indicator no css.
        duration: 0.1, 
        ease: "power2.out"
      });
    } else {
      gsap.set(container, {
        '--indicator-left': `${left}px`,
        '--indicator-width': `${width}px`
      });
    }
  }

  // Inicializar
  setTimeout(() => {
    updateIndicator(currentTab, false);
  }, 50);

  // Função para trocar de tab
  function switchTab(newTab) {
    // Bloquear se já estiver animando
    if (newTab === currentTab || isAnimating) return;
    
    isAnimating = true; // Marcar como animando

    const oldPanel = document.querySelector(`#${currentTab.getAttribute('aria-controls')}`);
    const newPanel = document.querySelector(`#${newTab.getAttribute('aria-controls')}`);

    // Atualizar ARIA e classes
    currentTab.setAttribute('aria-selected', 'false');
    currentTab.classList.remove('active');
    
    newTab.setAttribute('aria-selected', 'true');
    newTab.classList.add('active');

    // Animar indicador
    updateIndicator(newTab, true);

    // Matar todas as animações anteriores
    gsap.killTweensOf([oldPanel, newPanel]);

    // Animar painéis
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating = false; // Liberar após conclusão
      }
    });

    tl.to(oldPanel, {
      opacity: 0,
      duration: 0.3, // Mexer aqui para deixar maois rápido ou devagar
      ease: "power2.in",
      onStart: () => {
        // Garantir que o painel antigo está visível
        oldPanel.style.display = 'block';
      },
      onComplete: () => {
        oldPanel.classList.remove('active');
        oldPanel.style.display = 'none'; // Forçar display none
      }
    })
    .set(newPanel, {
      display: 'block', // Garantir que está visível
      opacity: 0,
      y: 20 // Mexer aqui para alterar a altura do movimento dos paíneis
    })
    .add(() => {
      newPanel.classList.add('active');
    })
    .to(newPanel, {
      opacity: 1,
      y: 0,
      duration: 0.5, // Mexer aqui para deixar maois rápido ou devagar, QUANTO MAIOR, mais devagar
      ease: "power2.out"
    });

    currentTab = newTab;
  }

  // Event listeners
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => switchTab(tab));
    
    // Navegação por teclado
    tab.addEventListener('keydown', (e) => {
      const tabsArray = Array.from(tabs);
      let index = tabsArray.indexOf(tab);
      
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        index = (index + 1) % tabs.length;
        tabsArray[index].focus();
        switchTab(tabsArray[index]);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        index = (index - 1 + tabs.length) % tabs.length;
        tabsArray[index].focus();
        switchTab(tabsArray[index]);
      } else if (e.key === 'Home') {
        e.preventDefault();
        tabsArray[0].focus();
        switchTab(tabsArray[0]);
      } else if (e.key === 'End') {
        e.preventDefault();
        tabsArray[tabs.length - 1].focus();
        switchTab(tabsArray[tabs.length - 1]);
      }
    });
  });

  // Atualizar no resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateIndicator(currentTab, false);
    }, 100);
  });
}