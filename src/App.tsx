import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import './App.css'

type AdFormat =
  | 'sticky'
  | 'native'
  | 'interscroller'
  | 'takeover'
  | 'casino'
  | 'gate'
  | 'cuecard'
  | 'bet365'
  | 'casinoInterstitial'
  | 'pickWin'
  | 'casinoCaptcha'
  | 'swipePick'
  | 'scrollUnlock'
type FeedMode = 'sports' | 'business' | 'lifestyle'

type Story = {
  eyebrow: string
  title: string
  summary: string
  image: string
  time: string
}

type FormatInfo = {
  id: AdFormat
  label: string
  shortLabel: string
  description: string
  bestFor: string
  impact: string
}

const formatOptions: FormatInfo[] = [
  {
    id: 'sticky',
    label: 'Sticky bottom',
    shortLabel: 'Sticky',
    description: 'Unidade persistente no fundo do ecrã, com fecho visível e CTA compacto.',
    bestFor: 'Reach incremental, retargeting, apps e vídeo curto.',
    impact: 'Alta visibilidade',
  },
  {
    id: 'native',
    label: 'Native card',
    shortLabel: 'Native',
    description: 'Formato integrado no feed, com sinalização clara de publicidade.',
    bestFor: 'Conteúdo patrocinado, lead generation e discovery.',
    impact: 'Baixa fricção',
  },
  {
    id: 'interscroller',
    label: 'Interscroller',
    shortLabel: 'Scroll',
    description: 'Criativo revelado no scroll entre blocos editoriais.',
    bestFor: 'Brand lift, lançamento de produto e campanhas premium.',
    impact: 'Memorável',
  },
  {
    id: 'takeover',
    label: 'Mobile takeover',
    shortLabel: 'Takeover',
    description: 'Experiência de alto impacto ancorada ao topo e reforçada no feed.',
    bestFor: 'Awareness, eventos, estreias e campanhas de curta duração.',
    impact: 'Máximo impacto',
  },
  {
    id: 'casino',
    label: 'Casino scroll reveal',
    shortLabel: 'Casino',
    description: 'Formato scroll-first para casino: o jackpot e as fichas são revelados por camadas enquanto o utilizador desce no feed.',
    bestFor: 'Campanhas 18+, jackpots, free spins e lançamentos de slot com mensagem curta e sinalização responsável.',
    impact: 'Alto engagement',
  },
  {
    id: 'gate',
    label: 'Click-to-scroll gate',
    shortLabel: 'Gate',
    description: 'Formato que bloqueia a continuação do feed até o utilizador clicar num CTA explícito.',
    bestFor: 'Mensagens obrigatórias, sampling, lead-in de vídeo, promoções com consentimento e campanhas que precisam de acção consciente.',
    impact: 'Atenção forçada',
  },
  {
    id: 'cuecard',
    label: 'Sports betting cuecard',
    shortLabel: 'Cuecard',
    description: 'Card flexível com imagem, logo, CTA e três frames de copy para o utilizador percorrer verticalmente.',
    bestFor: 'Apostas desportivas 18+, odds boost, pré-jogo, live betting e mensagens sequenciais com sinalização responsável.',
    impact: 'Storytelling',
  },
  {
    id: 'bet365',
    label: 'bet365 top odds',
    shortLabel: 'Top odds',
    description: 'Barra fixa no topo com logo, CTA e cards de jogos em scroll horizontal com odds e probabilidade.',
    bestFor: 'Sports betting 18+, pré-jogo, jogos ao vivo e odds boost com comparação rápida entre eventos.',
    impact: 'Always-on',
  },
  {
    id: 'casinoInterstitial',
    label: 'Casino interstitial',
    shortLabel: 'Interstitial',
    description: 'Overlay de ecrã quase inteiro que interrompe a navegação com oferta de casino e fecho explícito.',
    bestFor: 'Campanhas 18+, bónus de boas-vindas, jackpots e reactivação com mensagem de alto impacto.',
    impact: 'Interrupção',
  },
  {
    id: 'pickWin',
    label: 'Pick & Win',
    shortLabel: 'Pick',
    description: 'Formato interactivo de escolha rápida: o utilizador toca numa opção, recebe feedback e desbloqueia o CTA.',
    bestFor: 'Sports betting, casino, lead generation e campanhas com oferta que beneficiam de uma micro-acção antes do clique.',
    impact: 'CTR intent',
  },
  {
    id: 'swipePick',
    label: 'Swipe Pick',
    shortLabel: 'Swipe',
    description: 'Formato horizontal em que o utilizador desliza para a esquerda ou direita para escolher uma pick e revelar o CTA.',
    bestFor: 'Sports betting 18+, match picks, odds boost e campanhas que querem usar um gesto natural mobile antes do clique.',
    impact: 'Swipe intent',
  },
  {
    id: 'scrollUnlock',
    label: 'Scroll Unlock',
    shortLabel: 'Unlock',
    description: 'Formato em que o scroll do utilizador carrega uma barra de progresso até desbloquear uma oferta e activar o clique final.',
    bestFor: 'Betting, casino, promoções por recompensa e campanhas que querem transformar scroll em intenção qualificada.',
    impact: 'Rewarded scroll',
  },
  {
    id: 'casinoCaptcha',
    label: 'Casino captcha',
    shortLabel: 'Captcha',
    description: 'Interstitial tipo captcha em que o utilizador selecciona símbolos vencedores antes de desbloquear o CTA.',
    bestFor: 'Casino 18+, campanhas de engagement, anti-scroll passivo e ofertas que pedem uma micro-validação lúdica.',
    impact: 'Verified click',
  },
]

