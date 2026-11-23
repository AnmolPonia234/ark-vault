# Go-live checklist

This checklist distinguishes a public demo launch from a production-security launch.

## Public demo / feedback release

- [x] Clear beta status and warning in the interface.
- [x] Document data flows and plaintext local-storage limitation.
- [x] Add versioned release notes.
- [x] Add an initial CSP.
- [x] Add cryptographic share reconstruction tests.
- [x] Add CI for the share tests and inline JavaScript syntax.
- [ ] Verify the deployed GitHub Pages URL, mobile layout and keyboard navigation manually.
- [ ] Configure a monitored maintainer contact and private vulnerability reporting.
- [ ] Choose and add an open-source license if reuse is intended.
- [ ] Add a real support/privacy contact and project ownership details.

## Before any production-security claim

- [ ] Independent threat model and cryptographic review.
- [ ] Independent penetration test and remediation of findings.
- [ ] Encrypt local inventory at rest with a reviewed key-management design; define lock timeout, recovery, rotation, revocation and deletion.
- [ ] Review KDF choice and parameters against the threat model and supported browsers.
- [ ] Add comprehensive tests for encryption tampering, malformed inputs, wrong/insufficient shares, cross-version recovery and backup restore.
- [ ] Self-host JSZip or pin it with verified Subresource Integrity; automate dependency and vulnerability scanning.
- [ ] Validate CSP as an HTTP response header where hosting permits; remove unsafe-inline by externalizing scripts/styles.
- [ ] Add ZIP bomb/decompression-ratio tests and resource limits; consider processing in a worker or server-isolated environment.
- [ ] Conduct accessibility testing with keyboard and screen readers.
- [ ] Review privacy notices, retention/deletion, jurisdictional requirements and provider-specific legacy instructions with qualified counsel.
- [ ] Run backup/restore drills and document operational recovery procedures.

Until every production item is complete, describe Ark Vault as a beta or prototype only.
