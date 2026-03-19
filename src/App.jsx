import { useEffect, useState } from 'react'

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'ptPT', label: 'Português (Portugal)' },
  { value: 'es', label: 'Español' },
  { value: 'ptBR', label: 'Português (Brasil)' },
]

const contentByLocale = {
  en: {
    htmlLang: 'en',
    topbar:
      'Europe-ready raffle platform / premium dark conversion system / secure draws and trusted payments',
    brandSubtitle: 'Luxury Raffles Europe',
    navItems: [
      { id: 'competitions', label: 'Competitions' },
      { id: 'how-it-works', label: 'How it works' },
      { id: 'winners', label: 'Winners' },
      { id: 'platform', label: 'Platform' },
      { id: 'compliance', label: 'Compliance' },
    ],
    actions: {
      signIn: 'Sign in',
      participate: 'Participate now',
      explore: 'Explore live competitions',
      viewScope: 'View platform scope',
      buyTickets: 'Buy tickets now',
      enterCompetition: 'Enter competition',
      launchConcept: 'Launch the concept',
      reviewModules: 'Review product modules',
      languageLabel: 'Language',
    },
    badges: {
      live: 'Live',
      euDraw: 'EU draw',
    },
    heroSlides: [
      {
        id: 'aston',
        image:
          '/cars/hero-1.jpg',
        badge: 'Flagship Drop',
        title: 'Win an Aston Martin DB12 with a luxury Monaco weekend.',
        subtitle:
          'Premium automotive raffles built for the European market with secure checkout, live progress and audit-ready draws.',
        countdown: '04d : 18h : 22m',
        price: 'EUR 19.90',
        tickets: '18,420 / 25,000 sold',
      },
      {
        id: 'porsche',
        image:
          '/cars/hero-2.jpg',
        badge: 'Most Wanted',
        title: 'From casual visitors to buyers in minutes, not clicks.',
        subtitle:
          'A cinematic landing flow with countdown urgency, premium credibility and purchase triggers designed for high conversion.',
        countdown: '02d : 09h : 11m',
        price: 'EUR 24.90',
        tickets: '9,870 / 15,000 sold',
      },
      {
        id: 'gwagen',
        image:
          '/cars/hero-3.jpg',
        badge: 'Weekly Elite',
        title: 'Luxury dark visuals that feel exclusive, trusted and scalable.',
        subtitle:
          'Built with React and Tailwind to support campaigns, ticket sales, dashboards, payments and compliance across Europe.',
        countdown: '06d : 03h : 54m',
        price: 'EUR 14.90',
        tickets: '12,640 / 20,000 sold',
      },
    ],
    metrics: [
      { value: 'EUR 4.8M+', label: 'paid in prizes', note: 'cars, cash and experiences' },
      { value: '126K', label: 'verified members', note: 'multi-country growth ready' },
      { value: '99.98%', label: 'payment success', note: 'Stripe, Apple Pay and Google Pay' },
      { value: '24/7', label: 'audit trail', note: 'logs, RNG records and anti-bot monitoring' },
    ],
    filters: ['Supercars', 'Premium SUVs', 'Electric', 'Low Ticket Entry', 'Ending Soon', 'New This Week'],
    currentDraw: {
      eyebrow: 'Current headline draw',
      title: 'Aston Martin DB12',
      priceLabel: 'Ticket from',
      countdownLabel: 'Countdown',
      entriesLabel: 'Entries sold',
      helper: 'Checkout optimized for mobile, repeat purchases and one-tap wallets.',
    },
    platformPill: 'Premium landing / React + Tailwind / Europe market ready',
    sections: {
      competitions: {
        kicker: 'Active competitions',
        title: 'Dark premium cards designed to sell the next ticket fast.',
        copy:
          'Minimal copy, strong urgency, price visibility and premium car imagery keep the focus on conversion.',
      },
      howItWorks: {
        kicker: 'How it works',
      },
      winners: {
        kicker: 'Proof that converts',
        title: 'Social proof that feels exclusive, not noisy.',
        copy:
          'Winners, verification markers and result transparency turn aspirational traffic into confident buyers.',
        stats: [
          { value: '1,942', label: 'verified public winner stories' },
          { value: '4.9/5', label: 'average purchase experience rating' },
        ],
      },
      platform: {
        kicker: 'Platform scope',
        title: 'Everything the client asked for, translated into a premium product front.',
        copy:
          'The home can sell the dream while previewing the full system: campaigns, checkout, dashboards, admin operations and compliance.',
      },
      compliance: {
        kicker: 'Security & compliance',
        title: 'GDPR-conscious and audit-friendly by design.',
        copy:
          'Premium visuals only work when trust is equally strong. This concept highlights data protection, fraud prevention and public result integrity.',
      },
      cta: {
        kicker: 'Final CTA',
        title:
          'Ready to pitch a luxury dark raffle platform that feels expensive and converts hard?',
        copy:
          'This front is already shaped for Europe-focused vehicle giveaways, secure ticket sales and a clear premium brand narrative.',
      },
    },
    competitions: [
      {
        title: 'Porsche 911 Turbo S',
        subtitle: 'Midnight spec, Zurich delivery',
        image:
          '/cars/hero-2.jpg',
        deadline: 'Ends in 2 days',
        price: 'EUR 24.90',
        progress: 82,
        sold: '12,340 sold',
      },
      {
        title: 'Mercedes G-Class AMG',
        subtitle: 'Black pack, Paris reveal',
        image:
          '/cars/hero-3.jpg',
        deadline: 'Ends in 5 days',
        price: 'EUR 19.90',
        progress: 61,
        sold: '8,910 sold',
      },
      {
        title: 'BMW M4 Competition',
        subtitle: 'Frozen blue, Milan event',
        image:
          '/cars/card-1.jpg',
        deadline: 'Ends in 8 days',
        price: 'EUR 14.90',
        progress: 48,
        sold: '6,240 sold',
      },
      {
        title: 'Audi RS e-tron GT',
        subtitle: 'Launch edition, eco luxury',
        image:
          '/cars/card-1.jpg',
        deadline: 'Ends in 3 days',
        price: 'EUR 12.90',
        progress: 74,
        sold: '9,450 sold',
      },
      {
        title: 'Range Rover Autobiography',
        subtitle: 'Grey metallic, executive pack',
        image:
          '/cars/hero-1.jpg',
        deadline: 'Ends in 6 days',
        price: 'EUR 22.90',
        progress: 67,
        sold: '10,080 sold',
      },
      {
        title: 'Ferrari Roma Weekend Draw',
        subtitle: 'Rome event and VIP hospitality',
        image:
          '/cars/hero-2.jpg',
        deadline: 'Ends tonight',
        price: 'EUR 29.90',
        progress: 91,
        sold: '14,320 sold',
      },
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Choose your campaign',
        text: 'Browse premium vehicle drops, review specs, rules and live availability in a high-trust landing flow.',
      },
      {
        step: '02',
        title: 'Buy tickets in seconds',
        text: 'Select ticket quantity, apply coupons and pay with Stripe, Apple Pay or Google Pay in euro.',
      },
      {
        step: '03',
        title: 'Track the live draw',
        text: 'See your entries, receive notifications and follow a public, auditable result page backed by RNG logs.',
      },
    ],
    winners: [
      {
        name: 'Luca, Italy',
        prize: 'Won a Porsche 911 Turbo S',
        quote: 'The experience felt premium from the first scroll to the final confirmation email.',
        stat: 'EUR 198 spent',
      },
      {
        name: 'Sofia, Spain',
        prize: 'Won a Mercedes G-Class AMG',
        quote: 'Transparent countdowns, clear ticket tracking and instant payment confirmation built real trust.',
        stat: '43 tickets',
      },
      {
        name: 'Jonas, Germany',
        prize: 'Won an Audi RS e-tron GT',
        quote: 'The public result page and audit logs made the draw feel credible and modern.',
        stat: 'Winner verified',
      },
    ],
    modules: [
      {
        title: 'Home & Campaign Pages',
        text: 'Hero banners, active draws, countdown urgency, vehicle galleries, videos, regulations and premium conversion UI.',
      },
      {
        title: 'Checkout & Payments',
        text: 'Quantity selector, coupons, Stripe flow, Apple Pay, Google Pay, euro pricing, status handling and webhooks.',
      },
      {
        title: 'User Area',
        text: 'Dashboard, ticket wallet, draw history, payment history, profile management and notifications.',
      },
      {
        title: 'Admin Control',
        text: 'CRUD for raffles, upload center, rule configuration, financial reporting, exports and user operations.',
      },
      {
        title: 'Draw Engine',
        text: 'RNG-based number assignment, automatic or manual execution, audit logs and public winner publishing.',
      },
      {
        title: 'Security & Compliance',
        text: 'GDPR-ready patterns, encryption, anti-fraud logic, anti-bot layers and full auditability for European expansion.',
      },
    ],
    complianceItems: [
      'Encrypted data and role-based access',
      'Anti-bot purchase flows and fraud checks',
      'Webhook status monitoring with Stripe',
      'Public result page with audit logs',
    ],
    footer: {
      intro: 'Premium raffle experience for luxury vehicles, built to scale across Europe.',
      columns: [
        { title: 'Platform', items: ['Campaigns', 'Checkout', 'User dashboard'] },
        { title: 'Operations', items: ['Admin panel', 'Audit logs', 'Winner verification'] },
        { title: 'Compliance', items: ['GDPR patterns', 'Anti-fraud', 'Multi-country expansion'] },
      ],
    },
  },
  ptPT: {
    htmlLang: 'pt-PT',
    topbar:
      'Plataforma de sorteios pronta para a Europa / sistema premium dark focado em conversao / sorteios seguros e pagamentos de confianca',
    brandSubtitle: 'Sorteios de Luxo na Europa',
    navItems: [
      { id: 'competitions', label: 'Sorteios' },
      { id: 'how-it-works', label: 'Como funciona' },
      { id: 'winners', label: 'Vencedores' },
      { id: 'platform', label: 'Plataforma' },
      { id: 'compliance', label: 'Conformidade' },
    ],
    actions: {
      signIn: 'Entrar',
      participate: 'Participar agora',
      explore: 'Explorar sorteios ativos',
      viewScope: 'Ver escopo da plataforma',
      buyTickets: 'Comprar bilhetes',
      enterCompetition: 'Entrar no sorteio',
      launchConcept: 'Apresentar conceito',
      reviewModules: 'Rever modulos do produto',
      languageLabel: 'Idioma',
    },
    badges: {
      live: 'Ao vivo',
      euDraw: 'Sorteio UE',
    },
    heroSlides: [
      {
        id: 'aston',
        image:
          '/cars/hero-1.jpg',
        badge: 'Campanha principal',
        title: 'Ganhe um Aston Martin DB12 com um fim de semana de luxo no Monaco.',
        subtitle:
          'Sorteios automoveis premium pensados para o mercado europeu, com checkout seguro, progresso em direto e auditoria preparada.',
        countdown: '04d : 18h : 22m',
        price: 'EUR 19.90',
        tickets: '18,420 / 25,000 vendidos',
      },
      {
        id: 'porsche',
        image:
          '/cars/hero-2.jpg',
        badge: 'Mais desejado',
        title: 'De visitantes casuais a compradores em minutos, nao em cliques.',
        subtitle:
          'Uma landing cinematografica com urgencia de contagem decrescente, credibilidade premium e gatilhos de compra desenhados para alta conversao.',
        countdown: '02d : 09h : 11m',
        price: 'EUR 24.90',
        tickets: '9,870 / 15,000 vendidos',
      },
      {
        id: 'gwagen',
        image:
          '/cars/hero-3.jpg',
        badge: 'Elite semanal',
        title: 'Visual luxury dark com sensacao de exclusividade, confianca e escala.',
        subtitle:
          'Construido com React e Tailwind para suportar campanhas, venda de bilhetes, dashboards, pagamentos e conformidade na Europa.',
        countdown: '06d : 03h : 54m',
        price: 'EUR 14.90',
        tickets: '12,640 / 20,000 vendidos',
      },
    ],
    metrics: [
      { value: 'EUR 4.8M+', label: 'pagos em premios', note: 'carros, dinheiro e experiencias' },
      { value: '126K', label: 'membros verificados', note: 'pronto para crescer em varios paises' },
      { value: '99.98%', label: 'sucesso nos pagamentos', note: 'Stripe, Apple Pay e Google Pay' },
      { value: '24/7', label: 'trilho de auditoria', note: 'logs, registos RNG e monitorizacao anti-bot' },
    ],
    filters: ['Supercarros', 'SUV Premium', 'Eletrico', 'Baixa entrada', 'A terminar', 'Novos esta semana'],
    currentDraw: {
      eyebrow: 'Sorteio principal',
      title: 'Aston Martin DB12',
      priceLabel: 'Bilhete desde',
      countdownLabel: 'Contagem',
      entriesLabel: 'Entradas vendidas',
      helper: 'Checkout otimizado para mobile, compras repetidas e carteiras com um toque.',
    },
    platformPill: 'Landing premium / React + Tailwind / pronta para o mercado europeu',
    sections: {
      competitions: {
        kicker: 'Sorteios ativos',
        title: 'Cards premium dark desenhados para vender o proximo bilhete rapidamente.',
        copy:
          'Texto minimo, urgencia forte, preco visivel e imagens premium de carros mantem o foco na conversao.',
      },
      howItWorks: { kicker: 'Como funciona' },
      winners: {
        kicker: 'Prova que converte',
        title: 'Prova social exclusiva sem parecer ruidosa.',
        copy:
          'Vencedores, selos de verificacao e transparencia no resultado transformam trafego aspiracional em compradores confiantes.',
        stats: [
          { value: '1,942', label: 'historias publicas de vencedores verificados' },
          { value: '4.9/5', label: 'media da experiencia de compra' },
        ],
      },
      platform: {
        kicker: 'Escopo da plataforma',
        title: 'Tudo o que o cliente pediu, traduzido para um front premium.',
        copy:
          'A home vende o sonho enquanto antecipa todo o sistema: campanhas, checkout, dashboards, administracao e conformidade.',
      },
      compliance: {
        kicker: 'Seguranca e conformidade',
        title: 'Pensado para RGPD e preparado para auditoria.',
        copy:
          'O visual premium so funciona quando a confianca acompanha. Este conceito destaca protecao de dados, prevencao de fraude e integridade publica do resultado.',
      },
      cta: {
        kicker: 'CTA final',
        title:
          'Pronto para apresentar uma plataforma luxury dark de sorteios que parece cara e converte forte?',
        copy:
          'Este front ja esta preparado para sorteios europeus de veiculos, venda segura de bilhetes e uma narrativa de marca premium.',
      },
    },
    competitions: [
      {
        title: 'Porsche 911 Turbo S',
        subtitle: 'Especificacao midnight, entrega em Zurique',
        image:
          '/cars/hero-2.jpg',
        deadline: 'Termina em 2 dias',
        price: 'EUR 24.90',
        progress: 82,
        sold: '12,340 vendidos',
      },
      {
        title: 'Mercedes G-Class AMG',
        subtitle: 'Black pack, revelacao em Paris',
        image:
          '/cars/hero-3.jpg',
        deadline: 'Termina em 5 dias',
        price: 'EUR 19.90',
        progress: 61,
        sold: '8,910 vendidos',
      },
      {
        title: 'BMW M4 Competition',
        subtitle: 'Azul frozen, evento em Milao',
        image:
          '/cars/card-1.jpg',
        deadline: 'Termina em 8 dias',
        price: 'EUR 14.90',
        progress: 48,
        sold: '6,240 vendidos',
      },
      {
        title: 'Audi RS e-tron GT',
        subtitle: 'Edicao de lancamento, luxo eletrico',
        image:
          '/cars/card-1.jpg',
        deadline: 'Termina em 3 dias',
        price: 'EUR 12.90',
        progress: 74,
        sold: '9,450 vendidos',
      },
      {
        title: 'Range Rover Autobiography',
        subtitle: 'Cinza metalizado, pack executivo',
        image:
          '/cars/hero-1.jpg',
        deadline: 'Termina em 6 dias',
        price: 'EUR 22.90',
        progress: 67,
        sold: '10,080 vendidos',
      },
      {
        title: 'Ferrari Roma Weekend Draw',
        subtitle: 'Evento em Roma e hospitalidade VIP',
        image:
          '/cars/hero-2.jpg',
        deadline: 'Termina hoje',
        price: 'EUR 29.90',
        progress: 91,
        sold: '14,320 vendidos',
      },
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Escolha a campanha',
        text: 'Navegue por sorteios premium de veiculos, veja especificacoes, regras e disponibilidade em tempo real numa landing de alta confianca.',
      },
      {
        step: '02',
        title: 'Compre bilhetes em segundos',
        text: 'Selecione a quantidade, aplique cupoes e pague com Stripe, Apple Pay ou Google Pay em euro.',
      },
      {
        step: '03',
        title: 'Acompanhe o sorteio',
        text: 'Veja as suas entradas, receba notificacoes e acompanhe uma pagina publica de resultado suportada por registos RNG.',
      },
    ],
    winners: [
      {
        name: 'Luca, Italia',
        prize: 'Ganhou um Porsche 911 Turbo S',
        quote: 'A experiencia pareceu premium desde o primeiro scroll ate ao email final de confirmacao.',
        stat: 'EUR 198 gastos',
      },
      {
        name: 'Sofia, Espanha',
        prize: 'Ganhou um Mercedes G-Class AMG',
        quote: 'Contagens transparentes, rastreio claro dos bilhetes e confirmacao imediata do pagamento criaram confianca real.',
        stat: '43 bilhetes',
      },
      {
        name: 'Jonas, Alemanha',
        prize: 'Ganhou um Audi RS e-tron GT',
        quote: 'A pagina publica do resultado e os logs de auditoria deram credibilidade moderna ao sorteio.',
        stat: 'Vencedor verificado',
      },
    ],
    modules: [
      {
        title: 'Home e Paginas de Campanha',
        text: 'Hero banners, sorteios ativos, urgencia por contagem, galerias do veiculo, videos, regulamento e UI premium de conversao.',
      },
      {
        title: 'Checkout e Pagamentos',
        text: 'Seletor de quantidade, cupoes, fluxo Stripe, Apple Pay, Google Pay, precos em euro, estados e webhooks.',
      },
      {
        title: 'Area do Utilizador',
        text: 'Dashboard, carteira de bilhetes, historico de sorteios, historico de pagamentos, perfil e notificacoes.',
      },
      {
        title: 'Controlo Admin',
        text: 'CRUD de sorteios, centro de uploads, configuracao de regras, relatorios financeiros, exportacoes e gestao de utilizadores.',
      },
      {
        title: 'Motor de Sorteio',
        text: 'Atribuicao por RNG, execucao automatica ou manual, logs de auditoria e publicacao publica do vencedor.',
      },
      {
        title: 'Seguranca e Conformidade',
        text: 'Padroes RGPD, encriptacao, logica anti-fraude, camadas anti-bot e auditoria completa para expansao europeia.',
      },
    ],
    complianceItems: [
      'Dados encriptados e acessos por perfil',
      'Fluxos anti-bot e verificacoes anti-fraude',
      'Monitorizacao de estados e webhooks Stripe',
      'Pagina publica do resultado com logs de auditoria',
    ],
    footer: {
      intro: 'Experiencia premium de sorteios para veiculos de luxo, pronta para escalar em toda a Europa.',
      columns: [
        { title: 'Plataforma', items: ['Campanhas', 'Checkout', 'Dashboard do utilizador'] },
        { title: 'Operacoes', items: ['Painel admin', 'Logs de auditoria', 'Verificacao do vencedor'] },
        { title: 'Conformidade', items: ['Padroes RGPD', 'Anti-fraude', 'Expansao multi-pais'] },
      ],
    },
  },
  es: {
    htmlLang: 'es',
    topbar:
      'Plataforma de sorteos lista para Europa / sistema premium dark centrado en conversion / sorteos seguros y pagos de confianza',
    brandSubtitle: 'Sorteos de Lujo en Europa',
    navItems: [
      { id: 'competitions', label: 'Sorteos' },
      { id: 'how-it-works', label: 'Como funciona' },
      { id: 'winners', label: 'Ganadores' },
      { id: 'platform', label: 'Plataforma' },
      { id: 'compliance', label: 'Cumplimiento' },
    ],
    actions: {
      signIn: 'Entrar',
      participate: 'Participar ahora',
      explore: 'Explorar sorteos activos',
      viewScope: 'Ver alcance de la plataforma',
      buyTickets: 'Comprar boletos',
      enterCompetition: 'Entrar al sorteo',
      launchConcept: 'Presentar concepto',
      reviewModules: 'Revisar modulos del producto',
      languageLabel: 'Idioma',
    },
    badges: {
      live: 'En vivo',
      euDraw: 'Sorteo UE',
    },
    heroSlides: [
      {
        id: 'aston',
        image:
          '/cars/hero-1.jpg',
        badge: 'Campaña principal',
        title: 'Gana un Aston Martin DB12 con un fin de semana de lujo en Monaco.',
        subtitle:
          'Sorteos automotrices premium pensados para el mercado europeo, con checkout seguro, progreso en vivo y sorteos auditables.',
        countdown: '04d : 18h : 22m',
        price: 'EUR 19.90',
        tickets: '18,420 / 25,000 vendidos',
      },
      {
        id: 'porsche',
        image:
          '/cars/hero-2.jpg',
        badge: 'Mas deseado',
        title: 'De visitantes casuales a compradores en minutos, no en clics.',
        subtitle:
          'Una landing cinematografica con urgencia por cuenta regresiva, credibilidad premium y disparadores de compra diseñados para alta conversion.',
        countdown: '02d : 09h : 11m',
        price: 'EUR 24.90',
        tickets: '9,870 / 15,000 vendidos',
      },
      {
        id: 'gwagen',
        image:
          '/cars/hero-3.jpg',
        badge: 'Elite semanal',
        title: 'Visual luxury dark con sensacion de exclusividad, confianza y escala.',
        subtitle:
          'Construido con React y Tailwind para soportar campañas, venta de boletos, dashboards, pagos y cumplimiento en Europa.',
        countdown: '06d : 03h : 54m',
        price: 'EUR 14.90',
        tickets: '12,640 / 20,000 vendidos',
      },
    ],
    metrics: [
      { value: 'EUR 4.8M+', label: 'pagados en premios', note: 'coches, efectivo y experiencias' },
      { value: '126K', label: 'miembros verificados', note: 'listo para crecer en varios paises' },
      { value: '99.98%', label: 'exito en pagos', note: 'Stripe, Apple Pay y Google Pay' },
      { value: '24/7', label: 'rastro de auditoria', note: 'logs, registros RNG y monitoreo anti-bot' },
    ],
    filters: ['Superdeportivos', 'SUV Premium', 'Electrico', 'Entrada baja', 'Termina pronto', 'Nuevos esta semana'],
    currentDraw: {
      eyebrow: 'Sorteo principal',
      title: 'Aston Martin DB12',
      priceLabel: 'Boleto desde',
      countdownLabel: 'Cuenta atras',
      entriesLabel: 'Entradas vendidas',
      helper: 'Checkout optimizado para mobile, compras repetidas y billeteras de un toque.',
    },
    platformPill: 'Landing premium / React + Tailwind / lista para el mercado europeo',
    sections: {
      competitions: {
        kicker: 'Sorteos activos',
        title: 'Cards premium dark diseñadas para vender el siguiente boleto rapido.',
        copy:
          'Texto minimo, urgencia fuerte, precio visible e imagenes premium de coches mantienen el foco en la conversion.',
      },
      howItWorks: { kicker: 'Como funciona' },
      winners: {
        kicker: 'Prueba que convierte',
        title: 'Prueba social exclusiva sin verse ruidosa.',
        copy:
          'Ganadores, sellos de verificacion y transparencia del resultado convierten trafico aspiracional en compradores seguros.',
        stats: [
          { value: '1,942', label: 'historias publicas de ganadores verificados' },
          { value: '4.9/5', label: 'promedio de experiencia de compra' },
        ],
      },
      platform: {
        kicker: 'Alcance de la plataforma',
        title: 'Todo lo que pidio el cliente, traducido a un front premium.',
        copy:
          'La home vende el sueño mientras adelanta todo el sistema: campañas, checkout, dashboards, administracion y cumplimiento.',
      },
      compliance: {
        kicker: 'Seguridad y cumplimiento',
        title: 'Diseñado con GDPR en mente y listo para auditoria.',
        copy:
          'Lo premium solo funciona cuando la confianza acompaña. Este concepto destaca proteccion de datos, prevencion de fraude e integridad publica del resultado.',
      },
      cta: {
        kicker: 'CTA final',
        title:
          'Listo para presentar una plataforma luxury dark de sorteos que se vea cara y convierta fuerte?',
        copy:
          'Este front ya esta preparado para sorteos europeos de vehiculos, venta segura de boletos y una narrativa clara de marca premium.',
      },
    },
    competitions: [
      {
        title: 'Porsche 911 Turbo S',
        subtitle: 'Especificacion midnight, entrega en Zurich',
        image:
          '/cars/hero-2.jpg',
        deadline: 'Termina en 2 dias',
        price: 'EUR 24.90',
        progress: 82,
        sold: '12,340 vendidos',
      },
      {
        title: 'Mercedes G-Class AMG',
        subtitle: 'Black pack, estreno en Paris',
        image:
          '/cars/hero-3.jpg',
        deadline: 'Termina en 5 dias',
        price: 'EUR 19.90',
        progress: 61,
        sold: '8,910 vendidos',
      },
      {
        title: 'BMW M4 Competition',
        subtitle: 'Azul frozen, evento en Milan',
        image:
          '/cars/card-1.jpg',
        deadline: 'Termina en 8 dias',
        price: 'EUR 14.90',
        progress: 48,
        sold: '6,240 vendidos',
      },
      {
        title: 'Audi RS e-tron GT',
        subtitle: 'Edicion de lanzamiento, lujo electrico',
        image:
          '/cars/card-1.jpg',
        deadline: 'Termina en 3 dias',
        price: 'EUR 12.90',
        progress: 74,
        sold: '9,450 vendidos',
      },
      {
        title: 'Range Rover Autobiography',
        subtitle: 'Gris metalico, pack ejecutivo',
        image:
          '/cars/hero-1.jpg',
        deadline: 'Termina en 6 dias',
        price: 'EUR 22.90',
        progress: 67,
        sold: '10,080 vendidos',
      },
      {
        title: 'Ferrari Roma Weekend Draw',
        subtitle: 'Evento en Roma y hospitalidad VIP',
        image:
          '/cars/hero-2.jpg',
        deadline: 'Termina hoy',
        price: 'EUR 29.90',
        progress: 91,
        sold: '14,320 vendidos',
      },
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Elige tu campaña',
        text: 'Explora sorteos premium de vehiculos, revisa especificaciones, reglas y disponibilidad en vivo dentro de una landing de alta confianza.',
      },
      {
        step: '02',
        title: 'Compra boletos en segundos',
        text: 'Selecciona la cantidad, aplica cupones y paga con Stripe, Apple Pay o Google Pay en euro.',
      },
      {
        step: '03',
        title: 'Sigue el sorteo en vivo',
        text: 'Consulta tus entradas, recibe notificaciones y sigue una pagina publica del resultado respaldada por logs RNG.',
      },
    ],
    winners: [
      {
        name: 'Luca, Italia',
        prize: 'Gano un Porsche 911 Turbo S',
        quote: 'La experiencia se sintio premium desde el primer scroll hasta el correo final de confirmacion.',
        stat: 'EUR 198 gastados',
      },
      {
        name: 'Sofia, España',
        prize: 'Gano un Mercedes G-Class AMG',
        quote: 'Cuentas regresivas transparentes, seguimiento claro de boletos y confirmacion inmediata del pago generaron confianza real.',
        stat: '43 boletos',
      },
      {
        name: 'Jonas, Alemania',
        prize: 'Gano un Audi RS e-tron GT',
        quote: 'La pagina publica del resultado y los logs de auditoria hicieron que el sorteo se sintiera creible y moderno.',
        stat: 'Ganador verificado',
      },
    ],
    modules: [
      {
        title: 'Home y Paginas de Campaña',
        text: 'Hero banners, sorteos activos, urgencia por cuenta atras, galerias del vehiculo, videos, reglamento y UI premium de conversion.',
      },
      {
        title: 'Checkout y Pagos',
        text: 'Selector de cantidad, cupones, flujo Stripe, Apple Pay, Google Pay, precios en euro, estados y webhooks.',
      },
      {
        title: 'Area del Usuario',
        text: 'Dashboard, billetera de boletos, historial de sorteos, historial de pagos, perfil y notificaciones.',
      },
      {
        title: 'Control Admin',
        text: 'CRUD de sorteos, centro de carga, configuracion de reglas, reportes financieros, exportaciones y gestion de usuarios.',
      },
      {
        title: 'Motor de Sorteo',
        text: 'Asignacion por RNG, ejecucion automatica o manual, logs de auditoria y publicacion publica del ganador.',
      },
      {
        title: 'Seguridad y Cumplimiento',
        text: 'Patrones GDPR, encriptacion, logica anti-fraude, capas anti-bot y auditoria completa para expansion europea.',
      },
    ],
    complianceItems: [
      'Datos cifrados y accesos por rol',
      'Flujos anti-bot y controles anti-fraude',
      'Monitoreo de estados y webhooks Stripe',
      'Pagina publica del resultado con logs de auditoria',
    ],
    footer: {
      intro: 'Experiencia premium de sorteos para vehiculos de lujo, lista para escalar en toda Europa.',
      columns: [
        { title: 'Plataforma', items: ['Campañas', 'Checkout', 'Dashboard del usuario'] },
        { title: 'Operaciones', items: ['Panel admin', 'Logs de auditoria', 'Verificacion del ganador'] },
        { title: 'Cumplimiento', items: ['Patrones GDPR', 'Anti-fraude', 'Expansion multi-pais'] },
      ],
    },
  },
  ptBR: {
    htmlLang: 'pt-BR',
    topbar:
      'Plataforma de sorteios pronta para a Europa / sistema premium dark focado em conversao / sorteios seguros e pagamentos confiaveis',
    brandSubtitle: 'Sorteios de Luxo na Europa',
    navItems: [
      { id: 'competitions', label: 'Sorteios' },
      { id: 'how-it-works', label: 'Como funciona' },
      { id: 'winners', label: 'Ganhadores' },
      { id: 'platform', label: 'Plataforma' },
      { id: 'compliance', label: 'Compliance' },
    ],
    actions: {
      signIn: 'Entrar',
      participate: 'Participar agora',
      explore: 'Explorar sorteios ativos',
      viewScope: 'Ver escopo da plataforma',
      buyTickets: 'Comprar bilhetes',
      enterCompetition: 'Entrar no sorteio',
      launchConcept: 'Apresentar conceito',
      reviewModules: 'Revisar modulos do produto',
      languageLabel: 'Idioma',
    },
    badges: {
      live: 'Ao vivo',
      euDraw: 'Sorteio UE',
    },
    heroSlides: [
      {
        id: 'aston',
        image:
          '/cars/hero-1.jpg',
        badge: 'Campanha principal',
        title: 'Ganhe um Aston Martin DB12 com um fim de semana de luxo em Monaco.',
        subtitle:
          'Sorteios automotivos premium pensados para o mercado europeu, com checkout seguro, progresso ao vivo e apuracao auditavel.',
        countdown: '04d : 18h : 22m',
        price: 'EUR 19.90',
        tickets: '18,420 / 25,000 vendidos',
      },
      {
        id: 'porsche',
        image:
          '/cars/hero-2.jpg',
        badge: 'Mais desejado',
        title: 'De visitantes curiosos a compradores em minutos, nao em cliques.',
        subtitle:
          'Uma landing cinematografica com urgencia de contagem regressiva, credibilidade premium e gatilhos de compra desenhados para alta conversao.',
        countdown: '02d : 09h : 11m',
        price: 'EUR 24.90',
        tickets: '9,870 / 15,000 vendidos',
      },
      {
        id: 'gwagen',
        image:
          '/cars/hero-3.jpg',
        badge: 'Elite semanal',
        title: 'Visual luxury dark com sensacao de exclusividade, confianca e escala.',
        subtitle:
          'Construido com React e Tailwind para suportar campanhas, venda de bilhetes, dashboards, pagamentos e compliance na Europa.',
        countdown: '06d : 03h : 54m',
        price: 'EUR 14.90',
        tickets: '12,640 / 20,000 vendidos',
      },
    ],
    metrics: [
      { value: 'EUR 4.8M+', label: 'pagos em premios', note: 'carros, dinheiro e experiencias' },
      { value: '126K', label: 'membros verificados', note: 'pronto para crescer em varios paises' },
      { value: '99.98%', label: 'sucesso nos pagamentos', note: 'Stripe, Apple Pay e Google Pay' },
      { value: '24/7', label: 'trilha de auditoria', note: 'logs, registros RNG e monitoramento anti-bot' },
    ],
    filters: ['Supercarros', 'SUV Premium', 'Eletrico', 'Baixa entrada', 'Terminando logo', 'Novos esta semana'],
    currentDraw: {
      eyebrow: 'Sorteio principal',
      title: 'Aston Martin DB12',
      priceLabel: 'Bilhete a partir de',
      countdownLabel: 'Contagem',
      entriesLabel: 'Entradas vendidas',
      helper: 'Checkout otimizado para mobile, compras recorrentes e carteiras com um toque.',
    },
    platformPill: 'Landing premium / React + Tailwind / pronta para o mercado europeu',
    sections: {
      competitions: {
        kicker: 'Sorteios ativos',
        title: 'Cards premium dark desenhados para vender o proximo bilhete rapido.',
        copy:
          'Texto minimo, urgencia forte, preco visivel e imagens premium de carros mantem o foco na conversao.',
      },
      howItWorks: { kicker: 'Como funciona' },
      winners: {
        kicker: 'Prova que converte',
        title: 'Prova social exclusiva sem parecer poluida.',
        copy:
          'Ganhadores, selos de verificacao e transparencia no resultado transformam trafego aspiracional em compradores confiantes.',
        stats: [
          { value: '1,942', label: 'historias publicas de ganhadores verificados' },
          { value: '4.9/5', label: 'media da experiencia de compra' },
        ],
      },
      platform: {
        kicker: 'Escopo da plataforma',
        title: 'Tudo o que o cliente pediu, traduzido para um front premium.',
        copy:
          'A home vende o sonho enquanto antecipa o sistema inteiro: campanhas, checkout, dashboards, administracao e compliance.',
      },
      compliance: {
        kicker: 'Seguranca e compliance',
        title: 'Pensado para GDPR e pronto para auditoria.',
        copy:
          'O visual premium so funciona quando a confianca acompanha. Este conceito destaca protecao de dados, prevencao de fraude e integridade publica do resultado.',
      },
      cta: {
        kicker: 'CTA final',
        title:
          'Pronto para apresentar uma plataforma luxury dark de sorteios que parece cara e converte forte?',
        copy:
          'Este front ja esta moldado para sorteios europeus de veiculos, venda segura de bilhetes e uma narrativa premium de marca.',
      },
    },
    competitions: [
      {
        title: 'Porsche 911 Turbo S',
        subtitle: 'Especificacao midnight, entrega em Zurique',
        image:
          '/cars/hero-2.jpg',
        deadline: 'Termina em 2 dias',
        price: 'EUR 24.90',
        progress: 82,
        sold: '12,340 vendidos',
      },
      {
        title: 'Mercedes G-Class AMG',
        subtitle: 'Black pack, reveal em Paris',
        image:
          '/cars/hero-3.jpg',
        deadline: 'Termina em 5 dias',
        price: 'EUR 19.90',
        progress: 61,
        sold: '8,910 vendidos',
      },
      {
        title: 'BMW M4 Competition',
        subtitle: 'Azul frozen, evento em Milao',
        image:
          '/cars/card-1.jpg',
        deadline: 'Termina em 8 dias',
        price: 'EUR 14.90',
        progress: 48,
        sold: '6,240 vendidos',
      },
      {
        title: 'Audi RS e-tron GT',
        subtitle: 'Edicao de lancamento, luxo eletrico',
        image:
          '/cars/card-1.jpg',
        deadline: 'Termina em 3 dias',
        price: 'EUR 12.90',
        progress: 74,
        sold: '9,450 vendidos',
      },
      {
        title: 'Range Rover Autobiography',
        subtitle: 'Cinza metalico, pacote executivo',
        image:
          '/cars/hero-1.jpg',
        deadline: 'Termina em 6 dias',
        price: 'EUR 22.90',
        progress: 67,
        sold: '10,080 vendidos',
      },
      {
        title: 'Ferrari Roma Weekend Draw',
        subtitle: 'Evento em Roma com hospitalidade VIP',
        image:
          '/cars/hero-2.jpg',
        deadline: 'Termina hoje',
        price: 'EUR 29.90',
        progress: 91,
        sold: '14,320 vendidos',
      },
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Escolha a campanha',
        text: 'Navegue por sorteios premium de veiculos, veja especificacoes, regras e disponibilidade ao vivo em uma landing de alta confianca.',
      },
      {
        step: '02',
        title: 'Compre bilhetes em segundos',
        text: 'Selecione a quantidade, aplique cupons e pague com Stripe, Apple Pay ou Google Pay em euro.',
      },
      {
        step: '03',
        title: 'Acompanhe o sorteio',
        text: 'Veja suas entradas, receba notificacoes e acompanhe uma pagina publica de resultado sustentada por logs RNG.',
      },
    ],
    winners: [
      {
        name: 'Luca, Italia',
        prize: 'Ganhou um Porsche 911 Turbo S',
        quote: 'A experiencia pareceu premium desde o primeiro scroll ate o email final de confirmacao.',
        stat: 'EUR 198 gastos',
      },
      {
        name: 'Sofia, Espanha',
        prize: 'Ganhou um Mercedes G-Class AMG',
        quote: 'Contagens transparentes, rastreio claro dos bilhetes e confirmacao imediata do pagamento geraram confianca real.',
        stat: '43 bilhetes',
      },
      {
        name: 'Jonas, Alemanha',
        prize: 'Ganhou um Audi RS e-tron GT',
        quote: 'A pagina publica do resultado e os logs de auditoria deram credibilidade moderna ao sorteio.',
        stat: 'Ganhador verificado',
      },
    ],
    modules: [
      {
        title: 'Home e Paginas de Campanha',
        text: 'Hero banners, sorteios ativos, urgencia por contagem, galerias do veiculo, videos, regulamento e UI premium de conversao.',
      },
      {
        title: 'Checkout e Pagamentos',
        text: 'Seletor de quantidade, cupons, fluxo Stripe, Apple Pay, Google Pay, precos em euro, estados e webhooks.',
      },
      {
        title: 'Area do Usuario',
        text: 'Dashboard, carteira de bilhetes, historico de sorteios, historico de pagamentos, perfil e notificacoes.',
      },
      {
        title: 'Controle Admin',
        text: 'CRUD de sorteios, central de uploads, configuracao de regras, relatorios financeiros, exportacoes e gestao de usuarios.',
      },
      {
        title: 'Motor de Sorteio',
        text: 'Atribuicao por RNG, execucao automatica ou manual, logs de auditoria e publicacao publica do ganhador.',
      },
      {
        title: 'Seguranca e Compliance',
        text: 'Padroes GDPR, criptografia, logica anti-fraude, camadas anti-bot e auditoria completa para expansao europeia.',
      },
    ],
    complianceItems: [
      'Dados criptografados e acessos por perfil',
      'Fluxos anti-bot e verificacoes anti-fraude',
      'Monitoramento de estados e webhooks Stripe',
      'Pagina publica do resultado com logs de auditoria',
    ],
    footer: {
      intro: 'Experiencia premium de sorteios para veiculos de luxo, pronta para escalar em toda a Europa.',
      columns: [
        { title: 'Plataforma', items: ['Campanhas', 'Checkout', 'Dashboard do usuario'] },
        { title: 'Operacoes', items: ['Painel admin', 'Logs de auditoria', 'Verificacao do ganhador'] },
        { title: 'Compliance', items: ['Padroes GDPR', 'Anti-fraude', 'Expansao multi-pais'] },
      ],
    },
  },
}

