<template>
  <main class="page-main">
    <!-- Hero -->
    <section class="page-hero">
      <div class="orb orb-purple page-orb-1 animate-pulse-glow" />
      <div class="orb orb-cyan page-orb-2 animate-pulse-glow" />
      <div class="container">
        <div class="section-label">⚡ Features</div>
        <h1 class="section-title">
          Everything You Need<br /><span class="gradient-text">to Trade DeFi</span>
        </h1>
        <p class="section-subtitle">
          GoatSwap packs industry-leading technology into a beautifully simple interface — so you can trade with confidence.
        </p>
      </div>
    </section>

    <!-- Main Features Grid -->
    <section class="section">
      <div class="container">
        <div class="big-features-grid">
          <div v-for="(feat, i) in bigFeatures" :key="feat.title" class="big-feature glass-card" :class="{ 'big-feature--wide': i === 0 || i === 5 }">
            <div class="feat-icon-row">
              <div class="feat-icon" :style="{ background: feat.bg }">{{ feat.icon }}</div>
              <span class="feat-tag">{{ feat.tag }}</span>
            </div>
            <h3 class="feat-title">{{ feat.title }}</h3>
            <p class="feat-desc">{{ feat.desc }}</p>
            <ul class="feat-points">
              <li v-for="pt in feat.points" :key="pt">
                <span class="pt-dot" />{{ pt }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Table -->
    <section class="section">
      <div class="container">
        <div class="section-label">📊 Comparison</div>
        <h2 class="section-title">GoatSwap vs <span class="gradient-text">The Competition</span></h2>
        <div class="comparison-table glass-card" style="margin-top:40px; overflow:auto">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th class="th-GoatSwap">GoatSwap <span class="badge-best">Best</span></th>
                <th>Uniswap</th>
                <th>1inch</th>
                <th>Curve</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in comparisonRows" :key="row.feature">
                <td class="td-feature">{{ row.feature }}</td>
                <td class="td-GoatSwap">{{ row.GoatSwap }}</td>
                <td>{{ row.uni }}</td>
                <td>{{ row.inch }}</td>
                <td>{{ row.curve }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Security Section -->
    <section class="section security-section">
      <div class="container">
        <div class="security-layout">
          <div class="security-text">
            <div class="section-label">🔒 Security</div>
            <h2 class="section-title">Audited & <span class="gradient-text">Battle-Tested</span></h2>
            <p class="section-subtitle">
              Our smart contracts have undergone rigorous audits by the industry's top security firms with zero critical vulnerabilities found.
            </p>
            <div class="audit-badges">
              <div v-for="auditor in auditors" :key="auditor" class="audit-badge glass-card">
                <span class="audit-check">✓</span>
                <span>{{ auditor }}</span>
              </div>
            </div>
          </div>
          <div class="security-stats">
            <div v-for="s in secStats" :key="s.label" class="sec-stat glass-card">
              <div class="sec-stat-val gradient-text">{{ s.value }}</div>
              <div class="sec-stat-lbl">{{ s.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
useSeoMeta({
  title: 'Features — GoatSwap',
  description: 'Explore all the powerful features of GoatSwap DEX protocol: instant swaps, cross-chain bridging, liquidity mining, and more.',
})

const bigFeatures = [
  {
    icon: '⚡',
    tag: 'Speed',
    title: 'Instant Swap Execution',
    desc: 'Our optimized routing engine finds the best path across all liquidity sources in under 100ms, guaranteeing you the fastest execution possible.',
    points: ['Sub-100ms order routing', 'MEV protection built-in', 'Atomic multi-hop swaps'],
    bg: 'linear-gradient(135deg, rgba(251,197,49,0.2), rgba(251,197,49,0.04))',
  },
  {
    icon: '🌐',
    tag: 'Cross-Chain',
    title: 'Multi-Chain Bridge',
    desc: 'Move assets across 12+ networks seamlessly with our trustless cross-chain bridge — no wrapped tokens, no custody.',
    points: ['12+ chains supported', 'Trustless bridging', 'Under 30s finality'],
    bg: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.04))',
  },
  {
    icon: '💧',
    tag: 'Liquidity',
    title: 'Concentrated Liquidity',
    desc: 'Provide liquidity in custom price ranges to earn up to 4,000x more fees than traditional AMMs.',
    points: ['Custom price ranges', 'Active LP management', 'Auto-rebalancing vaults'],
    bg: 'linear-gradient(135deg, rgba(0,178,128,0.2), rgba(0,178,128,0.04))',
  },
  {
    icon: '🔒',
    tag: 'Security',
    title: 'Non-Custodial & Secure',
    desc: 'Your assets stay in your wallet at all times. Our contracts are audited by 4 top-tier security firms.',
    points: ['4× audited contracts', 'Bug bounty $1M+', 'Multi-sig governance'],
    bg: 'linear-gradient(135deg, rgba(123,63,228,0.2), rgba(123,63,228,0.04))',
  },
  {
    icon: '🏆',
    tag: 'Yield',
    title: 'Liquidity Mining Rewards',
    desc: 'Earn GOAT token rewards by providing liquidity. Stake LP tokens to amplify your yield up to 5×.',
    points: ['Double rewards program', 'Boosted APR up to 180%', 'Instant claimable rewards'],
    bg: 'linear-gradient(135deg, rgba(255,107,53,0.2), rgba(255,107,53,0.04))',
  },
  {
    icon: '📊',
    tag: 'Analytics',
    title: 'Advanced Analytics',
    desc: 'Real-time portfolio tracking, trade history, and DeFi analytics — all built into the interface.',
    points: ['Portfolio PnL tracking', 'Gas fee analytics', 'Yield optimization tips'],
    bg: 'linear-gradient(135deg, rgba(64,224,208,0.2), rgba(64,224,208,0.04))',
  },
]

const comparisonRows = [
  { feature: 'Chains Supported', GoatSwap: '12+', uni: '7', inch: '10', curve: '8' },
  { feature: 'Swap Fee', GoatSwap: '0.01%', uni: '0.05–1%', inch: '0.3%', curve: '0.04%' },
  { feature: 'MEV Protection', GoatSwap: '✅ Yes', uni: '❌ No', inch: '⚠️ Partial', curve: '❌ No' },
  { feature: 'Cross-Chain Bridge', GoatSwap: '✅ Native', uni: '❌ No', inch: '❌ No', curve: '❌ No' },
  { feature: 'Concentrated LP', GoatSwap: '✅ Yes', uni: '✅ Yes', inch: '❌ No', curve: '⚠️ Partial' },
  { feature: 'Gas Optimization', GoatSwap: '✅ Yes', uni: '⚠️ Partial', inch: '✅ Yes', curve: '❌ No' },
]

const auditors = ['Trail of Bits', 'OpenZeppelin', 'Certik', 'PeckShield']

const secStats = [
  { value: '$2B+', label: 'Total Value Secured' },
  { value: '0', label: 'Critical Bugs Found' },
  { value: '$1M', label: 'Bug Bounty Pool' },
  { value: '4', label: 'Security Audits' },
]
</script>

<style scoped>
.page-main { padding-top: 80px; }

.page-hero {
  padding: 80px 0 60px;
  position: relative;
  overflow: hidden;
}

.page-orb-1 { width:500px;height:500px;top:-150px;left:-100px;opacity:0.35; }
.page-orb-2 { width:400px;height:400px;top:-50px;right:-100px;opacity:0.25; }

.big-features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.big-feature {
  padding: 32px;
}

.big-feature--wide {
  grid-column: span 2;
}

.feat-icon-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.feat-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border: 1px solid rgba(255,255,255,0.06);
}

.feat-tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-cyan);
  background: rgba(0,212,255,0.08);
  border: 1px solid rgba(0,212,255,0.15);
  padding: 3px 10px;
  border-radius: 99px;
}

