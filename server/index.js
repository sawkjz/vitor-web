import 'dotenv/config'
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import express from 'express'
import multer from 'multer'
import { createClient } from '@supabase/supabase-js'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = Number(process.env.API_PORT || 8787)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const SUPABASE_STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'cars'
const ADMIN_EMAIL_ALLOWLIST = (process.env.ADMIN_EMAIL_ALLOWLIST || '')
  .split(',')
  .map((item) => item.trim().toLowerCase())
  .filter(Boolean)
const STRIPE_SECRET_KEY = `${process.env.STRIPE_SECRET_KEY || ''}`.trim()
const STRIPE_WEBHOOK_SECRET = `${process.env.STRIPE_WEBHOOK_SECRET || ''}`.trim()
const STORE_CONFIG_PATH = path.join(__dirname, 'data', 'store-config.json')

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing Supabase environment variables.')
}

const supabaseAuthClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const supabaseAdminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const defaultStoreConfig = {
  siteName: 'Black Ticket Club',
  homeTitle: 'Compre bilhetes dos carros em destaque',
  homeSubtitle: 'Cada carro possui sua propria pagina de venda e o admin escolhe quais entram na home.',
  homeDescription:
    'O painel administrativo controla valor, fotos, descricao, destaque da home e preparacao da integracao com Stripe para cada carro/sorteio.',
  campaigns: [
    {
      id: 'mustang-black-2026',
      slug: 'mustang-black-2026',
      badge: 'Destaque principal',
      title: 'Sorteio oficial do Mustang Black Edition',
      carName: 'Ford Mustang Black Edition 5.0 V8',
      shortDescription: 'Mustang em destaque com checkout preparado para Stripe e compra por bilhetes.',
      description:
        'Pagina do carro com galeria, contagem, detalhes do sorteio e fluxo pronto para Stripe. O admin consegue editar textos, valor, fotos e regras da campanha.',
      status: 'active',
      featuredOnHome: true,
      ticketPrice: 25,
      currency: 'BRL',
      totalTickets: 5000,
      soldTickets: 1384,
      maxTicketsPerOrder: 100,
      drawDate: '2026-06-12T21:00:00.000Z',
      heroImage: '/cars/hero-1.jpg',
      gallery: [
        '/cars/hero-1.jpg',
        '/cars/hero-2.jpg',
        '/cars/hero-3.jpg',
        '/cars/card-1.jpg',
      ],
      highlights: [
        'Entrega documentada para o vencedor',
        'Bilhetes com numeracao rastreavel',
        'Checkout preparado para Stripe',
      ],
      stripe: {
        enabled: false,
        priceId: '',
        productName: 'Bilhete Mustang Black Edition',
        successUrl: 'http://localhost:5173/?checkout=success',
        cancelUrl: 'http://localhost:5173/?checkout=cancel',
      },
    },
    {
      id: 'g-class-shadow-2026',
      slug: 'g-class-shadow-2026',
      badge: 'SUV premium',
      title: 'Sorteio da G-Class Shadow Edition',
      carName: 'Mercedes G-Class Shadow Edition',
      shortDescription: 'SUV premium com fotos, descricao longa e controle de destaque na home.',
      description:
        'Use este sorteio como segundo carro da home ou mantenha apenas como pagina individual. Todo o conteudo pode ser alterado pelo painel admin.',
      status: 'active',
      featuredOnHome: true,
      ticketPrice: 35,
      currency: 'BRL',
      totalTickets: 8000,
      soldTickets: 2120,
      maxTicketsPerOrder: 80,
      drawDate: '2026-07-05T20:00:00.000Z',
      heroImage: '/cars/hero-3.jpg',
      gallery: [
        '/cars/hero-3.jpg',
        '/cars/hero-2.jpg',
        '/cars/hero-1.jpg',
      ],
      highlights: [
        'Pagina individual do carro',
        'Destaque opcional na home',
        'Preparado para Stripe Checkout',
      ],
      stripe: {
        enabled: false,
        priceId: '',
        productName: 'Bilhete G-Class Shadow Edition',
        successUrl: 'http://localhost:5173/?checkout=success',
        cancelUrl: 'http://localhost:5173/?checkout=cancel',
      },
    },
  ],
  updatedAt: new Date().toISOString(),
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
})

const toApiError = (status, message, details = undefined) => ({ status, message, details })

const normalizeEmail = (email) => `${email || ''}`.trim().toLowerCase()

const canUseEmailAllowlist = (email) => ADMIN_EMAIL_ALLOWLIST.includes(normalizeEmail(email))

const getBooleanMetadataFlag = (user) => (
  user?.app_metadata?.role === 'admin'
  || user?.user_metadata?.role === 'admin'
  || user?.user_metadata?.is_admin === true
)

