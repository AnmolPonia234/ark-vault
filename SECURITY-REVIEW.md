# Security review notes — v0.1.0

## Release classification

Public beta for feedback with synthetic data only. Not approved for production use or real digital-legacy arrangements.

## Known risks and limitations

1. **Plaintext local persistence.** Account names, domains, notes, trusted-contact details and backup locations are stored in `localStorage` without encryption.
2. **Cryptographic implementation is custom.** The Shamir-style GF(256) code was corrected to use the `0x11d` primitive polynomial and now has initial reconstruction/property tests, but it has not been independently reviewed. Tests are not proof of security.
3. **KDF configuration needs review.** PBKDF2-HMAC-SHA-256 currently uses 150,000 iterations. Parameters, password/key handling and supported browser performance need a documented threat model and expert review.
4. **Secret lifecycle is incomplete.** There is no robust model for rotation, revocation, passphrase reset, trusted-contact changes, secure deletion or emergency recovery.
5. **ZIP processing remains resource-sensitive.** Initial compressed-size, entry-count and uncompressed-size caps are present, but archive parsing and decompression behavior require adversarial testing. JSZip may still consume substantial memory.
6. **Third-party runtime dependency.** JSZip 3.10.1 is loaded from cdnjs. A verified SRI hash or self-hosted pinned dependency and automated dependency scanning are still required.
7. **Browser environment is not trusted storage.** Extensions, malware, shared devices, clipboard history, downloads folders and device backups may expose data.
8. **No identity or legal authority checks.** Ark does not verify death, identity, consent, guardianship or a recipient's legal right to access an account.
9. **No automated browser end-to-end suite.** CI checks share reconstruction and inline JavaScript syntax, not the complete UI or all browser-specific flows.

## Compatibility warning

Share strings from older prototype builds (`ARK-S-...`) must not be used with this release. Generate and distribute fresh `ARK-S1-...` shares.

## Work completed in this beta

- Rebuilt GF(256) tables with primitive polynomial `0x11d` and verified all 255 non-zero elements.
- Added tests for threshold reconstruction across combinations, invalid thresholds and duplicate share coordinates.
- Versioned share strings and added an explicit threshold marker with recovery-side checks.
- Changed passphrase generation to rejection sampling to avoid modulo bias.
- Added initial ZIP compressed-size, file-count and uncompressed-size caps.
- Added a starter Content Security Policy and CI workflow.

## Minimum bar before production claims

- Independent threat model, cryptographic review and penetration test.
- Encrypt local persistence by default using a reviewed key-management and lifecycle design.
- Review KDF selection/parameters and add robust lock, recovery, rotation, revocation and deletion flows.
- Add tests for tampering, malformed inputs, insufficient/wrong shares, cross-version recovery and restore workflows.
- Self-host JSZip or pin it with verified SRI; automate dependency scanning.
- Validate CSP as an HTTP response header where possible and remove `unsafe-inline` by externalizing scripts/styles.
- Adversarial archive testing, accessibility testing, privacy/legal review and documented recovery drills.

Do not describe this release as audited, zero-knowledge, end-to-end secure or production-ready.
