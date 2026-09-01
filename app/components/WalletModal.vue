<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-box">
          <!-- Header -->
          <div class="modal-header">
            <div>
              <h2 class="modal-title">Connect Wallet</h2>
              <p class="modal-sub">Choose your preferred wallet provider</p>
            </div>
            <button class="modal-close" @click="$emit('close')" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <!-- Wallets -->
          <div class="wallets-list">
            <button
              v-for="wallet in wallets"
              :key="wallet.id"
              :id="`wallet-${wallet.id}`"
              class="wallet-option"
              @click="selectWallet(wallet)"
            >
              <div class="wallet-icon-wrap" :style="{ background: wallet.color }">
                <img :src="wallet.icon" class="wallet-icon" :alt="wallet.name" width="40" />
              </div>
              <div class="wallet-info">
                <span class="wallet-name">{{ wallet.name }}</span>
                <span class="wallet-desc">{{ wallet.desc }}</span>
              </div>
              <div class="wallet-arrow">→</div>
            </button>
          </div>

          <p class="modal-disclaimer">
            By connecting, you agree to our
            <a href="#" class="modal-link">Terms of Service</a>
            and acknowledge that you have read our
            <a href="#" class="modal-link">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({ open: Boolean })
const emit = defineEmits(['close', 'select'])

const config = useRuntimeConfig();

const walletIconsUrl = config.public.walletIconsUrl || '/wallets/';

const wallets = [
  {
    id: 'metamask',
    name: 'MetaMask',
    desc: 'Most popular EVM wallet',
    icon: walletIconsUrl + 'metamask.svg',
    color: 'linear-gradient(135deg, rgba(243,146,55,0.2), rgba(243,146,55,0.05))',
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    desc: 'Connect any mobile wallet',
    icon: walletIconsUrl + 'walletconnect.svg',
    color: 'linear-gradient(135deg, rgba(59,153,252,0.2), rgba(59,153,252,0.05))',
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    desc: 'Simple & secure',
    icon: walletIconsUrl + 'coinbase.svg',
    color: 'linear-gradient(135deg, rgba(0,82,255,0.2), rgba(0,82,255,0.05))',
  },
  {
    id: 'trust',
    name: 'Trust Wallet',
    desc: 'Multi-chain wallet',
    icon: walletIconsUrl + 'trust.svg',
    color: 'linear-gradient(135deg, rgba(51,117,255,0.2), rgba(51,117,255,0.05))',
  },
]

function selectWallet(wallet) {
  // Hook point: place your wallet connection logic here
  console.log('Connecting wallet:', wallet.id)
  emit('select', wallet.id)
  emit('close')
}
</script>

<style scoped>
.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
}

.modal-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.modal-sub {
  font-size: 14px;
  color: var(--text-muted);
}

.modal-close {
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: rgba(255,255,255,0.1);
  color: var(--text-primary);
}

.wallets-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 20px;
}

.wallet-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(255,255,255,0.08);
}

.wallet-emoji {
  font-size: 20px;
}

.wallet-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.wallet-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.wallet-desc {
  font-size: 12px;
  color: var(--text-muted);
}

.wallet-arrow {
  color: var(--text-muted);
  font-size: 16px;
  transition: transform 0.2s ease, color 0.2s ease;
}

.wallet-option:hover .wallet-arrow {
  transform: translateX(4px);
  color: var(--accent-cyan);
}

.modal-disclaimer {
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
  line-height: 1.6;
}

.modal-link {
  color: var(--accent-cyan);
  text-decoration: underline;
  text-decoration-color: rgba(0, 212, 255, 0.3);
  transition: color 0.2s;
}

.modal-link:hover {
  color: var(--accent-cyan-light);
}

/* Modal transition */
.modal-enter-active { transition: opacity 0.25s ease; }
.modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

.modal-enter-active .modal-box { transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-enter-from .modal-box { transform: translateY(24px) scale(0.96); }
</style>