const toPositiveInteger = (value, fallback = 0) => {
  const parsed = Number.parseInt(`${value ?? ''}`, 10)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback
}

const toPositiveNumber = (value, fallback = 0) => {
  const parsed = Number.parseFloat(`${value ?? ''}`.replace(',', '.'))
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback
}

const uniqueTrimmedList = (items = [], fallback = []) => {
  const source = Array.isArray(items) ? items : fallback
  return [...new Set(source.map((item) => `${item || ''}`.trim()).filter(Boolean))]
}

const checkAdminByTable = async (email) => {
  const normalized = normalizeEmail(email)
  if (!normalized) {
    return false
  }

  const { data, error } = await supabaseAdminClient
    .from('admin_users')
    .select('id, is_active')
    .eq('email', normalized)
    .eq('is_active', true)
    .limit(1)
    .maybeSingle()

  if (error) {
    return false
  }

  return Boolean(data?.id)
}

const isAdminUser = async (user) => {
  if (!user?.email) {
    return false
  }

  if (canUseEmailAllowlist(user.email) || getBooleanMetadataFlag(user)) {
    return true
  }

  return checkAdminByTable(user.email)
}

const getBearerToken = (req) => {
  const authHeader = req.headers.authorization || ''
  return authHeader.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length).trim()
    : ''
}

const getAdminUserFromToken = async (token) => {
  const { data, error } = await supabaseAdminClient.auth.getUser(token)

  if (error || !data?.user) {
    throw toApiError(401, error?.message || 'Token invalido.')
  }

  const isAdmin = await isAdminUser(data.user)
  if (!isAdmin) {
    throw toApiError(403, 'Usuario sem permissao de admin.')
  }

  return data.user
}

const ensureStoreConfigFile = async () => {
  const directory = path.dirname(STORE_CONFIG_PATH)
  await fs.mkdir(directory, { recursive: true })

  try {
    await fs.access(STORE_CONFIG_PATH)
  } catch {
    await fs.writeFile(STORE_CONFIG_PATH, JSON.stringify(defaultStoreConfig, null, 2))
  }
}

function normalizeCampaign(input = {}, index = 0) {
  const fallback = defaultStoreConfig.campaigns[index] ?? defaultStoreConfig.campaigns[0]
  const gallery = uniqueTrimmedList(input.gallery, fallback.gallery).slice(0, 8)
  const highlights = uniqueTrimmedList(input.highlights, fallback.highlights).slice(0, 6)
  const drawDate = new Date(input.drawDate || fallback.drawDate)
  const safeDrawDate = Number.isNaN(drawDate.getTime())
    ? fallback.drawDate
    : drawDate.toISOString()

  return {
    id: `${input.id || fallback.id || crypto.randomUUID()}`.trim(),
    slug: `${input.slug || input.id || fallback.slug || `campaign-${index + 1}`}`.trim(),
    badge: `${input.badge || fallback.badge || 'Novo destaque'}`.trim(),
    title: `${input.title || fallback.title}`.trim(),
    carName: `${input.carName || fallback.carName}`.trim(),
    shortDescription: `${input.shortDescription || fallback.shortDescription}`.trim(),
    description: `${input.description || fallback.description}`.trim(),
    status: ['active', 'draft', 'closed'].includes(input.status) ? input.status : fallback.status,
    featuredOnHome: Boolean(input.featuredOnHome),
    ticketPrice: toPositiveNumber(input.ticketPrice, fallback.ticketPrice),
    currency: `${input.currency || fallback.currency}`.trim().toUpperCase() || 'BRL',
    totalTickets: Math.max(1, toPositiveInteger(input.totalTickets, fallback.totalTickets)),
    soldTickets: Math.min(
      Math.max(1, toPositiveInteger(input.totalTickets, fallback.totalTickets)),
      toPositiveInteger(input.soldTickets, fallback.soldTickets),
    ),
    maxTicketsPerOrder: Math.max(1, toPositiveInteger(input.maxTicketsPerOrder, fallback.maxTicketsPerOrder)),
    drawDate: safeDrawDate,
    heroImage: `${input.heroImage || gallery[0] || fallback.heroImage}`.trim(),
    gallery: gallery.length ? gallery : fallback.gallery,
    highlights: highlights.length ? highlights : fallback.highlights,
    stripe: {
      enabled: Boolean(input?.stripe?.enabled),
      priceId: `${input?.stripe?.priceId || ''}`.trim(),
      productName: `${input?.stripe?.productName || fallback.stripe.productName}`.trim(),
      successUrl: `${input?.stripe?.successUrl || fallback.stripe.successUrl}`.trim(),
      cancelUrl: `${input?.stripe?.cancelUrl || fallback.stripe.cancelUrl}`.trim(),
    },
  }
}

