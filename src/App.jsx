import { useEffect, useMemo, useState } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'
const ADMIN_TOKEN_STORAGE_KEY = 'admin_access_token'
const ADMIN_USER_STORAGE_KEY = 'admin_user_email'

const defaultCheckoutForm = {
  name: '',
  email: '',
  phone: '',
}

const emptyAdminForm = {
  email: '',
  password: '',
}

const createCampaignTemplate = () => {
  const id = `campaign-${Date.now()}`

  return {
    id,
    slug: id,
    badge: 'Novo carro',
    title: 'Novo sorteio',
    carName: 'Novo carro em destaque',
    shortDescription: 'Resumo curto para aparecer na home.',
    description: 'Descricao completa da pagina individual do carro.',
    status: 'draft',
    featuredOnHome: false,
    ticketPrice: 10,
    currency: 'BRL',
    totalTickets: 1000,
    soldTickets: 0,
    maxTicketsPerOrder: 50,
    drawDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    heroImage: '/cars/hero-1.jpg',
    gallery: ['/cars/hero-1.jpg', '/cars/hero-2.jpg', '/cars/hero-3.jpg'],
    highlights: ['Fotos editaveis', 'Descricao da pagina do carro', 'Checkout preparado para Stripe'],
    stripe: {
      enabled: false,
      priceId: '',
      productName: 'Bilhete do sorteio',
      successUrl: 'http://localhost:5173/?checkout=success',
      cancelUrl: 'http://localhost:5173/?checkout=cancel',
    },
  }
}

const formatCurrency = (value, currency = 'BRL') => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency,
  maximumFractionDigits: 2,
}).format(Number(value || 0))

const formatDate = (value) => {
  if (!value) {
    return '-'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date)
}

const toDateTimeLocalValue = (value) => {
  if (!value) {
    return ''
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const offset = date.getTimezoneOffset()
  const localDate = new Date(date.getTime() - offset * 60 * 1000)
  return localDate.toISOString().slice(0, 16)
}

const calculateTimeLeft = (value) => {
  const target = new Date(value)
  if (Number.isNaN(target.getTime())) {
    return { days: '00', hours: '00', minutes: '00' }
  }

  const diff = Math.max(0, target.getTime() - Date.now())
  const totalMinutes = Math.floor(diff / (1000 * 60))
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
  }
}

