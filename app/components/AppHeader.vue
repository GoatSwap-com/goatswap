<template>
  <header class="app-header" :class="{ scrolled: isScrolled }">
    <div class="container header-inner">
      <!-- Logo -->
      <NuxtLink to="/" class="header-logo">
        <img src="/goat_logo.png" alt="GoatSwap Logo" style="width: 36px; height: 36px; border-radius: 50%;" />
        <span class="logo-text" style="font-family: 'Fredoka', sans-serif;">Goat<span class="gradient-text">Swap</span></span>
      </NuxtLink>

      <!-- Nav -->
      <nav class="header-nav" :class="{ open: menuOpen }">
        <NuxtLink to="/" class="nav-link" @click="menuOpen = false"
          >Home</NuxtLink
        >
        <NuxtLink to="/features" class="nav-link" @click="menuOpen = false"
          >Features</NuxtLink
        >
        <NuxtLink to="/how-it-works" class="nav-link" @click="menuOpen = false"
          >How it Works</NuxtLink
        >
        <NuxtLink to="/about" class="nav-link" @click="menuOpen = false"
          >About</NuxtLink
        >
        <NuxtLink to="/staking" class="nav-link nav-link-staking" @click="menuOpen = false">
          <span>Staking</span>
          <span class="badge-hot">15% APY</span>
        </NuxtLink>

        <NuxtLink to="/airdrop" class="nav-link nav-link-airdrop" @click="menuOpen = false">
          <span>Airdrop</span>
          <span class="badge-new">New</span>
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="header-actions">
        <button id="connect-wallet-btn" class="btn btn-connect" @click="handleConnectClick">
          <span class="btn-dot" />
          <span>Connect Wallet</span>
        </button>

        <!-- Burger -->
        <button
          class="burger-btn"
          @click="menuOpen = !menuOpen"
          aria-label="Toggle menu"
        >
          <span :class="{ active: menuOpen }" />
          <span :class="{ active: menuOpen }" />
          <span :class="{ active: menuOpen }" />
        </button>
      </div>
    </div>
  </header>

  <!-- LiFi Modal -->
  <LiFiModal :open="lifiModalOpen" @close="lifiModalOpen = false" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isScrolled = ref(false);
const menuOpen = ref(false);
const lifiModalOpen = ref(false);

function handleScroll() {
  isScrolled.value = window.scrollY > 24;
}

function handleConnectClick() {
  lifiModalOpen.value = true;
  menuOpen.value = false;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 16px 0;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    padding 0.3s ease;
  border-bottom: 1px solid transparent;
}

.app-header.scrolled {
  background: rgba(252, 246, 235, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-color: var(--border-subtle);
  padding: 12px 0;
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 40px;
}

/* Logo */
.header-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

/* Nav */
.header-nav {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.nav-link {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  transition:
    color 0.2s ease,
    background 0.2s ease;
  text-decoration: none;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.06);
}

.nav-link.router-link-exact-active {
  color: var(--accent-cyan);
}

/* Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}

.btn-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}

/* Burger */
.burger-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.burger-btn span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-secondary);
  border-radius: 99px;
  transition: all 0.25s ease;
  transform-origin: center;
}

.burger-btn span.active:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.burger-btn span.active:nth-child(2) {
  opacity: 0;
}
.burger-btn span.active:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (max-width: 768px) {
  .burger-btn {
    display: flex;
  }
  .header-nav {
    position: fixed;
    top: 65px;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 4px;
    background: rgba(252, 246, 235, 0.97);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid var(--border-subtle);
    padding: 16px 24px 24px;
    transform: translateY(-120%);
    opacity: 0;
    pointer-events: none;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
    align-items: flex-start;
    z-index: 99;
  }
  .header-nav.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }
  .nav-link {
    width: 100%;
    padding: 12px 16px;
  }
}

/* Airdrop Link Accent Styles */
.nav-link-airdrop {
  color: #ffffff !important;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(123, 63, 228, 0.15);
  border: 1px solid rgba(123, 63, 228, 0.3);
  padding: 6px 14px !important;
  border-radius: 99px;
  transition: all 0.3s ease;
  margin-left: 8px;
}

.nav-link-airdrop:hover {
  background: rgba(123, 63, 228, 0.25);
  border-color: rgba(123, 63, 228, 0.6);
  box-shadow: 0 0 15px rgba(123, 63, 228, 0.35);
  transform: translateY(-1px);
}

/* Staking Link Accent Styles */
.nav-link-staking {
  color: #ffffff !important;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 212, 255, 0.12);
  border: 1px solid rgba(0, 212, 255, 0.25);
  padding: 6px 14px !important;
  border-radius: 99px;
  transition: all 0.3s ease;
  margin-left: 8px;
}

.nav-link-staking:hover {
  background: rgba(0, 212, 255, 0.2);
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.25);
  transform: translateY(-1px);
}

.badge-new {
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.15);
  border: 1px solid rgba(0, 212, 255, 0.3);
  padding: 1px 6px;
  border-radius: 99px;
  letter-spacing: 0.05em;
  animation: pulse-badge 2s infinite;
}

.badge-hot {
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  color: #ff4d6d;
  background: rgba(255, 77, 109, 0.15);
  border: 1px solid rgba(255, 77, 109, 0.3);
  padding: 1px 6px;
  border-radius: 99px;
  letter-spacing: 0.05em;
  animation: pulse-badge 2s infinite;
}

@keyframes pulse-badge {
  0%, 100% { opacity: 0.85; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.06); }
}

@media (max-width: 768px) {
  .nav-link-airdrop,
  .nav-link-staking {
    margin-left: 16px;
    margin-top: 8px;
    margin-bottom: 8px;
    display: inline-flex;
    width: auto;
  }
}
</style>