function normalizeStoreConfig(input = {}) {
  const campaignsInput = Array.isArray(input.campaigns) && input.campaigns.length
    ? input.campaigns
    : defaultStoreConfig.campaigns

  return {
    siteName: `${input.siteName || defaultStoreConfig.siteName}`.trim(),
    homeTitle: `${input.homeTitle || defaultStoreConfig.homeTitle}`.trim(),
    homeSubtitle: `${input.homeSubtitle || defaultStoreConfig.homeSubtitle}`.trim(),
    homeDescription: `${input.homeDescription || defaultStoreConfig.homeDescription}`.trim(),
    campaigns: campaignsInput.map((campaign, index) => normalizeCampaign(campaign, index)),
    updatedAt: new Date().toISOString(),
  }
}

const readStoreConfig = async () => {
  await ensureStoreConfigFile()
  const raw = await fs.readFile(STORE_CONFIG_PATH, 'utf8')
  const parsed = JSON.parse(raw)
  return normalizeStoreConfig(parsed)
}

const saveStoreConfig = async (config) => {
  const normalized = normalizeStoreConfig(config)
  await ensureStoreConfigFile()
  await fs.writeFile(STORE_CONFIG_PATH, JSON.stringify(normalized, null, 2))
  return normalized
}

const buildStripeStatus = (campaign) => ({
  enabled: Boolean(campaign?.stripe?.enabled),
  ready: Boolean(campaign?.stripe?.enabled && campaign?.stripe?.priceId && STRIPE_SECRET_KEY),
  priceIdConfigured: Boolean(campaign?.stripe?.priceId),
  secretConfigured: Boolean(STRIPE_SECRET_KEY),
  webhookConfigured: Boolean(STRIPE_WEBHOOK_SECRET),
})

const toPublicCampaign = (campaign) => ({
  ...campaign,
  stripeStatus: buildStripeStatus(campaign),
})

const toPublicStorefront = (config) => {
  const publicCampaigns = config.campaigns
    .filter((campaign) => campaign.status !== 'draft')
    .map(toPublicCampaign)

  return {
    siteName: config.siteName,
    homeTitle: config.homeTitle,
    homeSubtitle: config.homeSubtitle,
    homeDescription: config.homeDescription,
    campaigns: publicCampaigns,
    featuredCampaigns: publicCampaigns.filter((campaign) => campaign.featuredOnHome),
    updatedAt: config.updatedAt,
  }
}

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true })
})

app.get('/api/storefront', async (_req, res) => {
  try {
    const config = await readStoreConfig()
    res.status(200).json({ storefront: toPublicStorefront(config) })
  } catch (error) {
    res.status(500).json({
      message: error?.message || 'Erro ao carregar a home.',
      details: error?.details || null,
    })
  }
})

app.get('/api/campaigns/:slug', async (req, res) => {
  try {
    const config = await readStoreConfig()
    const campaign = config.campaigns.find(
      (item) => item.slug === req.params.slug && item.status !== 'draft',
    )

    if (!campaign) {
      throw toApiError(404, 'Carro do sorteio nao encontrado.')
    }

    res.status(200).json({ campaign: toPublicCampaign(campaign) })
  } catch (error) {
    const status = error?.status || 500
    res.status(status).json({
      message: error?.message || 'Erro ao carregar pagina do carro.',
      details: error?.details || null,
    })
  }
})

app.post('/api/admin/login', async (req, res) => {
  try {
    const email = `${req.body?.email || ''}`.trim()
    const password = `${req.body?.password || ''}`

    if (!email || !password) {
      throw toApiError(400, 'Email e senha sao obrigatorios.')
    }

    const { data, error } = await supabaseAuthClient.auth.signInWithPassword({ email, password })

    if (error || !data?.user || !data?.session) {
      throw toApiError(401, error?.message || 'Falha no login.')
    }

    const isAdmin = await isAdminUser(data.user)
    if (!isAdmin) {
      await supabaseAuthClient.auth.signOut()
      throw toApiError(403, 'Usuario autenticado, mas sem permissao de admin.')
    }

    res.status(200).json({
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      session: {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at,
      },
    })
  } catch (error) {
    const status = error?.status || 500
    res.status(status).json({
      message: error?.message || 'Erro interno no login admin.',
      details: error?.details || null,
    })
  }
})

app.get('/api/admin/me', async (req, res) => {
  try {
    const token = getBearerToken(req)

    if (!token) {
      throw toApiError(401, 'Token de acesso ausente.')
    }

    const user = await getAdminUserFromToken(token)

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
      },
    })
  } catch (error) {
    const status = error?.status || 500
    res.status(status).json({
      message: error?.message || 'Erro ao validar sessao admin.',
      details: error?.details || null,
    })
  }
})