const feedModes: Record<FeedMode, { label: string; edition: string; stories: Story[] }> = {
  sports: {
    label: 'Sports',
    edition: 'Champions League edition',
    stories: [
      {
        eyebrow: 'Football',
        title: 'Treinador muda o onze inicial antes do jogo decisivo',
        summary: 'A equipa testa um meio-campo mais agressivo para controlar a posse nos primeiros minutos.',
        image: '/figma/asset-3.jpg',
        time: '12 min',
      },
      {
        eyebrow: 'Tactical view',
        title: 'Análise: por que a pressão alta voltou a decidir finais',
        summary: 'Os dados mostram que recuperações no último terço aumentaram 18% esta época.',
        image: '/figma/asset-13.jpg',
        time: '28 min',
      },
      {
        eyebrow: 'Transfer market',
        title: 'Clube prepara proposta por extremo de 21 anos',
        summary: 'A prioridade é velocidade no corredor esquerdo e margem de valorização.',
        image: '/figma/asset-11.jpg',
        time: '43 min',
      },
      {
        eyebrow: 'Injury report',
        title: 'Capitão regressa aos treinos com minutos controlados',
        summary: 'A equipa médica prefere uma integração gradual antes da sequência de jogos decisiva.',
        image: '/figma/asset-4.jpg',
        time: '58 min',
      },
      {
        eyebrow: 'Data room',
        title: 'Mapa de calor confirma subida dos laterais na segunda parte',
        summary: 'A equipa ganhou largura e criou mais oportunidades em cruzamentos atrasados.',
        image: '/figma/asset-10.jpg',
        time: '1 h',
      },
      {
        eyebrow: 'Fans',
        title: 'Bilhetes esgotam em 11 minutos para a meia-final',
        summary: 'A procura disparou depois da vitória fora e o clube prepara uma fan zone extra.',
        image: '/figma/asset-8.jpg',
        time: '2 h',
      },
      {
        eyebrow: 'Opinion',
        title: 'O detalhe que pode decidir a eliminatória europeia',
        summary: 'A gestão dos primeiros quinze minutos será crítica para controlar transições.',
        image: '/figma/asset-16.jpg',
        time: '3 h',
      },
    ],
  },
  business: {
    label: 'Business',
    edition: 'Markets morning brief',
    stories: [
      {
        eyebrow: 'Markets',
        title: 'Bolsas europeias sobem com tecnologia e energia em destaque',
        summary: 'Investidores reagem a resultados trimestrais acima das expectativas.',
        image: '/figma/asset-17.jpg',
        time: '9 min',
      },
      {
        eyebrow: 'Startups',
        title: 'Nova ronda de investimento acelera expansão ibérica',
        summary: 'A empresa vai reforçar equipas de produto, dados e vendas enterprise.',
        image: '/figma/asset-23.jpg',
        time: '31 min',
      },
      {
        eyebrow: 'Retail',
        title: 'Marcas testam lojas menores com inventário inteligente',
        summary: 'O modelo combina previsão de procura local com recolha em loja.',
        image: '/figma/asset-8.jpg',
        time: '1 h',
      },
      {
        eyebrow: 'Energy',
        title: 'Produtores renováveis assinam contratos de longo prazo',
        summary: 'A estabilidade de preços ganha peso nas decisões de procurement empresarial.',
        image: '/figma/asset-4.jpg',
        time: '1 h',
      },
      {
        eyebrow: 'Banking',
        title: 'Bancos digitais reforçam equipas de compliance em Lisboa',
        summary: 'A expansão europeia aumenta a procura por perfis de risco e segurança.',
        image: '/figma/asset-10.jpg',
        time: '2 h',
      },
      {
        eyebrow: 'Media',
        title: 'Publishers apostam em paywalls flexíveis e bundles',
        summary: 'As receitas de subscrição crescem quando o preço acompanha frequência de leitura.',
        image: '/figma/asset-16.jpg',
        time: '2 h',
      },
      {
        eyebrow: 'Mobility',
        title: 'Frotas urbanas adoptam modelos por subscrição',
        summary: 'Empresas reduzem investimento inicial e ganham previsibilidade operacional.',
        image: '/figma/asset-24.jpg',
        time: '3 h',
      },
    ],
  },
  lifestyle: {
    label: 'Lifestyle',
    edition: 'Weekend city guide',
    stories: [
      {
        eyebrow: 'Travel',
        title: 'Cinco hotéis boutique para uma escapadinha sem carro',
        summary: 'Destinos compactos, boa comida e ligações directas a partir de Lisboa.',
        image: '/figma/asset-22.jpg',
        time: '16 min',
      },
      {
        eyebrow: 'Food',
        title: 'Restaurantes com menus curtos ganham espaço na cidade',
        summary: 'Menos pratos, melhor rotação e uma experiência mais fácil de escolher.',
        image: '/figma/asset-15.jpg',
        time: '38 min',
      },
      {
        eyebrow: 'Culture',
        title: 'Galerias independentes apostam em visitas nocturnas',
        summary: 'O novo calendário junta música, conversa e edições limitadas.',
        image: '/figma/asset-25.jpg',
        time: '52 min',
      },
      {
        eyebrow: 'Wellness',
        title: 'Spas urbanos criam sessões curtas para pausas de almoço',
        summary: 'A proposta combina conveniência, reserva digital e tratamentos de 25 minutos.',
        image: '/figma/asset-1.jpg',
        time: '1 h',
      },
      {
        eyebrow: 'Design',
        title: 'Lojas conceito misturam café, showroom e eventos',
        summary: 'O espaço físico passa a funcionar como ponto de descoberta e comunidade.',
        image: '/figma/asset-10.jpg',
        time: '1 h',
      },
      {
        eyebrow: 'Music',
        title: 'Clubes pequenos recuperam noites com curadoria local',
        summary: 'Programações mais compactas tornam a experiência mais previsível e rentável.',
        image: '/figma/asset-24.jpg',
        time: '2 h',
      },
      {
        eyebrow: 'Shopping',
        title: 'Marcas premium testam drops com lista de espera',
        summary: 'A escassez controlada permite medir procura antes de aumentar produção.',
        image: '/figma/asset-23.jpg',
        time: '3 h',
      },
    ],
  },
}

function DeviceIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <rect x="7" y="2.75" width="10" height="18.5" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 2.8 14.3 9l6.5 1.1-5 4.3 1.5 6.4L12 17.4l-5.3 3.4 1.5-6.4-5-4.3L9.7 9z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m7 7 10 10M17 7 7 17" />
    </svg>
  )
}

function StoryCard({ story, compact = false }: { story: Story; compact?: boolean }) {
  return (
    <article className={compact ? 'story-card story-card-compact' : 'story-card'}>
      <img src={story.image} alt="" />
      <div>
        <span>{story.eyebrow}</span>
        <h3>{story.title}</h3>
        {!compact ? <p>{story.summary}</p> : null}
        <small>{story.time} ago</small>
      </div>
    </article>
  )
}

function NativeAd() {
  return (
    <article className="native-ad">
      <div className="ad-label">Publicidade</div>
      <div className="native-ad-grid">
        <div>
          <span>Better Things Studio</span>
          <h3>Uma nova forma de lançar campanhas mobile em 48 horas.</h3>
          <p>Teste criativos, mensagens e CTAs com placements editoriais realistas.</p>
          <button type="button">Ver demo</button>
        </div>
        <div className="native-visual">
          <strong>+31%</strong>
          <small>viewable attention</small>
        </div>
      </div>
    </article>
  )
}

function InterscrollerAd() {
  return (
    <section className="interscroller-ad">
      <div className="ad-label">Publicidade</div>
      <div className="interscroller-copy">
        <span>Premium format</span>
        <h3>Creative reveal durante o scroll</h3>
        <p>Ideal para campanhas com imagem forte e uma única mensagem.</p>
      </div>
    </section>
  )
}

function CasinoScrollAd() {
  return (
    <section className="casino-scroll-ad">
      <div className="casino-stage">
        <div className="casino-chip casino-chip-one">18+</div>
        <div className="casino-chip casino-chip-two">JP</div>
        <div className="casino-card casino-card-left">A</div>
        <div className="casino-card casino-card-right">K</div>
        <div className="casino-copy">
          <div className="ad-label">Publicidade 18+</div>
          <span>Scroll jackpot</span>
          <h3>O prémio revela-se à medida que desces</h3>
          <p>Formato para casino com CTA responsável, sinalização clara e uma mensagem curta.</p>
          <button type="button">Ver oferta</button>
          <small>Joga com responsabilidade. Aplicam-se termos e condições.</small>
        </div>
      </div>
    </section>
  )
}

function CasinoInterstitialAd({ dismissed, onDismiss }: { dismissed: boolean; onDismiss: () => void }) {
  if (dismissed) {
    return null
  }

  return (
    <aside className="casino-interstitial" aria-label="Casino interstitial advertising">
      <div className="casino-interstitial-card">
        <button className="casino-interstitial-close" aria-label="Fechar anúncio" onClick={onDismiss} type="button">
          <CloseIcon />
        </button>
        <div className="ad-label">Publicidade 18+</div>
        <div className="casino-interstitial-brand">ROYAL SPIN</div>
        <div className="casino-interstitial-prize">
          <span>Welcome bonus</span>
          <strong>100% até 200 EUR</strong>
        </div>
        <div className="casino-reels" aria-hidden="true">
          <div className="casino-reel">
            <span>🍒</span>
            <span>BAR</span>
            <span>5</span>
            <span>💎</span>
            <span>9</span>
            <span>7</span>
          </div>
          <div className="casino-reel">
            <span>BAR</span>
            <span>🍋</span>
            <span>8</span>
            <span>💎</span>
            <span>3</span>
            <span>7</span>
          </div>
          <div className="casino-reel">
            <span>💎</span>
            <span>6</span>
            <span>BAR</span>
            <span>🍒</span>
            <span>2</span>
            <span>7</span>
          </div>
        </div>
        <p>Activa free spins no primeiro depósito e experimenta os jogos em destaque.</p>
        <button className="casino-interstitial-cta" type="button">
          Ver oferta
        </button>
        <small>Joga com responsabilidade. Aplicam-se termos e condições.</small>
      </div>
    </aside>
  )
}

const captchaSymbols = [
  { id: 's1', value: '7', winning: true },
  { id: 's2', value: 'BAR', winning: false },
  { id: 's3', value: '🍒', winning: false },
  { id: 's4', value: '7', winning: true },
  { id: 's5', value: '💎', winning: false },
  { id: 's6', value: '7', winning: true },
]