const mergeCollection = (base = [], overrides = []) =>
  overrides.length ? base.map((item, index) => ({ ...item, ...(overrides[index] ?? {}) })) : base

const mergePresentationCopy = (base, overrides) => ({
  ...base,
  ...overrides,
  heroSlides: mergeCollection(base.heroSlides, overrides.heroSlides),
  metrics: mergeCollection(base.metrics, overrides.metrics),
  competitions: mergeCollection(base.competitions, overrides.competitions),
  howItWorks: mergeCollection(base.howItWorks, overrides.howItWorks),
  winners: mergeCollection(base.winners, overrides.winners),
  modules: mergeCollection(base.modules, overrides.modules),
  currentDraw: {
    ...base.currentDraw,
    ...(overrides.currentDraw ?? {}),
  },
  sections: {
    ...base.sections,
    ...(overrides.sections ?? {}),
    competitions: {
      ...base.sections.competitions,
      ...(overrides.sections?.competitions ?? {}),
    },
    howItWorks: {
      ...base.sections.howItWorks,
      ...(overrides.sections?.howItWorks ?? {}),
    },
    winners: {
      ...base.sections.winners,
      ...(overrides.sections?.winners ?? {}),
    },
    platform: {
      ...base.sections.platform,
      ...(overrides.sections?.platform ?? {}),
    },
    compliance: {
      ...base.sections.compliance,
      ...(overrides.sections?.compliance ?? {}),
    },
    cta: {
      ...base.sections.cta,
      ...(overrides.sections?.cta ?? {}),
    },
  },
  footer: {
    ...base.footer,
    ...(overrides.footer ?? {}),
  },
})

