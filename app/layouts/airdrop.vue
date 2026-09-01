<template>
  <div class="airdrop-layout">
    <div class="noise-overlay" />

    <!-- Background orbs wrapped to prevent double scrollbars -->
    <div class="orbs-container">
      <div class="orb orb-purple airdrop-orb-1" />
      <div class="orb orb-cyan airdrop-orb-2" />
      <div class="orb orb-purple airdrop-orb-3" />
    </div>

    <!-- Grid overlay -->
    <div class="airdrop-grid" />

    <!-- Top bar -->
    <header class="airdrop-header">
      <NuxtLink to="/" class="header-logo">
        <img src="/goat_logo.png" alt="GoatSwap Logo" style="width: 36px; height: 36px; border-radius: 50%;" />
        <span class="logo-text" style="font-family: 'Fredoka', sans-serif;">Goat<span class="gradient-text">Swap</span></span>
      </NuxtLink>

      <div class="header-badge">
        <span class="badge-dot" />
        <span>Airdrop Live</span>
      </div>

      <NuxtLink to="/" class="back-link">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Back to App
      </NuxtLink>
    </header>

    <!-- Page content -->
    <main class="airdrop-main">
      <slot />
    </main>

    <!-- Footer strip -->
    <footer class="airdrop-footer">
      <span>© 2025 GoatSwap Protocol</span>
      <span class="footer-sep">·</span>
      <a href="#">Terms</a>
      <span class="footer-sep">·</span>
      <a href="#">Privacy</a>
      <span class="footer-sep">·</span>
      <a href="#" class="footer-contract">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 2h8v8M10 2L2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        Contract
      </a>
    </footer>
  </div>
</template>

<style scoped>
.airdrop-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  background: var(--bg-primary);
}

/* ── Orbs ── */
.orbs-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.airdrop-orb-1 {
  width: 700px; height: 700px;
  top: -200px; left: -200px;
  opacity: 0.35;
}
.airdrop-orb-2 {
  width: 500px; height: 500px;
  bottom: -100px; right: -150px;
  opacity: 0.25;
}
.airdrop-orb-3 {
  width: 300px; height: 300px;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.12;
}

/* ── Grid ── */
.airdrop-grid {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    linear-gradient(rgba(123, 63, 228, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(123, 63, 228, 0.05) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 90% 90% at 50% 40%, black 20%, transparent 100%);
}

/* ── Header ── */
.airdrop-header {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  border-bottom: 1px solid var(--border-subtle);
  background: rgba(252, 246, 235, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
}

.logo-icon {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.header-badge {
  display: flex;
  align-items: center;
  gap: 7px;
  background: rgba(128, 83, 51, 0.08);
  border: 1px solid rgba(128, 83, 51, 0.25);
  border-radius: 99px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent-cyan);
  letter-spacing: 0.04em;
}

.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent-cyan);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}

.back-link {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  text-decoration: none;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  transition: all 0.2s ease;
}

.back-link:hover {
  color: var(--text-primary);
  border-color: var(--accent-purple);
  background: rgba(214, 137, 62, 0.08);
}

/* ── Main ── */
.airdrop-main {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* ── Footer ── */
.airdrop-footer {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px 32px;
  border-top: 1px solid var(--border-subtle);
  background: rgba(252, 246, 235, 0.5);
  backdrop-filter: blur(16px);
  font-size: 12px;
  color: var(--text-muted);
}

.airdrop-footer a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.airdrop-footer a:hover {
  color: var(--text-secondary);
}

.footer-sep { opacity: 0.3; }

.footer-contract {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.footer-contract:hover {
  color: var(--accent-cyan) !important;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .airdrop-header {
    padding: 14px 16px;
  }
  .header-badge {
    display: none;
  }
  .back-link span {
    display: none;
  }
}
</style>
