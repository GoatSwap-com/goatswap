<template>
  <main class="page-main">
    <!-- Hero -->
    <section class="page-hero">
      <div class="orb orb-purple page-orb-1 animate-pulse-glow" />
      <div class="orb orb-cyan page-orb-2" />
      <div class="container">
        <div class="section-label">💎 About</div>
        <h1 class="section-title">
          The Future of <span class="gradient-text">Decentralized</span> Trading
        </h1>
        <p class="section-subtitle">
          GoatSwap was built by DeFi natives for DeFi natives. Our mission: make on-chain trading as simple as centralized exchanges, without sacrificing sovereignty.
        </p>
      </div>
    </section>

    <!-- Mission / Values -->
    <section class="section">
      <div class="container">
        <div class="values-grid">
          <div v-for="val in values" :key="val.title" class="value-card glass-card">
            <div class="value-icon">{{ val.icon }}</div>
            <h3 class="value-title">{{ val.title }}</h3>
            <p class="value-desc">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="section team-section">
      <div class="container">
        <div style="text-align:center; margin-bottom:56px">
          <div class="section-label" style="display:inline-flex">👥 Team</div>
          <h2 class="section-title">Built by <span class="gradient-text">DeFi Veterans</span></h2>
          <p class="section-subtitle" style="margin: 0 auto">Our team has shipped products used by millions, with backgrounds from Coinbase, Uniswap, and a16z.</p>
        </div>

        <div class="team-grid">
          <div v-for="member in team" :key="member.name" class="team-card glass-card">
            <div class="avatar" :style="{ background: member.color }">
              <span class="avatar-emoji">{{ member.emoji }}</span>
            </div>
            <div class="member-info">
              <h4 class="member-name">{{ member.name }}</h4>
              <span class="member-role">{{ member.role }}</span>
              <p class="member-bio">{{ member.bio }}</p>
              <div class="member-prev">
                <span class="prev-label">Previously:</span>
                <div class="prev-tags">
                  <span v-for="co in member.prev" :key="co" class="prev-tag">{{ co }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tokenomics -->
    <section class="section tokenomics-section">
      <div class="container">
        <div class="section-label">🪙 Tokenomics</div>
        <h2 class="section-title">GOAT <span class="gradient-text">Token Distribution</span></h2>
        <p class="section-subtitle">Total supply: 1,000,000,000 GOAT. Fair launch, no VC dumps.</p>

        <div class="tokenomics-grid">
          <!-- Distribution bars -->
          <div class="glass-card tokenomics-card">
            <h3 style="margin-bottom:24px; font-size:18px">Allocation</h3>
            <div class="token-bar-wrap">
              <div v-for="alloc in tokenAlloc" :key="alloc.label" class="token-bar-row">
                <span class="token-bar-label">{{ alloc.label }}</span>
                <div class="token-bar-bg">
                  <div class="token-bar-fill" :style="{ width: alloc.pct + '%' }" />
                </div>
                <span class="token-bar-pct">{{ alloc.pct }}%</span>
              </div>
            </div>
          </div>

          <!-- Token info -->
          <div class="glass-card tokenomics-card">
            <h3 style="margin-bottom:24px; font-size:18px">Token Details</h3>
            <div class="token-details">
              <div v-for="d in tokenDetails" :key="d.label" class="token-detail-row">
                <span class="td-label">{{ d.label }}</span>
                <span class="td-value">{{ d.value }}</span>
              </div>
            </div>

            <div class="token-utility">
              <h4 style="font-size:14px; font-weight:600; margin-bottom:12px; color:var(--text-muted)">UTILITY</h4>
              <div class="utility-tags">
                <span v-for="u in utility" :key="u" class="utility-tag">{{ u }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Roadmap -->
    <section class="section">
      <div class="container">
        <div style="text-align:center; margin-bottom:56px">
          <div class="section-label" style="display:inline-flex">🗓️ Roadmap</div>
          <h2 class="section-title">Our <span class="gradient-text">Journey</span></h2>
        </div>
        <div class="roadmap-track">
          <div v-for="(phase, i) in roadmap" :key="phase.name" class="roadmap-item glass-card" :class="{ completed: phase.done, active: phase.current }">
            <div class="rm-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="rm-status">
              <span v-if="phase.done" class="rm-badge rm-badge--done">✓ Completed</span>
              <span v-else-if="phase.current" class="rm-badge rm-badge--active">⚡ In Progress</span>
              <span v-else class="rm-badge rm-badge--upcoming">◌ Upcoming</span>
            </div>
            <h3 class="rm-name">{{ phase.name }}</h3>
            <p class="rm-period">{{ phase.period }}</p>
            <ul class="rm-items">
              <li v-for="item in phase.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
useSeoMeta({
  title: 'About — GoatSwap',
  description: 'Learn about GoatSwap: our mission, team, GOAT token distribution, and roadmap for the future of decentralized trading.',
})

const values = [
  {
    icon: '🔓',
    title: 'Permissionless',
    desc: 'Anyone with a wallet can use GoatSwap. No KYC, no sign-ups, no borders. DeFi the way it was meant to be.',
  },
  {
    icon: '🌿',
    title: 'Community First',
    desc: 'GoatSwap is owned and governed by its users via the GOAT DAO. Every major decision goes to a community vote.',
  },
  {
    icon: '⚗️',
    title: 'Innovation',
    desc: 'We ship fast and experiment boldly. From concentrated liquidity to ZK bridges, we never stop building.',
  },
  {
    icon: '🔍',
    title: 'Transparency',
    desc: 'All code is open-source, all treasury movements are on-chain, and all decisions are made in public.',
  },
]

const team = [
  {
    name: 'Alex Morgan',
    role: 'CEO & Co-Founder',
    emoji: '🧠',
    color: 'linear-gradient(135deg, #7b3fe4, #9b6ff0)',
    bio: '10+ years in blockchain. Built DeFi protocols with $500M+ TVL.',
    prev: ['Coinbase', 'Uniswap Labs'],
  },
  {
    name: 'Sara Chen',
    role: 'CTO & Co-Founder',
    emoji: '⚡',
    color: 'linear-gradient(135deg, #00d4ff, #40e0ff)',
    bio: 'Smart contract architect. Published 3 EIPs. Solidity core contributor.',
    prev: ['a16z Crypto', 'Ethereum Foundation'],
  },
  {
    name: 'Jake Williams',
    role: 'Head of Protocol',
    emoji: '🔀',
    color: 'linear-gradient(135deg, #00e67a, #00b85c)',
    bio: 'AMM specialist. Designed routing algorithms for multiple top DEXs.',
    prev: ['Balancer', 'Curve Finance'],
  },
  {
    name: 'Maya Patel',
    role: 'Head of Design',
    emoji: '🎨',
    color: 'linear-gradient(135deg, #ff6b35, #f7c59f)',
    bio: 'DeFi UX pioneer. Believes great design is the missing piece of mass crypto adoption.',
    prev: ['OpenSea', 'Metamask'],
  },
]

const tokenAlloc = [
  { label: 'Community & DAO', pct: 40 },
  { label: 'Liquidity Mining', pct: 25 },
  { label: 'Team (4yr vest)', pct: 15 },
  { label: 'Ecosystem Fund', pct: 12 },
  { label: 'Early Backers', pct: 8 },
]

const tokenDetails = [
  { label: 'Token Name', value: 'GoatSwap Token' },
  { label: 'Symbol', value: 'GOAT' },
  { label: 'Total Supply', value: '1,000,000,000' },
  { label: 'Network', value: 'ERC-20 (Multi-Chain)' },
  { label: 'Inflation', value: '0% (Fixed Supply)' },
  { label: 'Launch Price', value: '$0.10' },
]

const utility = ['Governance', 'Fee Discount', 'LP Boost', 'Staking', 'Revenue Share']

const roadmap = [
  {
    name: 'Genesis',
    period: 'Q1 2024',
    done: true,
    current: false,
    items: ['Protocol v1 launch', 'ETH & BSC support', 'Audit by Trail of Bits'],
  },
  {
    name: 'Expansion',
    period: 'Q3 2024',
    done: true,
    current: false,
    items: ['8 additional chains', 'Concentrated liquidity AMM', 'GOAT token launch'],
  },
  {
    name: 'Acceleration',
    period: 'Q1–Q2 2025',
    done: false,
    current: true,
    items: ['Cross-chain bridge V2', 'Liquidity mining v3', 'Mobile app beta'],
  },
  {
    name: 'Dominance',
    period: 'Q3–Q4 2025',
    done: false,
    current: false,
    items: ['ZK rollup integration', 'DAO governance live', 'Institutional API'],
  },
]
</script>

<style scoped>
.page-main { padding-top: 80px; }

.page-hero {
  padding: 80px 0 60px;
  position: relative;
  overflow: hidden;
}
.page-orb-1 { width:500px;height:500px;top:-100px;left:-120px;opacity:0.35; }
.page-orb-2 { width:400px;height:400px;top:-50px;right:-80px;opacity:0.2; }

/* Values */
.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.value-card {
  padding: 32px 24px;
  text-align: center;
}

.value-icon { font-size: 36px; margin-bottom: 16px; }

.value-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

.value-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* Team */
.team-section {
  background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(123,63,228,0.05) 0%, transparent 70%);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.team-card {
  display: flex;
  gap: 24px;
  padding: 28px;
  align-items: flex-start;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-emoji { font-size: 28px; }

.member-name {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}

.member-role {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-cyan);
  margin-bottom: 10px;
  display: block;
}

.member-bio {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 12px;
}

.member-prev {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.prev-label {
  font-size: 11px;
  color: var(--text-muted);
}

.prev-tags { display: flex; gap: 6px; flex-wrap: wrap; }

.prev-tag {
  font-size: 11px;
  padding: 3px 10px;
  background: rgba(123,63,228,0.1);
  border: 1px solid rgba(123,63,228,0.2);
  border-radius: 99px;
  color: var(--accent-purple-light);
}

/* Tokenomics */
.tokenomics-section {
  background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%);
}

.token-details {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 24px;
}

.token-detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-subtle);
  font-size: 14px;
}