const presentationOverridesByLocale = {
  en: {
    topbar: 'Presentation concept / fictional content / premium automotive interface',
    brandSubtitle: 'Presentation Demo',
    heroSlides: [
      {
        badge: 'Featured concept',
        title: 'Premium vehicle presentation with a more compact, cinematic layout.',
        subtitle:
          'Fictional content prepared to showcase hierarchy, spacing and premium visual direction.',
        price: 'EUR 12.50',
        tickets: '6,240 / 12,000 sample entries',
      },
      {
        badge: 'Visual study',
        title: 'A refined landing flow focused on elegance, clarity and rhythm.',
        subtitle:
          'This version uses neutral placeholder copy so the client can evaluate the interface without operational claims.',
        price: 'EUR 16.00',
        tickets: '4,180 / 9,500 sample entries',
      },
      {
        badge: 'Showcase mode',
        title: 'Luxury dark styling applied consistently across the full page.',
        subtitle:
          'The goal is a polished presentation layer with stronger continuity, density and premium balance.',
        price: 'EUR 10.00',
        tickets: '7,020 / 14,000 sample entries',
      },
    ],
    metrics: [
      { value: '120K', label: 'sample audience', note: 'fictional numbers for presentation only' },
      { value: '48', label: 'showcase campaigns', note: 'placeholder catalogue for visual balance' },
      { value: '18', label: 'market views', note: 'multi-language presentation example' },
      { value: '24/7', label: 'demo flow', note: 'illustrative status block for the concept' },
    ],
    filters: ['Featured', 'Performance', 'Electric', 'Weekend', 'Limited', 'New layout'],
    currentDraw: {
      eyebrow: 'Featured example',
      title: 'Signature Coupe Concept',
      priceLabel: 'Entry from',
      countdownLabel: 'Sample timer',
      entriesLabel: 'Example entries',
      helper: 'Illustrative block created to present structure, hierarchy and premium finish.',
    },
    sections: {
      competitions: {
        kicker: 'Presentation cards',
        title: 'A denser grid with cleaner hierarchy and more controlled spacing.',
        copy: 'All content below is fictional and serves only to demonstrate layout, rhythm and component polish.',
      },
      howItWorks: { kicker: 'Presentation flow' },
      winners: {
        kicker: 'Visual proof',
        title: 'Social proof styled for presentation, not for hard claims.',
        copy: 'Names, numbers and stories are placeholders used to simulate a premium high-trust environment.',
        stats: [
          { value: '128', label: 'sample stories displayed' },
          { value: '4.8/5', label: 'illustrative satisfaction score' },
        ],
      },
      platform: {
        kicker: 'Interface scope',
        title: 'Key product areas presented with neutral copy and consistent styling.',
        copy: 'This section summarizes the visual system and example modules without implying final business rules.',
      },
      compliance: {
        kicker: 'Trust layer',
        title: 'Supportive trust messaging for presentation purposes.',
        copy: 'These blocks simulate security and governance content while keeping the proposal light and non-definitive.',
      },
      cta: {
        kicker: 'Closing block',
        title: 'A tighter final section that keeps the page premium without extending the scroll too much.',
        copy: 'Built as a presentation surface so the client can approve direction, density and overall visual finish.',
      },
    },
    competitions: [
      { title: 'Signature Coupe Concept', subtitle: 'Placeholder spec for visual presentation', deadline: 'Closes soon', price: 'EUR 12.50', sold: '6,240 sample entries' },
      { title: 'Midnight SUV Study', subtitle: 'Premium utility example card', deadline: 'Limited window', price: 'EUR 14.00', sold: '5,180 sample entries' },
      { title: 'Grand Tour Mockup', subtitle: 'Long-distance luxury presentation', deadline: 'This week', price: 'EUR 10.50', sold: '4,960 sample entries' },
      { title: 'Electric Sport Edition', subtitle: 'Clean performance concept entry', deadline: 'Ending shortly', price: 'EUR 11.20', sold: '5,740 sample entries' },
      { title: 'Executive Utility Feature', subtitle: 'Neutral premium placeholder', deadline: 'Closing later', price: 'EUR 13.40', sold: '4,480 sample entries' },
      { title: 'Collector Weekend Showcase', subtitle: 'Presentation-only highlight block', deadline: 'Final hours', price: 'EUR 15.00', sold: '6,880 sample entries' },
    ],
    howItWorks: [
      { step: '01', title: 'Browse the concept', text: 'Scan the showcase and evaluate the visual hierarchy, imagery and premium dark composition.' },
      { step: '02', title: 'Review the interactions', text: 'Use the cards, chips and CTAs as a preview of how the presentation system behaves.' },
      { step: '03', title: 'Validate the direction', text: 'Treat the content as neutral placeholders while focusing on layout quality and brand perception.' },
    ],
    winners: [
      { name: 'Sample profile A', prize: 'Example showcase card', quote: 'This placeholder story exists to simulate trust and reinforce the premium tone of the page.', stat: 'Presentation only' },
      { name: 'Sample profile B', prize: 'Visual proof module', quote: 'Neutral copy helps keep attention on the design language, spacing and visual confidence.', stat: 'Fictional data' },
      { name: 'Sample profile C', prize: 'Interface concept', quote: 'The goal here is to present a polished structure without introducing strong commercial claims.', stat: 'Client preview' },
    ],
    modules: [
      { title: 'Landing Showcase', text: 'Example hero, filters, cards and section rhythm designed to support a premium automotive presentation.' },
      { title: 'Checkout Preview', text: 'Neutral placeholders that suggest quantity selection, summary blocks and payment interaction patterns.' },
      { title: 'User Area Preview', text: 'Illustrative dashboard cards for entries, history and notifications with the same visual system.' },
      { title: 'Admin Preview', text: 'Management-facing blocks styled to match the front-end language without going into implementation detail.' },
      { title: 'Draw Preview', text: 'Example status and control modules used only to indicate capability categories in the presentation.' },
      { title: 'Trust & Control', text: 'Supportive compliance and monitoring placeholders that help complete the premium product narrative.' },
    ],
    complianceItems: [
      'Illustrative identity and access messaging',
      'Placeholder anti-abuse and monitoring notes',
      'Example payment status and event feedback',
      'Neutral public result and audit presentation',
    ],
    footer: {
      intro: 'Fictional presentation environment created to demonstrate a premium dark automotive interface.',
      columns: [
        { title: 'Showcase', items: ['Hero concept', 'Competition cards', 'Closing CTA'] },
        { title: 'Experience', items: ['Checkout preview', 'User area', 'Admin preview'] },
        { title: 'Trust', items: ['Guidance blocks', 'Status feedback', 'Presentation notes'] },
      ],
    },
  },
  ptPT: {
    topbar: 'Conceito de apresentacao / conteudo ficticio / interface premium automovel',
    brandSubtitle: 'Demo de Apresentacao',
    heroSlides: [
      { badge: 'Conceito em destaque', title: 'Apresentacao premium de veiculo com composicao cinematografica mais compacta.', subtitle: 'Conteudo ficticio preparado para destacar hierarquia, espaco e acabamento visual premium.', price: 'EUR 12.50', tickets: '6,240 / 12,000 entradas exemplo' },
      { badge: 'Estudo visual', title: 'Uma landing mais refinada, elegante e com ritmo melhor controlado.', subtitle: 'Esta versao usa texto neutro para o cliente avaliar o interface sem claims operacionais.', price: 'EUR 16.00', tickets: '4,180 / 9,500 entradas exemplo' },
      { badge: 'Modo showcase', title: 'Identidade luxury dark aplicada de forma consistente em toda a pagina.', subtitle: 'O objetivo e apresentar uma superficie premium com melhor continuidade e densidade.', price: 'EUR 10.00', tickets: '7,020 / 14,000 entradas exemplo' },
    ],
    metrics: [
      { value: '120K', label: 'audiencia exemplo', note: 'numeros ficticios apenas para apresentacao' },
      { value: '48', label: 'campanhas exemplo', note: 'catalogo placeholder para equilibrio visual' },
      { value: '18', label: 'visoes de mercado', note: 'exemplo multi-idioma de apresentacao' },
      { value: '24/7', label: 'fluxo demo', note: 'bloco ilustrativo para o conceito' },
    ],
    filters: ['Destaque', 'Performance', 'Eletrico', 'Fim de semana', 'Limitado', 'Novo layout'],
    currentDraw: {
      eyebrow: 'Exemplo principal',
      title: 'Signature Coupe Concept',
      priceLabel: 'Entrada desde',
      countdownLabel: 'Temporizador demo',
      entriesLabel: 'Entradas exemplo',
      helper: 'Bloco ilustrativo criado para apresentar estrutura, hierarquia e acabamento premium.',
    },
    sections: {
      competitions: { kicker: 'Cards de apresentacao', title: 'Uma grelha mais compacta, com hierarquia limpa e espacos mais controlados.', copy: 'Todo o conteudo abaixo e ficticio e serve apenas para demonstrar layout, ritmo e acabamento visual.' },
      howItWorks: { kicker: 'Fluxo de apresentacao' },
      winners: { kicker: 'Prova visual', title: 'Prova social estilizada para apresentacao, nao para claims fortes.', copy: 'Nomes, numeros e historias sao placeholders para simular um ambiente premium e credivel.', stats: [{ value: '128', label: 'historias exemplo visiveis' }, { value: '4.8/5', label: 'indice ilustrativo de satisfacao' }] },
      platform: { kicker: 'Escopo visual', title: 'Areas principais do produto apresentadas com copy neutra e estilo consistente.', copy: 'Esta secao resume o sistema visual e modulos exemplo sem implicar regras finais de negocio.' },
      compliance: { kicker: 'Camada de confianca', title: 'Mensagens de suporte e confianca para efeito de apresentacao.', copy: 'Estes blocos simulam seguranca e governance mantendo a proposta leve e nao definitiva.' },
      cta: { kicker: 'Bloco final', title: 'Uma secao final mais compacta para manter o site premium sem alongar demasiado o scroll.', copy: 'Construido como superficie de apresentacao para o cliente validar direcao, densidade e acabamento geral.' },
    },
    competitions: [
      { title: 'Signature Coupe Concept', subtitle: 'Especificacao placeholder para apresentacao', deadline: 'Fecha em breve', price: 'EUR 12.50', sold: '6,240 entradas exemplo' },
      { title: 'Midnight SUV Study', subtitle: 'Card premium utilitario de exemplo', deadline: 'Janela limitada', price: 'EUR 14.00', sold: '5,180 entradas exemplo' },
      { title: 'Grand Tour Mockup', subtitle: 'Apresentacao de luxo para longa distancia', deadline: 'Esta semana', price: 'EUR 10.50', sold: '4,960 entradas exemplo' },
      { title: 'Electric Sport Edition', subtitle: 'Conceito limpo de performance', deadline: 'A terminar', price: 'EUR 11.20', sold: '5,740 entradas exemplo' },
      { title: 'Executive Utility Feature', subtitle: 'Placeholder premium neutro', deadline: 'Fecha mais tarde', price: 'EUR 13.40', sold: '4,480 entradas exemplo' },
      { title: 'Collector Weekend Showcase', subtitle: 'Bloco de destaque para apresentacao', deadline: 'Ultimas horas', price: 'EUR 15.00', sold: '6,880 entradas exemplo' },
    ],
    howItWorks: [
      { step: '01', title: 'Explorar o conceito', text: 'Observe a composicao visual, a hierarquia e o equilibrio da experiencia premium dark.' },
      { step: '02', title: 'Rever as interacoes', text: 'Use os cards, filtros e botoes como demonstracao do comportamento visual do sistema.' },
      { step: '03', title: 'Validar a direcao', text: 'Considere os textos como placeholders neutros enquanto avalia densidade e percecao de marca.' },
    ],
    winners: [
      { name: 'Perfil exemplo A', prize: 'Card de showcase', quote: 'Esta historia placeholder existe apenas para simular confianca e reforcar o tom premium da pagina.', stat: 'Apenas apresentacao' },
      { name: 'Perfil exemplo B', prize: 'Modulo visual de prova', quote: 'A copy neutra ajuda a concentrar a atencao na linguagem visual, no espaco e no acabamento.', stat: 'Dados ficticios' },
      { name: 'Perfil exemplo C', prize: 'Conceito de interface', quote: 'O objetivo aqui e apresentar uma estrutura polida sem introduzir claims comerciais fortes.', stat: 'Preview do cliente' },
    ],
    modules: [
      { title: 'Showcase de Landing', text: 'Hero, filtros, cards e ritmo de seccoes desenhados para uma apresentacao automovel premium.' },
      { title: 'Preview de Checkout', text: 'Placeholders neutros que sugerem quantidade, resumo e padroes de interacao de pagamento.' },
      { title: 'Preview de Utilizador', text: 'Cards ilustrativos para entradas, historico e notificacoes dentro do mesmo sistema visual.' },
      { title: 'Preview Admin', text: 'Blocos orientados a gestao com a mesma linguagem visual, sem entrar em detalhes de implementacao.' },
      { title: 'Preview de Sorteio', text: 'Modulos exemplo usados apenas para indicar categorias de funcionalidade na proposta.' },
      { title: 'Confianca e Controlo', text: 'Placeholders de suporte e monitorizacao que completam a narrativa premium do produto.' },
    ],
    complianceItems: [
      'Mensagens ilustrativas de identidade e acesso',
      'Notas placeholder para monitorizacao e abuso',
      'Exemplo de feedback de estado e pagamento',
      'Apresentacao neutra de resultado e auditoria',
    ],
    footer: {
      intro: 'Ambiente ficticio de apresentacao criado para demonstrar um interface premium dark automovel.',
      columns: [
        { title: 'Showcase', items: ['Conceito hero', 'Cards de sorteio', 'CTA final'] },
        { title: 'Experiencia', items: ['Preview checkout', 'Area do utilizador', 'Preview admin'] },
        { title: 'Confianca', items: ['Blocos de apoio', 'Feedback de estado', 'Notas de apresentacao'] },
      ],
    },
  },
  es: {
    topbar: 'Concepto de presentacion / contenido ficticio / interfaz premium automotriz',
    brandSubtitle: 'Demo de Presentacion',
    heroSlides: [
      { badge: 'Concepto destacado', title: 'Presentacion premium de vehiculo con composicion cinematica mas compacta.', subtitle: 'Contenido ficticio preparado para mostrar jerarquia, espacio y direccion visual premium.', price: 'EUR 12.50', tickets: '6,240 / 12,000 entradas ejemplo' },
      { badge: 'Estudio visual', title: 'Una landing mas refinada, elegante y con mejor ritmo visual.', subtitle: 'Esta version usa texto neutro para que el cliente evale la interfaz sin claims operativos.', price: 'EUR 16.00', tickets: '4,180 / 9,500 entradas ejemplo' },
      { badge: 'Modo showcase', title: 'Identidad luxury dark aplicada de forma consistente en toda la pagina.', subtitle: 'El objetivo es presentar una superficie premium con mejor continuidad y densidad.', price: 'EUR 10.00', tickets: '7,020 / 14,000 entradas ejemplo' },
    ],
    metrics: [
      { value: '120K', label: 'audiencia ejemplo', note: 'numeros ficticios solo para presentacion' },
      { value: '48', label: 'campanas ejemplo', note: 'catalogo placeholder para equilibrio visual' },
      { value: '18', label: 'vistas de mercado', note: 'ejemplo multi-idioma de presentacion' },
      { value: '24/7', label: 'flujo demo', note: 'bloque ilustrativo para el concepto' },
    ],
    filters: ['Destacado', 'Performance', 'Electrico', 'Fin de semana', 'Limitado', 'Nuevo layout'],
    currentDraw: {
      eyebrow: 'Ejemplo principal',
      title: 'Signature Coupe Concept',
      priceLabel: 'Entrada desde',
      countdownLabel: 'Temporizador demo',
      entriesLabel: 'Entradas ejemplo',
      helper: 'Bloque ilustrativo creado para mostrar estructura, jerarquia y acabado premium.',
    },
    sections: {
      competitions: { kicker: 'Cards de presentacion', title: 'Una grilla mas compacta, con jerarquia limpia y espaciado mejor controlado.', copy: 'Todo el contenido de abajo es ficticio y solo sirve para demostrar layout, ritmo y acabado visual.' },
      howItWorks: { kicker: 'Flujo de presentacion' },
      winners: { kicker: 'Prueba visual', title: 'Prueba social estilizada para presentacion, no para claims fuertes.', copy: 'Nombres, numeros e historias son placeholders para simular un entorno premium y confiable.', stats: [{ value: '128', label: 'historias ejemplo visibles' }, { value: '4.8/5', label: 'indice ilustrativo de satisfaccion' }] },
      platform: { kicker: 'Alcance visual', title: 'Areas principales del producto presentadas con copy neutra y estilo consistente.', copy: 'Esta seccion resume el sistema visual y modulos de ejemplo sin implicar reglas finales de negocio.' },
      compliance: { kicker: 'Capa de confianza', title: 'Mensajes de soporte y confianza con fin de presentacion.', copy: 'Estos bloques simulan seguridad y gobierno manteniendo la propuesta ligera y no definitiva.' },
      cta: { kicker: 'Bloque final', title: 'Una seccion final mas compacta para mantener el sitio premium sin alargar demasiado el scroll.', copy: 'Construido como superficie de presentacion para validar direccion, densidad y acabado general.' },
    },
    competitions: [
      { title: 'Signature Coupe Concept', subtitle: 'Especificacion placeholder para presentacion', deadline: 'Cierra pronto', price: 'EUR 12.50', sold: '6,240 entradas ejemplo' },
      { title: 'Midnight SUV Study', subtitle: 'Card utilitario premium de ejemplo', deadline: 'Ventana limitada', price: 'EUR 14.00', sold: '5,180 entradas ejemplo' },
      { title: 'Grand Tour Mockup', subtitle: 'Presentacion de lujo para larga distancia', deadline: 'Esta semana', price: 'EUR 10.50', sold: '4,960 entradas ejemplo' },
      { title: 'Electric Sport Edition', subtitle: 'Concepto limpio de performance', deadline: 'Cierra pronto', price: 'EUR 11.20', sold: '5,740 entradas ejemplo' },
      { title: 'Executive Utility Feature', subtitle: 'Placeholder premium neutro', deadline: 'Cierre posterior', price: 'EUR 13.40', sold: '4,480 entradas ejemplo' },
      { title: 'Collector Weekend Showcase', subtitle: 'Bloque destacado solo para presentacion', deadline: 'Ultimas horas', price: 'EUR 15.00', sold: '6,880 entradas ejemplo' },
    ],
    howItWorks: [
      { step: '01', title: 'Explora el concepto', text: 'Observa la composicion visual, la jerarquia y el equilibrio de la experiencia premium dark.' },
      { step: '02', title: 'Revisa las interacciones', text: 'Usa cards, filtros y botones como demostracion del comportamiento visual del sistema.' },
      { step: '03', title: 'Valida la direccion', text: 'Toma los textos como placeholders neutros mientras evalas densidad y percepcion de marca.' },
    ],
    winners: [
      { name: 'Perfil ejemplo A', prize: 'Card de showcase', quote: 'Esta historia placeholder existe para simular confianza y reforzar el tono premium de la pagina.', stat: 'Solo presentacion' },
      { name: 'Perfil ejemplo B', prize: 'Modulo visual de prueba', quote: 'La copy neutra ayuda a llevar la atencion a la identidad visual, el espacio y el acabado.', stat: 'Datos ficticios' },
      { name: 'Perfil ejemplo C', prize: 'Concepto de interfaz', quote: 'La idea aqui es presentar una estructura pulida sin introducir claims comerciales fuertes.', stat: 'Preview cliente' },
    ],
    modules: [
      { title: 'Showcase de Landing', text: 'Hero, filtros, cards y ritmo de secciones diseñados para una presentacion premium automotriz.' },
      { title: 'Preview de Checkout', text: 'Placeholders neutros que sugieren cantidad, resumen y patrones de interaccion de pago.' },
      { title: 'Preview de Usuario', text: 'Cards ilustrativos para entradas, historial y notificaciones dentro del mismo sistema visual.' },
      { title: 'Preview Admin', text: 'Bloques orientados a gestion con la misma estetica, sin entrar en detalle de implementacion.' },
      { title: 'Preview de Sorteo', text: 'Modulos de ejemplo usados solo para indicar categorias funcionales en la propuesta.' },
      { title: 'Confianza y Control', text: 'Placeholders de soporte y monitoreo que completan la narrativa premium del producto.' },
    ],
    complianceItems: [
      'Mensajes ilustrativos de identidad y acceso',
      'Notas placeholder para abuso y monitoreo',
      'Ejemplo de feedback de estados y pago',
      'Presentacion neutra de resultado y auditoria',
    ],
    footer: {
      intro: 'Entorno ficticio de presentacion creado para demostrar una interfaz premium dark automotriz.',
      columns: [
        { title: 'Showcase', items: ['Concepto hero', 'Cards de sorteo', 'CTA final'] },
        { title: 'Experiencia', items: ['Preview checkout', 'Area de usuario', 'Preview admin'] },
        { title: 'Confianza', items: ['Bloques de apoyo', 'Feedback de estado', 'Notas de presentacion'] },
      ],
    },
  },
  ptBR: {
    topbar: 'Conceito de apresentacao / conteudo ficticio / interface premium automotiva',
    brandSubtitle: 'Demo de Apresentacao',
    heroSlides: [
      { badge: 'Conceito em destaque', title: 'Apresentacao premium de veiculo com composicao cinematografica mais compacta.', subtitle: 'Conteudo ficticio preparado para mostrar hierarquia, ritmo e acabamento visual premium.', price: 'EUR 12.50', tickets: '6,240 / 12,000 entradas exemplo' },
      { badge: 'Estudo visual', title: 'Uma landing mais refinada, elegante e com densidade melhor resolvida.', subtitle: 'Esta versao usa texto neutro para o cliente avaliar a interface sem claims operacionais.', price: 'EUR 16.00', tickets: '4,180 / 9,500 entradas exemplo' },
      { badge: 'Modo showcase', title: 'Identidade luxury dark aplicada com consistencia em toda a pagina.', subtitle: 'O objetivo e apresentar uma superficie premium com melhor continuidade e menos excesso de scroll.', price: 'EUR 10.00', tickets: '7,020 / 14,000 entradas exemplo' },
    ],
    metrics: [
      { value: '120K', label: 'audiencia exemplo', note: 'numeros ficticios apenas para apresentacao' },
      { value: '48', label: 'campanhas exemplo', note: 'catalogo placeholder para equilibrio visual' },
      { value: '18', label: 'visoes de mercado', note: 'exemplo multi-idioma de apresentacao' },
      { value: '24/7', label: 'fluxo demo', note: 'bloco ilustrativo para o conceito' },
    ],
    filters: ['Destaque', 'Performance', 'Eletrico', 'Fim de semana', 'Limitado', 'Novo layout'],
    currentDraw: {
      eyebrow: 'Exemplo principal',
      title: 'Signature Coupe Concept',
      priceLabel: 'Entrada a partir de',
      countdownLabel: 'Temporizador demo',
      entriesLabel: 'Entradas exemplo',
      helper: 'Bloco ilustrativo criado para apresentar estrutura, hierarquia e acabamento premium.',
    },
    sections: {
      competitions: { kicker: 'Cards de apresentacao', title: 'Uma grade mais compacta, com hierarquia limpa e espacos mais controlados.', copy: 'Todo o conteudo abaixo e ficticio e serve apenas para demonstrar layout, ritmo e acabamento visual.' },
      howItWorks: { kicker: 'Fluxo de apresentacao' },
      winners: { kicker: 'Prova visual', title: 'Prova social estilizada para apresentacao, nao para claims fortes.', copy: 'Nomes, numeros e historias sao placeholders usados para simular um ambiente premium e confiavel.', stats: [{ value: '128', label: 'historias exemplo visiveis' }, { value: '4.8/5', label: 'indice ilustrativo de satisfacao' }] },
      platform: { kicker: 'Escopo visual', title: 'Areas principais do produto apresentadas com copy neutra e estilo consistente.', copy: 'Esta secao resume o sistema visual e modulos exemplo sem implicar regras finais de negocio.' },
      compliance: { kicker: 'Camada de confianca', title: 'Mensagens de apoio e confianca para efeito de apresentacao.', copy: 'Esses blocos simulam seguranca e governanca mantendo a proposta leve e nao definitiva.' },
      cta: { kicker: 'Bloco final', title: 'Uma secao final mais compacta para manter o site premium sem alongar demais o scroll.', copy: 'Construido como superficie de apresentacao para o cliente validar direcao, densidade e acabamento geral.' },
    },
    competitions: [
      { title: 'Signature Coupe Concept', subtitle: 'Especificacao placeholder para apresentacao', deadline: 'Fecha em breve', price: 'EUR 12.50', sold: '6,240 entradas exemplo' },
      { title: 'Midnight SUV Study', subtitle: 'Card premium utilitario de exemplo', deadline: 'Janela limitada', price: 'EUR 14.00', sold: '5,180 entradas exemplo' },
      { title: 'Grand Tour Mockup', subtitle: 'Apresentacao de luxo para longa distancia', deadline: 'Nesta semana', price: 'EUR 10.50', sold: '4,960 entradas exemplo' },
      { title: 'Electric Sport Edition', subtitle: 'Conceito limpo de performance', deadline: 'Terminando logo', price: 'EUR 11.20', sold: '5,740 entradas exemplo' },
      { title: 'Executive Utility Feature', subtitle: 'Placeholder premium neutro', deadline: 'Fecha depois', price: 'EUR 13.40', sold: '4,480 entradas exemplo' },
      { title: 'Collector Weekend Showcase', subtitle: 'Bloco de destaque para apresentacao', deadline: 'Ultimas horas', price: 'EUR 15.00', sold: '6,880 entradas exemplo' },
    ],
    howItWorks: [
      { step: '01', title: 'Explore o conceito', text: 'Observe a composicao visual, a hierarquia e o equilibrio da experiencia premium dark.' },
      { step: '02', title: 'Revise as interacoes', text: 'Use cards, filtros e botoes como demonstracao do comportamento visual do sistema.' },
      { step: '03', title: 'Valide a direcao', text: 'Considere os textos como placeholders neutros enquanto avalia densidade e percepcao de marca.' },
    ],
    winners: [
      { name: 'Perfil exemplo A', prize: 'Card de showcase', quote: 'Esta historia placeholder existe apenas para simular confianca e reforcar o tom premium da pagina.', stat: 'Apenas apresentacao' },
      { name: 'Perfil exemplo B', prize: 'Modulo visual de prova', quote: 'A copy neutra ajuda a concentrar a atencao na linguagem visual, no espaco e no acabamento.', stat: 'Dados ficticios' },
      { name: 'Perfil exemplo C', prize: 'Conceito de interface', quote: 'O objetivo aqui e apresentar uma estrutura polida sem introduzir claims comerciais fortes.', stat: 'Preview do cliente' },
    ],
    modules: [
      { title: 'Showcase da Landing', text: 'Hero, filtros, cards e ritmo de secoes desenhados para uma apresentacao automotiva premium.' },
      { title: 'Preview de Checkout', text: 'Placeholders neutros que sugerem quantidade, resumo e padroes de interacao de pagamento.' },
      { title: 'Preview de Usuario', text: 'Cards ilustrativos para entradas, historico e notificacoes dentro do mesmo sistema visual.' },
      { title: 'Preview Admin', text: 'Blocos voltados a gestao com a mesma linguagem visual, sem entrar em detalhes de implementacao.' },
      { title: 'Preview de Sorteio', text: 'Modulos de exemplo usados apenas para indicar categorias de funcionalidade na proposta.' },
      { title: 'Confianca e Controle', text: 'Placeholders de suporte e monitoramento que completam a narrativa premium do produto.' },
    ],
    complianceItems: [
      'Mensagens ilustrativas de identidade e acesso',
      'Notas placeholder para abuso e monitoramento',
      'Exemplo de feedback de estado e pagamento',
      'Apresentacao neutra de resultado e auditoria',
    ],
    footer: {
      intro: 'Ambiente ficticio de apresentacao criado para demonstrar uma interface premium dark automotiva.',
      columns: [
        { title: 'Showcase', items: ['Conceito hero', 'Cards de sorteio', 'CTA final'] },
        { title: 'Experiencia', items: ['Preview checkout', 'Area do usuario', 'Preview admin'] },
        { title: 'Confianca', items: ['Blocos de apoio', 'Feedback de estado', 'Notas de apresentacao'] },
      ],
    },
  },
}

