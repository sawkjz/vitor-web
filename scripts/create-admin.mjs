import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const envFilePath = path.join(projectRoot, '.env')

const parseEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return {}
  }
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/)
  return lines.reduce((acc, line) => {
    const cleaned = line.trim()
    if (!cleaned || cleaned.startsWith('#') || !cleaned.includes('=')) {
      return acc
    }
    const separatorIndex = cleaned.indexOf('=')
    const key = cleaned.slice(0, separatorIndex).trim()
    const value = cleaned.slice(separatorIndex + 1).trim()
    acc[key] = value
    return acc
  }, {})
}

const envFromFile = parseEnvFile(envFilePath)

const supabaseUrl = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL ?? envFromFile.VITE_SUPABASE_URL ?? envFromFile.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? envFromFile.SUPABASE_SERVICE_ROLE_KEY
const adminEmail = (process.argv[2] ?? process.env.ADMIN_EMAIL ?? 'admin@sorteiocars.com').trim()
const adminPassword = (process.argv[3] ?? process.env.ADMIN_PASSWORD ?? 'Admin123456!').trim()

if (!supabaseUrl) {
  throw new Error('Defina VITE_SUPABASE_URL ou SUPABASE_URL no ambiente.')
}

if (!supabaseServiceRoleKey) {
  throw new Error('Defina SUPABASE_SERVICE_ROLE_KEY no ambiente.')
}

if (!adminEmail.includes('@') || adminEmail.startsWith('@') || adminEmail.endsWith('@')) {
  throw new Error('Email inválido para criação de admin.')
}

if (adminPassword.length < 6) {
  throw new Error('A senha precisa ter pelo menos 6 caracteres.')
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const { data: usersData, error: listError } = await supabase.auth.admin.listUsers({
  page: 1,
  perPage: 1000,
})

if (listError) {
  throw listError
}

const existingUser = usersData.users.find((user) => user.email?.toLowerCase() === adminEmail.toLowerCase())
let adminUserId = existingUser?.id

if (!adminUserId) {
  const { data: createdData, error: createError } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,
    user_metadata: { name: adminEmail.split('@')[0] },
  })

  if (createError) {
    throw createError
  }

  adminUserId = createdData.user.id
} else {
  const { error: updateError } = await supabase.auth.admin.updateUserById(adminUserId, {
    password: adminPassword,
    email_confirm: true,
  })

  if (updateError) {
    throw updateError
  }
}

const { error: profileError } = await supabase
  .from('profiles')
  .upsert(
    {
      id: adminUserId,
      email: adminEmail,
      name: adminEmail.split('@')[0],
      role: 'admin',
    },
    { onConflict: 'id' }
  )

if (profileError) {
  throw profileError
}

console.log(`Admin pronto: ${adminEmail}`)
console.log(`Senha: ${adminPassword}`)
