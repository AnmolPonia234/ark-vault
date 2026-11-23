# Security policy

## Supported release

The current `v0.1.0` public beta is experimental and is not approved for storing real secrets or for sole reliance in a digital-legacy plan.

## Reporting a vulnerability

Please do not publish exploitable security details in a public issue. Until a private security contact is configured for this repository, do not submit sensitive reports or real user data through GitHub issues. The project maintainer should add a monitored security email or enable GitHub private vulnerability reporting before inviting external security testing.

## Current limitations

- Inventory data is stored unencrypted in browser `localStorage`.
- The cryptographic implementation has not received an independent audit.
- Third-party JavaScript is loaded from cdnjs.
- Browser extensions, malware, shared-device access and clipboard/download exposure are outside the app's protection.

## Responsible testing

Use synthetic data. Never include passwords, recovery codes, identity documents, financial information or another person's personal information in bug reports.