function CasinoCaptchaAd({ dismissed, onDismiss }: { dismissed: boolean; onDismiss: () => void }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const winningIds = captchaSymbols.filter((symbol) => symbol.winning).map((symbol) => symbol.id)
  const isVerified = winningIds.every((id) => selectedIds.includes(id)) && selectedIds.every((id) => winningIds.includes(id))

  if (dismissed) {
    return null
  }

  function toggleSymbol(id: string) {
    setSelectedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  return (
    <aside className="casino-captcha" aria-label="Casino captcha interstitial advertising">
      <div className="casino-captcha-card">
        <button className="casino-interstitial-close" aria-label="Fechar anúncio" onClick={onDismiss} type="button">
          <CloseIcon />
        </button>
        <div className="ad-label">Publicidade 18+</div>
        <div className="captcha-title">
          <span>Royal Spin verification</span>
          <h3>Selecciona todos os 7</h3>
          <p>Completa o desafio para revelar a oferta de free spins.</p>
        </div>

        <div className="captcha-grid" role="group" aria-label="Símbolos casino captcha">
          {captchaSymbols.map((symbol) => (
            <button
              aria-pressed={selectedIds.includes(symbol.id)}
              className={selectedIds.includes(symbol.id) ? 'captcha-symbol captcha-symbol-selected' : 'captcha-symbol'}
              key={symbol.id}
              onClick={() => toggleSymbol(symbol.id)}
              type="button"
            >
              {symbol.value}
            </button>
          ))}
        </div>

        <div className={isVerified ? 'captcha-status captcha-status-ok' : 'captcha-status'}>
          {isVerified ? 'Verificação concluída: 777 encontrado' : `${selectedIds.length}/3 símbolos seleccionados`}
        </div>

        <button className="captcha-cta" disabled={!isVerified} type="button">
          {isVerified ? 'Activar free spins' : 'Completa o captcha'}
        </button>
        <small>Joga com responsabilidade. Aplicam-se termos e condições.</small>
      </div>
    </aside>
  )
}

const pickOptions = [
  { id: 'goal', label: 'Golo cedo', value: '2.85', result: 'Boost activo' },
  { id: 'cards', label: '+4 cartões', value: '3.10', result: 'Mais escolhido' },
  { id: 'corner', label: '+8 cantos', value: '2.40', result: 'Oferta revelada' },
]

function PickWinAd() {
  const [pickedOption, setPickedOption] = useState<string | null>(null)
  const selected = pickOptions.find((option) => option.id === pickedOption)

  return (
    <section className={pickedOption ? 'pick-win-ad pick-win-ad-revealed' : 'pick-win-ad'}>
      <div className="pick-win-live">Live challenge</div>
      <div className="pick-win-header">
        <span>Publicidade 18+</span>
        <h3>{pickedOption ? 'Oferta desbloqueada' : 'Escolhe o momento do jogo'}</h3>
        <p>
          {pickedOption
            ? `${selected?.label}: odds boost disponível durante 10 minutos.`
            : 'Toca numa opção para revelar a odd aumentada antes do próximo lance.'}
        </p>
      </div>

      <div className="pick-win-options">
        {pickOptions.map((option) => (
          <button
            className={option.id === pickedOption ? 'pick-option pick-option-selected' : 'pick-option'}
            key={option.id}
            onClick={() => setPickedOption(option.id)}
            type="button"
          >
            <span>{option.label}</span>
            <strong>{option.value}</strong>
            <small>{option.id === pickedOption ? option.result : 'Tap to reveal'}</small>
          </button>
        ))}
      </div>

      <div className="pick-win-footer">
        <button disabled={!pickedOption} type="button">
          {pickedOption ? 'Apostar agora' : 'Escolhe uma opção'}
        </button>
        <small>Joga com responsabilidade. Aplicam-se termos e condições.</small>
      </div>
    </section>
  )
}

const swipeDeck = [
  {
    id: 'benfica-porto',
    league: 'Liga Portugal',
    fixture: 'Benfica vs Porto',
    homeClub: { name: 'Benfica', crest: 'SLB', color: '#d91e2e' },
    awayClub: { name: 'Porto', crest: 'FCP', color: '#1264d6' },
    left: 'Under 2.5',
    right: 'Over 2.5',
    oddsLeft: '2.12',
    oddsRight: '2.68',
  },
  {
    id: 'sporting-braga',
    league: 'Taça',
    fixture: 'Sporting vs Braga',
    homeClub: { name: 'Sporting', crest: 'SCP', color: '#149b56' },
    awayClub: { name: 'Braga', crest: 'SCB', color: '#b61e2d' },
    left: 'Casa vence',
    right: 'Ambas marcam',
    oddsLeft: '1.94',
    oddsRight: '2.24',
  },
  {
    id: 'arsenal-city',
    league: 'Premier',
    fixture: 'Arsenal vs City',
    homeClub: { name: 'Arsenal', crest: 'ARS', color: '#cb2433' },
    awayClub: { name: 'Man City', crest: 'MCI', color: '#7acbff' },
    left: 'Menos cartões',
    right: '+8 cantos',
    oddsLeft: '2.06',
    oddsRight: '2.31',
  },
] as const

function SwipePickAd() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [pickedSide, setPickedSide] = useState<'left' | 'right' | null>(null)
  const [pickedSummary, setPickedSummary] = useState<{ label: string; odds: string } | null>(null)
  const [dragOffset, setDragOffset] = useState(0)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef<number | null>(null)
  const currentCard = swipeDeck[activeIndex]
  const nextCard = swipeDeck[activeIndex + 1]

  function commitSwipe(nextSide: 'left' | 'right') {
    if (!currentCard) {
      return
    }

    setPickedSummary({
      label: nextSide === 'left' ? currentCard.left : currentCard.right,
      odds: nextSide === 'left' ? currentCard.oddsLeft : currentCard.oddsRight,
    })
    setPickedSide(nextSide)
    setIsAnimatingOut(true)
    setDragOffset(nextSide === 'left' ? -260 : 260)

    window.setTimeout(() => {
      setActiveIndex((current) => Math.min(current + 1, swipeDeck.length - 1))
      setDragOffset(0)
      setIsAnimatingOut(false)
      setIsDragging(false)
    }, 220)
  }

  function handlePointerStart(clientX: number) {
    startXRef.current = clientX
    setIsDragging(true)
  }

  function handlePointerMove(clientX: number) {
    if (startXRef.current === null) {
      return
    }

    const delta = clientX - startXRef.current
    const limitedDelta = Math.max(-94, Math.min(94, delta))
    setDragOffset(limitedDelta)
  }

  function handlePointerEnd(clientX: number) {
    if (startXRef.current === null) {
      return
    }

    const delta = clientX - startXRef.current
    startXRef.current = null
    setIsDragging(false)

    if (delta <= -48) {
      commitSwipe('left')
      return
    }

    if (delta >= 48) {
      commitSwipe('right')
      return
    }

    setDragOffset(0)
  }

  const cardRotation = dragOffset / 14
  const leftLabelVisible = dragOffset < -16
  const rightLabelVisible = dragOffset > 16
  const hasChoice = pickedSide !== null
  const cardStyle = isDragging || isAnimatingOut || dragOffset !== 0 ? { transform: `translateX(${dragOffset}px) rotate(${cardRotation}deg)` } : undefined

  return (
    <section className={hasChoice ? 'swipe-pick-ad swipe-pick-ad-picked' : 'swipe-pick-ad'}>
      <div className="swipe-pick-header">
        <span>Publicidade 18+</span>
        <h3>{hasChoice ? 'Swipe registado' : 'Escolhe a pick com swipe'}</h3>
        <p>
          {hasChoice
            ? `${pickedSummary?.label}: odd ${pickedSummary?.odds} pronta para explorar.`
            : 'Arrasta o card para a esquerda ou direita, como num match swipe, para desbloquear o CTA.'}
        </p>
      </div>

      <div className="swipe-pick-arena">
        <div className={leftLabelVisible ? 'swipe-pick-side swipe-pick-side-left swipe-pick-side-visible' : 'swipe-pick-side swipe-pick-side-left'}>
          <small>Swipe left</small>
          <strong>{currentCard?.left ?? 'Under 2.5'}</strong>
          <span>{currentCard?.oddsLeft ?? '2.12'}</span>
        </div>

        <div className={rightLabelVisible ? 'swipe-pick-side swipe-pick-side-right swipe-pick-side-visible' : 'swipe-pick-side swipe-pick-side-right'}>
          <small>Swipe right</small>
          <strong>{currentCard?.right ?? 'Over 2.5'}</strong>
          <span>{currentCard?.oddsRight ?? '2.68'}</span>
        </div>

        {nextCard ? (
          <div className="swipe-pick-card swipe-pick-card-back" aria-hidden="true">
            <div className="swipe-pick-card-clubs">
              <div className="swipe-club-badge" style={{ '--club-color': nextCard.homeClub.color } as CSSProperties}>
                {nextCard.homeClub.crest}
              </div>
              <span>vs</span>
              <div className="swipe-club-badge" style={{ '--club-color': nextCard.awayClub.color } as CSSProperties}>
                {nextCard.awayClub.crest}
              </div>
            </div>
            <span>{nextCard.league}</span>
            <strong>{nextCard.fixture}</strong>
            <small>{nextCard.left} / {nextCard.right}</small>
          </div>
        ) : null}

        {currentCard ? (
          <button
            className={
              isAnimatingOut
                ? `swipe-pick-card swipe-pick-card-front swipe-pick-card-${pickedSide}`
                : isDragging
                  ? 'swipe-pick-card swipe-pick-card-front'
                  : 'swipe-pick-card swipe-pick-card-front swipe-pick-card-idle'
            }
            onMouseDown={(event) => handlePointerStart(event.clientX)}
            onMouseMove={(event) => handlePointerMove(event.clientX)}
            onMouseUp={(event) => handlePointerEnd(event.clientX)}
            onMouseLeave={(event) => handlePointerEnd(event.clientX)}
            onTouchStart={(event) => handlePointerStart(event.touches[0].clientX)}
            onTouchMove={(event) => handlePointerMove(event.touches[0].clientX)}
            onTouchEnd={(event) => handlePointerEnd(event.changedTouches[0].clientX)}
            style={cardStyle}
            type="button"
          >
            <div className="swipe-pick-card-top">
              <div className="swipe-pick-card-clubs">
                <div className="swipe-club-badge" style={{ '--club-color': currentCard.homeClub.color } as CSSProperties}>
                  {currentCard.homeClub.crest}
                </div>
                <span>vs</span>
                <div className="swipe-club-badge" style={{ '--club-color': currentCard.awayClub.color } as CSSProperties}>
                  {currentCard.awayClub.crest}
                </div>
              </div>
              <span>{currentCard.league}</span>
              <strong>{currentCard.fixture}</strong>
            </div>
            <div className="swipe-pick-card-markets">
              <div>
                <small>Left</small>
                <b>{currentCard.left}</b>
                <em>{currentCard.oddsLeft}</em>
              </div>
              <div>
                <small>Right</small>
                <b>{currentCard.right}</b>
                <em>{currentCard.oddsRight}</em>
              </div>
            </div>
            <div className="swipe-pick-card-hint">Swipe to choose</div>
          </button>
        ) : null}
      </div>

      <div className="swipe-pick-footer">
        <button disabled={!hasChoice} type="button">
          {hasChoice ? 'Ver odds' : 'Desliza para escolher'}
        </button>
        <small>Joga com responsabilidade. Aplicam-se termos e condições.</small>
      </div>
    </section>
  )
}

