# GoatSwap

**The Greatest Swap Of All Time.**

Web application for [goatswap.com](https://goatswap.com): marketing pages, cross-chain swaps via [LI.FI](https://li.fi/), wallet connection, staking, and airdrop flows.

This repository contains the **Nuxt interface and Nitro API routes** in this tree. It does **not** include smart-contract source, a separate SDK package, or the external connector service referenced in `nuxt.config.ts` (defaults point at `localhost:3010`).

## Overview

GoatSwap is presented as a non-custodial DEX experience. Users connect a wallet in the browser; swaps are routed through the embedded LI.FI widget. Staking and airdrop pages interact with configured contract addresses on-chain and with local Nitro routes under `/napi/airdrop/*`.

## Features (in this repository)

| Area | What ships here |
| --- | --- |
| Marketing | Home, Features, How it works, About |
| Swap UI | LI.FI widget integration (`@lifi/widget`) |
| Wallets | MetaMask, WalletConnect, Coinbase, and related UI |
| Staking | Staking page wired to a configured contract address |
| Airdrop | UI plus Nitro API for eligibility checks and claim state |
| Server | Nitro handlers in `server/routes/napi/airdrop/` |

Product copy and claims on the live site may go beyond what is implemented in this repo. Treat [goatswap.com](https://goatswap.com) as the product surface and this repo as the application source that is present locally.

## Architecture

```text
Browser (Vue 3 + Nuxt 4)
  ├── Pages: marketing, staking, airdrop
  ├── LI.FI widget (React via veaury)
  └── Wallet providers (wagmi / Solana / Sui adapters in dependencies)

Nitro (server/)
  └── /napi/airdrop/*  →  JSON file store (local dev; not committed)

External (not in this repo)
  └── Connector widget + static assets (NUXT_PUBLIC_CONNECTOR_* URLs)
```

## Supported networks

Cross-chain coverage is delegated to the LI.FI widget and wallet adapters. See the live app and [goatswap.com/features](https://goatswap.com/features) for marketed network support.

## Getting started

### Prerequisites

- Node.js compatible with Nuxt 4 (see [Nuxt docs](https://nuxt.com/docs/getting-started/installation))
- npm, pnpm, yarn, or bun (no lockfile is checked in yet; pick one locally)

### Install

```bash
npm install
```

### Environment

Copy the example file and set values only where you need to override defaults:

```bash
cp .env.example .env
```

See [Environment variables](#environment-variables).

### Run locally

Development server (default port **3012**):

```bash
npm run dev
```

Open `http://localhost:3012`.

## Environment variables

All variables are optional for local development; defaults are in `nuxt.config.ts`.

| Variable | Purpose |
| --- | --- |
| `NUXT_PUBLIC_CONNECTOR_SCRIPT_URL` | URL of the external widget bundle |
| `NUXT_PUBLIC_STATIC_URL` | Base URL for wallet icons and static connector assets |
| `NUXT_PUBLIC_CONNECTOR_API_URL` | API base for the connector service |
| `NUXT_PUBLIC_WX` | Airdrop contract address (public on-chain) |
| `NUXT_PUBLIC_TOKEN` | Airdrop token address (public on-chain) |
| `NUXT_PUBLIC_STAKING` | Staking contract address (public on-chain) |

Never commit `.env` or real secrets. See `.env.example`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Nuxt dev server |
| `npm run build` | Production build |
| `npm run generate` | Static generation |
| `npm run preview` | Preview production build |

There is no `test` or `lint` script in `package.json` yet.

## Building

```bash
npm run build
```

Output is written under `.output/` (gitignored).

## Deployment

Not documented in this repository. Deployment configuration and production URLs are out of scope for this setup pass.

## Security

- Report vulnerabilities using [SECURITY.md](./SECURITY.md). Do not open public issues for security bugs.
- `server/data/airdrop-users.json` is **gitignored** — it may contain user addresses and claim state. Do not commit it.
- Nobody from GoatSwap should ask for your seed phrase.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Please follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

No license file is included yet. Contact the repository owners before redistributing or modifying this code.

## Links

| | |
| --- | --- |
| Product | [goatswap.com](https://goatswap.com) |
| Features | [goatswap.com/features](https://goatswap.com/features) |
| How it works | [goatswap.com/how-it-works](https://goatswap.com/how-it-works) |
| About | [goatswap.com/about](https://goatswap.com/about) |
| Staking | [goatswap.com/staking](https://goatswap.com/staking) |
| Airdrop | [goatswap.com/airdrop](https://goatswap.com/airdrop) |