const getPresentationCopy = (locale) =>
  mergePresentationCopy(contentByLocale[locale], presentationOverridesByLocale[locale] ?? {})

const paymentMethods = ['Stripe', 'Apple Pay', 'Google Pay', 'SEPA', 'iDEAL', 'Bancontact']

const paymentScreenByLocale = {
  en: {
    navLabel: 'Payments',
    kicker: 'Payment review',
    title: 'A compact screen to identify who paid and how many coupons were purchased.',
    copy: 'Fictional records below are shown only to demonstrate the administrative monitoring layout.',
    summary: [
      { label: 'approved payments', value: '18' },
      { label: 'coupons issued', value: '462' },
      { label: 'latest batch', value: 'today 14:20' },
    ],
    headers: ['Name', 'CPF', 'Coupons', 'Status'],
    rows: [
      { name: 'Marina Costa', cpf: '123.456.789-00', coupons: '24', status: 'Approved' },
      { name: 'Lucas Vieira', cpf: '987.654.321-00', coupons: '12', status: 'Approved' },
      { name: 'Renata Alves', cpf: '456.123.789-10', coupons: '40', status: 'Approved' },
      { name: 'Paulo Mendes', cpf: '741.852.963-55', coupons: '08', status: 'Pending review' },
    ],
  },
  ptPT: {
    navLabel: 'Pagamentos',
    kicker: 'Consulta de pagamentos',
    title: 'Uma vista compacta para identificar quem pagou e quantos cupoes foram adquiridos.',
    copy: 'Os registos abaixo sao ficticios e servem apenas para demonstrar o layout de acompanhamento administrativo.',
    summary: [
      { label: 'pagamentos aprovados', value: '18' },
      { label: 'cupoes emitidos', value: '462' },
      { label: 'ultimo lote', value: 'hoje 14:20' },
    ],
    headers: ['Nome', 'CPF', 'Cupoes', 'Estado'],
    rows: [
      { name: 'Marina Costa', cpf: '123.456.789-00', coupons: '24', status: 'Aprovado' },
      { name: 'Lucas Vieira', cpf: '987.654.321-00', coupons: '12', status: 'Aprovado' },
      { name: 'Renata Alves', cpf: '456.123.789-10', coupons: '40', status: 'Aprovado' },
      { name: 'Paulo Mendes', cpf: '741.852.963-55', coupons: '08', status: 'Em revisao' },
    ],
  },
  es: {
    navLabel: 'Pagos',
    kicker: 'Consulta de pagos',
    title: 'Una vista compacta para identificar quien pago y cuantos cupones fueron adquiridos.',
    copy: 'Los registros de abajo son ficticios y solo sirven para demostrar el layout de monitoreo administrativo.',
    summary: [
      { label: 'pagos aprobados', value: '18' },
      { label: 'cupones emitidos', value: '462' },
      { label: 'ultimo lote', value: 'hoy 14:20' },
    ],
    headers: ['Nombre', 'CPF', 'Cupones', 'Estado'],
    rows: [
      { name: 'Marina Costa', cpf: '123.456.789-00', coupons: '24', status: 'Aprobado' },
      { name: 'Lucas Vieira', cpf: '987.654.321-00', coupons: '12', status: 'Aprobado' },
      { name: 'Renata Alves', cpf: '456.123.789-10', coupons: '40', status: 'Aprobado' },
      { name: 'Paulo Mendes', cpf: '741.852.963-55', coupons: '08', status: 'En revision' },
    ],
  },
  ptBR: {
    navLabel: 'Pagamentos',
    kicker: 'Consulta de pagamentos',
    title: 'Uma tela compacta para identificar quem pagou e quantos cupons foram adquiridos.',
    copy: 'Os registros abaixo sao ficticios e servem apenas para demonstrar o layout de acompanhamento administrativo.',
    summary: [
      { label: 'pagamentos aprovados', value: '18' },
      { label: 'cupons emitidos', value: '462' },
      { label: 'ultimo lote', value: 'hoje 14:20' },
    ],
    headers: ['Nome', 'CPF', 'Cupons', 'Status'],
    rows: [
      { name: 'Marina Costa', cpf: '123.456.789-00', coupons: '24', status: 'Aprovado' },
      { name: 'Lucas Vieira', cpf: '987.654.321-00', coupons: '12', status: 'Aprovado' },
      { name: 'Renata Alves', cpf: '456.123.789-10', coupons: '40', status: 'Aprovado' },
      { name: 'Paulo Mendes', cpf: '741.852.963-55', coupons: '08', status: 'Em analise' },
    ],
  },
}

