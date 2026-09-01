# Security Policy

GoatSwap is a non-custodial trading interface. Vulnerabilities in this application, its API routes, or wallet flows can put users at risk.

## Supported versions

| Stream | Supported |
| --- | --- |
| `main` | Yes |
| Other branches / forks | No |

## Reporting a vulnerability

**Do not** open a public GitHub issue, discussion, or pull request for a security bug.

### Preferred: private vulnerability reporting

If enabled on the repository:

**Security → Advisories → Report a vulnerability**

Repository maintainers can turn this on under **Settings → Code security → Private vulnerability reporting**.

### If private reporting is not available yet

Contact the repository maintainers through a private channel they publish for security reports. Do not post exploit details publicly before a fix is coordinated.

### Include in your report

- Impact (funds at risk, data exposure, denial of service, etc.)
- Affected surface (page, API route, dependency, deployment)
- Steps to reproduce with minimal proof of concept
- Network, contract addresses, or commit SHA if relevant
- Your contact details and preferred credit name

### Response

Maintainers will acknowledge reports as soon as practicable and provide status updates while the issue is open. Please allow reasonable time before public disclosure.

## Scope

**In scope**

- This Nuxt application and Nitro routes in this repository
- Wallet connection and transaction flows in the official UI
- Misconfiguration that could mislead users into signing harmful transactions

**Out of scope**

- Third-party forks, phishing sites, and unofficial frontends
- Social engineering and requests for seed phrases
- Issues that require a user to voluntarily share private keys
- Vulnerabilities in upstream dependencies without a realistic GoatSwap-specific impact (report upstream when appropriate)

## Safe harbor

If you act in good faith, follow this policy, avoid privacy violations and data destruction, and do not exploit findings beyond what is needed to demonstrate them, maintainers will not pursue legal action for that research.

## Out of scope for this document

The following are **not** confirmed as part of this repository setup unless published separately by the project:

- Bug bounty program or payout amounts
- Third-party security audits or audit PDFs
- Dedicated security contact email
- On-call security team

When those exist, this file should be updated with canonical links.

## Preferred language

English.
