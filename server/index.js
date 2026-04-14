import 'dotenv/config'
import crypto from 'node:crypto'
import cors from 'cors'
import express from 'express'
import multer from 'multer'
import { createClient } from '@supabase/supabase-js'

const app = express()

const PORT = Number(process.env.API_PORT || 8787)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const SUPABASE_STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'cars'
const ADMIN_EMAIL_ALLOWLIST = (process.env.ADMIN_EMAIL_ALLOWLIST || '')
  .split(',')
  .map((item) => item.trim().toLowerCase())
  .filter(Boolean)

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing Supabase environment variables.')
}

const supabaseAuthClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const supabaseAdminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const toApiError = (status, message, details = undefined) => ({ status, message, details })

const normalizeEmail = (email) => `${email || ''}`.trim().toLowerCase()

const canUseEmailAllowlist = (email) => ADMIN_EMAIL_ALLOWLIST.includes(normalizeEmail(email))

const getBooleanMetadataFlag = (user) => (
  user?.app_metadata?.role === 'admin'
  || user?.user_metadata?.role === 'admin'
  || user?.user_metadata?.is_admin === true
)

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

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
})

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

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true })
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

app.listen(PORT, () => {
  console.log(`API admin online em http://localhost:${PORT}`)
})
