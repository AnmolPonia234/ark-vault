# Privacy notes

Ark Vault v0.1.0 is a browser-only public beta. It has no Ark server, user accounts, telemetry, analytics or cloud sync.

## What happens to data

- Account lists, notes, priorities, status and watch-list entries are stored in the browser's `localStorage`.
- **That local data is not encrypted at rest.** Anyone with access to the same browser profile, browser debugging tools, or scripts executing on the same origin may be able to read it.
- Files selected for scanning or ZIP inspection are processed in the browser. The app does not upload them to an Ark server.
- The page loads JSZip 3.10.1 from cdnjs. The browser contacts that third-party CDN to download the library.
- Creating a locked inventory produces an encrypted export and threshold shares. Creating an encrypted second copy produces a separate backup file and displays its passphrase once; Ark does not store that passphrase in the inventory.

## What users should not enter

Do not enter passwords, recovery codes, private keys, financial credentials, government identity numbers, identity documents, medical records or highly sensitive third-party information.

## Data deletion

Use the browser's site-data controls to clear Ark Vault's local storage. This removes the local inventory from that browser profile, but it does not remove files already downloaded, copied to the clipboard, backed up by the operating system or stored elsewhere.

## External dependencies

The ZIP feature loads JSZip from cdnjs. The project currently uses a restrictive starter CSP, but the dependency is not yet self-hosted or protected with a verified Subresource Integrity hash. This remains a pre-production task.

## Scope

This notice describes the current prototype's technical behavior. It is not a legal privacy policy and has not been reviewed for a particular jurisdiction.