app.get('/api/admin/store-config', async (req, res) => {
  try {
    const token = getBearerToken(req)
    if (!token) {
      throw toApiError(401, 'Token de acesso ausente.')
    }

    await getAdminUserFromToken(token)
    const config = await readStoreConfig()

    res.status(200).json({
      config: {
        ...config,
        campaigns: config.campaigns.map(toPublicCampaign),
      },
    })
  } catch (error) {
    const status = error?.status || 500
    res.status(status).json({
      message: error?.message || 'Erro ao carregar configuracao do admin.',
      details: error?.details || null,
    })
  }
})

app.put('/api/admin/store-config', async (req, res) => {
  try {
    const token = getBearerToken(req)
    if (!token) {
      throw toApiError(401, 'Token de acesso ausente.')
    }

    await getAdminUserFromToken(token)
    const saved = await saveStoreConfig(req.body)

    res.status(200).json({
      message: 'Configuracao salva com sucesso.',
      config: {
        ...saved,
        campaigns: saved.campaigns.map(toPublicCampaign),
      },
    })
  } catch (error) {
    const status = error?.status || 500
    res.status(status).json({
      message: error?.message || 'Erro ao salvar configuracao.',
      details: error?.details || null,
    })
  }
})

app.post('/api/admin/upload-image', upload.single('file'), async (req, res) => {
  try {
    const token = getBearerToken(req)
    if (!token) {
      throw toApiError(401, 'Token de acesso ausente.')
    }

    await getAdminUserFromToken(token)

    if (!req.file) {
      throw toApiError(400, 'Nenhum arquivo recebido.')
    }

    if (!req.file.mimetype?.startsWith('image/')) {
      throw toApiError(400, 'Formato invalido. Envie apenas imagem.')
    }

    const extensionFromName = req.file.originalname?.split('.').pop()?.toLowerCase()
    const extension = extensionFromName || req.file.mimetype.split('/').pop() || 'jpg'
    const folderRaw = `${req.body?.folder || 'admin-cars'}`
    const folder = folderRaw.replace(/[^a-zA-Z0-9/_-]/g, '') || 'admin-cars'
    const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`
    const filePath = `${folder}/${fileName}`

    const { error: uploadError } = await supabaseAdminClient.storage
      .from(SUPABASE_STORAGE_BUCKET)
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      })

    if (uploadError) {
      throw toApiError(500, uploadError.message)
    }

    const { data } = supabaseAdminClient.storage
      .from(SUPABASE_STORAGE_BUCKET)
      .getPublicUrl(filePath)

    res.status(200).json({
      bucket: SUPABASE_STORAGE_BUCKET,
      path: filePath,
      publicUrl: data?.publicUrl || '',
    })
  } catch (error) {
    const status = error?.status || 500
    res.status(status).json({
      message: error?.message || 'Erro ao anexar imagem no bucket.',
      details: error?.details || null,
    })
  }
})

app.post('/api/checkout/intent', async (req, res) => {
  try {
    const config = await readStoreConfig()
    const slug = `${req.body?.slug || ''}`.trim()
    const campaign = config.campaigns.find((item) => item.slug === slug)

    if (!campaign) {
      throw toApiError(404, 'Carro do sorteio nao encontrado.')
    }

    if (campaign.status !== 'active') {
      throw toApiError(400, 'Este carro nao esta aceitando compras no momento.')
    }

    const quantity = Math.max(1, toPositiveInteger(req.body?.quantity, 1))
    if (quantity > campaign.maxTicketsPerOrder) {
      throw toApiError(400, `Limite por pedido: ${campaign.maxTicketsPerOrder} bilhetes.`)
    }

    const customerName = `${req.body?.name || ''}`.trim()
    const customerEmail = `${req.body?.email || ''}`.trim()

    if (!customerName || !customerEmail) {
      throw toApiError(400, 'Nome e email sao obrigatorios para gerar a intencao de checkout.')
    }

    const amount = Number((campaign.ticketPrice * quantity).toFixed(2))
    const stripeStatus = buildStripeStatus(campaign)

    res.status(200).json({
      checkout: {
        provider: 'stripe',
        mode: stripeStatus.ready ? 'stripe_ready' : 'stripe_pending',
        status: stripeStatus.ready ? 'ready' : 'configuration_required',
        message: stripeStatus.ready
          ? 'Configuracao pronta para conectar a criacao da sessao Stripe Checkout.'
          : 'Fluxo preparado. Falta concluir as credenciais/price_id da Stripe para checkout real.',
        slug: campaign.slug,
        quantity,
        amount,
        currency: campaign.currency,
        customer: {
          name: customerName,
          email: customerEmail,
        },
        stripe: stripeStatus,
      },
    })
  } catch (error) {
    const status = error?.status || 500
    res.status(status).json({
      message: error?.message || 'Erro ao preparar checkout.',
      details: error?.details || null,
    })
  }
})

app.listen(PORT, async () => {
  await ensureStoreConfigFile()
  console.log(`API admin online em http://localhost:${PORT}`)
})
