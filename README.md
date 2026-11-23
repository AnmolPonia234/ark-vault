# Ark Vault

**Your digital life deserves a thoughtful handover.**

Ark Vault is a browser-based prototype for discovering digital accounts, organising what matters, recording preservation steps, and preparing a threshold-based handover to trusted people.

> **Prototype / security notice:** This repository is an experimental starting point, not a production-ready digital-legacy or password-management service. Do not use it to store passwords, recovery codes, financial credentials, identity documents, or other high-risk secrets. The cryptographic workflow has not undergone an independent security audit.

## What it currently does

- Import candidate accounts from copied Google, Apple and Meta app lists.
- Scan selected mail exports and browser CSV exports for account-related domains (the CSV scanner reads the `url` column only).
- Maintain a local account inventory with importance, backup status, notes and provider guidance.
- Encrypt an inventory export using PBKDF2-HMAC-SHA-256 and AES-256-GCM.
- Split the encryption passphrase into threshold shares using a Shamir-style GF(256) implementation.
- Inspect ZIP export contents, extract supported notes/contact data, create encrypted second-copy ZIPs and restore them.
- Convert selected JSON/CSV data into Markdown, vCard or CSV, and track manually entered shutdown dates.

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser, preferably through a local static server.
3. Use a test dataset only. Do not use real credentials or sensitive personal data.

No build step is required. JSZip is loaded from cdnjs at runtime for ZIP handling, so that feature needs an internet connection. Other features use browser APIs such as Web Crypto, localStorage and Blob downloads. Web Crypto generally requires a secure context (`https://` or `localhost`).

## Publish with GitHub Pages

1. Create a new GitHub repository named `ark-vault`.
2. Upload the contents of this folder, keeping `index.html` at the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then save.
6. Wait for deployment. Your site will be available at `https://YOUR-USERNAME.github.io/ark-vault/`.

For an initial review, consider making the repository **Private**. Make it public only when you are comfortable sharing the source code and its current security limitations.

## Data and privacy model

- The app does not send selected files to an Ark backend; there is no Ark backend in this prototype.
- The page loads JSZip 3.10.1 from cdnjs, which means the browser contacts that CDN to retrieve the library.
- Inventory state is stored in browser `localStorage` and is not encrypted at rest. Anyone with access to the same browser profile may be able to inspect it.
- The encrypted vault uses AES-GCM, with a key derived by PBKDF2 (150,000 iterations, SHA-256). This is a prototype parameter set, not a substitute for a reviewed key-management design.
- Backup-file passphrases are displayed once after creation and are not stored in the inventory. Keep each passphrase separately from its encrypted backup.
- Browser downloads, clipboard permissions, memory limits, browser extensions and device compromise are outside the app's control.

Read [`docs/SECURITY-REVIEW.md`](docs/SECURITY-REVIEW.md) and [`docs/PRIVACY.md`](docs/PRIVACY.md) before testing.

## Roadmap before a public launch

- Independent cryptography and threat-model review; add test vectors for share generation/reconstruction.
- Encrypt local persistence by default and design safe key lifecycle / recovery.
- Add automated tests, accessibility checks, dependency pinning/SRI, and a content-security policy.
- Add ZIP bomb limits, file-size limits and robust malformed-input handling.
- Separate UI, domain logic and crypto into testable modules; add CI and release/versioning.
- Review provider-specific legacy instructions and legal/privacy obligations in target markets.

## Project status

Early prototype. Features are provided as-is and may change. There is no hosted account system, automatic monitoring, email delivery, cloud sync or legal authority to transfer third-party accounts.

## License

No open-source license has been selected yet. Unless a license is added, normal copyright rules apply; viewing or forking this repository does not automatically grant permission to redistribute or reuse it. Choose a license before inviting outside contributions.
