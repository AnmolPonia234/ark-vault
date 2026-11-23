# Ark Vault

**Your digital life deserves a thoughtful handover.**

Ark Vault is a browser-based digital-legacy planning prototype. It helps people discover accounts, organise preservation priorities, inspect personal data exports and prepare a threshold-based handover guide for trusted contacts.

> [!WARNING]
> **Public beta — not production-secure.** Inventory data is stored in browser `localStorage` without encryption. The cryptographic workflow has not been independently audited. Use synthetic/sample data only. Never enter passwords, recovery codes, financial credentials, identity documents or other sensitive personal information.

## What this beta includes

- Guided manual import of candidate accounts from copied Google, Apple and Meta lists.
- Scanning of selected email exports and browser CSV exports for domains and site URLs. The browser CSV scanner reads the `url` column, not password columns.
- A local inventory with importance, backup status, notes and provider guidance.
- An encrypted inventory export using PBKDF2-HMAC-SHA-256 and AES-256-GCM.
- A Shamir-style threshold share workflow over GF(256), with versioned share strings and threshold checks. Share codes from older prototype builds must be regenerated; see [release notes](RELEASE-NOTES.md).
- ZIP export inspection, supported notes/contact extraction, encrypted second-copy creation and restore.
- JSON/CSV conversion to Markdown, vCard or CSV, plus manually maintained shutdown dates.

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser, preferably through a local static server.
3. Use synthetic/sample data only.

No build step is required. ZIP functionality loads JSZip 3.10.1 from cdnjs and therefore requires an internet connection. Web Crypto generally requires a secure context (`https://` or `localhost`).

## Tests

Requires Node.js 22 or later:

```bash
node --test tests/crypto.test.cjs
```

The test suite checks GF(256) field coverage, threshold-sized share reconstruction, invalid thresholds and duplicate share rejection. GitHub Actions runs these checks and validates inline JavaScript syntax on pushes and pull requests.

These tests are not a substitute for an independent cryptographic audit or browser end-to-end testing.

## Publish with GitHub Pages

1. Create a GitHub repository named `ark-vault`.
2. Upload the contents of this folder, keeping `index.html` at the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then save.
6. After deployment, the site will be available at `https://YOUR-USERNAME.github.io/ark-vault/`.

See the [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart).

## Privacy and security model

- There is no Ark backend, account system, telemetry service or cloud sync in this prototype.
- Selected files are processed in the browser and are not uploaded by the app.
- The page loads JSZip from cdnjs, so the browser contacts that CDN to retrieve the library.
- Inventory state is saved in browser `localStorage` in readable, unencrypted form. Anyone with access to the same browser profile or scripts running on the same origin may be able to inspect it.
- The encrypted vault uses AES-GCM with a PBKDF2-derived key (150,000 SHA-256 iterations). These parameters and the overall design need independent review.
- Backup passphrases are shown once after creating an encrypted copy and are not saved in the inventory. Keep them separately from the encrypted file.
- Browser extensions, malware, shared devices, clipboard history, download folders and device backups are outside this prototype's protection.

Read [`docs/PRIVACY.md`](docs/PRIVACY.md), [`docs/SECURITY-REVIEW.md`](docs/SECURITY-REVIEW.md) and [`docs/GO-LIVE-CHECKLIST.md`](docs/GO-LIVE-CHECKLIST.md) before testing.

## Project status

**v0.1.0 public beta / feedback release.** This project is not a password manager, does not verify a person's identity or legal authority, does not bypass provider security, and does not automatically monitor service shutdowns. It is not legal advice and should not be relied on as the sole copy of a digital-legacy plan.

## Roadmap before production use

- Independent threat-model, cryptographic and penetration reviews.
- Encrypt local persistence by default and define key lifecycle, lock, recovery, rotation, revocation and deletion.
- Add comprehensive browser tests and cross-version recovery tests.
- Self-host JSZip or add verified Subresource Integrity; strengthen and validate the Content Security Policy.
- Harden archive processing and test malicious archives.
- Complete accessibility, privacy and jurisdiction-specific legal reviews.

## License

No license has been selected. Unless a license is added, normal copyright rules apply; viewing or forking this repository does not automatically grant permission to redistribute or reuse it.
