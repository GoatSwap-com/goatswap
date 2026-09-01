<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-top">
        <!-- Brand -->
        <div class="footer-brand">
          <NuxtLink to="/" class="footer-logo" style="display: flex; align-items: center; gap: 8px;">
            <img src="/goat_logo.png" alt="GoatSwap Logo" style="width: 32px; height: 32px; border-radius: 50%;" />
            <span class="logo-text" style="font-family: 'Fredoka', sans-serif; font-size: 20px;">Goat<span class="gradient-text">Swap</span></span>
          </NuxtLink>
          <p class="footer-tagline">
            The greatest of all time decentralized exchange protocol. Trade any token across any chain.
          </p>
          <div class="footer-socials">
            <a href="#" class="social-btn" aria-label="Twitter">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" class="social-btn" aria-label="Discord">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028z"/>
              </svg>
            </a>
            <a href="#" class="social-btn" aria-label="Telegram">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
            <a href="#" class="social-btn" aria-label="GitHub">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Links -->
        <div class="footer-links-group">
          <h4 class="footer-group-title">Protocol</h4>
          <ul class="footer-links">
            <li><NuxtLink to="/features">Features</NuxtLink></li>
            <li><NuxtLink to="/how-it-works">How it Works</NuxtLink></li>
            <li><NuxtLink to="/about">About</NuxtLink></li>
            <li><a href="#">Documentation</a></li>
          </ul>
        </div>

        <div class="footer-links-group">
          <h4 class="footer-group-title">Ecosystem</h4>
          <ul class="footer-links">
            <li><a href="#">Token</a></li>
            <li><a href="#">Governance</a></li>
            <li><a href="#">Liquidity Mining</a></li>
            <li><a href="#">Bug Bounty</a></li>
          </ul>
        </div>

        <div class="footer-links-group">
          <h4 class="footer-group-title">Community</h4>
          <ul class="footer-links">
            <li><a href="#">Discord</a></li>
            <li><a href="#">Twitter / X</a></li>
            <li><a href="#">Telegram</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy">© 2026 GoatSwap Protocol. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Audit Reports</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid var(--border-subtle);
  margin-top: 60px;
  padding: 64px 0 32px;
  background: linear-gradient(to bottom, transparent, rgba(123, 63, 228, 0.04));
}

.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.footer-logo {
  display: inline-block;
  margin-bottom: 16px;
  text-decoration: none;
}

.footer-tagline {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.7;
  max-width: 300px;
  margin-bottom: 24px;
}

.footer-socials {
  display: flex;
  gap: 10px;
}

.social-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: all 0.2s ease;
}

.social-btn:hover {
  color: var(--text-primary);
  border-color: var(--accent-purple);
  background: rgba(123, 63, 228, 0.1);
  transform: translateY(-2px);
}

.footer-group-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a {
  font-size: 14px;
  color: var(--text-muted);
  transition: color 0.2s ease;
  text-decoration: none;
}

.footer-links a:hover {
  color: var(--text-primary);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--border-subtle);
  padding-top: 24px;
}

.footer-copy {
  font-size: 13px;
  color: var(--text-muted);
}

.footer-bottom-links {
  display: flex;
  gap: 24px;
}

.footer-bottom-links a {
  font-size: 13px;
  color: var(--text-muted);
  transition: color 0.2s ease;
}

.footer-bottom-links a:hover {
  color: var(--text-secondary);
}

@media (max-width: 1024px) {
  .footer-top { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 640px) {
  .footer-top { grid-template-columns: 1fr; }
  .footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
  .footer-bottom-links { flex-wrap: wrap; justify-content: center; }
}
</style>