function ScrollUnlockAd({
  feedRef,
}: {
  feedRef: { current: HTMLElement | null }
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const feedElement = feedRef.current

    if (!feedElement) {
      return
    }

    let unlocked = false
    let frame = 0

    const updateProgress = () => {
      const maxScroll = Math.max(1, feedElement.scrollHeight - feedElement.clientHeight)
      const rawProgress = Math.max(0, Math.min(1, feedElement.scrollTop / (maxScroll * 0.46)))

      if (rawProgress >= 0.78) {
        unlocked = true
      }

      setProgress(unlocked ? 1 : rawProgress)
    }

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updateProgress)
    }

    scheduleUpdate()
    feedElement.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      cancelAnimationFrame(frame)
      feedElement.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [feedRef])

  const progressPercent = Math.round(progress * 100)
  const isUnlocked = progress >= 1
  const statusCopy =
    progressPercent < 25
      ? 'Continua a deslizar para carregar a oferta.'
      : progressPercent < 50
        ? 'Progresso detectado. Mantém o scroll.'
        : progressPercent < 75
          ? 'Oferta a aquecer. Já falta pouco.'
          : progressPercent < 100
            ? 'Quase desbloqueado. Continua mais um pouco.'
            : 'Oferta desbloqueada. Agora tens de clicar.'

  return (
    <aside className="scroll-unlock-ad" aria-label="Scroll unlock advertising">
      <div className="scroll-unlock-topline">
        <span>Publicidade 18+</span>
        <strong>{isUnlocked ? 'Unlock complete' : 'Scroll to unlock'}</strong>
      </div>

      <h3>{isUnlocked ? 'Odd boost desbloqueada' : 'Faz scroll para desbloquear a oferta'}</h3>
      <p>{statusCopy}</p>

      <div className="scroll-unlock-progress">
        <div className="scroll-unlock-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      <button className="scroll-unlock-cta" disabled={!isUnlocked} type="button">
        {isUnlocked ? 'Ver oferta 2.80 boost' : 'Desbloqueia com scroll'}
      </button>
      <small>Joga com responsabilidade. Aplicam-se termos e condições.</small>
    </aside>
  )
}

