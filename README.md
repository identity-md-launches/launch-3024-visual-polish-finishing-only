# Wheelings

On-chain pets that grow on Squeektoshi's real wheel.

Adopt a Wheeling for free on Sepolia (one per wallet, soulbound). While the hamster runs, cheer the 10-minute round in progress. When SqueekCore settles that round on Sepolia, your pet gains XP equal to the round's real work, read straight from `SqueekCore.roundPage`. Back-to-back cheered runs build a streak bonus up to ×2. A cheered round where the wheel stood still is a nap: no XP and the streak resets.

- **Stages:** Egg → Pup (first XP) → Runner (5,000) → Champion (20,000) → Legend (60,000)
- **Moods:** Happy, Hungry (no cheer for a day), Sleepy (three days)
- **Golden collar** for holders of a Squeek NFT
- **Art and metadata fully on-chain** (`tokenURI` returns JSON with an SVG); ERC-721 + ERC-5192 (locked) + ERC-4906 (metadata updates)
- **Leaderboard** read from the contract (`pets(start, count)`), feed from `Resolved` events

Nobody, including the deployer, can set XP: the contract has no owner and no admin functions. All growth comes from SqueekCore's certified round pages.

## Contracts (Sepolia)

| | |
|---|---|
| SqueekCore | `0xfd6c166d4b8e2962e65746a13e5a0797cd4de0c4` |
| Squeek NFT (golden collar) | `0xc4c7982657f00509548f3a3a41db7fa439a6856b` |
| Wheelings | [`0x13c421454de930e373647cb45dd35a963c21c0a3`](https://sepolia.etherscan.io/address/0x13c421454de930e373647cb45dd35a963c21c0a3) (block 12073396) |

Constructor: `Wheelings(address core, address squeeks)`. Compiler: solc 0.8.26, optimizer on (200 runs), EVM `cancun`. `release/standard-input.json` is the exact compiler input for verification.

## How a round is scored

1. `cheer(id)` records the round in progress (owner only, once per round, up to 24 waiting).
2. SqueekCore settles rounds in batches. Anyone can call `resolve(id)`; `cheer` also resolves first.
3. For each waiting round ≤ `settledThroughRound`, the contract reads `roundPage(r-1, r, 1)`: work = `end.cumulativeWork − start.cumulativeWork` (capped at `maxWorkPerRound`).
4. Work > 0: XP += work × (1 + (min(streak,5) − 1) / 4). Work = 0: a nap.
5. If SqueekCore cannot serve a settled round, the cheer stays waiting (no fake nap). After a day the owner may `dropOldest(id)`.

## Files

- `index.html` — the whole dapp (no build step, no external scripts). Multi-wallet connect (EIP-6963 + injected), reads Sepolia over public RPCs.
- `contracts/Wheelings.sol` — the contract.
- `release/` — ABI, standard JSON input, metadata.
- `dev/` — historical contract/test documentation; not built or run for the visual-polish assignment.
- `dist/` — complete static production export, included with the source.
- `artwork/og.html` — editable source for the 1200×630 illustrated share image.
- `DESIGN.md` / `VALIDATION.md` — implemented design system, checks, findings and limitations.
- `review/` — final screenshots and concise validation records.

Testnet only. Nothing here has value.


## Install, preview and export

No install, framework, package manager or compilation is needed. The dapp is still one HTML file with inline CSS and JavaScript, plus three local assets. Google Fonts are optional for rendering because each family has fallbacks. Chain reads and wallet actions require network access.

Preview the included production export with Python 3:

```sh
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000/`. To preview source directly, omit `--directory dist`. The server must return `index.html` for `/`; any standard static host can serve the export. Favicon URLs are relative, so the export also works below a gateway subpath.

After editing source, refresh the production export and run the dependency-free checks:

```sh
python3 scripts/export.py
node scripts/check.mjs
```

The export helper copies `index.html`, `favicon.svg`, `og.png` and the unchanged `card.png`, verifies PNG dimensions and byte equality, and prints SHA-256 checksums. This is an optional packaging step, not a runtime build requirement. The submitted `dist/` is already complete. There are no frontend dependencies to lock, so no package manifest or dependency lockfile is introduced or changed. Existing contract build configuration and dependencies remain untouched.

The share tags use `https://wheelings.imd.site/og.png`, verified against the existing Wheelings site (HTTP 200, `image/png`, 1200×630). Its existing deployed app also uses the same contract address. This repository does not publish or deploy anything; the new image is included in the export for publication with the site.

To redraw the share image after editing `artwork/og.html`, use an existing Playwright installation with Chromium and network access to Google Fonts:

```sh
node scripts/render-og.mjs
python3 scripts/export.py
```

If Playwright is installed outside this repository, set `WHEELINGS_PLAYWRIGHT_MODULE` to its `index.mjs`. This optional artwork tool is not required to serve, preview or export the finished site. It refuses to replace `og.png` if its fonts did not load. Do not add dependencies or caches to the submission.

## Validation performed

- Production export and `node scripts/check.mjs` passed: both inline programs parse, IDs are unique, five stages exist, metadata is present, and source/export match.
- TypeScript 5.9.3 checked the new decorative JavaScript with `--allowJs --checkJs --noEmit --target ES2022 --lib ES2022,DOM`: passed. The protected existing app remains plain JavaScript and received syntax, integrity and browser interaction checks; it was not migrated to TypeScript.
- The original app script matches the requested six replacements byte-for-byte. Original page text, IDs and section order were checked; contract/configuration/dependency paths were not modified.
- Chromium rendered the export at 1280 and 390px for visual inspection, with additional 320, 760 and 1440px checks. There was no horizontal page overflow. Product, pet preview and Connect wallet are on the first 390×844 screen. See `review/`.
- The pinned `taste@1` probe passed 15/16 checks. Its remaining nested-card flag is the explicitly requested Legend stage card within Stages. No measured layout, text-overlap, motion, share or target-size failures remain.
- Seventeen interaction checks passed, including live reads, keyboard connection choices, EIP-6963, Adopt/Cheer transaction requests, cancellation, switching networks, a late chain change, pending/confirmed UI, disconnect, cache invalidation and an eight-second stalled-status deadline. Wallet transactions were simulated, never broadcast.

The supplied browser service failed to launch, so local Playwright Chromium was used. Direct Chromium requests to external services failed in this environment; an ephemeral test-only curl relay fetched the real Google Fonts, status API and Sepolia RPC responses. A final relayed live run had no console or resource errors and displayed a round number and “0 Wheelings adopted.” The relay and synthetic interaction fixtures are not part of the site or export. Physical wallets, actual signing, WebKit/Safari, screen readers and native browser zoom were not tested. `VALIDATION.md` distinguishes evidence from limitations and records all six Better Interface domains.