.td-label { color: var(--text-muted); }

.td-value {
  font-weight: 600;
  color: var(--text-primary);
}

.token-utility { margin-top: 8px; }

.utility-tags { display: flex; flex-wrap: wrap; gap: 8px; }

.utility-tag {
  font-size: 12px;
  padding: 5px 14px;
  background: rgba(0,212,255,0.08);
  border: 1px solid rgba(0,212,255,0.15);
  border-radius: 99px;
  color: var(--accent-cyan);
  font-weight: 500;
}

/* Roadmap */
.roadmap-track {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.roadmap-item {
  padding: 28px 24px;
  position: relative;
  overflow: hidden;
}

.roadmap-item.completed {
  border-color: rgba(0, 230, 122, 0.25);
}

.roadmap-item.active {
  border-color: var(--border-glow);
  box-shadow: 0 0 40px rgba(123,63,228,0.2);
}

.rm-num {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 900;
  color: rgba(255,255,255,0.05);
  position: absolute;
  top: 12px;
  right: 16px;
  line-height: 1;
}

.rm-status { margin-bottom: 16px; }

.rm-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 99px;
}

.rm-badge--done { background: rgba(0,230,122,0.12); color: #00e67a; }
.rm-badge--active { background: rgba(123,63,228,0.15); color: var(--accent-purple-light); }
.rm-badge--upcoming { background: rgba(255,255,255,0.06); color: var(--text-muted); }

.rm-name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
}

.rm-period {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.rm-items {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rm-items li {
  font-size: 13px;
  color: var(--text-secondary);
  padding-left: 14px;
  position: relative;
}

.rm-items li::before {
  content: '›';
  position: absolute;
  left: 0;
  color: var(--accent-cyan);
}

@media (max-width: 1024px) {
  .values-grid { grid-template-columns: repeat(2, 1fr); }
  .roadmap-track { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .values-grid { grid-template-columns: 1fr; }
  .team-grid { grid-template-columns: 1fr; }
  .roadmap-track { grid-template-columns: 1fr; }
  .team-card { flex-direction: column; }
}
</style>