.feat-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.feat-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 20px;
}

.feat-points {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.feat-points li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--text-secondary);
}

.pt-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-gradient);
  flex-shrink: 0;
}

/* Table */
table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

th, td {
  padding: 16px 20px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid var(--border-subtle);
}

th {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.th-GoatSwap {
  color: var(--accent-cyan) !important;
}

.td-feature {
  font-weight: 500;
  color: var(--text-secondary);
}

.td-GoatSwap {
  font-weight: 600;
  color: var(--accent-cyan);
}

.badge-best {
  font-size: 10px;
  background: var(--accent-gradient);
  color: #fff;
  padding: 2px 7px;
  border-radius: 99px;
  margin-left: 6px;
  font-weight: 700;
  letter-spacing: 0;
  vertical-align: middle;
}

tr:last-child td { border-bottom: none; }

/* Security */
.security-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.audit-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.audit-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 500;
}

.audit-check {
  color: #00e67a;
  font-weight: 700;
}

.security-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.sec-stat {
  padding: 28px;
  text-align: center;
}

.sec-stat-val {
  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 800;
  margin-bottom: 8px;
}

.sec-stat-lbl {
  font-size: 13px;
  color: var(--text-muted);
}

@media (max-width: 1024px) {
  .big-features-grid { grid-template-columns: repeat(2, 1fr); }
  .big-feature--wide { grid-column: span 1; }
  .security-layout { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .big-features-grid { grid-template-columns: 1fr; }
}
</style>
