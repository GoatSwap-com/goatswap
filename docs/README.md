# Developer documentation

This repository is a single Nuxt application. Start with the root [README.md](../README.md) for setup, environment variables, and scripts.

## Layout

| Path | Purpose |
| --- | --- |
| `app/` | Vue pages, layouts, components, styles |
| `server/routes/napi/airdrop/` | Nitro API for airdrop eligibility and claims |
| `server/utils/db.ts` | JSON file store for local airdrop state |
| `nuxt.config.ts` | Nuxt config, runtime public env defaults |
| `public/` | Static assets served as-is |

## Local airdrop data

`server/data/airdrop-users.json` is created at runtime and is listed in `.gitignore`. Do not commit it.

## Security

See [SECURITY.md](../SECURITY.md). Do not document unconfirmed bounty, audit, or contact programs here.