function SportsCuecardAd() {
  return (
    <section className="cuecard-ad">
      <div className="cuecard-shell">
        <div className="ad-label">Publicidade 18+</div>
        <div className="cuecard-brand">
          <span>BETRUSH</span>
          <strong>Odds Boost</strong>
        </div>
        <div className="cuecard-frames" aria-label="Sports betting cuecard frames">
          <article className="cuecard-frame cuecard-frame-one">
            <span>Frame 1</span>
            <h3>Benfica vs Porto</h3>
            <p>Super odds no primeiro golo até ao apito inicial.</p>
          </article>
          <article className="cuecard-frame cuecard-frame-two">
            <span>Frame 2</span>
            <h3>2.75</h3>
            <p>Boost activo para novos utilizadores verificados.</p>
          </article>
          <article className="cuecard-frame cuecard-frame-three">
            <span>Frame 3</span>
            <h3>Aposta antes do jogo</h3>
            <p>Termos aplicáveis. Joga com responsabilidade.</p>
          </article>
        </div>
        <button type="button">Ver odds</button>
        <small>18+. Apenas para utilizadores elegíveis. Aplicam-se termos e condições.</small>
      </div>
    </section>
  )
}

const bettingMatches = [
  { home: 'MEX', away: 'RSA', time: '20:00', date: 'Thu 11 June', flagA: '🇲🇽', flagB: '🇿🇦', boost: '+68% probability of over 2.5 goals' },
  { home: 'POR', away: 'ESP', time: '21:00', date: 'Fri 12 June', flagA: '🇵🇹', flagB: '🇪🇸', boost: '+42% probability of both teams scoring' },
  { home: 'BRA', away: 'GER', time: '18:30', date: 'Sat 13 June', flagA: '🇧🇷', flagB: '🇩🇪', boost: '+55% probability of home win' },
]

