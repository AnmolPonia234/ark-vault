# Ark Vault v0.1.0 — Public beta

This release is intended for product feedback and controlled testing with synthetic or non-sensitive data.

## Included

- Refined responsive interface and clearer public-beta safety notice.
- Browser-native file downloads for exported and restored files.
- Corrected the GF(256) field construction used by the Shamir-style share workflow (primitive polynomial `0x11d`).
- Share strings now include a format version and the required threshold; recovery checks the declared threshold and rejects duplicate share coordinates.
- Random passphrases use rejection sampling to avoid modulo bias.
- Added initial ZIP size, entry-count and uncompressed-size limits.
- Added a restrictive starter Content Security Policy and GitHub Actions checks.

## Compatibility warning

Share codes from earlier prototype builds (`ARK-S-...`) are not compatible with this release. Do not rely on them; recreate the vault and distribute fresh `ARK-S1-...` shares from v0.1.0.

## Known limitations

- Inventory data remains plaintext in `localStorage`.
- Cryptography and key lifecycle have not been independently audited.
- JSZip is still loaded from cdnjs; Subresource Integrity and a self-hosted dependency are still release tasks.
- CSP is a starter policy and must be validated against the deployed site and supported browsers.
- No automated end-to-end browser tests, backend, identity verification, automatic shutdown monitoring or legal workflow exists.

Do not rely on this beta for real digital-legacy arrangements.