const adminByLocale = {
  en: {
    loginTitle: 'Admin access',
    loginCopy: 'Restricted screen for administrative monitoring and payment review.',
    emailLabel: 'Admin email',
    passwordLabel: 'Password',
    submit: 'Enter panel',
    cancel: 'Back to site',
    panelTitle: 'Administrative panel',
    panelCopy: 'Monitor the latest approved payments and coupon volume in one place.',
    panelBadge: 'Admin only',
    backSite: 'Public site',
    logout: 'Exit panel',
    helper: 'Use this area to check who completed payment, CPF and purchased coupon quantity.',
    error: 'Fill in email and password to continue.',
  },
  ptPT: {
    loginTitle: 'Acesso admin',
    loginCopy: 'Ecrã restrito para acompanhamento administrativo e consulta de pagamentos.',
    emailLabel: 'Email admin',
    passwordLabel: 'Palavra-passe',
    submit: 'Entrar no painel',
    cancel: 'Voltar ao site',
    panelTitle: 'Painel administrativo',
    panelCopy: 'Acompanhe os pagamentos aprovados e o volume de cupoes num unico local.',
    panelBadge: 'Apenas admin',
    backSite: 'Site publico',
    logout: 'Sair do painel',
    helper: 'Use esta area para verificar quem concluiu o pagamento, CPF e quantidade de cupoes adquiridos.',
    error: 'Preencha email e palavra-passe para continuar.',
  },
  es: {
    loginTitle: 'Acceso admin',
    loginCopy: 'Pantalla restringida para monitoreo administrativo y consulta de pagos.',
    emailLabel: 'Email admin',
    passwordLabel: 'Contraseña',
    submit: 'Entrar al panel',
    cancel: 'Volver al sitio',
    panelTitle: 'Panel administrativo',
    panelCopy: 'Consulta pagos aprobados y volumen de cupones en un solo lugar.',
    panelBadge: 'Solo admin',
    backSite: 'Sitio publico',
    logout: 'Salir del panel',
    helper: 'Usa esta area para revisar quien completo el pago, CPF y cantidad de cupones adquiridos.',
    error: 'Completa email y contraseña para continuar.',
  },
  ptBR: {
    loginTitle: 'Acesso admin',
    loginCopy: 'Tela restrita para acompanhamento administrativo e consulta de pagamentos.',
    emailLabel: 'Email admin',
    passwordLabel: 'Senha',
    submit: 'Entrar no painel',
    cancel: 'Voltar ao site',
    panelTitle: 'Painel administrativo',
    panelCopy: 'Acompanhe os pagamentos aprovados e o volume de cupons em um unico lugar.',
    panelBadge: 'Somente admin',
    backSite: 'Site publico',
    logout: 'Sair do painel',
    helper: 'Use esta area para verificar quem concluiu o pagamento, CPF e quantidade de cupons adquiridos.',
    error: 'Preencha email e senha para continuar.',
  },
}

