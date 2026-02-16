# Guia Completo de GSAP

Este guia contém todos os exemplos de animações com GSAP, com explicações detalhadas de cada propriedade.

## Instalação
```bash
npm install gsap
```

## Estrutura Básica
```javascript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
  
// Todo módulo que vc for usar, tem que registrar ele. Neste caso estou registrando o ScrollTrigger.

gsap.registerPlugin(ScrollTrigger);

export function initHeroAnimations() {
  // Suas animações aqui
}
```

---

## 1. ANIMAÇÃO BÁSICA - gsap.to()

Anima **DO estado atual PARA** os valores definidos.
```javascript
gsap.to("[data-rise]", {
  x: 100,                    // Move no eixo X (horizontal) em pixels
  y: 50,                     // Move no eixo Y (vertical) em pixels
  rotation: 45,              // Rotação em graus
  scale: 1.5,                // Escala (1 = tamanho normal, 2 = dobro)
  opacity: 0.5,              // Opacidade (0 = invisível, 1 = visível)
  duration: 2,               // Duração da animação em segundos
  delay: 0.5,                // Delay antes de iniciar em segundos
  ease: "power2.out",        // Tipo de easing (suavização)
                             // Opções: "power1/2/3/4.in/out/inOut", "elastic", "bounce", "back"
  repeat: 2,                 // Quantas vezes repetir (-1 = infinito)
  yoyo: true,                // Se true, vai e volta (precisa de repeat)
  stagger: 0.2,              // Delay entre múltiplos elementos
  onStart: () => {},         // Callback quando animação inicia
  onComplete: () => {},      // Callback quando animação termina
  onUpdate: () => {},        // Callback a cada frame da animação
});
```

---

## 2. ANIMAÇÃO - gsap.from()

Anima **DOS valores definidos PARA** o estado atual.
```javascript
gsap.from("[data-rise]", {
  x: -100,                   // Começa 100px à esquerda e vai para posição original
  opacity: 0,                // Começa invisível e vai para opacidade original
  duration: 1.5,
  ease: "power3.out"
});
```

---

## 3. ANIMAÇÃO - gsap.fromTo()

Define **EXATAMENTE** de onde e para onde vai.
```javascript
gsap.fromTo("[data-rise]", 
  {
    // Estado inicial
    x: -200,
    opacity: 0,
    scale: 0.5
  },
  {
    // Estado final
    x: 0,
    opacity: 1,
    scale: 1,
    duration: 2,
    ease: "elastic.out(1, 0.5)"
  }
);
```

---

## 4. SCROLL TRIGGER - Animação no Scroll

Cria animações que respondem ao scroll da página.
```javascript
gsap.to("[data-rise]", {
  x: 100,                    // Propriedades de animação
  rotation: 360,
  scrollTrigger: {
    trigger: "[data-rise]",          // Elemento que dispara a animação
    start: "top center",             // Quando inicia: "trigger viewport"
                                     // Ex: "top bottom", "center center", "bottom top"
    end: "bottom top",               // Quando termina: "trigger viewport"
    scrub: true,                     // true = vincula ao scroll
                                     // número = suavização em segundos
    markers: false,                  // true = mostra marcadores de debug
    pin: false,                      // true = fixa o elemento durante o scroll
    pinSpacing: true,                // true = adiciona espaço quando pin está ativo
    toggleActions: "play none none reverse", 
                                     // Ações: onEnter onLeave onEnterBack onLeaveBack
                                     // Valores: "play", "pause", "resume", "reverse",
                                     //          "restart", "complete", "reset", "none"
    snap: {                          // Snap em pontos específicos
      snapTo: 1,                     // Para onde fazer snap (0-1 ou array)
      duration: 0.5,                 // Duração do snap
      ease: "power1.inOut"           // Easing do snap
    },
    anticipatePin: 1,                // Começa a fixar antes (em segundos)
    onEnter: () => {},               // Callback quando entra na área de trigger
    onLeave: () => {},               // Callback quando sai da área
    onEnterBack: () => {},           // Callback quando volta scrollando para cima
    onLeaveBack: () => {},           // Callback quando sai scrollando para cima
    onUpdate: (self) => {            // Callback durante scroll
      console.log(self.progress);    // self.progress = 0 a 1
    },
    onToggle: (self) => {},          // Callback quando muda de ativo/inativo
    once: false,                     // true = executa apenas uma vez
    horizontal: false,               // true = para scroll horizontal
    invalidateOnRefresh: false,      // true = recalcula valores ao dar refresh
    refreshPriority: 0,              // Ordem de atualização (maior = primeiro)
  }
});
```

---

## 5. TIMELINE - Sequência de Animações

Cria uma sequência coordenada de múltiplas animações.

Dê o nome que quiser para a timeline, pode ser XUXA

CallBack é simplesmente uma função que chama outra função dentro dela

```javascript
const tl = gsap.timeline({
  repeat: -1,                // Repete infinitamente
  yoyo: true,                // Vai e volta
  delay: 1,                  // Delay inicial
  onComplete: () => {},      // Callback quando timeline completa
});

tl.to(".elemento1", {        // Primeira animação
  x: 100,
  duration: 1
})
.to(".elemento2", {          // Segunda animação
  y: 50,
  duration: 1
}, "-=0.5")                  // Posicionamento temporal:
                             // "-=0.5" = começa 0.5s antes do fim da anterior
                             // "+=0.5" = começa 0.5s depois do fim da anterior
                             // "<" = começa junto com a anterior
                             // ">" = começa após a anterior (padrão)
.to(".elemento3", {
  rotation: 180,
  duration: 1
}, "<");                     // Começa junto com a animação anterior
```

