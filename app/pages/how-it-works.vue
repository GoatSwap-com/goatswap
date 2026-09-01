<template>
  <main class="page-main">
    <!-- Hero -->
    <section class="page-hero">
      <div class="orb orb-cyan page-orb-1 animate-pulse-glow" />
      <div class="orb orb-purple page-orb-2 animate-pulse-glow" />
      <div class="container">
        <div class="section-label">🗺️ Guide</div>
        <h1 class="section-title">
          How GoatSwap <span class="gradient-text">Works</span>
        </h1>
        <p class="section-subtitle">
          Trading on GoatSwap is as simple as 1-2-3. No sign-ups, no KYC — just connect and trade.
        </p>
      </div>
    </section>

    <!-- Steps -->
    <section class="section">
      <div class="container">
        <div class="steps-timeline">
          <div
            v-for="(step, i) in steps"
            :key="step.title"
            class="timeline-item"
          >
            <div class="timeline-visual">
              <div class="timeline-step-num">{{ String(i + 1).padStart(2, '0') }}</div>
              <div class="timeline-icon-wrap glass-card">
                <span class="timeline-icon">{{ step.icon }}</span>
              </div>
            </div>
            <div class="timeline-connector" v-if="i < steps.length - 1">
              <div class="connector-line" />
              <div class="connector-dot" />
            </div>
            <div class="timeline-content glass-card">
              <span class="timeline-tag">Step {{ i + 1 }}</span>
              <h3 class="timeline-title">{{ step.title }}</h3>
              <p class="timeline-desc">{{ step.desc }}</p>
              <ul class="timeline-details">
                <li v-for="d in step.details" :key="d">
                  <span class="detail-arrow">→</span>{{ d }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Under the Hood -->
    <section class="section tech-section">
      <div class="container">
        <div style="text-align:center; margin-bottom: 56px">
          <div class="section-label" style="display: inline-flex">⚙️ Technology</div>
          <h2 class="section-title">Under the <span class="gradient-text">Hood</span></h2>
          <p class="section-subtitle" style="margin: 0 auto">The cutting-edge tech stack powering every GoatSwap trade.</p>
        </div>

        <div class="tech-grid">
          <div v-for="tech in techStack" :key="tech.name" class="tech-item glass-card">
            <div class="tech-icon">{{ tech.icon }}</div>
            <div>
              <h4 class="tech-name">{{ tech.name }}</h4>
              <p class="tech-desc">{{ tech.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section">
      <div class="container">
        <div style="max-width: 720px; margin: 0 auto">
          <div class="section-label">❓ FAQ</div>
          <h2 class="section-title">Frequently Asked <span class="gradient-text">Questions</span></h2>

          <div class="faq-list" style="margin-top: 40px">
            <div
              v-for="faq in faqs"
              :key="faq.q"
              class="faq-item glass-card"
              @click="toggleFaq(faq)"
            >
              <div class="faq-header">
                <span class="faq-q">{{ faq.q }}</span>
                <span class="faq-chevron" :class="{ open: faq.open }">›</span>
              </div>
              <Transition name="faq">
                <p v-if="faq.open" class="faq-a">{{ faq.a }}</p>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { reactive } from 'vue'

useSeoMeta({
  title: 'How it Works — GoatSwap',
  description: 'Learn how GoatSwap DEX works: connect your wallet, choose tokens, confirm the trade. Start swapping in under 30 seconds.',
})

const steps = [
  {
    icon: '🔑',
    title: 'Connect Your Wallet',
    desc: 'Click "Connect Wallet" and choose from MetaMask, WalletConnect, Coinbase Wallet, or any supported provider. No account creation needed.',
    details: [
      'Supports 20+ wallet providers',
      'WalletConnect v2 compatible',
      'Hardware wallet support (Ledger, Trezor)',
    ],
  },
  {
    icon: '🔄',
    title: 'Select Tokens to Swap',
    desc: 'Choose the tokens you want to trade from our library of 340+ assets. Enter the amount and GoatSwap instantly calculates the best route.',
    details: [
      'Search by name, symbol, or address',
      'Auto-detect imported tokens',
      'Real-time price impact preview',
    ],
  },
  {
    icon: '⚡',
    title: 'Confirm the Transaction',
    desc: 'Review the trade details, slippage tolerance, and estimated gas. Approve in your wallet and the swap executes atomically on-chain.',
    details: [
      'Gas estimation in USD',
      'Slippage protection settings',
      'Transaction deadline control',
    ],
  },
  {
    icon: '✅',
    title: 'Receive Your Tokens',
    desc: 'Tokens arrive in your wallet within seconds. View the full transaction on the block explorer with one click.',
    details: [
      'Etherscan / Explorer link',
      'Portfolio auto-updates',
      'Email/push notifications (optional)',
    ],
  },
]

const techStack = [
  { icon: '🔀', name: 'Smart Order Routing', desc: 'Aggregates liquidity from 30+ DEXs to find the optimal swap path.' },
  { icon: '🛡️', name: 'MEV Protection', desc: 'Private mempool submission prevents sandwich attacks and frontrunning.' },
  { icon: '⛽', name: 'Gas Optimization', desc: 'Efficient calldata encoding reduces gas costs by up to 30%.' },
  { icon: '🔗', name: 'Cross-Chain Bridge', desc: 'Trustless asset bridging using light clients and zero-knowledge proofs.' },
  { icon: '📜', name: 'Audited Contracts', desc: 'All smart contracts verified by Trail of Bits, Certik, and OpenZeppelin.' },
  { icon: '🏛️', name: 'DAO Governance', desc: 'Protocol parameters controlled by GOAT token holders through on-chain votes.' },
]

const faqs = reactive([
  { q: 'Do I need to create an account?', a: 'No. GoatSwap is fully non-custodial. Just connect your web3 wallet and start trading immediately.', open: false },
  { q: 'What are the trading fees?', a: 'GoatSwap charges a base fee of 0.01% per swap. This goes to liquidity providers. There are no hidden fees.', open: false },
  { q: 'Which wallets are supported?', a: 'MetaMask, Coinbase Wallet, WalletConnect (20+ mobile wallets), Ledger, and Trezor are all supported.', open: false },
  { q: 'Is GoatSwap safe to use?', a: 'Our smart contracts have been audited 4 times with zero critical issues found. We also maintain a $1M bug bounty program.', open: false },
  { q: 'How does cross-chain swapping work?', a: 'Our native bridge uses light client proofs to transfer assets across chains without wrapping. You always receive native tokens on the destination chain.', open: false },
])

function toggleFaq(faq) {
  faq.open = !faq.open
}
</script>

<style scoped>
.page-main { padding-top: 80px; }

.page-hero {
  padding: 80px 0 60px;
  position: relative;
  overflow: hidden;
}
.page-orb-1 { width:400px;height:400px;top:-100px;right:-50px;opacity:0.3; }
.page-orb-2 { width:350px;height:350px;bottom:-50px;left:-100px;opacity:0.25; }

/* Steps Timeline */
.steps-timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}

.timeline-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 32px;
  align-items: flex-start;
  position: relative;
  padding-bottom: 8px;
}



.timeline-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.timeline-step-num {
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 900;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.timeline-icon-wrap {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}

.timeline-icon { font-size: 32px; }

.timeline-connector {
  position: absolute;
  left: 60px;
  top: 144px;
  bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.connector-line {
  flex: 1;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent-purple), var(--accent-cyan));
  opacity: 0.3;
}

.connector-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-cyan);
  margin-top: 4px;
}