function Bet365TopOddsAd() {
  const matchLoop = [...bettingMatches, ...bettingMatches]

  return (
    <aside className="bet365-top-ad" aria-label="bet365 top odds advertising">
      <div className="bet365-row">
        <div className="bet365-brand-card">
          <div className="bet365-logo" aria-label="bet365">
            <span>bet</span>
            <strong>365</strong>
          </div>
          <button type="button">Bet now</button>
        </div>

        <div className="bet365-carousel" aria-label="Jogos em destaque">
          <div className="bet365-track">
            {matchLoop.map((match, index) => (
              <article className="bet365-match-card" key={`${match.home}-${match.away}-${index}`}>
                <div className="bet365-boost">✦ {match.boost}</div>
                <div className="bet365-teams">
                  <div>
                    <span>{match.flagA}</span>
                    <strong>{match.home}</strong>
                  </div>
                  <div className="bet365-time">
                    <strong>{match.time}</strong>
                    <span>{match.date}</span>
                  </div>
                  <div>
                    <span>{match.flagB}</span>
                    <strong>{match.away}</strong>
                  </div>
                </div>
                <div className="bet365-odds">
                  <button type="button">
                    <span>1</span>
                    2.05
                  </button>
                  <button type="button">
                    <span>X</span>
                    2.05
                  </button>
                  <button type="button">
                    <span>2</span>
                    2.05
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

function ScrollGateAd({ unlocked, onUnlock }: { unlocked: boolean; onUnlock: () => void }) {
  return (
    <section className={unlocked ? 'scroll-gate-ad scroll-gate-ad-unlocked' : 'scroll-gate-ad'}>
      <div className="gate-creative">
        <div className="ad-label">Publicidade</div>
        <span>Interactive gate</span>
        <h3>{unlocked ? 'Feed desbloqueado' : 'Clica para continuar o scroll'}</h3>
        <p>
          {unlocked
            ? 'A experiência continua e o utilizador regressa ao conteúdo editorial.'
            : 'Este formato força uma micro-acção antes de revelar o bloco seguinte.'}
        </p>
        <button disabled={unlocked} onClick={onUnlock} type="button">
          {unlocked ? 'Desbloqueado' : 'Continuar'}
        </button>
      </div>
    </section>
  )
}

function StickyAd() {
  return (
    <div className="sticky-ad">
      <div>
        <span>Ad preview</span>
        <strong>Better Things</strong>
      </div>
      <button type="button">Abrir</button>
      <button className="ad-close" aria-label="Fechar anúncio" type="button">
        <CloseIcon />
      </button>
    </div>
  )
}

function TakeoverAd() {
  return (
    <section className="takeover-ad">
      <div className="ad-label">Patrocinado</div>
      <h2>Live match center</h2>
      <p>Odds, estatísticas e highlights num formato de topo.</p>
      <button type="button">Explorar</button>
    </section>
  )
}

function PhonePreview({ activeFormat, feedMode }: { activeFormat: AdFormat; feedMode: FeedMode }) {
  const feed = feedModes[feedMode] ?? feedModes.sports
  const [hero, second, third, ...moreStories] = feed.stories
  const extendedStories = [...moreStories, hero, second, third, ...moreStories]
  const mobileFeedRef = useRef<HTMLElement | null>(null)
  const [gateState, setGateState] = useState<{ format: AdFormat; unlocked: boolean }>({
    format: 'sticky',
    unlocked: false,
  })
  const [interstitialState, setInterstitialState] = useState<{ format: AdFormat; dismissed: boolean }>({
    format: 'sticky',
    dismissed: false,
  })
  const gateUnlocked = gateState.format === activeFormat && gateState.unlocked
  const interstitialDismissed = interstitialState.format === activeFormat && interstitialState.dismissed
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <section
      className={`phone-shell format-${activeFormat} ${interstitialDismissed ? 'interstitial-dismissed' : ''}`}
      aria-label="Pré-visualização mobile"
    >
      <div className="phone-device">
        <div className="phone-sensor" />
        <div className="mobile-site">
          <div className="ios-status-bar" aria-label="iPhone status bar">
            <strong>9:41</strong>
            <div className="ios-status-icons" aria-hidden="true">
              <span className="signal-icon" />
              <span className="wifi-icon" />
              <span className="battery-icon" />
            </div>
          </div>

          <header className="mobile-header">
            <strong>PulseDaily</strong>
            <span>11:34</span>
          </header>

            {activeFormat === 'bet365' ? <Bet365TopOddsAd /> : null}
            {activeFormat === 'takeover' ? <TakeoverAd /> : null}
            {activeFormat === 'casinoInterstitial' ? (
              <CasinoInterstitialAd
                dismissed={interstitialDismissed}
                onDismiss={() => setInterstitialState({ format: activeFormat, dismissed: true })}
              />
            ) : null}
            {activeFormat === 'casinoCaptcha' ? (
              <CasinoCaptchaAd
                dismissed={interstitialDismissed}
                onDismiss={() => setInterstitialState({ format: activeFormat, dismissed: true })}
              />
            ) : null}

            <main className="mobile-feed" ref={mobileFeedRef}>
              <div className="edition-row">
                <span>{feed.label}</span>
                <small>{feed.edition}</small>
              </div>

              <article className="hero-story">
                <img src={hero.image} alt="" />
                <div className="hero-copy">
                  <span>{hero.eyebrow}</span>
                  <h2>{hero.title}</h2>
                </div>
              </article>

              <div className="two-up">
                <StoryCard story={second} compact />
                <StoryCard story={third} compact />
              </div>

              {activeFormat === 'native' ? <NativeAd /> : null}

              <div className="tab-row">
                <span>Resultados</span>
                <span>Tabela</span>
                <span>Vídeo</span>
              </div>

              {activeFormat === 'interscroller' ? <InterscrollerAd /> : null}
              {activeFormat === 'casino' ? <CasinoScrollAd /> : null}
              {activeFormat === 'cuecard' ? <SportsCuecardAd /> : null}
              {activeFormat === 'pickWin' ? <PickWinAd /> : null}
              {activeFormat === 'swipePick' ? <SwipePickAd /> : null}
              {activeFormat === 'gate' ? (
                <ScrollGateAd unlocked={gateUnlocked} onUnlock={() => setGateState({ format: activeFormat, unlocked: true })} />
              ) : null}

              {activeFormat !== 'gate' || gateUnlocked ? (
                <>
                  <section className="feed-section-label">
                    <span>Mais recentes</span>
                    <small>{extendedStories.length} novas histórias</small>
                  </section>
                  {extendedStories.map((story, index) => (
                    <StoryCard key={`${story.title}-${index}`} story={story} />
                  ))}
                </>
              ) : (
                <div className="locked-feed-preview" aria-hidden="true">
                  {extendedStories.slice(0, 3).map((story, index) => (
                    <StoryCard key={`${story.title}-locked-${index}`} story={story} />
                  ))}
                </div>
              )}
            </main>

            <div className="safari-bottom-bar" aria-label="Safari search and navigation bar">
              <div className="safari-address">
                <span className="tab-icon" aria-hidden="true" />
                <strong>demo.publisher.test</strong>
                <button aria-label="Refresh page" className="reload-icon-button" onClick={handleRefresh} type="button">
                  <span className="reload-icon" aria-hidden="true">
                    ↻
                  </span>
                </button>
              </div>
              <div className="safari-nav">
                <button aria-label="Back" type="button">‹</button>
                <button aria-label="Forward" type="button">›</button>
                <button aria-label="Share" type="button">⌂</button>
                <button aria-label="Bookmarks" type="button">□</button>
                <button aria-label="Tabs" type="button">▢</button>
              </div>
            </div>

            {activeFormat === 'scrollUnlock' ? <ScrollUnlockAd feedRef={mobileFeedRef} /> : null}
            {activeFormat === 'sticky' ? <StickyAd /> : null}
        </div>
      </div>
    </section>
  )
}

function FormatSelector({
  activeFormat,
  onFormatChange,
}: {
  activeFormat: AdFormat
  onFormatChange: (format: AdFormat) => void
}) {
  return (
    <section className="control-section">
      <div className="section-heading">
        <span>Formatos</span>
        <h2>Escolhe o placement</h2>
      </div>
      <div className="format-list">
        {formatOptions.map((format) => (
          <button
            aria-pressed={activeFormat === format.id}
            className={activeFormat === format.id ? 'format-option format-option-active' : 'format-option'}
            key={format.id}
            onClick={() => onFormatChange(format.id)}
            type="button"
          >
            <span>{format.shortLabel}</span>
            <strong>{format.label}</strong>
            <small>{format.impact}</small>
          </button>
        ))}
      </div>
    </section>
  )
}

function ContextSelector({ feedMode, onFeedModeChange }: { feedMode: FeedMode; onFeedModeChange: (mode: FeedMode) => void }) {
  return (
    <section className="control-section">
      <div className="section-heading">
        <span>Contexto</span>
        <h2>Ambiente editorial</h2>
      </div>
      <div className="segmented-control" role="tablist" aria-label="Ambiente editorial">
        {(Object.keys(feedModes) as FeedMode[]).map((mode) => (
          <button
            aria-selected={feedMode === mode}
            className={feedMode === mode ? 'segment-active' : ''}
            key={mode}
            onClick={() => onFeedModeChange(mode)}
            type="button"
          >
            {feedModes[mode].label}
          </button>
        ))}
      </div>
    </section>
  )
}

function Inspector({ activeFormat }: { activeFormat: AdFormat }) {
  const current = formatOptions.find((format) => format.id === activeFormat) ?? formatOptions[0]

  const metrics = useMemo(
    () => [
      {
        label: 'Viewability',
        value:
          activeFormat === 'sticky'
            ? '94%'
            : activeFormat === 'native'
              ? '71%'
              : activeFormat === 'interscroller'
                ? '86%'
                : activeFormat === 'casino'
                  ? '91%'
                  : activeFormat === 'gate'
                    ? '99%'
                    : activeFormat === 'cuecard'
                      ? '84%'
                      : activeFormat === 'bet365'
                        ? '96%'
                        : activeFormat === 'casinoInterstitial'
                          ? '100%'
                          : activeFormat === 'pickWin'
                            ? '89%'
                            : activeFormat === 'swipePick'
                              ? '92%'
                              : activeFormat === 'scrollUnlock'
                                ? '93%'
                            : activeFormat === 'casinoCaptcha'
                              ? '97%'
                        : '98%',
      },
      {
        label: 'Intrusão',
        value:
          activeFormat === 'takeover' || activeFormat === 'gate' || activeFormat === 'casinoInterstitial'
            ? 'Alta'
            : activeFormat === 'native'
              ? 'Baixa'
              : activeFormat === 'casino'
                ? 'Média'
                : activeFormat === 'cuecard'
                    ? 'Média'
                    : activeFormat === 'bet365'
                      ? 'Média'
                      : activeFormat === 'pickWin'
                        ? 'Baixa'
                        : activeFormat === 'swipePick'
                          ? 'Baixa'
                          : activeFormat === 'scrollUnlock'
                            ? 'Baixa'
                        : activeFormat === 'casinoCaptcha'
                          ? 'Alta'
                    : 'Média',
      },
      {
        label: 'Setup',
        value:
          activeFormat === 'native'
            ? 'Editorial'
            : activeFormat === 'sticky'
              ? 'Rápido'
              : activeFormat === 'casino'
                ? '18+ rules'
                : activeFormat === 'gate'
                  ? 'Consent'
                  : activeFormat === 'cuecard'
                    ? '3 frames'
                    : activeFormat === 'bet365'
                        ? 'Live feed'
                      : activeFormat === 'casinoInterstitial'
                        ? 'Overlay'
                        : activeFormat === 'pickWin'
                          ? 'Micro game'
                          : activeFormat === 'swipePick'
                            ? 'Swipe logic'
                            : activeFormat === 'scrollUnlock'
                              ? 'Progress bar'
                          : activeFormat === 'casinoCaptcha'
                            ? 'Captcha'
                      : 'Premium',
      },
    ],
    [activeFormat],
  )

  return (
    <aside className="inspector">
      <div className="section-heading">
        <span>Resumo</span>
        <h2>{current.label}</h2>
      </div>
      <p>{current.description}</p>

      <dl className="metric-grid">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>

      <div className="recommendation">
        <SparkIcon />
        <div>
          <strong>Quando usar</strong>
          <span>{current.bestFor}</span>
        </div>
      </div>
    </aside>
  )
}

function App() {
  const [activeFormat, setActiveFormat] = useState<AdFormat>('bet365')
  const [feedMode, setFeedMode] = useState<FeedMode>('sports')

  return (
    <main className="app-shell">
      <section className="workspace">
        <aside className="left-rail">
          <div className="brand-block">
            <div className="brand-mark">
              <DeviceIcon />
            </div>
            <div>
              <span>Advertising prototype</span>
              <h1>Ad Format Lab</h1>
            </div>
          </div>

          <p className="intro-copy">
            Sandbox para testar formatos mobile em contexto editorial fake, com hierarquia, sinalização e comportamento
            próximos de um publisher real.
          </p>

          <FormatSelector activeFormat={activeFormat} onFormatChange={setActiveFormat} />
          <ContextSelector feedMode={feedMode} onFeedModeChange={setFeedMode} />
        </aside>

        <PhonePreview activeFormat={activeFormat} feedMode={feedMode} />
        <Inspector activeFormat={activeFormat} />
      </section>
    </main>
  )
}

export default App
