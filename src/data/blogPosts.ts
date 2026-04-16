import type { BlogPost } from "../types/blog";

const blogPosts: BlogPost[] = [
  {
    slug: "por-que-voce-entende-ingles-mas-trava-na-hora-de-falar",
    title: "Por que voce entende ingles mas trava na hora de falar?",
    titleLines: ["Por que voce entende", "ingles mas trava na", "hora de falar?"],
    excerpt:
      "Voce entende podcasts e textos em ingles, mas trava quando tenta falar? Entenda o gap entre input e output e como resolver com metodo.",
    category: "Fluencia",
    publishDate: "2026-03-12",
    publishDateLabel: "12 Mar 2026",
    readingTimeMinutes: 8,
    seoDescription:
      "Entenda por que voce compreende ingles, mas trava para falar, e veja um protocolo pratico para destravar o output oral.",
    seoImage: "/favicon.svg",
    heroGhostWord: "FALAR",
    lead: "Voce assiste series em ingles sem legenda, entende podcasts, le artigos tecnicos, mas quando precisa falar, a boca trava. Esse fenomeno tem nome, tem causa e, principalmente, tem solucao.",
    author: {
      name: "Carolina Azevedo",
      role: "Professora - Rise Idiomas",
      initials: "CA",
      bio: "Formada em Letras pela USP com especializacao em Linguistica Aplicada. Ha 9 anos ajuda profissionais a sair do ingles passivo para o ingles fluente. Escreve sobre aquisicao de linguas, metodologia e carreira internacional.",
    },
    sections: [
      {
        id: "s1",
        tocLabel: "Input vs output",
        headingHtml: "O gap entre <span class=\"em\">input e output</span>",
        blocks: [
          {
            type: "paragraph",
            content:
              "A linguistica chama de <strong>input</strong> tudo que voce recebe, leitura, escuta e exposicao passiva a lingua. O <strong>output</strong> e o que voce produz, fala e escrita. A maioria dos aprendizes investe quase 100% do tempo em input e quase nada em output.",
          },
          {
            type: "paragraph",
            content:
              "O resultado e previsivel, o cerebro desenvolve circuitos eficientes de reconhecimento, mas nao treina os circuitos de producao. Entender e falar ativam areas diferentes e por isso exigem pratica diferente.",
          },
          {
            type: "callout",
            label: "Dado cientifico",
            content:
              "Estudos de neuroimagem mostram que a compreensao auditiva ativa principalmente o giro temporal superior, enquanto a producao oral recruta adicionalmente o cortex motor e a area de Broca. Treinar um nao e treinar o outro.",
          },
          {
            type: "divider",
          },
        ],
      },
      {
        id: "s2",
        tocLabel: "Por que o bloqueio acontece",
        headingHtml: "Por que o <span class=\"em\">bloqueio</span> acontece",
        blocks: [
          {
            type: "paragraph",
            content:
              "O travamento na fala costuma ter tres origens principais. Entender cada uma delas e o primeiro passo para superar o bloqueio de forma consistente.",
          },
          {
            type: "numbered-list",
            items: [
              {
                title: "Deficit de automatizacao.",
                description:
                  "Na leitura voce tem tempo para processar. Na fala, o acesso precisa acontecer em milissegundos. O vocabulario existe, mas nao esta automatizado para recuperacao rapida.",
              },
              {
                title: "Perfeccionismo e filtro afetivo.",
                description:
                  "O medo de errar aumenta ansiedade e bloqueia a producao mesmo quando o conhecimento ja existe.",
              },
              {
                title: "Falta de repeticao com contexto.",
                description:
                  "Voce conhece regras, mas nao praticou o suficiente para transformar padroes em reflexo de fala.",
              },
            ],
          },
          {
            type: "pullquote",
            quote:
              "Falar e uma habilidade motora. Saber a teoria ajuda, mas pratica guiada e o que transforma conhecimento em fluencia.",
            attribution: "Carolina Azevedo - Rise Idiomas",
          },
          {
            type: "divider",
          },
        ],
      },
      {
        id: "s3",
        tocLabel: "Protocolo de destravamento",
        headingHtml: "O protocolo para <span class=\"em\">quebrar o bloqueio</span>",
        blocks: [
          {
            type: "paragraph",
            content:
              "A solucao nao exige talento especial. Exige metodo e consistencia. Estas sao as estrategias com melhor evidencia para desenvolver fluencia oral.",
          },
          {
            type: "subheading",
            content: "1. Output forcado com feedback imediato",
          },
          {
            type: "paragraph",
            content:
              "Quando voce e obrigado a produzir e recebe feedback em tempo real, identifica lacunas e corrige mais rapido. Conversacao ativa com orientacao continua e essencial.",
          },
          {
            type: "subheading",
            content: "2. Tecnica de shadowing",
          },
          {
            type: "paragraph",
            content:
              "Ouvir, pausar e repetir em voz alta, imitando ritmo e entonacao, acelera a criacao de padroes motores de fala.",
          },
          {
            type: "callout",
            label: "Exercicio pratico",
            content:
              "Reserve 15 minutos por dia para shadowing com um audio que voce ja conhece. A familiaridade libera carga cognitiva para voce focar na producao oral.",
          },
          {
            type: "subheading",
            content: "3. Think in English",
          },
          {
            type: "paragraph",
            content:
              "Treinar monologo interno em ingles reduz traducao mental e melhora velocidade de acesso. Com poucas semanas, voce percebe mais naturalidade.",
          },
          {
            type: "subheading",
            content: "4. Exposicao com output imediato",
          },
          {
            type: "paragraph",
            content:
              "Consuma conteudo curto e resuma em voz alta logo depois. Recuperacao ativa consolida vocabulario melhor do que revisao passiva.",
          },
          {
            type: "divider",
          },
        ],
      },
      {
        id: "s4",
        tocLabel: "Quanto tempo leva",
        headingHtml: "Quanto tempo <span class=\"em\">leva?</span>",
        blocks: [
          {
            type: "paragraph",
            content:
              "Com 30 minutos diarios focados em output, alunos intermediarios costumam sentir mudanca perceptivel entre 4 e 6 semanas.",
          },
          {
            type: "paragraph",
            content:
              "A chave e consistencia. Duas horas no domingo nao substituem 20 minutos todos os dias. Repeticao distribuida no tempo constroi fluencia sustentavel.",
          },
          {
            type: "paragraph",
            content:
              "Se voce esta no nivel B1 ou acima e ainda trava para falar, o gargalo geralmente nao e conhecimento. E pratica do tipo certo.",
          },
        ],
      },
    ],
    tags: ["Fluencia", "Speaking", "Output", "Metodologia", "B1-C1"],
    sidebarCta: {
      label: "Rise Idiomas",
      text: "Quer sair do travamento de vez? Nossas aulas focam no output que faz voce falar com confianca.",
      buttonText: "Conhecer modalidades",
      buttonUrl: "/#modalities",
    },
    footerStats: [
      {
        label: "Categoria",
        valueHtml: "Flu<span class=\"a\">encia</span>",
      },
      {
        label: "Leitura",
        valueHtml: "8<span class=\"a\"> min</span>",
      },
      {
        label: "Publicado",
        valueHtml: "Mar <span class=\"a\">26</span>",
      },
      {
        label: "Rise Blog",
        valueHtml: "Vila <span class=\"a\">Carrao</span>",
      },
    ],
  },
  {
    slug: "como-o-ingles-avancado-acelera-promocoes",
    title: "Como o ingles avancado acelera promocoes e aumenta sua influencia",
    titleLines: ["Como o ingles avancado", "acelera promocoes"],
    excerpt:
      "Comunicacao internacional de alta precisao abre portas em lideranca, negociacao e visibilidade executiva.",
    category: "Carreira",
    publishDate: "2026-02-20",
    publishDateLabel: "20 Fev 2026",
    readingTimeMinutes: 6,
    seoDescription:
      "Veja por que ingles avancado impacta promocao, influencia e protagonismo em contextos globais.",
    seoImage: "/favicon.svg",
    heroGhostWord: "CARREIRA",
    lead: "Ingles avancado nao e apenas idioma. E uma alavanca de carreira para liderar reunioes, negociar melhor e representar sua area em contextos globais.",
    author: {
      name: "Bruno Almeida",
      role: "Consultor Academico - Rise Idiomas",
      initials: "BA",
      bio: "Atua com desenvolvimento de comunicacao executiva em ingles para lideres e especialistas de tecnologia, vendas e operacoes.",
    },
    sections: [
      {
        id: "s1",
        tocLabel: "Impacto em visibilidade",
        headingHtml: "Ingles como <span class=\"em\">multiplicador de visibilidade</span>",
        blocks: [
          {
            type: "paragraph",
            content:
              "Profissionais com comunicacao internacional clara tendem a ser mais lembrados para projetos estrategicos, exposicoes externas e papeis de lideranca.",
          },
          {
            type: "paragraph",
            content:
              "Isso acontece porque conseguem representar a empresa com seguranca em ambientes multiculturais, sem depender de intermediacao.",
          },
          {
            type: "divider",
          },
        ],
      },
      {
        id: "s2",
        tocLabel: "Acoes praticas",
        headingHtml: "Como transformar estudo em <span class=\"em\">resultado de carreira</span>",
        blocks: [
          {
            type: "numbered-list",
            items: [
              {
                title: "Treine comunicacao de reuniao.",
                description: "Foque abertura, alinhamento de status e fechamento com proximos passos.",
              },
              {
                title: "Colete vocabulario funcional.",
                description: "Priorize frases que voce realmente usa no seu contexto de trabalho.",
              },
              {
                title: "Simule cenarios reais.",
                description: "Pratique apresentacoes, negociacoes e feedbacks com tempo e pressao parecidos com a rotina.",
              },
            ],
          },
          {
            type: "paragraph",
            content:
              "Com um plano de pratica consistente, o idioma deixa de ser risco e vira vantagem competitiva na sua trajetoria.",
          },
        ],
      },
    ],
    tags: ["Carreira", "Fluencia", "Executivo"],
    sidebarCta: {
      label: "Rise Idiomas",
      text: "Quer desenvolver ingles para contexto executivo com foco em resultado real?",
      buttonText: "Falar com consultoria",
      buttonUrl: "https://wa.me/5511948606841",
    },
    footerStats: [
      {
        label: "Categoria",
        valueHtml: "Car<span class=\"a\">reira</span>",
      },
      {
        label: "Leitura",
        valueHtml: "6<span class=\"a\"> min</span>",
      },
      {
        label: "Publicado",
        valueHtml: "Fev <span class=\"a\">26</span>",
      },
      {
        label: "Rise Blog",
        valueHtml: "Execu<span class=\"a\">tivo</span>",
      },
    ],
  },
  {
    slug: "rotina-de-20-minutos-para-evoluir-no-ingles-todo-dia",
    title: "Rotina de 20 minutos para evoluir no ingles todo dia",
    titleLines: ["Rotina de 20 minutos", "para evoluir no ingles"],
    excerpt:
      "Uma rotina curta, objetiva e sustentavel para manter evolucao diaria sem sobrecarga.",
    category: "Dicas",
    publishDate: "2026-01-30",
    publishDateLabel: "30 Jan 2026",
    readingTimeMinutes: 5,
    seoDescription:
      "Aprenda uma estrutura diaria de 20 minutos para manter progresso continuo no ingles.",
    seoImage: "/favicon.svg",
    heroGhostWord: "ROTINA",
    lead: "Quando o plano e simples, a constancia aumenta. Com 20 minutos bem usados, voce consegue evoluir sem depender de motivacao extrema.",
    author: {
      name: "Mariana Costa",
      role: "Coordenadora Pedagogica - Rise Idiomas",
      initials: "MC",
      bio: "Especialista em desenho de trilhas de estudo para adultos com rotina intensa e pouco tempo disponivel.",
    },
    sections: [
      {
        id: "s1",
        tocLabel: "Estrutura diaria",
        headingHtml: "Uma rotina curta e <span class=\"em\">inteligente</span>",
        blocks: [
          {
            type: "numbered-list",
            items: [
              {
                title: "5 minutos de aquecimento.",
                description: "Revisao rapida de frases-chave do dia anterior.",
              },
              {
                title: "10 minutos de pratica ativa.",
                description: "Shadowing, leitura em voz alta ou resposta oral guiada.",
              },
              {
                title: "5 minutos de consolidacao.",
                description: "Resumo falado do que voce praticou e anotacao de 2 ajustes.",
              },
            ],
          },
          {
            type: "callout",
            label: "Regra de ouro",
            content:
              "Nao compense dia perdido com excesso no dia seguinte. Volte para os 20 minutos e mantenha o ritmo semanal.",
          },
        ],
      },
      {
        id: "s2",
        tocLabel: "Consistencia",
        headingHtml: "Como manter a <span class=\"em\">consistencia</span>",
        blocks: [
          {
            type: "paragraph",
            content:
              "Defina horario fixo e gatilho claro, por exemplo: sempre apos o cafe da manha. Menos decisao diaria significa mais chance de executar.",
          },
          {
            type: "paragraph",
            content:
              "Acompanhe apenas dois indicadores: dias praticados na semana e quantas vezes voce produziu fala real.",
          },
        ],
      },
    ],
    tags: ["Dicas", "Fluencia", "Rotina"],
    sidebarCta: {
      label: "Rise Idiomas",
      text: "Quer um plano personalizado para encaixar ingles na sua rotina real?",
      buttonText: "Montar meu plano",
      buttonUrl: "https://wa.me/5511948606841",
    },
    footerStats: [
      {
        label: "Categoria",
        valueHtml: "Di<span class=\"a\">cas</span>",
      },
      {
        label: "Leitura",
        valueHtml: "5<span class=\"a\"> min</span>",
      },
      {
        label: "Publicado",
        valueHtml: "Jan <span class=\"a\">26</span>",
      },
      {
        label: "Rise Blog",
        valueHtml: "Hab<span class=\"a\">itos</span>",
      },
    ],
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((firstPost, secondPost) => {
    return (
      new Date(secondPost.publishDate).getTime() -
      new Date(firstPost.publishDate).getTime()
    );
  });
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentPost: BlogPost, limit = 3): BlogPost[] {
  const related = blogPosts
    .filter((candidatePost) => candidatePost.slug !== currentPost.slug)
    .map((candidatePost) => {
      const sharedTags = candidatePost.tags.filter((candidateTag) =>
        currentPost.tags.includes(candidateTag),
      ).length;
      const sameCategoryScore =
        candidatePost.category === currentPost.category ? 3 : 0;
      const dateScore = new Date(candidatePost.publishDate).getTime() / 1_000_000_000_000;
      const relevanceScore = sharedTags * 2 + sameCategoryScore + dateScore;

      return {
        post: candidatePost,
        relevanceScore,
      };
    })
    .sort(
      (firstRelatedPost, secondRelatedPost) =>
        secondRelatedPost.relevanceScore - firstRelatedPost.relevanceScore,
    )
    .slice(0, limit)
    .map((relatedPost) => relatedPost.post);

  return related;
}
