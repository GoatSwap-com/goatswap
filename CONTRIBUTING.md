# Contributing to GoatSwap

Thank you for helping improve the GoatSwap application. This repository is the Nuxt interface and related server routes for [goatswap.com](https://goatswap.com).

## Before you start

1. Read the [Code of Conduct](./CODE_OF_CONDUCT.md).
2. Security issues go to [SECURITY.md](./SECURITY.md), not to a public issue.
3. Keep user-facing copy aligned with the live site where it describes product behaviour.

## Branching

1. Do not push directly to `main` once branch protection is enabled.
2. Open a pull request for every change.
3. Use a short branch name: `fix/airdrop-copy`, `feat/staking-ui`, `docs/readme`.

## Issues

Use the GitHub issue templates when they are available:

- **Bug** — something in this app does not match expected behaviour
- **Feature** — a scoped change to the interface or API in this repo
- **Docs** — README or developer documentation only

Search existing issues before opening a duplicate.

## Pull requests

- Keep diffs focused and reviewable.
- No secrets, private keys, `.env` files, or `server/data/airdrop-users.json`.
- Update README or docs when behaviour or configuration changes.
- Do not add unverified security, audit, or bounty claims.

The pull request template is a checklist — fill it in honestly.

## Local checks

```bash
npm install
npm run dev
npm run build
```

There is no automated test or lint script in `package.json` yet. CI runs `npm run build` on pull requests.

## Governance and protocol scope

On-chain protocol changes, DAO governance, and separate SDK or docs repositories are **out of scope** for this contributing guide until those codebases are linked from the org.

## Questions

Open a documentation issue or reach out through channels the project publishes on [goatswap.com](https://goatswap.com).