function App() {
  const [view, setView] = useState('home')
  const [storefront, setStorefront] = useState(null)
  const [draftConfig, setDraftConfig] = useState(null)
  const [selectedCampaignSlug, setSelectedCampaignSlug] = useState('')
  const [selectedDraftId, setSelectedDraftId] = useState('')
  const [checkoutForm, setCheckoutForm] = useState(defaultCheckoutForm)
  const [quantity, setQuantity] = useState(5)
  const [checkoutBusy, setCheckoutBusy] = useState(false)
  const [checkoutFeedback, setCheckoutFeedback] = useState('')
  const [adminForm, setAdminForm] = useState(emptyAdminForm)
  const [adminBusy, setAdminBusy] = useState(false)
  const [adminSaveBusy, setAdminSaveBusy] = useState(false)
  const [uploadBusy, setUploadBusy] = useState({})
  const [pageError, setPageError] = useState('')
  const [adminError, setAdminError] = useState('')
  const [adminNotice, setAdminNotice] = useState('')
  const [publicLoading, setPublicLoading] = useState(true)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [countdown, setCountdown] = useState(calculateTimeLeft(null))

  const publicCampaigns = useMemo(() => storefront?.campaigns ?? [], [storefront])
  const featuredCampaigns = useMemo(() => (
    storefront?.featuredCampaigns?.length
      ? storefront.featuredCampaigns
      : publicCampaigns
  ), [publicCampaigns, storefront])

  const selectedCampaign = useMemo(() => (
    publicCampaigns.find((item) => item.slug === selectedCampaignSlug)
    ?? featuredCampaigns[0]
    ?? null
  ), [featuredCampaigns, publicCampaigns, selectedCampaignSlug])

  const selectedDraftCampaign = useMemo(() => (
    draftConfig?.campaigns?.find((item) => item.id === selectedDraftId) ?? null
  ), [draftConfig, selectedDraftId])

  useEffect(() => {
    const loadStorefront = async () => {
      setPublicLoading(true)
      setPageError('')

      try {
        const response = await fetch(`${API_BASE_URL}/api/storefront`)
        const payload = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(payload?.message || 'Nao foi possivel carregar a home.')
        }

        setStorefront(payload.storefront)

        const initialCampaign = payload?.storefront?.featuredCampaigns?.[0] ?? payload?.storefront?.campaigns?.[0]
        if (initialCampaign) {
          setSelectedCampaignSlug((current) => current || initialCampaign.slug)
          setQuantity((current) => Math.min(Math.max(1, current), initialCampaign.maxTicketsPerOrder || 1))
        }
      } catch (error) {
        setPageError(error.message || 'Erro ao carregar a home.')
      } finally {
        setPublicLoading(false)
      }
    }

    loadStorefront()
  }, [])

  useEffect(() => {
    const token = window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY)
    const storedEmail = window.localStorage.getItem(ADMIN_USER_STORAGE_KEY)

    if (!token) {
      return
    }

    const validateAdmin = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const payload = await response.json().catch(() => ({}))
        if (!response.ok) {
          throw new Error(payload?.message || 'Sessao admin expirada.')
        }

        setIsAdminAuthenticated(true)
        setAdminEmail(payload?.user?.email || storedEmail || '')
      } catch {
        window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY)
        window.localStorage.removeItem(ADMIN_USER_STORAGE_KEY)
      }
    }

    validateAdmin()
  }, [])

  useEffect(() => {
    if (!selectedCampaign?.drawDate) {
      setCountdown(calculateTimeLeft(null))
      return undefined
    }

    setCountdown(calculateTimeLeft(selectedCampaign.drawDate))
    const interval = window.setInterval(() => {
      setCountdown(calculateTimeLeft(selectedCampaign.drawDate))
    }, 30000)

    return () => window.clearInterval(interval)
  }, [selectedCampaign?.drawDate])

  useEffect(() => {
    if (!draftConfig?.campaigns?.length) {
      return
    }

    if (!selectedDraftId || !draftConfig.campaigns.some((item) => item.id === selectedDraftId)) {
      setSelectedDraftId(draftConfig.campaigns[0].id)
    }
  }, [draftConfig, selectedDraftId])

  useEffect(() => {
    if (!selectedCampaign) {
      return
    }

    setQuantity((current) => Math.min(Math.max(1, current), selectedCampaign.maxTicketsPerOrder || 1))
  }, [selectedCampaign])

  const resetAdminSession = () => {
    window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY)
    window.localStorage.removeItem(ADMIN_USER_STORAGE_KEY)
    setIsAdminAuthenticated(false)
    setAdminEmail('')
  }

  const reloadStorefront = async () => {
    const response = await fetch(`${API_BASE_URL}/api/storefront`)
    const payload = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(payload?.message || 'Nao foi possivel atualizar a home.')
    }

    setStorefront(payload.storefront)
    return payload.storefront
  }

  const loadAdminConfig = async () => {
    const token = window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY)
    if (!token) {
      throw new Error('Sessao admin invalida.')
    }

    const response = await fetch(`${API_BASE_URL}/api/admin/store-config`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const payload = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(payload?.message || 'Nao foi possivel carregar o admin.')
    }

    setDraftConfig(payload.config)
    return payload.config
  }

  const handleAdminLogin = async (event) => {
    event.preventDefault()
    setAdminBusy(true)
    setAdminError('')
    setAdminNotice('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminForm),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(payload?.message || 'Falha ao autenticar no admin.')
      }

      const accessToken = payload?.session?.accessToken
      const email = payload?.user?.email || adminForm.email.trim()
      if (!accessToken) {
        throw new Error('Resposta de login sem token de acesso.')
      }

      window.localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, accessToken)
      window.localStorage.setItem(ADMIN_USER_STORAGE_KEY, email)
      setIsAdminAuthenticated(true)
      setAdminEmail(email)
      setAdminNotice('Login admin realizado com sucesso.')
      const config = await loadAdminConfig()
      setSelectedDraftId(config.campaigns[0]?.id || '')
    } catch (error) {
      setAdminError(error.message || 'Falha ao autenticar no admin.')
    } finally {
      setAdminBusy(false)
    }
  }

  const updateStoreField = (field, value) => {
    setDraftConfig((current) => ({ ...current, [field]: value }))
  }

  const updateSelectedCampaign = (updater) => {
    setDraftConfig((current) => {
      if (!current) {
        return current
      }

      return {
        ...current,
        campaigns: current.campaigns.map((campaign) => (
          campaign.id === selectedDraftId ? updater(campaign) : campaign
        )),
      }
    })
  }

  const updateCampaignField = (field, value) => {
    updateSelectedCampaign((campaign) => ({ ...campaign, [field]: value }))
  }

  const updateCampaignStripeField = (field, value) => {
    updateSelectedCampaign((campaign) => ({
      ...campaign,
      stripe: {
        ...campaign.stripe,
        [field]: value,
      },
    }))
  }

  const updateCampaignArrayField = (field, index, value) => {
    updateSelectedCampaign((campaign) => {
      const next = [...(campaign[field] || [])]
      next[index] = value
      return {
        ...campaign,
        [field]: next,
      }
    })
  }

  const handleAddCampaign = () => {
    const newCampaign = createCampaignTemplate()

    setDraftConfig((current) => ({
      ...current,
      campaigns: [...(current?.campaigns || []), newCampaign],
    }))
    setSelectedDraftId(newCampaign.id)
  }

  const handleRemoveCampaign = () => {
    if (!draftConfig || !selectedDraftCampaign || draftConfig.campaigns.length <= 1) {
      return
    }

    const remaining = draftConfig.campaigns.filter((item) => item.id !== selectedDraftId)
    setDraftConfig((current) => ({ ...current, campaigns: remaining }))
    setSelectedDraftId(remaining[0]?.id || '')
  }

  const handleImageUpload = async (file, field, index = null) => {
    if (!file) {
      return
    }

    const token = window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY)
    if (!token) {
      setAdminError('Sua sessao admin expirou. Faca login novamente.')
      resetAdminSession()
      return
    }

    const busyKey = index === null ? field : `${field}-${index}`
    setUploadBusy((current) => ({ ...current, [busyKey]: true }))
    setAdminError('')
    setAdminNotice('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'raffles')

      const response = await fetch(`${API_BASE_URL}/api/admin/upload-image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(payload?.message || 'Falha ao enviar imagem.')
      }

      const imageUrl = payload?.publicUrl || ''
      if (!imageUrl) {
        throw new Error('Upload concluido sem URL publica.')
      }

      if (index === null) {
        updateCampaignField(field, imageUrl)
      } else {
        updateCampaignArrayField(field, index, imageUrl)
      }

      setAdminNotice('Imagem enviada com sucesso. Salve para publicar.')
    } catch (error) {
      setAdminError(error.message || 'Falha ao enviar imagem.')
    } finally {
      setUploadBusy((current) => ({ ...current, [busyKey]: false }))
    }
  }

  const handleSaveConfig = async () => {
    const token = window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY)
    if (!token || !draftConfig) {
      setAdminError('Sessao admin invalida para salvar.')
      return
    }

    setAdminSaveBusy(true)
    setAdminError('')
    setAdminNotice('')

    try {
      const payloadToSave = {
        ...draftConfig,
        campaigns: draftConfig.campaigns.map((campaign) => ({
          ...campaign,
          ticketPrice: Number(campaign.ticketPrice || 0),
          totalTickets: Number(campaign.totalTickets || 0),
          soldTickets: Number(campaign.soldTickets || 0),
          maxTicketsPerOrder: Number(campaign.maxTicketsPerOrder || 1),
          gallery: (campaign.gallery || []).map((item) => item?.trim()).filter(Boolean),
          highlights: (campaign.highlights || []).map((item) => item?.trim()).filter(Boolean),
        })),
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/store-config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payloadToSave),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(payload?.message || 'Nao foi possivel salvar.')
      }

      setDraftConfig(payload.config)
      setAdminNotice(payload?.message || 'Configuracao salva com sucesso.')
      const updatedStorefront = await reloadStorefront()

      if (selectedDraftCampaign?.slug) {
        const updatedSlug = payload.config.campaigns.find((item) => item.id === selectedDraftId)?.slug
        if (updatedSlug) {
          setSelectedCampaignSlug(updatedSlug)
          setView('product')
        }
      } else if (updatedStorefront.featuredCampaigns[0]) {
        setSelectedCampaignSlug(updatedStorefront.featuredCampaigns[0].slug)
      }
    } catch (error) {
      setAdminError(error.message || 'Nao foi possivel salvar.')
    } finally {
      setAdminSaveBusy(false)
    }
  }

  const handleCheckout = async (event) => {
    event.preventDefault()
    if (!selectedCampaign) {
      return
    }

    setCheckoutBusy(true)
    setCheckoutFeedback('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/checkout/intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: selectedCampaign.slug,
          quantity,
          ...checkoutForm,
        }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(payload?.message || 'Nao foi possivel preparar a compra.')
      }

      setCheckoutFeedback(payload?.checkout?.message || 'Checkout preparado com sucesso.')
    } catch (error) {
      setCheckoutFeedback(error.message || 'Nao foi possivel preparar a compra.')
    } finally {
      setCheckoutBusy(false)
    }
  }

  if (publicLoading) {
    return (
      <main className="app-shell loading-state">
        <div className="loading-card">
          <p className="eyebrow">Sorteios</p>
          <h1>Carregando home, carros e painel admin...</h1>
        </div>
      </main>
    )
  }

  if (!storefront) {
    return (
      <main className="app-shell loading-state">
        <div className="loading-card">
          <p className="eyebrow">Erro</p>
          <h1>Nao foi possivel abrir a plataforma.</h1>
          <p>{pageError || 'Verifique se a API esta online.'}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="brand-tag">{storefront.siteName}</p>
          <h1>Admin por carro, home por destaque</h1>
        </div>

        <div className="topbar-actions">
          <button type="button" className="ghost-button" onClick={() => setView('home')}>
            Home
          </button>
          <button
            type="button"
            className="ghost-button"
            onClick={() => {
              if (featuredCampaigns[0]) {
                setSelectedCampaignSlug(featuredCampaigns[0].slug)
                setView('product')
              }
            }}
          >
            Pagina do carro
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={async () => {
              setView('admin')
              setAdminError('')
              setAdminNotice('')

              if (isAdminAuthenticated) {
                try {
                  const config = await loadAdminConfig()
                  setSelectedDraftId(config.campaigns[0]?.id || '')
                } catch (error) {
                  setAdminError(error.message || 'Erro ao abrir admin.')
                }
              }
            }}
          >
            Admin
          </button>
        </div>
      </header>

      {view === 'home' ? (
        <section className="page-grid">
          <article className="hero-card">
            <div className="hero-copy">
              <p className="eyebrow">Home da plataforma</p>
              <h2>{storefront.homeTitle}</h2>
              <p className="lead">{storefront.homeSubtitle}</p>
              <p className="description">{storefront.homeDescription}</p>

              <div className="hero-metrics">
                <div>
                  <span>Carros em destaque</span>
                  <strong>{featuredCampaigns.length}</strong>
                </div>
                <div>
                  <span>Total publico</span>
                  <strong>{publicCampaigns.length}</strong>
                </div>
                <div>
                  <span>Fluxo</span>
                  <strong>Compra por bilhetes</strong>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <img
                src={featuredCampaigns[0]?.heroImage || publicCampaigns[0]?.heroImage || '/cars/hero-1.jpg'}
                alt={featuredCampaigns[0]?.carName || 'Carro em destaque'}
                className="hero-image"
              />
              <div className="status-chip-list">
                <span className="status-chip">Destaques definidos no admin</span>
                <span className="status-chip status-chip-soft">Pagina de carro separada</span>
              </div>
            </div>
          </article>

          <section className="content-grid">
            {featuredCampaigns.map((campaign) => (
              <article key={campaign.id} className="panel-card campaign-card">
                <img src={campaign.heroImage} alt={campaign.carName} className="gallery-image" />
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">{campaign.badge}</p>
                    <h3>{campaign.carName}</h3>
                  </div>
                </div>
                <p className="description">{campaign.shortDescription}</p>
                <div className="mini-stats">
                  <div>
                    <span>Bilhete</span>
                    <strong>{formatCurrency(campaign.ticketPrice, campaign.currency)}</strong>
                  </div>
                  <div>
                    <span>Status</span>
                    <strong>{campaign.status === 'active' ? 'Ativo' : 'Encerrado'}</strong>
                  </div>
                  <div>
                    <span>Sorteio</span>
                    <strong>{formatDate(campaign.drawDate)}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => {
                    setSelectedCampaignSlug(campaign.slug)
                    setView('product')
                  }}
                >
                  Abrir pagina do carro
                </button>
              </article>
            ))}
          </section>
        </section>
      ) : null}

      {view === 'product' && selectedCampaign ? (
        <section className="page-grid">
          <article className="hero-card">
            <div className="hero-copy">
              <p className="eyebrow">{selectedCampaign.badge}</p>
              <h2>{selectedCampaign.carName}</h2>
              <p className="lead">{selectedCampaign.shortDescription}</p>
              <p className="description">{selectedCampaign.description}</p>

              <div className="hero-metrics">
                <div>
                  <span>Valor</span>
                  <strong>{formatCurrency(selectedCampaign.ticketPrice, selectedCampaign.currency)}</strong>
                </div>
                <div>
                  <span>Max. por pedido</span>
                  <strong>{selectedCampaign.maxTicketsPerOrder}</strong>
                </div>
                <div>
                  <span>Sorteio</span>
                  <strong>{formatDate(selectedCampaign.drawDate)}</strong>
                </div>
              </div>

              <div className="countdown-grid">
                <div>
                  <span>Dias</span>
                  <strong>{countdown.days}</strong>
                </div>
                <div>
                  <span>Horas</span>
                  <strong>{countdown.hours}</strong>
                </div>
                <div>
                  <span>Min</span>
                  <strong>{countdown.minutes}</strong>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <img src={selectedCampaign.heroImage} alt={selectedCampaign.carName} className="hero-image" />
              <div className="status-chip-list">
                <span className="status-chip">
                  {selectedCampaign.stripeStatus?.ready ? 'Stripe pronto' : 'Stripe pendente'}
                </span>
                <span className="status-chip status-chip-soft">
                  {selectedCampaign.featuredOnHome ? 'Em destaque na home' : 'Apenas pagina interna'}
                </span>
              </div>
            </div>
          </article>

          <section className="content-grid">
            <article className="panel-card">
              <div className="panel-header">
                <div>
                  <p className="eyebrow">Fotos do carro</p>
                  <h3>Galeria da pagina individual</h3>
                </div>
              </div>

              <div className="gallery-grid">
                {selectedCampaign.gallery.map((image, index) => (
                  <img
                    key={`${image}-${index}`}
                    src={image}
                    alt={`${selectedCampaign.carName} ${index + 1}`}
                    className="gallery-image"
                  />
                ))}
              </div>

              <div className="chip-list">
                {selectedCampaign.highlights.map((item) => (
                  <span key={item} className="info-chip">{item}</span>
                ))}
              </div>
            </article>

            <article className="panel-card buy-card">
              <div className="panel-header">
                <div>
                  <p className="eyebrow">Comprar bilhetes</p>
                  <h3>Checkout preparado para Stripe</h3>
                </div>
              </div>

              <form className="buy-form" onSubmit={handleCheckout}>
                <label>
                  Quantidade de bilhetes
                  <input
                    type="number"
                    min="1"
                    max={selectedCampaign.maxTicketsPerOrder}
                    value={quantity}
                    onChange={(event) => {
                      const next = Number(event.target.value || 1)
                      const safe = Math.min(selectedCampaign.maxTicketsPerOrder, Math.max(1, next))
                      setQuantity(safe)
                    }}
                  />
                </label>

                <label>
                  Nome completo
                  <input
                    type="text"
                    value={checkoutForm.name}
                    onChange={(event) => setCheckoutForm((current) => ({ ...current, name: event.target.value }))}
                  />
                </label>

                <label>
                  Email
                  <input
                    type="email"
                    value={checkoutForm.email}
                    onChange={(event) => setCheckoutForm((current) => ({ ...current, email: event.target.value }))}
                  />
                </label>

                <label>
                  WhatsApp
                  <input
                    type="text"
                    value={checkoutForm.phone}
                    onChange={(event) => setCheckoutForm((current) => ({ ...current, phone: event.target.value }))}
                  />
                </label>

                <div className="checkout-summary">
                  <div>
                    <span>Produto</span>
                    <strong>{selectedCampaign.stripe?.productName || 'Bilhete do sorteio'}</strong>
                  </div>
                  <div>
                    <span>Total</span>
                    <strong>{formatCurrency(selectedCampaign.ticketPrice * quantity, selectedCampaign.currency)}</strong>
                  </div>
                  <div>
                    <span>Status Stripe</span>
                    <strong>
                      {selectedCampaign.stripeStatus?.ready
                        ? 'Pronto para conectar a sessao real'
                        : 'Falta configurar credenciais/price_id'}
                    </strong>
                  </div>
                </div>

                <button type="submit" className="primary-button" disabled={checkoutBusy}>
                  {checkoutBusy ? 'Preparando checkout...' : 'Gerar intencao de compra'}
                </button>
              </form>

              {checkoutFeedback ? <p className="feedback-message">{checkoutFeedback}</p> : null}
            </article>
          </section>
        </section>
      ) : null}

      {view === 'admin' ? (
        <section className="admin-layout">
          {!isAdminAuthenticated ? (
            <article className="admin-login-card">
              <p className="eyebrow">Admin</p>
              <h2>Entrar no painel</h2>
              <p>Configure a home e a pagina individual de cada carro do sorteio.</p>

              <form className="admin-form" onSubmit={handleAdminLogin}>
                <label>
                  Email
                  <input
                    type="email"
                    value={adminForm.email}
                    onChange={(event) => setAdminForm((current) => ({ ...current, email: event.target.value }))}
                  />
                </label>

                <label>
                  Senha
                  <input
                    type="password"
                    value={adminForm.password}
                    onChange={(event) => setAdminForm((current) => ({ ...current, password: event.target.value }))}
                  />
                </label>

                <button type="submit" className="primary-button" disabled={adminBusy}>
                  {adminBusy ? 'Autenticando...' : 'Entrar'}
                </button>
              </form>

              {adminError ? <p className="feedback-message error">{adminError}</p> : null}
            </article>
          ) : (
            <section className="admin-panel-grid">
              <article className="panel-card admin-main-card">
                <div className="panel-header panel-header-spread">
                  <div>
                    <p className="eyebrow">Painel admin</p>
                    <h2>Home e paginas dos carros</h2>
                    <p className="admin-subtitle">Logado como {adminEmail || 'admin'}.</p>
                  </div>

                  <div className="admin-header-actions">
                    <button
                      type="button"
                      className="ghost-button"
                      onClick={async () => {
                        try {
                          const config = await loadAdminConfig()
                          setSelectedDraftId(config.campaigns[0]?.id || '')
                          setAdminNotice('Dados recarregados do servidor.')
                          setAdminError('')
                        } catch (error) {
                          setAdminError(error.message || 'Erro ao recarregar dados.')
                        }
                      }}
                    >
                      Recarregar
                    </button>
                    <button
                      type="button"
                      className="ghost-button"
                      onClick={() => {
                        resetAdminSession()
                        setAdminNotice('Sessao encerrada.')
                      }}
                    >
                      Sair
                    </button>
                    <button type="button" className="primary-button" onClick={handleSaveConfig} disabled={adminSaveBusy}>
                      {adminSaveBusy ? 'Salvando...' : 'Salvar tudo'}
                    </button>
                  </div>
                </div>

                <div className="form-grid">
                  <label>
                    Nome da plataforma
                    <input type="text" value={draftConfig?.siteName || ''} onChange={(event) => updateStoreField('siteName', event.target.value)} />
                  </label>

                  <label className="full-span">
                    Titulo da home
                    <input type="text" value={draftConfig?.homeTitle || ''} onChange={(event) => updateStoreField('homeTitle', event.target.value)} />
                  </label>

                  <label className="full-span">
                    Subtitulo da home
                    <input type="text" value={draftConfig?.homeSubtitle || ''} onChange={(event) => updateStoreField('homeSubtitle', event.target.value)} />
                  </label>

                  <label className="full-span">
                    Descricao da home
                    <textarea rows="4" value={draftConfig?.homeDescription || ''} onChange={(event) => updateStoreField('homeDescription', event.target.value)} />
                  </label>
                </div>

                <div className="media-section">
                  <div className="panel-header panel-header-spread">
                    <div>
                      <p className="eyebrow">Carros</p>
                      <h3>Escolha qual pagina editar</h3>
                    </div>

                    <div className="admin-header-actions">
                      <button type="button" className="ghost-button" onClick={handleAddCampaign}>
                        Adicionar carro
                      </button>
                      <button type="button" className="ghost-button" onClick={handleRemoveCampaign}>
                        Remover carro
                      </button>
                    </div>
                  </div>

                  <div className="campaign-switcher">
                    {draftConfig?.campaigns?.map((campaign) => (
                      <button
                        key={campaign.id}
                        type="button"
                        className={`campaign-tab ${campaign.id === selectedDraftId ? 'campaign-tab-active' : ''}`}
                        onClick={() => setSelectedDraftId(campaign.id)}
                      >
                        <strong>{campaign.carName}</strong>
                        <span>{campaign.featuredOnHome ? 'Destaque na home' : 'Pagina interna'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDraftCampaign ? (
                  <>
                    <div className="form-grid">
                      <label>
                        Nome do carro
                        <input type="text" value={selectedDraftCampaign.carName || ''} onChange={(event) => updateCampaignField('carName', event.target.value)} />
                      </label>

                      <label>
                        Selo
                        <input type="text" value={selectedDraftCampaign.badge || ''} onChange={(event) => updateCampaignField('badge', event.target.value)} />
                      </label>

                      <label>
                        Titulo da pagina
                        <input type="text" value={selectedDraftCampaign.title || ''} onChange={(event) => updateCampaignField('title', event.target.value)} />
                      </label>

                      <label>
                        Slug
                        <input type="text" value={selectedDraftCampaign.slug || ''} onChange={(event) => updateCampaignField('slug', event.target.value)} />
                      </label>

                      <label className="full-span">
                        Resumo da home
                        <input type="text" value={selectedDraftCampaign.shortDescription || ''} onChange={(event) => updateCampaignField('shortDescription', event.target.value)} />
                      </label>

                      <label className="full-span">
                        Descricao da pagina do carro
                        <textarea rows="5" value={selectedDraftCampaign.description || ''} onChange={(event) => updateCampaignField('description', event.target.value)} />
                      </label>

                      <label>
                        Status
                        <select value={selectedDraftCampaign.status || 'draft'} onChange={(event) => updateCampaignField('status', event.target.value)}>
                          <option value="active">Ativo</option>
                          <option value="draft">Rascunho</option>
                          <option value="closed">Encerrado</option>
                        </select>
                      </label>

                      <label className="checkbox-field">
                        <input
                          type="checkbox"
                          checked={Boolean(selectedDraftCampaign.featuredOnHome)}
                          onChange={(event) => updateCampaignField('featuredOnHome', event.target.checked)}
                        />
                        <span>Destacar este carro na home</span>
                      </label>

                      <label>
                        Valor do bilhete
                        <input type="number" min="0" step="0.01" value={selectedDraftCampaign.ticketPrice || 0} onChange={(event) => updateCampaignField('ticketPrice', event.target.value)} />
                      </label>

                      <label>
                        Moeda
                        <input type="text" value={selectedDraftCampaign.currency || 'BRL'} onChange={(event) => updateCampaignField('currency', event.target.value.toUpperCase())} />
                      </label>

                      <label>
                        Total de bilhetes
                        <input type="number" min="1" value={selectedDraftCampaign.totalTickets || 1} onChange={(event) => updateCampaignField('totalTickets', event.target.value)} />
                      </label>

                      <label>
                        Bilhetes vendidos
                        <input type="number" min="0" value={selectedDraftCampaign.soldTickets || 0} onChange={(event) => updateCampaignField('soldTickets', event.target.value)} />
                      </label>

                      <label>
                        Maximo por pedido
                        <input type="number" min="1" value={selectedDraftCampaign.maxTicketsPerOrder || 1} onChange={(event) => updateCampaignField('maxTicketsPerOrder', event.target.value)} />
                      </label>

                      <label>
                        Data do sorteio
                        <input type="datetime-local" value={toDateTimeLocalValue(selectedDraftCampaign.drawDate)} onChange={(event) => updateCampaignField('drawDate', event.target.value)} />
                      </label>
                    </div>

                    <div className="media-section">
                      <div className="panel-header">
                        <div>
                          <p className="eyebrow">Fotos do carro</p>
                          <h3>Capa e galeria da pagina</h3>
                        </div>
                      </div>

                      <div className="media-grid">
                        <div className="upload-card">
                          <img src={selectedDraftCampaign.heroImage} alt={selectedDraftCampaign.carName} className="upload-preview" />
                          <label>
                            URL da capa
                            <input type="text" value={selectedDraftCampaign.heroImage || ''} onChange={(event) => updateCampaignField('heroImage', event.target.value)} />
                          </label>
                          <label className="upload-input">
                            <span>{uploadBusy.heroImage ? 'Enviando...' : 'Enviar nova capa'}</span>
                            <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event.target.files?.[0], 'heroImage')} />
                          </label>
                        </div>

                        {selectedDraftCampaign.gallery.map((image, index) => (
                          <div key={`gallery-${index}`} className="upload-card">
                            <img src={image} alt={`Galeria ${index + 1}`} className="upload-preview" />
                            <label>
                              URL da foto {index + 1}
                              <input type="text" value={image || ''} onChange={(event) => updateCampaignArrayField('gallery', index, event.target.value)} />
                            </label>
                            <label className="upload-input">
                              <span>{uploadBusy[`gallery-${index}`] ? 'Enviando...' : `Enviar foto ${index + 1}`}</span>
                              <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event.target.files?.[0], 'gallery', index)} />
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="form-grid">
                      <label className="full-span">
                        Destaque 1
                        <input type="text" value={selectedDraftCampaign.highlights?.[0] || ''} onChange={(event) => updateCampaignArrayField('highlights', 0, event.target.value)} />
                      </label>
                      <label className="full-span">
                        Destaque 2
                        <input type="text" value={selectedDraftCampaign.highlights?.[1] || ''} onChange={(event) => updateCampaignArrayField('highlights', 1, event.target.value)} />
                      </label>
                      <label className="full-span">
                        Destaque 3
                        <input type="text" value={selectedDraftCampaign.highlights?.[2] || ''} onChange={(event) => updateCampaignArrayField('highlights', 2, event.target.value)} />
                      </label>
                    </div>

                    <div className="stripe-admin-card">
                      <div className="panel-header">
                        <div>
                          <p className="eyebrow">Stripe</p>
                          <h3>Preparacao do checkout deste carro</h3>
                        </div>
                      </div>

                      <div className="form-grid">
                        <label className="checkbox-field">
                          <input type="checkbox" checked={Boolean(selectedDraftCampaign.stripe?.enabled)} onChange={(event) => updateCampaignStripeField('enabled', event.target.checked)} />
                          <span>Habilitar Stripe para este carro</span>
                        </label>

                        <label>
                          Nome do produto
                          <input type="text" value={selectedDraftCampaign.stripe?.productName || ''} onChange={(event) => updateCampaignStripeField('productName', event.target.value)} />
                        </label>

                        <label>
                          Price ID
                          <input type="text" value={selectedDraftCampaign.stripe?.priceId || ''} onChange={(event) => updateCampaignStripeField('priceId', event.target.value)} placeholder="price_123" />
                        </label>

                        <label>
                          Success URL
                          <input type="text" value={selectedDraftCampaign.stripe?.successUrl || ''} onChange={(event) => updateCampaignStripeField('successUrl', event.target.value)} />
                        </label>

                        <label>
                          Cancel URL
                          <input type="text" value={selectedDraftCampaign.stripe?.cancelUrl || ''} onChange={(event) => updateCampaignStripeField('cancelUrl', event.target.value)} />
                        </label>
                      </div>
                    </div>
                  </>
                ) : null}

                {adminError ? <p className="feedback-message error">{adminError}</p> : null}
                {adminNotice ? <p className="feedback-message">{adminNotice}</p> : null}
              </article>

              <aside className="panel-card preview-card">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Preview</p>
                    <h3>Home e pagina do carro</h3>
                  </div>
                </div>

                {selectedDraftCampaign ? (
                  <>
                    <img src={selectedDraftCampaign.heroImage} alt={selectedDraftCampaign.carName} className="preview-image" />
                    <h4>{selectedDraftCampaign.carName}</h4>
                    <p>{selectedDraftCampaign.shortDescription}</p>
                    <div className="mini-stats">
                      <div>
                        <span>Bilhete</span>
                        <strong>{formatCurrency(selectedDraftCampaign.ticketPrice, selectedDraftCampaign.currency)}</strong>
                      </div>
                      <div>
                        <span>Home</span>
                        <strong>{selectedDraftCampaign.featuredOnHome ? 'Em destaque' : 'Nao aparece'}</strong>
                      </div>
                      <div>
                        <span>Stripe</span>
                        <strong>{selectedDraftCampaign.stripe?.enabled ? 'Habilitado' : 'Desligado'}</strong>
                      </div>
                    </div>
                    <div className="chip-list">
                      {(selectedDraftCampaign.highlights || []).filter(Boolean).map((item) => (
                        <span key={item} className="info-chip">{item}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <p>Selecione um carro para editar.</p>
                )}
              </aside>
            </section>
          )}
        </section>
      ) : null}
    </main>
  )
}

export default App