.timeline-content {
  padding: 32px;
  margin-bottom: 40px;
}

.timeline-tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-purple-light);
  margin-bottom: 12px;
  display: block;
}

.timeline-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
}

.timeline-desc {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 20px;
}

.timeline-details {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.timeline-details li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text-secondary);
}

.detail-arrow { color: var(--accent-cyan); }

/* Tech */
.tech-section {
  background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.tech-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
}

.tech-icon {
  font-size: 28px;
  flex-shrink: 0;
  margin-top: 2px;
}

.tech-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
}

.tech-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* FAQ */
.faq-item {
  padding: 20px 24px;
  cursor: pointer;
  margin-bottom: 12px;
}

.faq-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.faq-q {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
}

.faq-chevron {
  font-size: 22px;
  color: var(--text-muted);
  transition: transform 0.25s ease;
  transform: rotate(0deg);
  flex-shrink: 0;
}

.faq-chevron.open {
  transform: rotate(90deg);
  color: var(--accent-cyan);
}

.faq-a {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-subtle);
}

.faq-enter-active, .faq-leave-active { transition: opacity 0.2s, max-height 0.3s ease; max-height: 200px; overflow: hidden; }
.faq-enter-from, .faq-leave-to { opacity: 0; max-height: 0; }

@media (max-width: 1024px) {
  .tech-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .timeline-item { grid-template-columns: 1fr; }
  .timeline-visual { flex-direction: row; align-items: center; }
  .timeline-step-num { font-size: 36px; }
  .timeline-connector { display: none; }
  .tech-grid { grid-template-columns: 1fr; }
}
</style>
