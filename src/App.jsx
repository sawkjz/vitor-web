import { useEffect, useMemo, useRef, useState } from 'react'

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'ptPT', label: 'Português (Portugal)' },
  { value: 'es', label: 'Español' },
  { value: 'ptBR', label: 'Português (Brasil)' },
]

const ADMIN_TOKEN_STORAGE_KEY = 'admin_access_token'
const ADMIN_USER_STORAGE_KEY = 'admin_user_email'
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

const mockedMediaData = {
  heroVideo: {
    id: 'pinterest-demo',
    title: 'Video Promocional (Mock)',
    source: 'blob:https://br.pinterest.com/532406fe-cfb5-4b02-b63c-6a76a6d5336c',
    poster: '/cars/hero-1.jpg',
    note: 'video mockado para demo visual',
  },
}

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
      euDraw: 'Draw',
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
      euDraw: 'Sorteio',
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
      euDraw: 'Sorteo',
    },
    heroSlides: [
      {
        id: 'aston',
        image:
          '/cars/hero-1.jpg',
        badge: 'CampaÃ±a principal',
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
          'Una landing cinematografica con urgencia por cuenta regresiva, credibilidad premium y disparadores de compra diseÃ±ados para alta conversion.',
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
          'Construido con React y Tailwind para soportar campaÃ±as, venta de boletos, dashboards, pagos y cumplimiento en Europa.',
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
        title: 'Cards premium dark diseÃ±adas para vender el siguiente boleto rapido.',
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
          'La home vende el sueÃ±o mientras adelanta todo el sistema: campaÃ±as, checkout, dashboards, administracion y cumplimiento.',
      },
      compliance: {
        kicker: 'Seguridad y cumplimiento',
        title: 'DiseÃ±ado con GDPR en mente y listo para auditoria.',
        copy:
          'Lo premium solo funciona cuando la confianza acompaÃ±a. Este concepto destaca proteccion de datos, prevencion de fraude e integridad publica del resultado.',
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
        title: 'Elige tu campaÃ±a',
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
        name: 'Sofia, EspaÃ±a',
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
        title: 'Home y Paginas de CampaÃ±a',
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
        { title: 'Plataforma', items: ['CampaÃ±as', 'Checkout', 'Dashboard del usuario'] },
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
      euDraw: 'Sorteio',
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
  actions: {
    ...base.actions,
    ...(overrides.actions ?? {}),
  },
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
    brandSubtitle: 'Luxury Raffles Europe',
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
    brandSubtitle: 'Sorteios de Luxo na Europa',
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
      countdownLabel: 'Temporizador',
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
    brandSubtitle: 'Sorteos de Lujo en Europa',
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
      countdownLabel: 'Temporizador',
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
      { title: 'Showcase de Landing', text: 'Hero, filtros, cards y ritmo de secciones diseÃ±ados para una presentacion premium automotriz.' },
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
    brandSubtitle: 'Sorteios de Luxo na Europa',
    actions: {
      explore: 'Explorar campanha destaque',
      viewScope: 'Ver escopo da experiencia',
    },
    heroSlides: [
      { badge: 'Campanha signature', title: 'Composicao cinematografica com escala maior e leitura de campanha premium.', subtitle: 'Conteudo ficticio preparado para destacar hero impactante, imagem dominante e hierarquia comercial mais aspiracional.', price: 'EUR 12.50', tickets: '6,240 / 12,000 entradas exemplo' },
      { badge: 'Hero flagship', title: 'Uma campanha premium mais imponente, chamativa e aspiracional.', subtitle: 'Esta versao usa texto neutro para o cliente avaliar impacto visual, contraste e direcao de arte sem claims operacionais.', price: 'EUR 16.00', tickets: '4,180 / 9,500 entradas exemplo' },
      { badge: 'Showcase prestige', title: 'Luxury dark com protagonismo maior para o carro, CTA e presenca de marca.', subtitle: 'O objetivo e validar uma direcao mais comercial, cinematografica e premium dentro da nova paleta escura.', price: 'EUR 10.00', tickets: '7,020 / 14,000 entradas exemplo' },
    ],
    metrics: [
      { value: '120K', label: 'audiencia exemplo', note: 'numeros ficticios apenas para apresentacao' },
      { value: '48', label: 'campanhas exemplo', note: 'catalogo placeholder para equilibrio visual' },
      { value: '18', label: 'visoes de mercado', note: 'exemplo multi-idioma de apresentacao' },
      { value: '24/7', label: 'fluxo demo', note: 'bloco ilustrativo para o conceito' },
    ],
    filters: ['Destaque', 'Performance', 'Eletrico', 'Fim de semana', 'Limitado', 'Novo layout'],
    currentDraw: {
      eyebrow: 'Campanha em destaque',
      title: 'Signature GT Campaign',
      priceLabel: 'Entrada a partir de',
      countdownLabel: 'Temporizador',
      entriesLabel: 'Entradas exemplo',
      helper: 'Conteudo ilustrativo criado para avaliar composicao de campanha, CTA, hierarquia e impacto visual premium.',
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
    loading: 'Validating access...',
  },
  ptPT: {
    loginTitle: 'Acesso admin',
    loginCopy: 'EcrÃ£ restrito para acompanhamento administrativo e consulta de pagamentos.',
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
    loading: 'A validar acesso...',
  },
  es: {
    loginTitle: 'Acceso admin',
    loginCopy: 'Pantalla restringida para monitoreo administrativo y consulta de pagos.',
    emailLabel: 'Email admin',
    passwordLabel: 'ContraseÃ±a',
    submit: 'Entrar al panel',
    cancel: 'Volver al sitio',
    panelTitle: 'Panel administrativo',
    panelCopy: 'Consulta pagos aprobados y volumen de cupones en un solo lugar.',
    panelBadge: 'Solo admin',
    backSite: 'Sitio publico',
    logout: 'Salir del panel',
    helper: 'Usa esta area para revisar quien completo el pago, CPF y cantidad de cupones adquiridos.',
    error: 'Completa email y contraseÃ±a para continuar.',
    loading: 'Validando acceso...',
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
    loading: 'Validando acesso...',
  },
}

const getAdminProfileCopy = (locale) => {
  if (locale === 'en') {
    return {
      profileButton: 'Profile',
      profileTitle: 'Administrator profile',
      profileCopy: 'Logged access, active role and core permissions for this session.',
      nameLabel: 'Name',
      roleLabel: 'Role',
      accessLabel: 'Last access',
      statusLabel: 'Status',
      statusValue: 'Active',
      permissionsTitle: 'Permissions',
      roleValue: 'Platform administrator',
      permissions: ['Raffles', 'Payments', 'Support'],
    }
  }

  if (locale === 'es') {
    return {
      profileButton: 'Perfil',
      profileTitle: 'Perfil del administrador',
      profileCopy: 'Acceso autenticado, rol activo y permisos principales de esta sesion.',
      nameLabel: 'Nombre',
      roleLabel: 'Rol',
      accessLabel: 'Ultimo acceso',
      statusLabel: 'Estado',
      statusValue: 'Activo',
      permissionsTitle: 'Permisos',
      roleValue: 'Administrador de la plataforma',
      permissions: ['Sorteos', 'Pagos', 'Soporte'],
    }
  }

  return {
    profileButton: 'Perfil',
    profileTitle: 'Perfil do administrador',
    profileCopy: 'Acesso autenticado, funcao ativa e permissoes principais desta sessao.',
    nameLabel: 'Nome',
    roleLabel: 'Funcao',
    accessLabel: 'Ultimo acesso',
    statusLabel: 'Status',
    statusValue: 'Ativo',
    permissionsTitle: 'Permissoes',
    roleValue: 'Administrador da plataforma',
    permissions: ['Sorteios', 'Pagamentos', 'Suporte'],
  }
}

const getAdminCarsCopy = (locale) => {
  if (locale === 'en') {
    return {
      paymentsTab: 'Payments',
      carsTab: 'Home cars',
      title: 'Home car configuration',
      copy: 'Edit the cards shown on the home page and apply only when you click save.',
      addCar: 'Add car',
      restore: 'Discard draft',
      save: 'Save home cars',
      remove: 'Remove',
      titleLabel: 'Title',
      subtitleLabel: 'Subtitle',
      descriptionLabel: 'Description',
      imageLabel: 'Image URL',
      deadlineLabel: 'Deadline',
      priceLabel: 'Price',
      soldLabel: 'Sold text',
      progressLabel: 'Progress (%)',
      draftBadge: 'Draft',
      savedMessage: 'Home cars updated successfully.',
    }
  }

  if (locale === 'es') {
    return {
      paymentsTab: 'Pagos',
      carsTab: 'Coches de inicio',
      title: 'Configuracion de coches de la home',
      copy: 'Edita las tarjetas de la pagina inicial y aplica cambios solo al guardar.',
      addCar: 'Agregar coche',
      restore: 'Descartar borrador',
      save: 'Guardar coches de inicio',
      remove: 'Eliminar',
      titleLabel: 'Titulo',
      subtitleLabel: 'Subtitulo',
      descriptionLabel: 'Descripcion',
      imageLabel: 'URL de imagen',
      deadlineLabel: 'Plazo',
      priceLabel: 'Precio',
      soldLabel: 'Texto vendidos',
      progressLabel: 'Progreso (%)',
      draftBadge: 'Borrador',
      savedMessage: 'Coches de inicio actualizados con exito.',
    }
  }

  return {
    paymentsTab: 'Pagamentos',
    carsTab: 'Carros da home',
    title: 'Configuracao dos carros da home',
    copy: 'Edite os cards da pagina inicial e aplique as alteracoes apenas ao clicar em salvar.',
    addCar: 'Adicionar carro',
    restore: 'Descartar rascunho',
    save: 'Salvar carros da home',
    remove: 'Remover',
    titleLabel: 'Titulo',
    subtitleLabel: 'Subtitulo',
    descriptionLabel: 'Descricao',
    imageLabel: 'URL da imagem',
    deadlineLabel: 'Prazo',
    priceLabel: 'Preco',
    soldLabel: 'Texto vendidos',
    progressLabel: 'Progresso (%)',
    draftBadge: 'Rascunho',
    savedMessage: 'Carros da home atualizados com sucesso.',
  }
}

const getAccountMenuCopy = (locale) => {
  if (locale === 'en') {
    return {
      menuLabel: 'Account menu',
      guestSignOut: 'Sign out',
      logOut: 'Log out',
    }
  }

  if (locale === 'es') {
    return {
      menuLabel: 'Menu de cuenta',
      guestSignOut: 'Salir',
      logOut: 'Cerrar sesion',
    }
  }

  return {
    menuLabel: 'Menu de conta',
    guestSignOut: 'Sair',
    logOut: 'Terminar sessao',
  }
}

const getCatalogCopy = (locale) => {
  if (locale === 'en') {
    return {
      title: 'Search live raffles in a dense marketplace catalogue.',
      copy: 'Find campaigns fast with search, year, color and category filters in a compact browsing flow.',
      carsTab: 'Cars',
      housesTab: 'Houses',
      back: 'Back to site',
      badge: 'Raffle catalogue',
      resultsLabel: 'campaigns live',
      secondaryLabel: 'Category',
      searchPlaceholder: 'Search by model, house, city or keyword',
      colorLabel: 'Color',
      yearLabel: 'Year',
      clearFilters: 'Clear filters',
      allColors: 'All colors',
      allYears: 'All years',
      featuredLabel: 'Featured',
      infoColor: 'Color',
      infoYear: 'Year',
      infoLocation: 'Location',
      infoTickets: 'Tickets',
      emptyTitle: 'No raffles available in this category yet.',
      emptyCopy: 'Add new campaigns to populate this section automatically.',
    }
  }

  if (locale === 'es') {
    return {
      title: 'Busca sorteos activos en un catalogo tipo marketplace.',
      copy: 'Encuentra campanas rapido con busqueda, ano, color y categoria en una navegacion mas compacta.',
      carsTab: 'Coches',
      housesTab: 'Casas',
      back: 'Volver al sitio',
      badge: 'Catalogo de sorteos',
      resultsLabel: 'campanas activas',
      secondaryLabel: 'Categoria',
      searchPlaceholder: 'Busca por modelo, casa, ciudad o palabra clave',
      colorLabel: 'Color',
      yearLabel: 'Ano',
      clearFilters: 'Limpiar filtros',
      allColors: 'Todos los colores',
      allYears: 'Todos los anos',
      featuredLabel: 'Destacado',
      infoColor: 'Color',
      infoYear: 'Ano',
      infoLocation: 'Ubicacion',
      infoTickets: 'Boletos',
      emptyTitle: 'Todavia no hay sorteos en esta categoria.',
      emptyCopy: 'Agrega nuevas campanas para poblar esta seccion automaticamente.',
    }
  }

  if (locale === 'ptPT') {
    return {
      title: 'Pesquise sorteios ativos num catalogo estilo marketplace.',
      copy: 'Encontre campanhas rapidamente com pesquisa, ano, cor e categoria num fluxo mais compacto.',
      carsTab: 'Carros',
      housesTab: 'Casas',
      back: 'Voltar ao site',
      badge: 'Catalogo de sorteios',
      resultsLabel: 'campanhas ativas',
      secondaryLabel: 'Categoria',
      searchPlaceholder: 'Pesquise por modelo, moradia, cidade ou palavra-chave',
      colorLabel: 'Cor',
      yearLabel: 'Ano',
      clearFilters: 'Limpar filtros',
      allColors: 'Todas as cores',
      allYears: 'Todos os anos',
      featuredLabel: 'Destaque',
      infoColor: 'Cor',
      infoYear: 'Ano',
      infoLocation: 'Localizacao',
      infoTickets: 'Bilhetes',
      emptyTitle: 'Ainda nao existem sorteios nesta categoria.',
      emptyCopy: 'Adicione novas campanhas para preencher esta secao automaticamente.',
    }
  }

  return {
    title: 'Pesquise sorteios ativos em um catalogo estilo marketplace.',
    copy: 'Encontre campanhas rapidamente com busca, ano, cor e categoria em uma navegacao mais compacta.',
    carsTab: 'Carros',
    housesTab: 'Casas',
    back: 'Voltar ao site',
    badge: 'Catalogo de sorteios',
    resultsLabel: 'campanhas ativas',
    secondaryLabel: 'Categoria',
    searchPlaceholder: 'Pesquise por modelo, casa, cidade ou palavra-chave',
    colorLabel: 'Cor',
    yearLabel: 'Ano',
    clearFilters: 'Limpar filtros',
    allColors: 'Todas as cores',
    allYears: 'Todos os anos',
    featuredLabel: 'Destaque',
    infoColor: 'Cor',
    infoYear: 'Ano',
    infoLocation: 'Localizacao',
    infoTickets: 'Bilhetes',
    emptyTitle: 'Ainda nao existem sorteios nessa categoria.',
    emptyCopy: 'Cadastre novas campanhas para preencher esta pagina automaticamente.',
  }
}

const getCarCatalogItems = (competitions) => {
  const metadata = [
    { color: 'Preto', year: '2024', location: 'Zurique', featured: true },
    { color: 'Cinza', year: '2023', location: 'Paris', featured: false },
    { color: 'Azul', year: '2022', location: 'Milao', featured: false },
    { color: 'Branco', year: '2024', location: 'Berlim', featured: true },
    { color: 'Grafite', year: '2023', location: 'Madrid', featured: false },
    { color: 'Vermelho', year: '2025', location: 'Roma', featured: true },
  ]

  return competitions.map((competition, index) => ({
    ...competition,
    ...metadata[index % metadata.length],
  }))
}

const getHouseCompetitions = (locale) => {
  if (locale === 'en') {
    return [
      {
        title: 'Lake House Signature Draw',
        subtitle: 'Panoramic deck, fireplace and private dock',
        image: '/houses/6391394-house-6597406_1920.jpg',
        deadline: 'Ends in 4 days',
        price: 'EUR 34.90',
        progress: 58,
        sold: '7,480 sold',
        color: 'White',
        year: '2022',
        location: 'Como',
        featured: true,
      },
      {
        title: 'Ibiza Modern Villa',
        subtitle: 'Infinity pool and designer interiors',
        image: '/houses/gregorybutler-large-home-389271_1280.jpg',
        deadline: 'Ends in 7 days',
        price: 'EUR 44.90',
        progress: 63,
        sold: '9,120 sold',
        color: 'Sand',
        year: '2024',
        location: 'Ibiza',
        featured: false,
      },
      {
        title: 'Alpine Chalet Escape',
        subtitle: 'Mountain view residence with spa suite',
        image: '/houses/peggychoucair-house-4028391_1920.jpg',
        deadline: 'Ends tonight',
        price: 'EUR 29.90',
        progress: 88,
        sold: '13,040 sold',
        color: 'Wood',
        year: '2023',
        location: 'Zermatt',
        featured: true,
      },
    ]
  }

  if (locale === 'es') {
    return [
      {
        title: 'Sorteo Casa del Lago',
        subtitle: 'Deck panoramico, chimenea y muelle privado',
        image: '/houses/6391394-house-6597406_1920.jpg',
        deadline: 'Termina en 4 dias',
        price: 'EUR 34.90',
        progress: 58,
        sold: '7,480 vendidos',
        color: 'Blanco',
        year: '2022',
        location: 'Como',
        featured: true,
      },
      {
        title: 'Villa Moderna Ibiza',
        subtitle: 'Piscina infinita e interiores de autor',
        image: '/houses/gregorybutler-large-home-389271_1280.jpg',
        deadline: 'Termina en 7 dias',
        price: 'EUR 44.90',
        progress: 63,
        sold: '9,120 vendidos',
        color: 'Arena',
        year: '2024',
        location: 'Ibiza',
        featured: false,
      },
      {
        title: 'Chalet Alpine Escape',
        subtitle: 'Residencia con vista a la montana y spa',
        image: '/houses/peggychoucair-house-4028391_1920.jpg',
        deadline: 'Termina hoy',
        price: 'EUR 29.90',
        progress: 88,
        sold: '13,040 vendidos',
        color: 'Madera',
        year: '2023',
        location: 'Zermatt',
        featured: true,
      },
    ]
  }

  if (locale === 'ptPT') {
    return [
      {
        title: 'Sorteio Casa do Lago',
        subtitle: 'Deck panoramico, lareira e cais privado',
        image: '/houses/6391394-house-6597406_1920.jpg',
        deadline: 'Termina em 4 dias',
        price: 'EUR 34.90',
        progress: 58,
        sold: '7,480 vendidos',
        color: 'Branca',
        year: '2022',
        location: 'Como',
        featured: true,
      },
      {
        title: 'Villa Moderna Ibiza',
        subtitle: 'Piscina infinity e interiores de autor',
        image: '/houses/gregorybutler-large-home-389271_1280.jpg',
        deadline: 'Termina em 7 dias',
        price: 'EUR 44.90',
        progress: 63,
        sold: '9,120 vendidos',
        color: 'Areia',
        year: '2024',
        location: 'Ibiza',
        featured: false,
      },
      {
        title: 'Chalet Alpine Escape',
        subtitle: 'Residencia com vista para a montanha e spa',
        image: '/houses/peggychoucair-house-4028391_1920.jpg',
        deadline: 'Termina hoje',
        price: 'EUR 29.90',
        progress: 88,
        sold: '13,040 vendidos',
        color: 'Madeira',
        year: '2023',
        location: 'Zermatt',
        featured: true,
      },
    ]
  }

  return [
    {
      title: 'Sorteio Casa do Lago',
      subtitle: 'Deck panoramico, lareira e pier privativo',
      image: '/houses/6391394-house-6597406_1920.jpg',
      deadline: 'Termina em 4 dias',
      price: 'EUR 34.90',
      progress: 58,
      sold: '7,480 vendidos',
      color: 'Branca',
      year: '2022',
      location: 'Como',
      featured: true,
    },
    {
      title: 'Villa Moderna Ibiza',
      subtitle: 'Piscina de borda infinita e interiores assinados',
      image: '/houses/gregorybutler-large-home-389271_1280.jpg',
      deadline: 'Termina em 7 dias',
      price: 'EUR 44.90',
      progress: 63,
      sold: '9,120 vendidos',
      color: 'Areia',
      year: '2024',
      location: 'Ibiza',
      featured: false,
    },
    {
      title: 'Chalet Alpine Escape',
      subtitle: 'Casa com vista para montanha e suite spa',
      image: '/houses/peggychoucair-house-4028391_1920.jpg',
      deadline: 'Termina hoje',
      price: 'EUR 29.90',
      progress: 88,
      sold: '13,040 vendidos',
      color: 'Madeira',
      year: '2023',
      location: 'Zermatt',
      featured: true,
    },
  ]
}

const deadlineBadgeCopy = {
  en: {
    finalHours: 'Final hours',
    endsToday: 'Ends today',
    thisWeek: 'Ends this week',
    ongoing: 'Ongoing',
  },
  es: {
    finalHours: 'Ultimas horas',
    endsToday: 'Cierra hoy',
    thisWeek: 'Termina esta semana',
    ongoing: 'En curso',
  },
  ptPT: {
    finalHours: 'Ultimas horas',
    endsToday: 'Encerra hoje',
    thisWeek: 'Termina esta semana',
    ongoing: 'Em andamento',
  },
  ptBR: {
    finalHours: 'Ultimas horas',
    endsToday: 'Encerra hoje',
    thisWeek: 'Termina esta semana',
    ongoing: 'Em andamento',
  },
}

const getDeadlineBadgeLabel = (deadline, locale = 'ptBR') => {
  const labels = deadlineBadgeCopy[locale] ?? deadlineBadgeCopy.ptBR
  const normalized = (deadline ?? '').toLowerCase()

  if (
    /(ultimas horas|final hours|ultimas horas|ending shortly|terminando logo|a terminar)/.test(normalized)
  ) {
    return labels.finalHours
  }

  if (/(encerra hoje|termina hoje|ends today|ends tonight|cierra hoy|termina hoy)/.test(normalized)) {
    return labels.endsToday
  }

  if (
    /(\b[1-7]\b\s*dias?|\b[1-7]\b\s*days?|this week|esta semana|nesta semana|termina em \d+ dias|termina en \d+ dias|ends in \d+ days?|fecha em breve|janela limitada|limited window|closes soon|closing later|cierra pronto|cierre posterior|fecha mais tarde)/.test(normalized)
  ) {
    return labels.thisWeek
  }

  return labels.ongoing
}

const getDeadlineBadgeTone = (deadline) => {
  const normalized = (deadline ?? '').toLowerCase()

  if (
    /(ultimas horas|final hours|ending shortly|terminando logo|a terminar|encerra hoje|termina hoje|ends today|ends tonight|cierra hoy|termina hoy)/.test(normalized)
  ) {
    return 'urgent'
  }

  if (
    /(\b[1-7]\b\s*dias?|\b[1-7]\b\s*days?|this week|esta semana|nesta semana|termina em \d+ dias|termina en \d+ dias|ends in \d+ days?|fecha em breve|janela limitada|limited window|closes soon|closing later|cierra pronto|cierre posterior|fecha mais tarde)/.test(normalized)
  ) {
    return 'warm'
  }

  return 'warm'
}

const countdownUnitLabelsByLocale = {
  en: { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' },
  es: { days: 'Dias', hours: 'Horas', minutes: 'Minutos', seconds: 'Segundos' },
  ptPT: { days: 'Dias', hours: 'Horas', minutes: 'Minutos', seconds: 'Segundos' },
  ptBR: { days: 'Dias', hours: 'Horas', minutes: 'Minutos', seconds: 'Segundos' },
}

const getCountdownUnits = (countdown, locale = 'ptBR') => {
  const labels = countdownUnitLabelsByLocale[locale] ?? countdownUnitLabelsByLocale.ptBR
  const parts = (countdown ?? '')
    .split(':')
    .map((part) => part.trim())
    .filter(Boolean)

  return [
    { value: parts[0] ?? '--', label: labels.days },
    { value: parts[1] ?? '--', label: labels.hours },
    { value: parts[2] ?? '--', label: labels.minutes },
    { value: '--', label: labels.seconds },
  ]
}

const localeByCurrency = {
  en: 'en-IE',
  es: 'es-ES',
  ptPT: 'pt-PT',
  ptBR: 'pt-BR',
}

const parseEuroPrice = (price) => {
  const numeric = Number(String(price ?? '').replace(/[^\d.,]/g, '').replace(',', '.'))
  return Number.isFinite(numeric) ? numeric : 0
}

const formatEuroPrice = (value, locale = 'ptBR') =>
  new Intl.NumberFormat(localeByCurrency[locale] ?? 'pt-BR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

const buildGalleryFromCompetition = (competition, category = 'cars') => {
  if (!competition) {
    return []
  }

  const fallbackCars = ['/cars/hero-1.jpg', '/cars/hero-2.jpg', '/cars/hero-3.jpg', '/cars/card-1.jpg']
  const fallbackHouses = [
    '/houses/6391394-house-6597406_1920.jpg',
    '/houses/gregorybutler-large-home-389271_1280.jpg',
    '/houses/peggychoucair-house-4028391_1920.jpg',
  ]
  const fallback = category === 'houses' ? fallbackHouses : fallbackCars

  return [competition.image, ...fallback].filter((image, index, array) => image && array.indexOf(image) === index)
}

const internalScreenCopyByLocale = {
  en: {
    menuTitle: 'Menu',
    menuHome: 'Home',
    menuActive: 'Active draw',
    menuUpcoming: 'Upcoming draws',
    menuFaq: 'F.A.Q',
    menuLogin: 'Login / Register',
    productDescriptionTitle: 'Description',
    productStock: 'Stock',
    productAvailable: 'Available',
    productQuantity: 'Quantity',
    buyNow: 'Buy now',
    checkoutTitle: 'Checkout',
    checkoutCoupon: 'Referral code',
    checkoutDiscount: 'Discount',
    checkoutTotal: 'Total',
    checkoutTerms: 'I confirm I am over 18 and accept the terms and conditions.',
    checkoutPay: 'Pay',
    authTitleLogin: 'Login',
    authTitleRegister: 'Create account',
    authName: 'Name',
    authSurname: 'Surname',
    authEmail: 'Email',
    authPassword: 'Password',
    authPrimaryLogin: 'Sign in',
    authPrimaryRegister: 'Create',
    authSwitchLogin: 'Already have an account?',
    authSwitchRegister: 'New customer?',
  },
  es: {
    menuTitle: 'Menu',
    menuHome: 'Inicio',
    menuActive: 'Sorteo activo',
    menuUpcoming: 'Proximos sorteos',
    menuFaq: 'F.A.Q',
    menuLogin: 'Iniciar sesion / Registro',
    productDescriptionTitle: 'Descripcion',
    productStock: 'Stock',
    productAvailable: 'Disponible',
    productQuantity: 'Cantidad',
    buyNow: 'Comprar',
    checkoutTitle: 'Checkout',
    checkoutCoupon: 'Codigo de referido',
    checkoutDiscount: 'Descuento',
    checkoutTotal: 'Total',
    checkoutTerms: 'Certifico que soy mayor de 18 anos y acepto los terminos y condiciones.',
    checkoutPay: 'Pagar',
    authTitleLogin: 'Iniciar sesion',
    authTitleRegister: 'Registro',
    authName: 'Nombre',
    authSurname: 'Apellidos',
    authEmail: 'Correo electronico',
    authPassword: 'Contrasena',
    authPrimaryLogin: 'Entrar',
    authPrimaryRegister: 'Crear',
    authSwitchLogin: 'Ya tienes cuenta?',
    authSwitchRegister: 'Nuevo cliente?',
  },
  ptPT: {
    menuTitle: 'Menu',
    menuHome: 'Inicio',
    menuActive: 'Sorteio ativo',
    menuUpcoming: 'Proximos sorteios',
    menuFaq: 'F.A.Q',
    menuLogin: 'Entrar / Registar',
    productDescriptionTitle: 'Descricao',
    productStock: 'Stock',
    productAvailable: 'Disponivel',
    productQuantity: 'Quantidade',
    buyNow: 'Comprar',
    checkoutTitle: 'Checkout',
    checkoutCoupon: 'Codigo de referencia',
    checkoutDiscount: 'Desconto',
    checkoutTotal: 'Total',
    checkoutTerms: 'Confirmo que tenho mais de 18 anos e aceito os termos e condicoes.',
    checkoutPay: 'Pagar',
    authTitleLogin: 'Entrar',
    authTitleRegister: 'Criar conta',
    authName: 'Nome',
    authSurname: 'Apelidos',
    authEmail: 'Email',
    authPassword: 'Palavra-passe',
    authPrimaryLogin: 'Entrar',
    authPrimaryRegister: 'Criar',
    authSwitchLogin: 'Ja tens conta?',
    authSwitchRegister: 'Novo cliente?',
  },
  ptBR: {
    menuTitle: 'Menu',
    menuHome: 'Inicio',
    menuActive: 'Sorteio ativo',
    menuUpcoming: 'Proximos sorteios',
    menuFaq: 'F.A.Q',
    menuLogin: 'Entrar / Registrar',
    productDescriptionTitle: 'Descricao',
    productStock: 'Estoque',
    productAvailable: 'Disponivel',
    productQuantity: 'Quantidade',
    buyNow: 'Comprar',
    checkoutTitle: 'Checkout',
    checkoutCoupon: 'Codigo de referido',
    checkoutDiscount: 'Desconto',
    checkoutTotal: 'Total',
    checkoutTerms: 'Certifico que sou maior de 18 anos e aceito os termos e condicoes.',
    checkoutPay: 'Pagar',
    authTitleLogin: 'Entrar',
    authTitleRegister: 'Criar conta',
    authName: 'Nome',
    authSurname: 'Sobrenome',
    authEmail: 'Email',
    authPassword: 'Senha',
    authPrimaryLogin: 'Entrar',
    authPrimaryRegister: 'Criar',
    authSwitchLogin: 'Ja tem conta?',
    authSwitchRegister: 'Novo cliente?',
  },
}

const formatAdminName = (email) => {
  const baseName = email.split('@')[0]?.replace(/[._-]+/g, ' ').trim()

  if (!baseName) {
    return 'Admin'
  }

  return baseName
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function App() {
  const [view, setView] = useState('landing')
  const [locale, setLocale] = useState('ptBR')
  const [activeSlide, setActiveSlide] = useState(0)
  const [catalogCategory, setCatalogCategory] = useState('cars')
  const [catalogSearch, setCatalogSearch] = useState('')
  const [catalogColor, setCatalogColor] = useState('all')
  const [catalogYear, setCatalogYear] = useState('all')
  const [selectedCompetition, setSelectedCompetition] = useState(null)
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedOffer, setSelectedOffer] = useState('single')
  const [couponCode, setCouponCode] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [authForm, setAuthForm] = useState({ name: '', surname: '', email: '', password: '' })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [adminForm, setAdminForm] = useState({ email: '', password: '' })
  const [adminError, setAdminError] = useState('')
  const [adminDashboardTab, setAdminDashboardTab] = useState('payments')
  const [customCompetitionsByLocale, setCustomCompetitionsByLocale] = useState({})
  const [adminCarsDraft, setAdminCarsDraft] = useState([])
  const [adminCarsDirty, setAdminCarsDirty] = useState(false)
  const [adminCarsNotice, setAdminCarsNotice] = useState('')
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [isAdminLoading, setIsAdminLoading] = useState(false)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [showMockHeroVideo, setShowMockHeroVideo] = useState(false)
  const accountMenuRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const heroSwipeStartRef = useRef(null)
  const copy = useMemo(() => getPresentationCopy(locale), [locale])
  const paymentScreen = paymentScreenByLocale[locale] ?? paymentScreenByLocale.en
  const adminCopy = adminByLocale[locale] ?? adminByLocale.ptBR
  const adminProfileCopy = getAdminProfileCopy(locale)
  const adminCarsCopy = getAdminCarsCopy(locale)
  const accountMenuCopy = getAccountMenuCopy(locale)
  const catalogCopy = getCatalogCopy(locale)
  const homeCompetitions = customCompetitionsByLocale[locale] ?? copy.competitions
  const carCompetitions = useMemo(() => getCarCatalogItems(homeCompetitions), [homeCompetitions])
  const houseCompetitions = useMemo(() => getHouseCompetitions(locale), [locale])
  const catalogCompetitions = useMemo(
    () => (catalogCategory === 'houses' ? houseCompetitions : carCompetitions),
    [catalogCategory, houseCompetitions, carCompetitions]
  )
  const catalogColors = useMemo(
    () => ['all', ...new Set(catalogCompetitions.map((item) => item.color))],
    [catalogCompetitions]
  )
  const catalogYears = useMemo(
    () => ['all', ...new Set(catalogCompetitions.map((item) => item.year).sort((a, b) => Number(b) - Number(a)))],
    [catalogCompetitions]
  )
  const internalCopy = internalScreenCopyByLocale[locale] ?? internalScreenCopyByLocale.ptBR
  const fallbackCompetition = catalogCategory === 'houses' ? houseCompetitions[0] : carCompetitions[0]
  const activeCompetition = selectedCompetition ?? fallbackCompetition
  const competitionGallery = useMemo(
    () => buildGalleryFromCompetition(activeCompetition, catalogCategory),
    [activeCompetition, catalogCategory]
  )
  const unitPrice = parseEuroPrice(activeCompetition?.price)
  const offerOptions = useMemo(
    () => [
      { id: 'single', label: `1 x ${formatEuroPrice(unitPrice, locale)}`, baseQty: 1, bonusQty: 0, multiplier: 1 },
      { id: 'plus1', label: '3 + 1 Gratis', baseQty: 3, bonusQty: 1, multiplier: 3 },
      { id: 'plus3', label: '5 + 3 Gratis', baseQty: 5, bonusQty: 3, multiplier: 5 },
      { id: 'plus4', label: '10 + 4 Gratis', baseQty: 10, bonusQty: 4, multiplier: 10 },
    ],
    [unitPrice, locale]
  )
  const activeOffer = offerOptions.find((offer) => offer.id === selectedOffer) ?? offerOptions[0]
  const subtotal = unitPrice * Math.max(1, quantity) * activeOffer.multiplier
  const hasCoupon = couponCode.trim().length > 0
  const discount = hasCoupon ? subtotal * 0.08 : 0
  const total = Math.max(0, subtotal - discount)
  const filteredCatalogCompetitions = useMemo(() => {
    const normalizedSearch = catalogSearch.trim().toLowerCase()
    return catalogCompetitions.filter((competition) => {
      const matchesSearch = !normalizedSearch || [
        competition.title,
        competition.subtitle,
        competition.location,
        competition.color,
        competition.year,
      ].some((value) => value.toLowerCase().includes(normalizedSearch))
      const matchesColor = catalogColor === 'all' || competition.color === catalogColor
      const matchesYear = catalogYear === 'all' || competition.year === catalogYear

      return matchesSearch && matchesColor && matchesYear
    })
  }, [catalogSearch, catalogCompetitions, catalogColor, catalogYear])
  const navigationItems = copy.navItems.filter((item) =>
    ['competitions', 'how-it-works', 'winners'].includes(item.id)
  )
  const adminEmail = adminForm.email.trim() || 'admin@sorteiocars.com'
  const adminName = formatAdminName(adminEmail)
  const adminInitials = adminName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const token = window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY)
    const storedEmail = window.localStorage.getItem(ADMIN_USER_STORAGE_KEY)

    if (token) {
      setIsAdminAuthenticated(true)
    }

    if (storedEmail) {
      setAdminForm((current) => ({ ...current, email: storedEmail }))
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const token = window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY)

    if (!token) {
      return
    }

    const validateSession = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Sessao admin expirada.')
        }

        setIsAdminAuthenticated(true)
      } catch {
        window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY)
        window.localStorage.removeItem(ADMIN_USER_STORAGE_KEY)
        setIsAdminAuthenticated(false)
      }
    }

    validateSession()
  }, [])

  useEffect(() => {
    if (view !== 'landing') {
      return undefined
    }

    const interval = window.setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) {
        return
      }
      setActiveSlide((current) => (current + 1) % copy.heroSlides.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [copy.heroSlides.length, view])

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang
  }, [copy.htmlLang])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const narrowViewportQuery = window.matchMedia('(max-width: 767px)')

    const updateHeroVideoState = () => {
      setShowMockHeroVideo(!(reduceMotionQuery.matches || narrowViewportQuery.matches))
    }

    updateHeroVideoState()
    reduceMotionQuery.addEventListener('change', updateHeroVideoState)
    narrowViewportQuery.addEventListener('change', updateHeroVideoState)

    return () => {
      reduceMotionQuery.removeEventListener('change', updateHeroVideoState)
      narrowViewportQuery.removeEventListener('change', updateHeroVideoState)
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    const buttons = document.querySelectorAll('.internal-buy-btn')

    buttons.forEach((button) => {
      if (button.dataset.enhanced === 'true') {
        return
      }

      const stroke = document.createElement('span')
      stroke.className = 'internal-buy-btn__stroke'
      stroke.setAttribute('aria-hidden', 'true')

      const dots = document.createElement('span')
      dots.className = 'internal-buy-btn__dots'
      dots.setAttribute('aria-hidden', 'true')

      for (let index = 0; index < 22; index += 1) {
        const dot = document.createElement('span')
        dot.className = 'internal-buy-btn__dot'
        dot.style.setProperty('--dot-x', `${(Math.random() * 70 - 35).toFixed(2)}px`)
        dot.style.setProperty('--dot-size', `${(Math.random() * 1.4 + 1.8).toFixed(2)}px`)
        dot.style.setProperty('--dot-delay', `${(Math.random() * 1.2).toFixed(2)}s`)
        dot.style.setProperty('--dot-duration', `${(Math.random() * 1.1 + 1.4).toFixed(2)}s`)
        dots.appendChild(dot)
      }

      button.appendChild(stroke)
      button.appendChild(dots)
      button.dataset.enhanced = 'true'
    })
  }, [view, locale])

  useEffect(() => {
    if (!isAccountMenuOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setIsAccountMenuOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsAccountMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isAccountMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMobileMenuOpen])

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
  const mockHeroVideo = mockedMediaData.heroVideo
  const heroCountdownUnits = getCountdownUnits(currentSlide.countdown, locale)
  const handleLocaleChange = (nextLocale) => {
    const nextCopy = getPresentationCopy(nextLocale)
    const nextHomeCompetitions = customCompetitionsByLocale[nextLocale] ?? nextCopy.competitions
    setLocale(nextLocale)
    setActiveSlide(0)
    setAdminCarsDraft(nextHomeCompetitions)
    setAdminCarsDirty(false)
    setAdminCarsNotice('')
  }

  const openAdminLogin = () => {
    setAdminError('')
    setIsAccountMenuOpen(false)
    setAdminDashboardTab('payments')
    setAdminCarsDraft(homeCompetitions)
    setAdminCarsDirty(false)
    setAdminCarsNotice('')
    setView('adminLogin')
  }

  const openAdminProfile = () => {
    setIsAccountMenuOpen(false)
    setAdminDashboardTab('payments')
    setAdminCarsDraft(homeCompetitions)
    setAdminCarsDirty(false)
    setAdminCarsNotice('')
    setView('adminDashboard')
  }

  const returnToLanding = () => {
    setAdminError('')
    setIsAccountMenuOpen(false)
    setView('landing')
  }

  const handleGuestSignOut = () => {
    setAdminError('')
    setAdminForm({ email: '', password: '' })
    setIsAccountMenuOpen(false)
    setView('landing')
  }

  const handleAdminLogout = () => {
    setAdminError('')
    setAdminForm({ email: '', password: '' })
    setAdminDashboardTab('payments')
    setIsAdminAuthenticated(false)
    setIsAdminLoading(false)
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY)
      window.localStorage.removeItem(ADMIN_USER_STORAGE_KEY)
    }
    setIsAccountMenuOpen(false)
    setView('landing')
  }

  const handleAdminLogin = async (event) => {
    event.preventDefault()

    if (!adminForm.email.trim() || !adminForm.password.trim()) {
      setAdminError(adminCopy.error)
      return
    }

    setAdminError('')
    setIsAdminLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: adminForm.email.trim(),
          password: adminForm.password,
        }),
      })

      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        setAdminError(payload?.message || 'Falha no login admin.')
        setIsAdminLoading(false)
        return
      }

      const accessToken = payload?.session?.accessToken
      const email = payload?.user?.email || adminForm.email.trim()

      if (!accessToken) {
        setAdminError('Sessao invalida retornada pela API.')
        setIsAdminLoading(false)
        return
      }

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, accessToken)
        window.localStorage.setItem(ADMIN_USER_STORAGE_KEY, email)
      }

      setAdminForm((current) => ({ ...current, password: '', email }))
      setAdminDashboardTab('payments')
      setIsAdminAuthenticated(true)
      setIsAccountMenuOpen(false)
      setView('adminDashboard')
      setIsAdminLoading(false)
    } catch (error) {
      setAdminError(error?.message || 'Erro ao conectar com API admin.')
      setIsAdminLoading(false)
    }
  }

  const updateAdminCarField = (index, field, value) => {
    setAdminCarsDraft((current) => current.map((item, itemIndex) => (
      itemIndex === index ? { ...item, [field]: value } : item
    )))
    setAdminCarsDirty(true)
    setAdminCarsNotice('')
  }

  const handleAddAdminCar = () => {
    setAdminCarsDraft((current) => [
      ...current,
      {
        title: `Novo carro ${current.length + 1}`,
        subtitle: 'Configurar detalhes',
        description: 'Descricao do sorteio',
        image: '/cars/hero-1.jpg',
        deadline: 'Termina em breve',
        price: 'EUR 0.00',
        progress: 0,
        sold: '0 vendidos',
      },
    ])
    setAdminCarsDirty(true)
    setAdminCarsNotice('')
  }

  const handleRemoveAdminCar = (index) => {
    setAdminCarsDraft((current) => current.filter((_, itemIndex) => itemIndex !== index))
    setAdminCarsDirty(true)
    setAdminCarsNotice('')
  }

  const handleResetAdminCarsDraft = () => {
    setAdminCarsDraft(homeCompetitions)
    setAdminCarsDirty(false)
    setAdminCarsNotice('')
  }

  const handleSaveAdminCars = () => {
    const normalizedCompetitions = adminCarsDraft
      .map((item, index) => {
        const normalizedProgress = Number.parseInt(`${item.progress ?? 0}`, 10)

        return {
          ...item,
          title: item.title?.trim() || `Carro ${index + 1}`,
          subtitle: item.subtitle?.trim() || 'Sem subtitulo',
          description: item.description?.trim() || item.subtitle?.trim() || 'Sem descricao',
          image: item.image?.trim() || '/cars/hero-1.jpg',
          deadline: item.deadline?.trim() || 'Termina em breve',
          price: item.price?.trim() || 'EUR 0.00',
          sold: item.sold?.trim() || '0 vendidos',
          progress: Number.isNaN(normalizedProgress)
            ? 0
            : Math.max(0, Math.min(100, normalizedProgress)),
        }
      })
      .filter((item) => item.title)

    const safeCompetitions = normalizedCompetitions.length
      ? normalizedCompetitions
      : [{
        title: 'Carro 1',
        subtitle: 'Configurar detalhes',
        description: 'Descricao do sorteio',
        image: '/cars/hero-1.jpg',
        deadline: 'Termina em breve',
        price: 'EUR 0.00',
        sold: '0 vendidos',
        progress: 0,
      }]

    setCustomCompetitionsByLocale((current) => ({
      ...current,
      [locale]: safeCompetitions,
    }))
    setAdminCarsDraft(safeCompetitions)
    setAdminCarsDirty(false)
    setAdminCarsNotice(adminCarsCopy.savedMessage)
  }

  const goToPreviousSlide = () => {
    setActiveSlide((current) => (current - 1 + copy.heroSlides.length) % copy.heroSlides.length)
  }

  const goToNextSlide = () => {
    setActiveSlide((current) => (current + 1) % copy.heroSlides.length)
  }

  const handleHeroTouchStart = (event) => {
    const touch = event.touches?.[0]
    if (!touch) {
      return
    }

    heroSwipeStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleHeroTouchEnd = (event) => {
    const start = heroSwipeStartRef.current
    const touch = event.changedTouches?.[0]
    heroSwipeStartRef.current = null

    if (!start || !touch) {
      return
    }

    const deltaX = touch.clientX - start.x
    const deltaY = touch.clientY - start.y
    const horizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 46

    if (!horizontalSwipe) {
      return
    }

    if (deltaX < 0) {
      goToNextSlide()
      return
    }

    goToPreviousSlide()
  }

  const openCatalogPage = (category = 'cars') => {
    setCatalogCategory(category)
    setCatalogSearch('')
    setCatalogColor('all')
    setCatalogYear('all')
    setIsAccountMenuOpen(false)
    setIsMobileMenuOpen(false)
    setView('catalog')
  }

  const openProductPage = (competition, category = catalogCategory) => {
    setCatalogCategory(category)
    setSelectedCompetition(competition)
    setSelectedGalleryIndex(0)
    setQuantity(1)
    setSelectedOffer('single')
    setIsAccountMenuOpen(false)
    setIsMobileMenuOpen(false)
    setView('product')
  }

  const openCheckoutPage = () => {
    setIsMobileMenuOpen(false)
    setView('checkout')
  }

  const openAuthPage = (mode = 'login') => {
    setAuthMode(mode)
    setIsMobileMenuOpen(false)
    setView('auth')
  }

  const jumpToLandingSection = (sectionId) => {
    setIsMobileMenuOpen(false)
    setIsAccountMenuOpen(false)
    setView('landing')
    window.setTimeout(() => {
      const target = document.querySelector(`#${sectionId}`)
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 20)
  }

  if (view === 'product' && activeCompetition) {
    return (
      <div className="luxury-shell text-slate-100 internal-shell">
        <header className="home-header sticky top-0 z-40 backdrop-blur-xl">
          <div className="home-header__inner mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((current) => !current)}
                className="internal-menu-btn inline-flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/15 bg-white/6 text-white xl:hidden"
                aria-label={internalCopy.menuTitle}
              >
                {isMobileMenuOpen ? 'x' : '='}
              </button>
              <a href="#home" className="brand-lockup group flex items-center gap-3">
                <span className="brand-mark">
                  <img src="/web_car_draw.webp" alt="Web Car Draw logo" className="brand-mark__image" />
                </span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openCatalogPage(catalogCategory)}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-[#f0c000]/35"
              >
                {catalogCopy.back}
              </button>
            </div>
          </div>
        </header>

        {isMobileMenuOpen ? (
          <div className="internal-menu-overlay fixed inset-0 z-50 bg-black/70 p-4 xl:hidden">
            <aside ref={mobileMenuRef} className="internal-menu-drawer ml-auto h-full w-full max-w-[340px] rounded-[24px] border border-white/10 bg-[#0b0f1a] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9aa0ac]">{internalCopy.menuTitle}</p>
              <div className="mt-6 flex flex-col gap-2">
                <button type="button" onClick={returnToLanding} className="internal-menu-link">{internalCopy.menuHome}</button>
                <button type="button" onClick={() => jumpToLandingSection('competitions')} className="internal-menu-link">{internalCopy.menuActive}</button>
                <button type="button" onClick={() => openCatalogPage('cars')} className="internal-menu-link">{internalCopy.menuUpcoming}</button>
                <button type="button" onClick={() => jumpToLandingSection('compliance')} className="internal-menu-link">{internalCopy.menuFaq}</button>
                <button type="button" onClick={() => openAuthPage('login')} className="internal-menu-link">{internalCopy.menuLogin}</button>
              </div>
            </aside>
          </div>
        ) : null}

        <main className="section-band section-band--soft internal-page">
          <div className="section-shell">
            <section className="internal-product-card rounded-[28px] border border-white/10 bg-[#111622] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.36)] sm:p-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <div>
                  <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#0f131e]">
                    <img
                      src={competitionGallery[selectedGalleryIndex] ?? activeCompetition.image}
                      alt={activeCompetition.title}
                      loading="lazy"
                      decoding="async"
                      className="h-[260px] w-full object-cover sm:h-[320px] lg:h-[420px]"
                    />
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {competitionGallery.slice(0, 4).map((image) => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => setSelectedGalleryIndex(competitionGallery.indexOf(image))}
                        className={`overflow-hidden rounded-[14px] border transition ${
                          competitionGallery[selectedGalleryIndex] === image
                            ? 'border-[#e11d2e] ring-2 ring-[#e11d2e]/30'
                            : 'border-white/10'
                        }`}
                      >
                        <img src={image} alt={activeCompetition.title} className="h-20 w-full object-cover sm:h-24" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="internal-product-info rounded-[22px] border border-white/10 bg-[#0f131d] p-4 sm:p-5">
                  <h1 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">{activeCompetition.title}</h1>
                  <p className="mt-3 text-lg font-semibold text-[#b7beca]">{activeCompetition.subtitle}</p>
                  <p className="mt-5 text-4xl font-black text-[#ff4a5c]">{activeCompetition.price}</p>

                  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                    <span className="rounded-full border border-[#e11d2e]/30 bg-[#e11d2e]/10 px-3 py-1 font-semibold text-[#ffd3d8]">
                      {internalCopy.productStock}: {internalCopy.productAvailable}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold text-[#b7beca]">
                      {activeCompetition.sold}
                    </span>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm font-semibold text-[#d7dee7]">{internalCopy.productQuantity}</p>
                    <div className="mt-2 inline-flex items-center rounded-full border border-white/10 bg-[#111826] p-1">
                      <button
                        type="button"
                        onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                        className="h-9 w-9 rounded-full text-lg font-black text-white transition hover:bg-white/10"
                      >
                        -
                      </button>
                      <span className="inline-flex min-w-[3rem] justify-center text-lg font-black text-white">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity((current) => Math.min(99, current + 1))}
                        className="h-9 w-9 rounded-full text-lg font-black text-white transition hover:bg-white/10"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
                    {offerOptions.map((offer) => (
                      <button
                        key={offer.id}
                        type="button"
                        onClick={() => setSelectedOffer(offer.id)}
                        className={`internal-offer-btn rounded-[14px] border px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.08em] transition ${
                          selectedOffer === offer.id
                            ? 'border-[#e11d2e] bg-[#e11d2e]/18 text-white'
                            : 'border-white/10 bg-white/5 text-[#d7dee7] hover:border-[#e11d2e]/45'
                        }`}
                      >
                        {offer.label}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={openCheckoutPage}
                    className="internal-buy-btn mt-6 w-full rounded-full border border-[#e11d2e] bg-[#e11d2e] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_18px_45px_rgba(225,29,46,0.36)] transition hover:bg-[#c61120]"
                  >
                    {internalCopy.buyNow}
                  </button>
                </div>
              </div>
            </section>

            <section className="mt-6 rounded-[26px] border border-white/10 bg-[#111622] p-5 sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#ff7a88]">{internalCopy.productDescriptionTitle}</p>
              <h2 className="mt-4 max-w-[24ch] text-4xl font-black leading-[1.02] tracking-[-0.04em] text-white">
                {activeCompetition.title}
              </h2>
              <div className="mt-5 max-w-3xl space-y-5 text-[1.03rem] leading-8 text-[#c4cddd]">
                <p>{activeCompetition.description || activeCompetition.subtitle}</p>
                <p>{copy.sections.platform.copy}</p>
              </div>
            </section>
          </div>
        </main>
      </div>
    )
  }

  if (view === 'checkout' && activeCompetition) {
    return (
      <div className="luxury-shell text-slate-100 internal-shell">
        <header className="home-header sticky top-0 z-40 backdrop-blur-xl">
          <div className="home-header__inner mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setView('product')}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#f0c000]/35"
            >
              {catalogCopy.back}
            </button>
          </div>
        </header>

        <main className="section-band section-band--soft internal-page">
          <div className="section-shell">
            <section className="mx-auto w-full max-w-4xl rounded-[28px] border border-white/10 bg-[#111622] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.36)] sm:p-6">
              <h1 className="text-3xl font-black tracking-[-0.04em] text-white">{internalCopy.checkoutTitle}</h1>
              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_360px]">
                <div className="rounded-[18px] border border-white/10 bg-[#0f131d] p-4">
                  <div className="flex items-center gap-3">
                    <img src={activeCompetition.image} alt={activeCompetition.title} className="h-16 w-24 rounded-[12px] object-cover" />
                    <div>
                      <p className="text-sm font-bold text-white">{activeCompetition.title}</p>
                      <p className="mt-1 text-sm text-[#9aa0ac]">{activeOffer.label}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm font-semibold text-[#d7dee7]">{internalCopy.checkoutCoupon}</p>
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(event) => setCouponCode(event.target.value)}
                      placeholder="50fifty"
                      className="internal-input mt-2 w-full rounded-[14px] border border-white/10 bg-[#111826] px-4 py-3 text-sm text-white outline-none transition focus:border-[#e11d2e]/55"
                    />
                  </div>

                  <label className="mt-5 flex items-start gap-3 text-sm text-[#c4cddd]">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(event) => setAcceptTerms(event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border border-white/20 bg-[#101420]"
                    />
                    <span>{internalCopy.checkoutTerms}</span>
                  </label>
                </div>

                <aside className="rounded-[18px] border border-white/10 bg-[#0f131d] p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-[#b7beca]">
                      <span>{internalCopy.checkoutDiscount}</span>
                      <strong className="text-[#ff9ca8]">-{formatEuroPrice(discount, locale)}</strong>
                    </div>
                    <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base text-white">
                      <span>{internalCopy.checkoutTotal}</span>
                      <strong className="text-3xl font-black text-[#ffd25a]">{formatEuroPrice(total, locale)}</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openAuthPage('login')}
                    className="mt-6 w-full rounded-full border border-[#e11d2e] bg-[#e11d2e] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_18px_45px_rgba(225,29,46,0.36)] transition hover:bg-[#c61120]"
                  >
                    {internalCopy.checkoutPay}
                  </button>
                </aside>
              </div>
            </section>
          </div>
        </main>
      </div>
    )
  }

  if (view === 'auth') {
    return (
      <div className="luxury-shell text-slate-100 internal-shell">
        <main className="section-band section-band--deep min-h-screen">
          <div className="section-shell flex min-h-[70vh] items-center justify-center">
            <section className="w-full max-w-[460px] rounded-[26px] border border-white/10 bg-[#111622] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.4)] sm:p-7">
              <h1 className="text-3xl font-black tracking-[-0.04em] text-white">
                {authMode === 'login' ? internalCopy.authTitleLogin : internalCopy.authTitleRegister}
              </h1>

              <form className="mt-6 space-y-4">
                {authMode === 'register' ? (
                  <>
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-[#c4cddd]">{internalCopy.authName}</span>
                      <input
                        type="text"
                        value={authForm.name}
                        onChange={(event) => setAuthForm((current) => ({ ...current, name: event.target.value }))}
                        className="internal-input w-full rounded-[14px] border border-white/10 bg-[#111826] px-4 py-3 text-sm text-white outline-none transition focus:border-[#e11d2e]/55"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-[#c4cddd]">{internalCopy.authSurname}</span>
                      <input
                        type="text"
                        value={authForm.surname}
                        onChange={(event) => setAuthForm((current) => ({ ...current, surname: event.target.value }))}
                        className="internal-input w-full rounded-[14px] border border-white/10 bg-[#111826] px-4 py-3 text-sm text-white outline-none transition focus:border-[#e11d2e]/55"
                      />
                    </label>
                  </>
                ) : null}

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#c4cddd]">{internalCopy.authEmail}</span>
                  <input
                    type="email"
                    value={authForm.email}
                    onChange={(event) => setAuthForm((current) => ({ ...current, email: event.target.value }))}
                    className="internal-input w-full rounded-[14px] border border-white/10 bg-[#111826] px-4 py-3 text-sm text-white outline-none transition focus:border-[#e11d2e]/55"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#c4cddd]">{internalCopy.authPassword}</span>
                  <input
                    type="password"
                    value={authForm.password}
                    onChange={(event) => setAuthForm((current) => ({ ...current, password: event.target.value }))}
                    className="internal-input w-full rounded-[14px] border border-white/10 bg-[#111826] px-4 py-3 text-sm text-white outline-none transition focus:border-[#e11d2e]/55"
                  />
                </label>

                <button
                  type="button"
                  onClick={openCheckoutPage}
                  className="w-full rounded-full border border-[#e11d2e] bg-[#e11d2e] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_18px_45px_rgba(225,29,46,0.36)] transition hover:bg-[#c61120]"
                >
                  {authMode === 'login' ? internalCopy.authPrimaryLogin : internalCopy.authPrimaryRegister}
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMode((current) => (current === 'login' ? 'register' : 'login'))}
                  className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-[#d7dee7] transition hover:border-[#e11d2e]/45"
                >
                  {authMode === 'login' ? internalCopy.authSwitchRegister : internalCopy.authSwitchLogin}
                </button>

                <button
                  type="button"
                  onClick={returnToLanding}
                  className="w-full text-sm text-[#9aa0ac] underline-offset-4 hover:text-white hover:underline"
                >
                  {catalogCopy.back}
                </button>
              </form>
            </section>
          </div>
        </main>
      </div>
    )
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
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#b7beca] sm:text-base">
                  {adminCopy.loginCopy}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {paymentScreen.summary.map((item) => (
                  <div key={item.label} className="rounded-[22px] border border-white/8 bg-[#12131a] p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9aa0ac]">
                      {item.label}
                    </p>
                    <p className="mt-3 text-3xl font-black text-[#ffd25a]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-card p-6 sm:p-7">
              <form className="flex h-full flex-col justify-center" onSubmit={handleAdminLogin}>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9aa0ac]">
                  {adminCopy.panelBadge}
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white">
                  {adminCopy.loginTitle}
                </h2>

                <div className="mt-6 space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#b7beca]">
                      {adminCopy.emailLabel}
                    </span>
                    <input
                      type="email"
                      value={adminForm.email}
                      onChange={(event) =>
                        setAdminForm((current) => ({ ...current, email: event.target.value }))
                      }
                      className="w-full rounded-[18px] border border-white/10 bg-[#12131a] px-4 py-3 text-sm text-white outline-none transition focus:border-[#f0c000]/45"
                      placeholder="admin@demo.com"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#b7beca]">
                      {adminCopy.passwordLabel}
                    </span>
                    <input
                      type="password"
                      value={adminForm.password}
                      onChange={(event) =>
                        setAdminForm((current) => ({ ...current, password: event.target.value }))
                      }
                      className="w-full rounded-[18px] border border-white/10 bg-[#12131a] px-4 py-3 text-sm text-white outline-none transition focus:border-[#f0c000]/45"
                      placeholder="********"
                    />
                  </label>
                </div>

                {adminError ? (
                  <p className="mt-4 text-sm text-[#ffd25a]">{adminError}</p>
                ) : null}

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={isAdminLoading}
                    className="premium-button w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isAdminLoading ? adminCopy.loading : adminCopy.submit}
                  </button>
                  <button
                    type="button"
                    onClick={returnToLanding}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#f0c000]/45 hover:bg-[#1a1c24]/90"
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
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b7beca]">
                    {paymentScreen.kicker}
                  </span>
                </div>
                <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                  {adminCopy.panelTitle}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#b7beca]">
                  {adminCopy.panelCopy}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={returnToLanding}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#f0c000]/45 hover:bg-[#1a1c24]/90"
                >
                  {adminCopy.backSite}
                </button>
                <button
                  type="button"
                  onClick={handleAdminLogout}
                  className="rounded-full border border-[#f0c000]/25 bg-[#f0c000]/10 px-5 py-3 text-sm font-semibold text-[#ffd25a] transition hover:bg-[#f0c000]/16"
                >
                  {adminCopy.logout}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
            <div className="grid gap-4">
              <div className="surface-card p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-black tracking-[0.16em] text-[#ffd25a]">
                    {adminInitials}
                  </div>
                  <div>
                    <p className="text-lg font-black text-white">{adminName}</p>
                    <p className="text-sm text-[#b7beca]">{adminProfileCopy.roleValue}</p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9aa0ac]">
                    {adminProfileCopy.profileTitle}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#b7beca]">{adminProfileCopy.profileCopy}</p>
                </div>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-[20px] border border-white/8 bg-[#12131a] p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa0ac]">
                      {adminProfileCopy.nameLabel}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">{adminName}</p>
                  </div>
                  <div className="rounded-[20px] border border-white/8 bg-[#12131a] p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa0ac]">
                      {adminCopy.emailLabel}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">{adminEmail}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    <div className="rounded-[20px] border border-white/8 bg-[#12131a] p-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa0ac]">
                        {adminProfileCopy.roleLabel}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-white">{adminProfileCopy.roleValue}</p>
                    </div>
                    <div className="rounded-[20px] border border-white/8 bg-[#12131a] p-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa0ac]">
                        {adminProfileCopy.statusLabel}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#ffd25a]">
                        {adminProfileCopy.statusValue}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-[20px] border border-white/8 bg-[#12131a] p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa0ac]">
                      {adminProfileCopy.accessLabel}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">Hoje, 20:15</p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa0ac]">
                    {adminProfileCopy.permissionsTitle}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {adminProfileCopy.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="rounded-full border border-[#f0c000]/30 bg-[#1a1c24] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#b7beca]"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
                {paymentScreen.summary.map((item) => (
                  <div key={item.label} className="surface-card p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9aa0ac]">
                      {item.label}
                    </p>
                    <p className="mt-3 text-3xl font-black text-[#ffd25a]">{item.value}</p>
                  </div>
                ))}

                <div className="surface-card p-5 sm:col-span-3 xl:col-span-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9aa0ac]">
                    {paymentScreen.kicker}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#b7beca]">{adminCopy.helper}</p>
                </div>
              </div>
            </div>

            <div className="surface-card overflow-hidden p-0">
              <div className="border-b border-white/8 bg-[#12131a] px-5 py-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setAdminDashboardTab('payments')}
                    className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition ${
                      adminDashboardTab === 'payments'
                        ? 'border border-[#f0c000]/35 bg-[#f0c000]/14 text-[#ffd25a]'
                        : 'border border-white/10 bg-white/5 text-[#b7beca] hover:border-[#f0c000]/30 hover:text-white'
                    }`}
                  >
                    {adminCarsCopy.paymentsTab}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdminDashboardTab('cars')}
                    className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition ${
                      adminDashboardTab === 'cars'
                        ? 'border border-[#f0c000]/35 bg-[#f0c000]/14 text-[#ffd25a]'
                        : 'border border-white/10 bg-white/5 text-[#b7beca] hover:border-[#f0c000]/30 hover:text-white'
                    }`}
                  >
                    {adminCarsCopy.carsTab}
                  </button>
                </div>
              </div>

              {adminDashboardTab === 'payments' ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-0 text-left">
                    <thead className="bg-[#12131a]">
                      <tr>
                        {paymentScreen.headers.map((header) => (
                          <th
                            key={header}
                            className="border-b border-white/8 px-5 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#9aa0ac]"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {paymentScreen.rows.map((row) => (
                        <tr key={`${row.name}-${row.cpf}`} className="bg-[#101218] transition hover:bg-[#1a1c24]">
                          <td className="border-b border-white/6 px-5 py-4 text-sm font-semibold text-white">{row.name}</td>
                          <td className="border-b border-white/6 px-5 py-4 text-sm text-[#b7beca]">{row.cpf}</td>
                          <td className="border-b border-white/6 px-5 py-4 text-sm font-bold text-[#ffd25a]">{row.coupons}</td>
                          <td className="border-b border-white/6 px-5 py-4 text-sm text-[#b7beca]">{row.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9aa0ac]">{adminCarsCopy.draftBadge}</p>
                      <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">{adminCarsCopy.title}</h3>
                      <p className="mt-2 max-w-3xl text-sm leading-7 text-[#b7beca]">{adminCarsCopy.copy}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleAddAdminCar}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#f0c000]/35 hover:bg-[#1a1c24]"
                      >
                        {adminCarsCopy.addCar}
                      </button>
                      <button
                        type="button"
                        onClick={handleResetAdminCarsDraft}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#f0c000]/35 hover:bg-[#1a1c24]"
                      >
                        {adminCarsCopy.restore}
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveAdminCars}
                        className="rounded-full border border-[#f0c000]/25 bg-[#f0c000]/10 px-4 py-2 text-sm font-semibold text-[#ffd25a] transition hover:bg-[#f0c000]/16"
                      >
                        {adminCarsCopy.save}
                      </button>
                    </div>
                  </div>

                  {adminCarsNotice ? (
                    <p className="mt-4 rounded-[14px] border border-[#f0c000]/20 bg-[#f0c000]/8 px-4 py-3 text-sm font-semibold text-[#ffd25a]">
                      {adminCarsNotice}
                    </p>
                  ) : null}

                  {adminCarsDirty ? (
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#9aa0ac]">
                      {adminCarsCopy.draftBadge}
                    </p>
                  ) : null}

                  <div className="mt-5 grid gap-4">
                    {adminCarsDraft.map((car, index) => (
                      <article key={`admin-car-${index}`} className="rounded-[22px] border border-white/8 bg-[#12131a] p-4">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <p className="text-sm font-black uppercase tracking-[0.12em] text-white">
                            {adminCarsCopy.carsTab} #{index + 1}
                          </p>
                          <button
                            type="button"
                            onClick={() => handleRemoveAdminCar(index)}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:border-[#f0c000]/35"
                          >
                            {adminCarsCopy.remove}
                          </button>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                          <label className="block">
                            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#9aa0ac]">
                              {adminCarsCopy.titleLabel}
                            </span>
                            <input
                              type="text"
                              value={car.title ?? ''}
                              onChange={(event) => updateAdminCarField(index, 'title', event.target.value)}
                              className="w-full rounded-[14px] border border-white/10 bg-[#101218] px-3 py-2 text-sm text-white outline-none transition focus:border-[#f0c000]/45"
                            />
                          </label>

                          <label className="block">
                            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#9aa0ac]">
                              {adminCarsCopy.subtitleLabel}
                            </span>
                            <input
                              type="text"
                              value={car.subtitle ?? ''}
                              onChange={(event) => updateAdminCarField(index, 'subtitle', event.target.value)}
                              className="w-full rounded-[14px] border border-white/10 bg-[#101218] px-3 py-2 text-sm text-white outline-none transition focus:border-[#f0c000]/45"
                            />
                          </label>

                          <label className="block md:col-span-2">
                            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#9aa0ac]">
                              {adminCarsCopy.descriptionLabel}
                            </span>
                            <textarea
                              rows={3}
                              value={car.description ?? ''}
                              onChange={(event) => updateAdminCarField(index, 'description', event.target.value)}
                              className="w-full rounded-[14px] border border-white/10 bg-[#101218] px-3 py-2 text-sm text-white outline-none transition focus:border-[#f0c000]/45"
                            />
                          </label>

                          <label className="block md:col-span-2">
                            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#9aa0ac]">
                              {adminCarsCopy.imageLabel}
                            </span>
                            <input
                              type="text"
                              value={car.image ?? ''}
                              onChange={(event) => updateAdminCarField(index, 'image', event.target.value)}
                              className="w-full rounded-[14px] border border-white/10 bg-[#101218] px-3 py-2 text-sm text-white outline-none transition focus:border-[#f0c000]/45"
                            />
                          </label>

                          <label className="block">
                            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#9aa0ac]">
                              {adminCarsCopy.deadlineLabel}
                            </span>
                            <input
                              type="text"
                              value={car.deadline ?? ''}
                              onChange={(event) => updateAdminCarField(index, 'deadline', event.target.value)}
                              className="w-full rounded-[14px] border border-white/10 bg-[#101218] px-3 py-2 text-sm text-white outline-none transition focus:border-[#f0c000]/45"
                            />
                          </label>

                          <label className="block">
                            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#9aa0ac]">
                              {adminCarsCopy.priceLabel}
                            </span>
                            <input
                              type="text"
                              value={car.price ?? ''}
                              onChange={(event) => updateAdminCarField(index, 'price', event.target.value)}
                              className="w-full rounded-[14px] border border-white/10 bg-[#101218] px-3 py-2 text-sm text-white outline-none transition focus:border-[#f0c000]/45"
                            />
                          </label>

                          <label className="block">
                            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#9aa0ac]">
                              {adminCarsCopy.soldLabel}
                            </span>
                            <input
                              type="text"
                              value={car.sold ?? ''}
                              onChange={(event) => updateAdminCarField(index, 'sold', event.target.value)}
                              className="w-full rounded-[14px] border border-white/10 bg-[#101218] px-3 py-2 text-sm text-white outline-none transition focus:border-[#f0c000]/45"
                            />
                          </label>

                          <label className="block">
                            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#9aa0ac]">
                              {adminCarsCopy.progressLabel}
                            </span>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={car.progress ?? 0}
                              onChange={(event) => updateAdminCarField(index, 'progress', event.target.value)}
                              className="w-full rounded-[14px] border border-white/10 bg-[#101218] px-3 py-2 text-sm text-white outline-none transition focus:border-[#f0c000]/45"
                            />
                          </label>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'catalog') {
    return (
      <div className="luxury-shell text-slate-100">
        <div className="w-full">
          <header className="sticky top-0 z-40 border-b border-white/8 bg-[#0b0c10]/86 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen((current) => !current)}
                  className="internal-menu-btn inline-flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/15 bg-white/6 text-white xl:hidden"
                  aria-label={internalCopy.menuTitle}
                >
                  {isMobileMenuOpen ? 'x' : '='}
                </button>
                <button
                  type="button"
                  onClick={returnToLanding}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#f0c000]/35 hover:bg-[#1a1c24]"
                >
                  {catalogCopy.back}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full border border-[#f0c000]/28 bg-[#f0c000]/12 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#ffd25a]">
                  {catalogCopy.badge}
                </span>
                <label className="relative">
                  <select
                    value={locale}
                    onChange={(event) => handleLocaleChange(event.target.value)}
                    className="appearance-none rounded-full border border-white/10 bg-[#12131a] px-4 py-3 pr-10 text-sm font-semibold text-white outline-none transition focus:border-[#f0c000]/40"
                    aria-label={copy.actions.languageLabel}
                  >
                    {languageOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-[#12131a] text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs text-[#9aa0ac]"
                  >
                    v
                  </span>
                </label>
              </div>
            </div>
          </header>

          {isMobileMenuOpen ? (
            <div className="internal-menu-overlay fixed inset-0 z-50 bg-black/70 p-4 xl:hidden">
              <aside ref={mobileMenuRef} className="internal-menu-drawer ml-auto h-full w-full max-w-[340px] rounded-[24px] border border-white/10 bg-[#0b0f1a] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9aa0ac]">{internalCopy.menuTitle}</p>
                <div className="mt-6 flex flex-col gap-2">
                  <button type="button" onClick={returnToLanding} className="internal-menu-link">{internalCopy.menuHome}</button>
                  <button type="button" onClick={() => jumpToLandingSection('competitions')} className="internal-menu-link">{internalCopy.menuActive}</button>
                  <button type="button" onClick={() => openCatalogPage('cars')} className="internal-menu-link">{internalCopy.menuUpcoming}</button>
                  <button type="button" onClick={() => jumpToLandingSection('compliance')} className="internal-menu-link">{internalCopy.menuFaq}</button>
                  <button type="button" onClick={() => openAuthPage('login')} className="internal-menu-link">{internalCopy.menuLogin}</button>
                </div>
              </aside>
            </div>
          ) : null}

          <main className="section-band section-band--deep min-h-screen">
            <div className="section-shell">
              <section className="rounded-[26px] border border-white/8 bg-[#101218] p-4 shadow-[0_22px_80px_rgba(0,0,0,0.28)] sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <span className="section-kicker">{catalogCopy.badge}</span>
                    <h1 className="mt-3 text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
                      {catalogCopy.title}
                    </h1>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-[#b7beca]">{catalogCopy.copy}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_160px_140px] lg:min-w-[760px]">
                    <label className="block">
                      <input
                        type="text"
                        value={catalogSearch}
                        onChange={(event) => setCatalogSearch(event.target.value)}
                        placeholder={catalogCopy.searchPlaceholder}
                        className="w-full rounded-[18px] border border-white/10 bg-[#12131a] px-4 py-3 text-sm text-white outline-none transition focus:border-[#f0c000]/40"
                      />
                    </label>

                    <label className="block">
                      <select
                        value={catalogColor}
                        onChange={(event) => setCatalogColor(event.target.value)}
                        className="w-full appearance-none rounded-[18px] border border-white/10 bg-[#12131a] px-4 py-3 text-sm text-white outline-none transition focus:border-[#f0c000]/40"
                      >
                        {catalogColors.map((color) => (
                          <option key={color} value={color}>
                            {color === 'all' ? catalogCopy.allColors : color}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <select
                        value={catalogYear}
                        onChange={(event) => setCatalogYear(event.target.value)}
                        className="w-full appearance-none rounded-[18px] border border-white/10 bg-[#12131a] px-4 py-3 text-sm text-white outline-none transition focus:border-[#f0c000]/40"
                      >
                        {catalogYears.map((year) => (
                          <option key={year} value={year}>
                            {year === 'all' ? catalogCopy.allYears : year}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              </section>

              <section className="mt-5 grid gap-5 xl:grid-cols-[260px_minmax(0,1fr)]">
                <aside className="surface-card h-fit p-4 sm:p-5">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setCatalogCategory('cars')}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        catalogCategory === 'cars'
                          ? 'border border-[#f0c000]/30 bg-[#f0c000]/12 text-[#ffd25a]'
                          : 'border border-white/10 bg-white/5 text-white hover:border-[#f0c000]/30 hover:bg-[#1a1c24]'
                      }`}
                    >
                      {catalogCopy.carsTab}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCatalogCategory('houses')}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        catalogCategory === 'houses'
                          ? 'border border-[#f0c000]/30 bg-[#f0c000]/12 text-[#ffd25a]'
                          : 'border border-white/10 bg-white/5 text-white hover:border-[#f0c000]/30 hover:bg-[#1a1c24]'
                      }`}
                    >
                      {catalogCopy.housesTab}
                    </button>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div className="rounded-[20px] border border-white/8 bg-[#12131a] p-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9aa0ac]">
                        {catalogCopy.secondaryLabel}
                      </p>
                      <p className="mt-2 text-lg font-black text-white">
                        {catalogCategory === 'houses' ? catalogCopy.housesTab : catalogCopy.carsTab}
                      </p>
                    </div>
                    <div className="rounded-[20px] border border-white/8 bg-[#12131a] p-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9aa0ac]">
                        {catalogCopy.resultsLabel}
                      </p>
                      <p className="mt-2 text-lg font-black text-[#ffd25a]">{filteredCatalogCompetitions.length}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setCatalogSearch('')
                        setCatalogColor('all')
                        setCatalogYear('all')
                      }}
                      className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-[#f0c000]/35 hover:bg-[#1a1c24]"
                    >
                      {catalogCopy.clearFilters}
                    </button>
                  </div>
                </aside>

                {filteredCatalogCompetitions.length ? (
                  <div className="space-y-4">
                    {filteredCatalogCompetitions.map((competition) => (
                      <article
                        key={`${catalogCategory}-${competition.title}`}
                        className="overflow-hidden rounded-[24px] border border-white/8 bg-[#12131a] shadow-[0_16px_60px_rgba(0,0,0,0.24)]"
                      >
                        <div className="grid gap-0 md:grid-cols-[220px_minmax(0,1fr)_210px]">
                          <div className="relative h-full min-h-[180px] overflow-hidden">
                            <img
                              src={competition.image}
                              alt={competition.title}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,15,0.04)_0%,rgba(10,11,15,0.6)_100%)]" />
                            <div
                              className={`competition-deadline-badge competition-deadline-badge--${getDeadlineBadgeTone(competition.deadline)} absolute left-4 top-4`}
                            >
                              {getDeadlineBadgeLabel(competition.deadline, locale)}
                            </div>
                          </div>

                          <div className="p-4 sm:p-5">
                            <div className="flex flex-wrap items-center gap-2">
                              {competition.featured ? (
                                <span className="rounded-full bg-[#ffd25a] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#0b0c10]">
                                  {catalogCopy.featuredLabel}
                                </span>
                              ) : null}
                              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#b7beca]">
                                {catalogCategory === 'houses' ? catalogCopy.housesTab : catalogCopy.carsTab}
                              </span>
                            </div>

                            <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] text-white">
                              {competition.title}
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-[#9aa0ac]">{competition.subtitle}</p>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                              <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa0ac]">
                                  {catalogCopy.infoColor}
                                </p>
                                <p className="mt-1 text-sm font-semibold text-white">{competition.color}</p>
                              </div>
                              <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa0ac]">
                                  {catalogCopy.infoYear}
                                </p>
                                <p className="mt-1 text-sm font-semibold text-white">{competition.year}</p>
                              </div>
                              <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa0ac]">
                                  {catalogCopy.infoLocation}
                                </p>
                                <p className="mt-1 text-sm font-semibold text-white">{competition.location}</p>
                              </div>
                              <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa0ac]">
                                  {catalogCopy.infoTickets}
                                </p>
                                <p className="mt-1 text-sm font-semibold text-white">{competition.sold}</p>
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="flex items-center justify-between text-sm text-[#b7beca]">
                                <span>{competition.sold}</span>
                                <span>{competition.progress}%</span>
                              </div>
                              <div className="mt-2 h-2 rounded-full bg-white/8">
                                <div
                                  className="h-full rounded-full bg-[#f0c000]"
                                  style={{ width: `${competition.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col justify-between border-t border-white/8 bg-[#101218] p-4 md:border-l md:border-t-0">
                            <div>
                              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9aa0ac]">
                                {copy.currentDraw.priceLabel}
                              </p>
                              <p className="mt-2 text-3xl font-black text-[#ffd25a]">{competition.price}</p>
                            </div>

                            <div className="mt-4 space-y-3">
                              <button
                                type="button"
                                onClick={() => openProductPage(competition, catalogCategory)}
                                className="premium-button w-full justify-center"
                              >
                                {copy.actions.buyTickets}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  openProductPage(competition, catalogCategory)
                                  setView('checkout')
                                }}
                                className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-[#f0c000]/35 hover:bg-[#1a1c24]"
                              >
                                {copy.actions.enterCompetition}
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="surface-card p-8">
                    <h2 className="text-2xl font-black text-white">{catalogCopy.emptyTitle}</h2>
                    <p className="mt-3 text-sm leading-7 text-[#b7beca]">{catalogCopy.emptyCopy}</p>
                  </div>
                )}
              </section>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="luxury-shell text-slate-100">
      <div className="w-full">
        <header className="home-header sticky top-0 z-40 backdrop-blur-xl">
          <div className="home-header__inner mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8 xl:relative">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((current) => !current)}
                className="internal-menu-btn inline-flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/15 bg-white/6 text-white xl:hidden"
                aria-label={internalCopy.menuTitle}
              >
                {isMobileMenuOpen ? 'x' : '='}
              </button>
              <a href="#home" className="brand-lockup group flex items-center gap-3">
                <span className="brand-mark">
                  <img src="/web_car_draw.webp" alt="Web Car Draw logo" className="brand-mark__image" />
                </span>
                <span className="hidden flex-col leading-none sm:flex">
                  <span className="brand-wordmark">Web Car Draw</span>
                </span>
              </a>
            </div>

            <nav className="home-nav hidden items-center justify-center gap-8 text-[15px] font-semibold text-[#b7beca] xl:absolute xl:left-1/2 xl:flex xl:-translate-x-1/2">
              {navigationItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="home-header__actions flex items-center gap-2.5">
              <label className="hidden">
                <span className="language-picker__label">{copy.actions.languageLabel}</span>
                <span aria-hidden="true" className="language-picker__chevron" />
                <select
                  value={locale}
                  onChange={(event) => {
                    setLocale(event.target.value)
                    setActiveSlide(0)
                  }}
                  className="language-picker__select"
                  aria-label={copy.actions.languageLabel}
                >
                  {languageOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#12131a] text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={() => openCatalogPage('cars')}
                className="premium-button header-cta home-header__cta"
              >
                {copy.actions.participate}
              </button>
              <label className="hidden language-picker">
                <span className="language-picker__label">{copy.actions.languageLabel}</span>
                <span aria-hidden="true" className="language-picker__chevron" />
                <select
                  value={locale}
                  onChange={(event) => {
                    setLocale(event.target.value)
                    setActiveSlide(0)
                  }}
                  className="language-picker__select"
                  aria-label={copy.actions.languageLabel}
                >
                  {languageOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#12131a] text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <div ref={accountMenuRef} className="relative ml-3">
                <button
                  type="button"
                  onClick={() => setIsAccountMenuOpen((current) => !current)}
                  aria-expanded={isAccountMenuOpen}
                  aria-haspopup="menu"
                  aria-label={accountMenuCopy.menuLabel}
                  className="flex h-11 w-11 items-center justify-center rounded-full p-0 text-sm font-black leading-none text-[#ffd25a] transition hover:text-white"
                >
                  <span className="flex h-full w-full items-center justify-center text-center uppercase">
                    {adminInitials}
                  </span>
                </button>

                {isAccountMenuOpen ? (
                  <div className="absolute right-0 top-full mt-3 w-[260px] rounded-[24px] border border-white/10 bg-[#101218]/95 p-4 shadow-[0_22px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                    <div className="rounded-[20px] border border-white/8 bg-[#12131a] p-3">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9aa0ac]">
                        {copy.actions.languageLabel}
                      </p>
                      <div className="relative mt-3">
                        <select
                          value={locale}
                          onChange={(event) => handleLocaleChange(event.target.value)}
                          className="w-full appearance-none rounded-full border border-white/10 bg-[#1a1c24] px-4 py-3 pr-10 text-sm font-semibold text-white outline-none transition focus:border-[#f0c000]/40"
                          aria-label={copy.actions.languageLabel}
                        >
                          {languageOptions.map((option) => (
                            <option key={option.value} value={option.value} className="bg-[#12131a] text-white">
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs text-[#9aa0ac]"
                        >
                          v
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 grid gap-2">
                      {isAdminAuthenticated ? (
                        <>
                          <button
                            type="button"
                            onClick={openAdminProfile}
                            className="rounded-full border border-white/8 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white transition hover:border-[#f0c000]/35 hover:bg-[#1a1c24]"
                          >
                            {adminProfileCopy.profileButton}
                          </button>
                          <button
                            type="button"
                            onClick={handleAdminLogout}
                            className="rounded-full border border-[#f0c000]/20 bg-[#f0c000]/10 px-4 py-3 text-left text-sm font-semibold text-[#ffd25a] transition hover:bg-[#f0c000]/16"
                          >
                            {accountMenuCopy.logOut}
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={openAdminLogin}
                            className="rounded-full border border-white/8 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white transition hover:border-[#f0c000]/35 hover:bg-[#1a1c24]"
                          >
                            {copy.actions.signIn}
                          </button>
                          <button
                            type="button"
                            onClick={handleGuestSignOut}
                            className="rounded-full border border-[#f0c000]/20 bg-[#f0c000]/10 px-4 py-3 text-left text-sm font-semibold text-[#ffd25a] transition hover:bg-[#f0c000]/16"
                          >
                            {accountMenuCopy.guestSignOut}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="hidden">
            <div className="mx-auto flex max-w-7xl items-center justify-end gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={openAdminLogin}
                  className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:border-[#f0c000]/45 hover:bg-[#1a1c24]/90"
                >
                  Admin
                </button>
                <label className="language-picker language-picker--mobile">
                  <span className="language-picker__label">{copy.actions.languageLabel}</span>
                  <span aria-hidden="true" className="language-picker__chevron" />
                  <select
                    value={locale}
                    onChange={(event) => {
                      setLocale(event.target.value)
                      setActiveSlide(0)
                    }}
                    className="language-picker__select"
                    aria-label={copy.actions.languageLabel}
                  >
                    {languageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>
        </header>

        {isMobileMenuOpen ? (
          <div className="internal-menu-overlay fixed inset-0 z-50 bg-black/70 p-4 xl:hidden">
            <aside ref={mobileMenuRef} className="internal-menu-drawer ml-auto h-full w-full max-w-[340px] rounded-[24px] border border-white/10 bg-[#0b0f1a] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9aa0ac]">{internalCopy.menuTitle}</p>
              <div className="mt-6 flex flex-col gap-2">
                <button type="button" onClick={returnToLanding} className="internal-menu-link">{internalCopy.menuHome}</button>
                <button type="button" onClick={() => jumpToLandingSection('competitions')} className="internal-menu-link">{internalCopy.menuActive}</button>
                <button type="button" onClick={() => openCatalogPage('cars')} className="internal-menu-link">{internalCopy.menuUpcoming}</button>
                <button type="button" onClick={() => jumpToLandingSection('compliance')} className="internal-menu-link">{internalCopy.menuFaq}</button>
                <button type="button" onClick={() => openAuthPage('login')} className="internal-menu-link">{internalCopy.menuLogin}</button>
              </div>
            </aside>
          </div>
        ) : null}
        
        <main id="home">
          <section
            className="home-hero section-band section-band--hero hero-stage relative min-h-[74svh] overflow-hidden lg:min-h-[80svh]"
            onTouchStart={handleHeroTouchStart}
            onTouchEnd={handleHeroTouchEnd}
          >
            {copy.heroSlides.map((slide, index) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.title}
                loading={index === activeSlide ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index === activeSlide ? 'high' : 'low'}
                className={`hero-image hero-image-layer absolute inset-0 h-full w-full object-cover ${
                  index === activeSlide ? 'hero-image-layer--active' : ''
                }`}
              />
            ))}
            {showMockHeroVideo ? (
              <video
                className="hero-video-layer absolute inset-0 h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={mockHeroVideo.poster}
                aria-label={mockHeroVideo.title}
                onError={() => setShowMockHeroVideo(false)}
              >
                <source src={mockHeroVideo.source} type="video/mp4" />
              </video>
            ) : null}
            <div className="hero-vignette absolute inset-0" />
            <div className="hero-atmosphere absolute inset-0" />
            <div className="noise-overlay absolute inset-0 opacity-35" />

            <div className="hero-shell home-hero-shell relative flex min-h-[74svh] flex-col justify-start pb-4 pt-6 lg:min-h-[80svh] lg:pb-4 lg:pt-8">
              <div className="hero-main-layout home-hero-layout relative z-10 grid flex-1 items-start gap-6 pt-2 pb-6 sm:pt-4 sm:pb-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-8 lg:pt-6 lg:pb-8">
                <div className="hero-copy-stage relative max-w-[42rem]">
                  <p className="hero-shadow-title">{copy.currentDraw.title}</p>
                  <div key={currentSlide.id} className="hero-copy-content relative z-10">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="section-kicker border-[#f0c000]/34 bg-[#f0c000]/12 shadow-[0_0_30px_rgba(201,162,74,0.08)]">
                        {currentSlide.badge}
                      </span>
                      <span className="inline-flex rounded-full border border-white/10 bg-black/28 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#d7dee7] backdrop-blur-sm">
                        {copy.currentDraw.eyebrow}
                      </span>
                    </div>
                    <h1 className="hero-display mt-4 max-w-[34rem] text-[#f5f7fb]">
                      {currentSlide.title}
                    </h1>
                    <p className="mt-3 max-w-[30rem] text-[0.92rem] leading-6 text-[#d7dee7] sm:text-[0.98rem] sm:leading-6">
                      {currentSlide.subtitle}
                    </p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <button
                        type="button"
                        onClick={() => openCatalogPage('cars')}
                        className="premium-button hero-primary-cta justify-center sm:min-w-[18rem]"
                      >
                        <span>{copy.actions.explore}</span>
                        <span aria-hidden="true" className="premium-button__icon">{'>'}</span>
                      </button>
                      <a
                        href="#platform"
                        className="hero-secondary-cta rounded-full px-7 py-4 text-center text-sm font-semibold text-white"
                      >
                        {copy.actions.viewScope}
                      </a>
                    </div>
                    <div className="hero-inline-meta mt-4 flex flex-wrap gap-x-6 gap-y-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9aa0ac]">
                          {copy.currentDraw.priceLabel}
                        </p>
                        <p className="mt-2 text-xl font-black text-[#ffd25a]">{currentSlide.price}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9aa0ac]">
                          {copy.currentDraw.countdownLabel}
                        </p>
                        <p className="mt-2 text-xl font-black text-white">{currentSlide.countdown}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9aa0ac]">
                          {copy.currentDraw.entriesLabel}
                        </p>
                        <p className="mt-2 text-lg font-extrabold text-white">{currentSlide.tickets}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hero-spotlight-card hidden h-fit rounded-[30px] p-6 lg:block">
                  <div key={`${currentSlide.id}-spotlight`} className="hero-copy-content">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#ffd25a]">{copy.currentDraw.eyebrow}</p>
                  <h2 className="mt-3 text-[2rem] font-black leading-[0.95] tracking-[-0.05em] text-white">
                    {copy.currentDraw.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#b7beca]">{copy.currentDraw.helper}</p>
                  <div className="hero-side-details mt-6 space-y-4">
                    <div className="hero-side-row">
                      <span>{copy.currentDraw.priceLabel}</span>
                      <strong>{currentSlide.price}</strong>
                    </div>
                    <div className="hero-side-row">
                      <span>{copy.currentDraw.countdownLabel}</span>
                      <strong>{currentSlide.countdown}</strong>
                    </div>
                    <div className="hero-side-row">
                      <span>{copy.currentDraw.entriesLabel}</span>
                      <strong>{currentSlide.tickets}</strong>
                    </div>
                  </div>
                  </div>
                </div>
              </div>

              <div className="hidden mt-8 flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="rounded-full border border-white/8 bg-black/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b7beca]">
                    Carousel
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goToPreviousSlide}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white transition hover:border-[#f0c000]/45 hover:bg-[#1a1c24]/90"
                      aria-label="Previous slide"
                    >
                      â€¹
                    </button>
                    <button
                      type="button"
                      onClick={goToNextSlide}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white transition hover:border-[#f0c000]/45 hover:bg-[#1a1c24]/90"
                      aria-label="Next slide"
                    >
                      â€º
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
                          className="grid w-full gap-4 rounded-[22px] border border-white/8 bg-[#12131a]/82 p-4 text-left transition hover:border-[#f0c000]/28 hover:bg-[#12131a]"
                        >
                          <div
                            className="h-24 rounded-[16px] bg-cover bg-center"
                            style={{ backgroundImage: `linear-gradient(180deg, rgba(10,11,15,0.1), rgba(10,11,15,0.42)), url(${slide.image})` }}
                          />
                          <div className="flex items-end justify-between gap-4">
                            <div>
                              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9aa0ac]">
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
                                      ? 'w-8 bg-[#f0c000]'
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

              <div className="relative z-20 flex justify-center">
                <div className="hero-carousel-dots flex items-center gap-2 rounded-full px-3 py-2">
                  {copy.heroSlides.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        index === activeSlide ? 'w-9 bg-[#f0c000]' : 'w-2.5 bg-white/35 hover:bg-white/60'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="metrics-shell hero-metrics mt-4 lg:mt-5">
                <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
                  {copy.metrics.map((metric) => (
                    <div key={metric.label} className="hero-metric-cell">
                      <p className="text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">{metric.value}</p>
                      <p className="mt-3 text-sm font-bold uppercase tracking-[0.22em] text-[#ffd25a]">{metric.label}</p>
                      <p className="mt-2 text-sm leading-6 text-[#9aa0ac]">{metric.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-countdown-panel mt-8 lg:mt-20">
                <p className="hero-countdown-panel__title">{copy.currentDraw.countdownLabel}</p>
                <div className="hero-countdown-grid">
                  {heroCountdownUnits.map((unit) => (
                    <div key={unit.label} className="hero-countdown-cell">
                      <span className="hero-countdown-value">{unit.value}</span>
                      <span className="hero-countdown-label">{unit.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="competitions" className="home-competitions section-band section-band--soft">
            <div className="section-shell">
            <div className="flex flex-col gap-5">
              <div className="max-w-3xl">
                <span className="section-kicker">{copy.sections.competitions.kicker}</span>
                <h2 className="section-title">{copy.sections.competitions.title}</h2>
                <p className="section-copy">{copy.sections.competitions.copy}</p>
              </div>
            </div>

            <div className="home-competitions-grid mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {homeCompetitions.map((competition, index) => (
                <article
                  key={competition.title}
                  className={`home-competition-card flex h-full flex-col overflow-hidden rounded-[26px] border border-white/8 bg-[#12131a] shadow-[0_18px_70px_rgba(0,0,0,0.32)] transition hover:-translate-y-1 hover:border-[#f0c000]/28 ${
                    index === 0 ? 'md:col-span-2 xl:col-span-2' : ''
                  }`}
                >
                  <div className={`relative overflow-hidden ${index === 0 ? 'h-80 md:h-[22rem]' : 'h-72'}`}>
                    <img
                      src={competition.image}
                      alt={competition.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,15,0.06)_0%,rgba(10,11,15,0.1)_30%,rgba(10,11,15,0.85)_100%)]" />
                    <div
                      className={`competition-deadline-badge competition-deadline-badge--${getDeadlineBadgeTone(competition.deadline)} absolute left-4 top-4 sm:left-5 sm:top-5`}
                    >
                      {getDeadlineBadgeLabel(competition.deadline, locale)}
                    </div>
                    <div className="absolute bottom-5 left-5 rounded-full bg-[#ffd25a] px-4 py-2 text-sm font-black text-[#0b0c10] shadow-[0_14px_40px_rgba(201,162,74,0.28)]">
                      {competition.price}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-h-[84px]">
                        <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-white">{competition.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm text-[#9aa0ac]">{competition.subtitle}</p>
                      </div>
                      <span className="rounded-full border border-[#f0c000]/30 bg-[#1a1c24] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#b7beca]">
                        {copy.badges.euDraw}
                      </span>
                    </div>

                    <div className="mt-auto pt-6">
                      <div className="flex items-center justify-between text-sm text-[#b7beca]">
                        <span>{competition.sold}</span>
                        <span>{competition.progress}%</span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-white/8">
                        <div
                          className="h-full rounded-full bg-[#f0c000]"
                          style={{ width: `${competition.progress}%` }}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => openProductPage(competition, 'cars')}
                      className="premium-button mt-6 w-full justify-center"
                    >
                      {copy.actions.enterCompetition}
                    </button>
                  </div>
                </article>
              ))}
            </div>
            </div>
          </section>
          
          <section id="how-it-works" className="home-info section-band section-band--tight section-band--borderless">
            <div className="section-shell">
            <div className="mb-6">
              <span className="section-kicker">{copy.sections.howItWorks.kicker}</span>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {copy.howItWorks.map((item) => (
                <article key={item.step} className="surface-card p-6">
                  <span className="inline-flex rounded-full border border-[#f0c000]/30 bg-[#1a1c24] px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#b7beca]">
                    Step {item.step}
                  </span>
                  <h3 className="mt-5 text-2xl font-extrabold tracking-[-0.04em] text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#9aa0ac]">{item.text}</p>
                </article>
              ))}
            </div>
            </div>
          </section>

          <section id="winners" className="home-winners section-band section-band--deep">
            <div className="section-shell">
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="surface-card overflow-hidden p-0">
                <div className="grid lg:grid-cols-[1fr_0.95fr]">
                  <div className="relative min-h-[360px]">
                    <img
                      src="/cars/hero-2.jpg"
                      alt="Premium car showcase"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,15,0.02),rgba(10,11,15,0.7))]" />
                  </div>
                  <div className="p-6 lg:p-8">
                    <span className="section-kicker">{copy.sections.winners.kicker}</span>
                    <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">{copy.sections.winners.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-[#b7beca]">{copy.sections.winners.copy}</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {copy.sections.winners.stats.map((stat) => (
                        <div key={stat.label} className="rounded-[22px] border border-white/8 bg-[#12131a] p-5">
                          <p className="text-3xl font-black text-[#ffd25a]">{stat.value}</p>
                          <p className="mt-2 text-sm text-[#9aa0ac]">{stat.label}</p>
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
                        <p className="mt-1 text-sm text-[#ffd25a]">{winner.prize}</p>
                      </div>
                      <span className="rounded-full border border-white/8 bg-white/4 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#b7beca]">
                        {winner.stat}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[#9aa0ac]">"{winner.quote}"</p>
                  </article>
                ))}
              </div>
            </div>
            </div>
          </section>

          <section id="platform" className="home-platform section-band section-band--soft">
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
                    <span className="h-3 w-3 rounded-full bg-[#f0c000] shadow-[0_0_18px_rgba(201,162,74,0.55)]" />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#9aa0ac]">{module.text}</p>
                </article>
              ))}
            </div>
            </div>
          </section>

          <section id="compliance" className="home-compliance section-band section-band--tight">
            <div className="section-shell">
            <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
              <div className="surface-card p-6">
                <span className="section-kicker">{copy.sections.compliance.kicker}</span>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">{copy.sections.compliance.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#b7beca]">{copy.sections.compliance.copy}</p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {copy.complianceItems.map((item) => (
                  <div key={item} className="rounded-[24px] border border-white/8 bg-[#12131a] p-5">
                    <p className="text-base font-bold leading-7 text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </section>

          <section className="home-promo section-band section-band--deep">
            <div className="section-shell">
            <div className="overflow-hidden rounded-[28px] border border-[#e11d2e]/25 bg-[linear-gradient(135deg,rgba(14,18,26,0.98)_0%,rgba(10,11,15,0.94)_42%,rgba(18,22,30,0.96)_100%)] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <span className="section-kicker">{copy.sections.cta.kicker}</span>
                  <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">{copy.sections.cta.title}</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[#b7beca]">{copy.sections.cta.copy}</p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                  <button
                    type="button"
                    onClick={() => openCatalogPage('cars')}
                    className="premium-button justify-center"
                  >
                    {copy.actions.launchConcept}
                  </button>
                  <button className="rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[#f0c000]/45 hover:bg-[#1a1c24]/90">
                    {copy.actions.reviewModules}
                  </button>
                </div>
              </div>
            </div>
            </div>
          </section>
        </main>

        <footer className="home-footer relative border-t border-[#e11d2e]/55 bg-[linear-gradient(180deg,#0b0c10_0%,#12131a_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(255,245,205,0.28),transparent_22%),radial-gradient(circle_at_90%_50%,rgba(168,120,8,0.16),transparent_24%)]" />
          <div className="home-footer__grid section-shell relative grid gap-8 py-12 text-sm text-[#b7beca] md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="brand-mark brand-mark--footer">
                  <img src="/web_car_draw.webp" alt="Web Car Draw logo" className="brand-mark__image" />
                </span>
                <p className="brand-wordmark">Web Car Draw</p>
              </div>
              <p className="mt-4 leading-7">{copy.footer.intro}</p>
            </div>

            {copy.footer.columns.map((column) => (
              <div key={column.title}>
                <p className="font-bold uppercase tracking-[0.22em] text-[#ffd25a]">{column.title}</p>
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