---

## 6. PROPRIEDADES CSS ESPECIAIS

Todas as propriedades CSS que podem ser animadas.
```javascript
gsap.to("[data-rise]", {
  // Cores
  backgroundColor: "#ff0000",        // Cor de fundo
  color: "#ffffff",                  // Cor do texto
  
  // Dimensões
  width: "200px",                    // Largura
  height: "200px",                   // Altura
  
  // Bordas
  borderRadius: "50%",               // Border radius
  border: "5px solid blue",          // Borda
  
  // Sombras
  boxShadow: "0 10px 20px rgba(0,0,0,0.3)", // Sombra da caixa
  textShadow: "2px 2px 4px rgba(0,0,0,0.5)", // Sombra do texto
  
  // Filtros
  filter: "blur(5px)",               // Filtros CSS (blur, brightness, etc)
  clipPath: "circle(50%)",           // Clip path
  
  // Transformações 2D
  x: 100,                            // Translate X
  y: 100,                            // Translate Y
  rotation: 45,                      // Rotação 2D
  scale: 1.5,                        // Escala uniforme
  scaleX: 1.5,                       // Escala apenas no eixo X
  scaleY: 1.5,                       // Escala apenas no eixo Y
  skewX: 15,                         // Inclinação no eixo X
  skewY: 15,                         // Inclinação no eixo Y
  
  // Transformações 3D
  perspective: 1000,                 // Perspectiva 3D (em pixels)
  rotationX: 45,                     // Rotação no eixo X (3D)
  rotationY: 45,                     // Rotação no eixo Y (3D)
  rotationZ: 45,                     // Rotação no eixo Z (igual a rotation)
  z: 100,                            // Move no eixo Z (profundidade)
  
  // Outros
  transformOrigin: "center center",  // Ponto de origem da transformação
  webkitTextStroke: "2px #000",      // Contorno do texto (webkit)
  opacity: 0.5,                      // Opacidade
});
```

---

## 7. CONTROLES DE ANIMAÇÃO

Métodos para controlar animações dinamicamente.
```javascript
const animation = gsap.to("[data-rise]", { 
  x: 100, 
  duration: 2 
});

// Controles
animation.play();            // Inicia/retoma a animação
animation.pause();           // Pausa a animação
animation.resume();          // Retoma de onde pausou
animation.reverse();         // Inverte a direção
animation.restart();         // Reinicia do começo
animation.kill();            // Cancela/remove a animação

// Navegação
animation.progress(0.5);     // Pula para 50% da animação (0 = início, 1 = fim)
animation.timeScale(2);      // Velocidade (1 = normal, 2 = 2x rápido, 0.5 = metade)
```

---

## 8. EXEMPLOS PRÁTICOS COM SCROLL TRIGGER

### Parallax Simples
```javascript
gsap.to("[data-parallax]", {
  y: -150,
  scrollTrigger: {
    trigger: "[data-parallax]",
    start: "top bottom",
    end: "bottom top",
    scrub: 1                 // Número = suavização (quanto maior, mais suave)
  }
});
```

### Revelar Elemento ao Scrollar
```javascript
gsap.from("[data-reveal]", {
  opacity: 0,
  y: 100,
  scrollTrigger: {
    trigger: "[data-reveal]",
    start: "top 80%",        // Inicia quando o topo atinge 80% da viewport
    toggleActions: "play none none reverse"
  }
});
```

### Fixar Elemento Durante Scroll
```javascript
gsap.to("[data-pin]", {
  scrollTrigger: {
    trigger: "[data-pin]",
    start: "top top",
    end: "+=500",            // Fica fixo por 500px de scroll
    pin: true,
    pinSpacing: true
  }
});
```

### Fade In Sequencial (Stagger)
```javascript
gsap.from(".card", {
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.2,            // Cada elemento com 0.2s de delay
  scrollTrigger: {
    trigger: ".cards-container",
    start: "top 70%"
  }
});
```

---

## 9. TIPOS DE EASING MAIS USADOS
```javascript
// Suaves
"power1.out"      // Suave
"power2.out"      // Médio
"power3.out"      // Forte
"power4.out"      // Muito forte

// Elásticos
"elastic.out(1, 0.3)"   // Efeito de mola

// Bounce
"bounce.out"      // Quique no final

// Back
"back.out(1.7)"   // Ultrapassa e volta

// Combinados
"power2.inOut"    // Acelera e desacelera
```

---

## 10. DICAS IMPORTANTES

### Seletores
- Use `data-*` attributes para organizar: `data-animate`, `data-reveal`, etc.
- Pode usar qualquer seletor CSS: `.class`, `#id`, `[data-attr]`

### Performance
- Anime `transform` e `opacity` para melhor performance
- Evite animar `width`, `height`, `top`, `left` quando possível
- Use `will-change: transform` no CSS para elementos que vão animar

### Debug
- Use `markers: true` no ScrollTrigger para visualizar os pontos de início/fim
- Use `console.log()` nos callbacks para entender o fluxo

### Mobile
- Teste sempre em mobile - alguns efeitos podem ser muito pesados
- Considere desabilitar algumas animações em telas pequenas

---

## Recursos Úteis

- [Documentação Oficial GSAP](https://greensock.com/docs/)
- [GSAP Ease Visualizer](https://greensock.com/ease-visualizer/)
- [ScrollTrigger Demos](https://greensock.com/st-demos/)

---

**Dica Final**: Comece simples! Use `gsap.from()` ou `gsap.to()` com apenas 2-3 propriedades, depois vá adicionando complexidade conforme necessário. 🚀