function App() {
  const [view, setView] = useState('landing')
  const [locale, setLocale] = useState('ptBR')
  const [activeSlide, setActiveSlide] = useState(0)
  const [adminForm, setAdminForm] = useState({ email: '', password: '' })
  const [adminError, setAdminError] = useState('')
  const copy = getPresentationCopy(locale)
  const paymentScreen = paymentScreenByLocale[locale] ?? paymentScreenByLocale.en
  const adminCopy = adminByLocale[locale] ?? adminByLocale.ptBR
  const navigationItems = copy.navItems

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % copy.heroSlides.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [copy.heroSlides.length])

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang
  }, [copy.htmlLang])

  useEffect(() => {
    let animationFrame = 0

    const handleAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]')

      if (!anchor) {
        return
      }

      const href = anchor.getAttribute('href')

      if (!href || href === '#') {
        return
      }

      const target = document.querySelector(href)

      if (!target) {
        return
      }

      event.preventDefault()
      window.cancelAnimationFrame(animationFrame)

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 108)

      if (prefersReducedMotion) {
        window.scrollTo(0, targetY)
        window.history.replaceState(null, '', href)
        return
      }

      const startY = window.scrollY
      const distance = targetY - startY
      const duration = 820
      const startTime = performance.now()
      const easeOutQuart = (progress) => 1 - (1 - progress) ** 4

      const step = (now) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)

        window.scrollTo(0, startY + distance * easeOutQuart(progress))

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(step)
          return
        }

        window.history.replaceState(null, '', href)
      }

      animationFrame = window.requestAnimationFrame(step)
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  const currentSlide = copy.heroSlides[activeSlide]
  const openAdminLogin = () => {
    setAdminError('')
    setView('adminLogin')
  }

  const returnToLanding = () => {
    setAdminError('')
    setView('landing')
  }

  const handleAdminLogin = (event) => {
    event.preventDefault()

    if (!adminForm.email.trim() || !adminForm.password.trim()) {
      setAdminError(adminCopy.error)
      return
    }

    setAdminError('')
    setView('adminDashboard')
  }

  const goToPreviousSlide = () => {
    setActiveSlide((current) => (current - 1 + copy.heroSlides.length) % copy.heroSlides.length)
  }

  const goToNextSlide = () => {
    setActiveSlide((current) => (current + 1) % copy.heroSlides.length)
  }

  if (view === 'adminLogin') {
    return (
      <div className="luxury-shell text-slate-100">
        <div className="mx-auto flex min-h-screen w-full max-w-[1600px] items-center px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid w-full gap-6 lg:grid-cols-[1fr_430px]">
            <div className="surface-card flex min-h-[420px] flex-col justify-between p-8 lg:p-10">
              <div>
                <span className="section-kicker">{adminCopy.panelBadge}</span>
                <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
                  {adminCopy.loginTitle}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c7ced6] sm:text-base">
                  {adminCopy.loginCopy}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {paymentScreen.summary.map((item) => (
                  <div key={item.label} className="rounded-[22px] border border-white/8 bg-[#111722] p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7e8896]">
                      {item.label}
                    </p>
                    <p className="mt-3 text-3xl font-black text-[#e0c27a]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-card p-6 sm:p-7">
              <form className="flex h-full flex-col justify-center" onSubmit={handleAdminLogin}>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7e8896]">
                  {adminCopy.panelBadge}
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white">
                  {adminCopy.loginTitle}
                </h2>

                <div className="mt-6 space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#c7ced6]">
                      {adminCopy.emailLabel}
                    </span>
                    <input
                      type="email"
                      value={adminForm.email}
                      onChange={(event) =>
                        setAdminForm((current) => ({ ...current, email: event.target.value }))
                      }
                      className="w-full rounded-[18px] border border-white/10 bg-[#111722] px-4 py-3 text-sm text-white outline-none transition focus:border-[#3a6ea5]/45"
                      placeholder="admin@demo.com"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#c7ced6]">
                      {adminCopy.passwordLabel}
                    </span>
                    <input
                      type="password"
                      value={adminForm.password}
                      onChange={(event) =>
                        setAdminForm((current) => ({ ...current, password: event.target.value }))
                      }
                      className="w-full rounded-[18px] border border-white/10 bg-[#111722] px-4 py-3 text-sm text-white outline-none transition focus:border-[#3a6ea5]/45"
                      placeholder="••••••••"
                    />
                  </label>
                </div>

                {adminError ? (
                  <p className="mt-4 text-sm text-[#e0c27a]">{adminError}</p>
                ) : null}

                <div className="mt-6 flex flex-col gap-3">
                  <button type="submit" className="premium-button w-full justify-center">
                    {adminCopy.submit}
                  </button>
                  <button
                    type="button"
                    onClick={returnToLanding}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#3a6ea5]/45 hover:bg-[#16202b]/90"
                  >
                    {adminCopy.cancel}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'adminDashboard') {
    return (
      <div className="luxury-shell text-slate-100">
        <div className="mx-auto min-h-screen w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="surface-card p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="section-kicker">{adminCopy.panelBadge}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c7ced6]">
                    {paymentScreen.kicker}
                  </span>
                </div>
                <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                  {adminCopy.panelTitle}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#c7ced6]">
                  {adminCopy.panelCopy}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={returnToLanding}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#3a6ea5]/45 hover:bg-[#16202b]/90"
                >
                  {adminCopy.backSite}
                </button>
                <button
                  type="button"
                  onClick={openAdminLogin}
                  className="rounded-full border border-[#c9a24a]/25 bg-[#c9a24a]/10 px-5 py-3 text-sm font-semibold text-[#e0c27a] transition hover:bg-[#c9a24a]/16"
                >
                  {adminCopy.logout}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              {paymentScreen.summary.map((item) => (
                <div key={item.label} className="surface-card p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7e8896]">
                    {item.label}
                  </p>
                  <p className="mt-3 text-3xl font-black text-[#e0c27a]">{item.value}</p>
                </div>
              ))}

              <div className="surface-card p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7e8896]">
                  {paymentScreen.kicker}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#c7ced6]">{adminCopy.helper}</p>
              </div>
            </div>

            <div className="surface-card overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0 text-left">
                  <thead className="bg-[#111722]">
                    <tr>
                      {paymentScreen.headers.map((header) => (
                        <th
                          key={header}
                          className="border-b border-white/8 px-5 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#7e8896]"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paymentScreen.rows.map((row) => (
                      <tr key={`${row.name}-${row.cpf}`} className="bg-[#0f141d] transition hover:bg-[#16202b]">
                        <td className="border-b border-white/6 px-5 py-4 text-sm font-semibold text-white">{row.name}</td>
                        <td className="border-b border-white/6 px-5 py-4 text-sm text-[#c7ced6]">{row.cpf}</td>
                        <td className="border-b border-white/6 px-5 py-4 text-sm font-bold text-[#e0c27a]">{row.coupons}</td>
                        <td className="border-b border-white/6 px-5 py-4 text-sm text-[#c7ced6]">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="luxury-shell text-slate-100">
      <div className="w-full">
        <div className="border-b border-white/8 bg-[#0d1118]/90 px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-[#e0c27a] sm:px-6">
          {copy.topbar}
        </div>

        <header className="sticky top-0 z-40 border-b border-white/8 bg-[#0a0b0f]/78 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center text-[13px] font-black tracking-[0.2em] text-[#e0c27a]">
                DR
              </span>
            </a>

            <nav className="hidden items-center gap-6 text-[15px] font-semibold text-[#c7ced6] xl:flex">
              {navigationItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <label className="hidden items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c7ced6] lg:flex">
                <span>{copy.actions.languageLabel}</span>
                <select
                  value={locale}
                  onChange={(event) => {
                    setLocale(event.target.value)
                    setActiveSlide(0)
                  }}
                  className="max-w-[165px] bg-transparent text-[11px] font-semibold text-white outline-none"
                  aria-label={copy.actions.languageLabel}
                >
                  {languageOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#111722] text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={openAdminLogin}
                className="hidden rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-[#c7ced6] transition hover:border-[#3a6ea5]/50 hover:bg-[#16202b] hover:text-white"
              >
                {adminCopy.loginTitle}
              </button>
              <a href="#competitions" className="premium-button header-cta">
                {copy.actions.participate}
              </a>
            </div>
          </div>

          <div className="border-t border-white/8 px-4 py-2.5 lg:hidden">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c7ced6]">
                {copy.actions.languageLabel}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={openAdminLogin}
                  className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:border-[#3a6ea5]/45 hover:bg-[#16202b]/90"
                >
                  Admin
                </button>
                <select
                  value={locale}
                  onChange={(event) => {
                    setLocale(event.target.value)
                    setActiveSlide(0)
                  }}
                  className="rounded-full border border-white/10 bg-[#111722] px-4 py-2 text-sm font-semibold text-white outline-none"
                  aria-label={copy.actions.languageLabel}
                >
                  {languageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </header>
        
        <main id="home">
          <section className="section-band section-band--hero relative min-h-[88svh] overflow-hidden lg:min-h-[94svh]">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="hero-image absolute inset-0 h-full w-full object-cover transition-all duration-700"
            />
            <div className="hero-vignette absolute inset-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_38%,rgba(58,110,165,0.22),transparent_26%),radial-gradient(circle_at_22%_20%,rgba(201,162,74,0.18),transparent_18%),linear-gradient(180deg,rgba(10,11,15,0.12)_0%,rgba(10,11,15,0.28)_55%,rgba(10,11,15,0.82)_100%)]" />
            <div className="noise-overlay absolute inset-0 opacity-35" />

            <div className="hero-shell relative flex min-h-[88svh] flex-col justify-end pb-10 pt-24 lg:min-h-[94svh] lg:pb-12">
              <button
                type="button"
                onClick={goToPreviousSlide}
                className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/26 text-xl font-semibold text-white backdrop-blur-md transition hover:border-[#3a6ea5]/40 hover:bg-[#16202b]/85 hover:text-[#e0c27a] sm:left-6 lg:left-8"
                aria-label="Previous slide"
              >
                {'<'}
              </button>
              <button
                type="button"
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/26 text-xl font-semibold text-white backdrop-blur-md transition hover:border-[#3a6ea5]/40 hover:bg-[#16202b]/85 hover:text-[#e0c27a] sm:right-6 lg:right-8"
                aria-label="Next slide"
              >
                {'>'}
              </button>
              <div className="relative z-10 max-w-[52rem] pb-[4.5rem] sm:pb-20 lg:pb-24">
                <span className="inline-flex rounded-full border border-[#c9a24a]/30 bg-[#c9a24a]/14 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#e0c27a] shadow-[0_0_30px_rgba(201,162,74,0.12)] backdrop-blur-sm">
                  {currentSlide.badge}
                </span>
                <h1 className="mt-5 max-w-[48rem] text-5xl font-black leading-[0.9] tracking-[-0.065em] text-[#f5f7fb] drop-shadow-[0_12px_44px_rgba(0,0,0,0.52)] sm:text-6xl lg:text-[6.25rem]">
                  {currentSlide.title}
                </h1>
                <p className="mt-5 max-w-[39rem] text-base leading-8 text-[#d8dde4] sm:text-xl sm:leading-8">
                  {currentSlide.subtitle}
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a href="#competitions" className="premium-button hero-primary-cta justify-center">
                    {copy.actions.explore}
                  </a>
                  <a
                    href="#platform"
                    className="rounded-full border border-white/12 bg-black/24 px-7 py-4 text-center text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[#3a6ea5]/45 hover:bg-[#16202b]/80 hover:shadow-[0_18px_60px_rgba(39,76,119,0.18)]"
                  >
                    {copy.actions.viewScope}
                  </a>
                </div>
                <div className="hero-info-strip mt-8 grid gap-3 sm:max-w-[44rem] sm:grid-cols-3">
                  <div className="rounded-[22px] border border-white/10 bg-black/26 p-4 backdrop-blur-md">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7e8896]">
                      {copy.currentDraw.priceLabel}
                    </p>
                    <p className="mt-2 text-[1.9rem] font-black tracking-[-0.04em] text-[#e0c27a]">{currentSlide.price}</p>
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-black/26 p-4 backdrop-blur-md">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7e8896]">
                      {copy.currentDraw.countdownLabel}
                    </p>
                    <p className="mt-2 text-[1.9rem] font-black tracking-[-0.04em] text-white">{currentSlide.countdown}</p>
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-black/26 p-4 backdrop-blur-md">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7e8896]">
                      {copy.currentDraw.entriesLabel}
                    </p>
                    <p className="mt-2 text-xl font-extrabold tracking-[-0.03em] text-white">{currentSlide.tickets}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#aeb6c0]">
                  {paymentMethods.map((method) => (
                    <span
                      key={method}
                      className="rounded-full border border-white/8 bg-black/28 px-4 py-2 backdrop-blur-sm"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden mt-8 flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="rounded-full border border-white/8 bg-black/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c7ced6]">
                    Carousel
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goToPreviousSlide}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white transition hover:border-[#3a6ea5]/45 hover:bg-[#16202b]/90"
                      aria-label="Previous slide"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={goToNextSlide}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white transition hover:border-[#3a6ea5]/45 hover:bg-[#16202b]/90"
                      aria-label="Next slide"
                    >
                      ›
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[28px] border border-white/8 bg-black/20 p-3 backdrop-blur-sm">
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                  >
                    {copy.heroSlides.map((slide, index) => (
                      <div key={slide.id} className="min-w-full px-1">
                        <button
                          type="button"
                          onClick={() => setActiveSlide(index)}
                          className="grid w-full gap-4 rounded-[22px] border border-white/8 bg-[#111722]/82 p-4 text-left transition hover:border-[#c9a24a]/28 hover:bg-[#111722]"
                        >
                          <div
                            className="h-24 rounded-[16px] bg-cover bg-center"
                            style={{ backgroundImage: `linear-gradient(180deg, rgba(10,11,15,0.1), rgba(10,11,15,0.42)), url(${slide.image})` }}
                          />
                          <div className="flex items-end justify-between gap-4">
                            <div>
                              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7e8896]">
                                {slide.badge}
                              </p>
                              <p className="mt-2 text-lg font-extrabold text-white">{slide.price}</p>
                            </div>
                            <div className="flex gap-2">
                              {copy.heroSlides.map((_, dotIndex) => (
                                <span
                                  key={`${slide.id}-${dotIndex}`}
                                  className={`h-2.5 rounded-full transition-all ${
                                    dotIndex === index
                                      ? 'w-8 bg-[#c9a24a]'
                                      : 'w-2.5 bg-white/18'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-7 z-20 flex justify-center">
                <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/8 bg-black/22 px-3 py-2 backdrop-blur-md">
                  {copy.heroSlides.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        index === activeSlide ? 'w-8 bg-[#c9a24a]' : 'w-2.5 bg-white/35 hover:bg-white/60'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="metrics-shell mt-7 lg:mt-8">
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {copy.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-[24px] border border-white/8 bg-[#111722]/88 p-5 backdrop-blur-md">
                      <p className="text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">{metric.value}</p>
                      <p className="mt-3 text-sm font-bold uppercase tracking-[0.22em] text-[#e0c27a]">{metric.label}</p>
                      <p className="mt-2 text-sm leading-6 text-[#7e8896]">{metric.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="competitions" className="section-band section-band--soft">
            <div className="section-shell">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <span className="section-kicker">{copy.sections.competitions.kicker}</span>
                <h2 className="section-title">{copy.sections.competitions.title}</h2>
                <p className="section-copy">{copy.sections.competitions.copy}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {copy.filters.map((filter) => (
                  <button
                    key={filter}
                    className="rounded-full border border-white/8 bg-[#111722] px-4 py-2 text-sm font-semibold text-[#c7ced6] transition hover:-translate-y-0.5 hover:border-[#3a6ea5]/35 hover:text-white"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {copy.competitions.map((competition) => (
                <article
                  key={competition.title}
                  className="flex h-full flex-col overflow-hidden rounded-[26px] border border-white/8 bg-[#111722] shadow-[0_18px_70px_rgba(0,0,0,0.32)] transition hover:-translate-y-1 hover:border-[#c9a24a]/28"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img src={competition.image} alt={competition.title} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,15,0.06)_0%,rgba(10,11,15,0.1)_30%,rgba(10,11,15,0.85)_100%)]" />
                    <div className="absolute left-5 top-5 rounded-full border border-[#c9a24a]/25 bg-[#0a0b0f]/70 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#e0c27a] backdrop-blur-sm">
                      {competition.deadline}
                    </div>
                    <div className="absolute bottom-5 left-5 rounded-full bg-[#e0c27a] px-4 py-2 text-sm font-black text-[#0a0b0f] shadow-[0_14px_40px_rgba(201,162,74,0.28)]">
                      {competition.price}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-h-[84px]">
                        <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-white">{competition.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm text-[#7e8896]">{competition.subtitle}</p>
                      </div>
                      <span className="rounded-full border border-[#3a6ea5]/30 bg-[#16202b] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#c7ced6]">
                        {copy.badges.euDraw}
                      </span>
                    </div>

                    <div className="mt-auto pt-6">
                      <div className="flex items-center justify-between text-sm text-[#c7ced6]">
                        <span>{competition.sold}</span>
                        <span>{competition.progress}%</span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-white/8">
                        <div
                          className="h-full rounded-full bg-[#c9a24a]"
                          style={{ width: `${competition.progress}%` }}
                        />
                      </div>
                    </div>

                    <button className="premium-button mt-6 w-full justify-center">{copy.actions.enterCompetition}</button>
                  </div>
                </article>
              ))}
            </div>
            </div>
          </section>
          
          <section id="how-it-works" className="section-band section-band--tight">
            <div className="section-shell">
            <div className="mb-6">
              <span className="section-kicker">{copy.sections.howItWorks.kicker}</span>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {copy.howItWorks.map((item) => (
                <article key={item.step} className="surface-card p-6">
                  <span className="inline-flex rounded-full border border-[#3a6ea5]/30 bg-[#16202b] px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#c7ced6]">
                    Step {item.step}
                  </span>
                  <h3 className="mt-5 text-2xl font-extrabold tracking-[-0.04em] text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#7e8896]">{item.text}</p>
                </article>
              ))}
            </div>
            </div>
          </section>

          <section id="winners" className="section-band section-band--deep">
            <div className="section-shell">
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="surface-card overflow-hidden p-0">
                <div className="grid lg:grid-cols-[1fr_0.95fr]">
                  <div className="relative min-h-[360px]">
                    <img
                      src="/cars/hero-2.jpg"
                      alt="Premium car showcase"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,15,0.02),rgba(10,11,15,0.7))]" />
                  </div>
                  <div className="p-6 lg:p-8">
                    <span className="section-kicker">{copy.sections.winners.kicker}</span>
                    <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">{copy.sections.winners.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-[#c7ced6]">{copy.sections.winners.copy}</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {copy.sections.winners.stats.map((stat) => (
                        <div key={stat.label} className="rounded-[22px] border border-white/8 bg-[#111722] p-5">
                          <p className="text-3xl font-black text-[#e0c27a]">{stat.value}</p>
                          <p className="mt-2 text-sm text-[#7e8896]">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-5">
                {copy.winners.map((winner) => (
                  <article key={winner.name} className="surface-card p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-extrabold text-white">{winner.name}</p>
                        <p className="mt-1 text-sm text-[#e0c27a]">{winner.prize}</p>
                      </div>
                      <span className="rounded-full border border-white/8 bg-white/4 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#c7ced6]">
                        {winner.stat}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[#7e8896]">"{winner.quote}"</p>
                  </article>
                ))}
              </div>
            </div>
            </div>
          </section>

          <section id="platform" className="section-band section-band--soft">
            <div className="section-shell">
            <div className="max-w-3xl">
              <span className="section-kicker">{copy.sections.platform.kicker}</span>
              <h2 className="section-title">{copy.sections.platform.title}</h2>
              <p className="section-copy">{copy.sections.platform.copy}</p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {copy.modules.map((module) => (
                <article key={module.title} className="surface-card p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-white">{module.title}</h3>
                    <span className="h-3 w-3 rounded-full bg-[#c9a24a] shadow-[0_0_18px_rgba(201,162,74,0.55)]" />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#7e8896]">{module.text}</p>
                </article>
              ))}
            </div>
            </div>
          </section>

          <section id="compliance" className="section-band section-band--tight">
            <div className="section-shell">
            <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
              <div className="surface-card p-6">
                <span className="section-kicker">{copy.sections.compliance.kicker}</span>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">{copy.sections.compliance.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#c7ced6]">{copy.sections.compliance.copy}</p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {copy.complianceItems.map((item) => (
                  <div key={item} className="rounded-[24px] border border-white/8 bg-[#111722] p-5">
                    <p className="text-base font-bold leading-7 text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </section>

          <section className="section-band section-band--deep">
            <div className="section-shell">
            <div className="overflow-hidden rounded-[28px] border border-[#c9a24a]/20 bg-[linear-gradient(135deg,rgba(17,23,34,0.98)_0%,rgba(10,11,15,0.94)_42%,rgba(22,32,43,0.96)_100%)] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <span className="section-kicker">{copy.sections.cta.kicker}</span>
                  <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">{copy.sections.cta.title}</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c7ced6]">{copy.sections.cta.copy}</p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                  <a href="#competitions" className="premium-button justify-center">{copy.actions.launchConcept}</a>
                  <button className="rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[#3a6ea5]/45 hover:bg-[#16202b]/90">
                    {copy.actions.reviewModules}
                  </button>
                </div>
              </div>
            </div>
            </div>
          </section>
        </main>

        <footer className="relative border-t border-white/8 bg-[linear-gradient(180deg,#0c1118_0%,#0a0b0f_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(58,110,165,0.08),transparent_22%),radial-gradient(circle_at_90%_50%,rgba(201,162,74,0.06),transparent_20%)]" />
          <div className="section-shell relative grid gap-8 py-12 text-sm text-[#7e8896] md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-white">Drive Royale</p>
              <p className="mt-4 leading-7">{copy.footer.intro}</p>
            </div>

            {copy.footer.columns.map((column) => (
              <div key={column.title}>
                <p className="font-bold uppercase tracking-[0.22em] text-[#e0c27a]">{column.title}</p>
                <ul className="mt-4 space-y-3">
                  {column.items.map((item) => (
                    <li key={item}>
                      <a href="#home" className="footer-link">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App


