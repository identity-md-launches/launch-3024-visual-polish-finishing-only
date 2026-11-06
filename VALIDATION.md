# Wheelings visual finishing validation

Validation date: 2026-11-06. This is a worker-side record, not independent certification.

**Revision:** the current findings, commands, results and limitations are in [review/REVISION.md](review/REVISION.md) and [review/revision-checks.json](review/revision-checks.json). All twelve reviewer findings are answered in `.imd-responses.json`. The record below describes the accepted first round and is superseded by the revision report where values differ. The four screenshots have been refreshed from the final revised export; `review/checks.json` and `review/contrast.json` retain the earlier round's historical measurements.

## Result

| Area | Result |
| --- | --- |
| Six prescribed script fixes | Applied exactly; byte comparison against the original script with only those replacements passed |
| Requested visual work | Hero, Stages, frame, panels/toast, board, OG and favicon implemented |
| Production export | Four complete runtime files in `dist/`, byte-identical to source; 635,665 bytes |
| Primary interactions | 17 checks passed; wallet transaction requests were simulated, not broadcast |
| First screen at 390×844 | Product, Connect wallet and pet preview visible; connected Adopt/Cheer also checked |
| Pinned design probe | 15/16 checks passed; the remaining chrome flag is the required Legend card inside Stages |
| Console | Final relayed live run and interaction run: no console errors or uncaught exceptions |
| Hosting | Not deployed by this assignment; committed export is the publishing input |

The visual idea is a small, warm pet world inside a moonlit field: the wood, lanterns, hamster and gold actions belong to the same scene.

## Build, source integrity and assets

Executed after the final source changes:

```sh
python3 scripts/export.py
node scripts/check.mjs
```

Both passed. Exporting is a direct static copy, with PNG signature/dimension checks and source/export byte comparison. The page requires no build or installation to run. Node's parser checked both inline scripts. The new animation script was separately extracted to scratch and checked by TypeScript 5.9.3:

```sh
tsc --noEmit --allowJs --checkJs --target ES2022 --lib ES2022,DOM test/scratch/visual-only.js
```

Result: exit 0. This checks the new code and its DOM types. It does not assert that the protected, untyped application has passed a whole-program TypeScript migration. That original script was syntax-checked, byte-compared, and exercised in Chromium.

A source comparison confirmed every original non-art element ID and every original HTML text node remains present, with existing sections in their original order. Stages is inserted directly after the current-wheel panel. Only the six requested replacements occur in the original `<script>`. No build configuration, dependencies, contract source, `dev/`, lockfiles, environment files or ignore files were changed. The static site has no frontend dependencies and therefore adds no dependency lockfile.

`og.png` is a real 1200×630 PNG, rendered from `artwork/og.html` with its Google Fonts loaded. `favicon.svg` is a local vector hamster-in-wheel mark. `card.png` is unchanged (SHA-256 `7a4b79d916907f0ff4e683f3ce597b6e5ebbb5d79c5d57d2e7fceb852f29ec98`). All four assets are in `dist/`.

The existing `https://wheelings.imd.site/` returned HTTP 200, title “Wheelings”, and the configured Wheelings contract. Its `/og.png` returned HTTP 200, `image/png`, 1200×630. Both social-image tags retain this confirmed absolute URL. That check verified the existing deployment; it does not claim the new export has been published.

## Browser method and evidence

The supplied browser service could not launch because its Chromium profile socket path exceeded the platform limit. A local Playwright Chromium installation worked using a short scratch temporary path. It served `dist/` in a bounded foreground test, including a `/preview/` subpath. No preview service or proxy is part of the deliverable.

Direct browser requests to external RPC/API/font services returned `ERR_EMPTY_RESPONSE` in this environment. Curl could reach the same URLs. A temporary Playwright request relay therefore fetched the actual responses through curl, without changing frontend code or substituting data. A recorded live run loaded Figtree, both Fraunces styles and JetBrains Mono, displayed round 337 and “0 Wheelings adopted,” and had no console or resource errors. The later interaction run read round 339 with the same real zero-supply count. Those values are observations, not hardcoded site content. Earlier external transport failures are a test-environment limitation, not silently counted as passes.

Inspected actual screenshots at 1280px and 390px. Additional measured widths were 320, 760 and 1440px. In the final 390px render, Connect wallet occupied approximately y=461–505 and the pet preview y=621–755, within the 844px first screen. Document width equaled viewport width at 320, 390, 760 and 1280; the probe also checked 1440.

Retained evidence:

- [Desktop, 1280px](review/desktop-1280.png) and [desktop first screen](review/desktop-first-screen.png).
- [Phone, 390px](review/mobile-390.png) and [phone first screen](review/mobile-first-screen.png).
- [Check results](review/checks.json) and [contrast samples](review/contrast.json).

The retained screenshots use live read-only data. Populated board/transaction screenshots used clearly labelled synthetic test fixtures in deleted scratch space; they are not shipped as live product evidence or seeded into the app.

## Interaction validation

All 17 entries in `review/checks.json` passed:

1. Root and `/preview/` return the HTML page; favicon and both PNG endpoints return HTTP 200 with correct MIME types.
2. Real Sepolia reads populate a numeric round and adopted count.
3. Keyboard Enter opens the no-wallet choices; all four original wallet app links are present; Back restores Connect.
4. An EIP-6963 test provider connects by name and enables adoption; the Adopt button fits the first 390×844 screen.
5. Adopt requests the correct contract, selector, zero value, gas headroom and explicit Sepolia chain ID; wallet cancellation recovers.
6. A chain change between estimation and send prevents `eth_sendTransaction` and shows the exact new recovery message.
7. Wrong-network recovery requests Sepolia through the original control.
8. A supplied SVG is displayed byte-for-byte; no image filter or transform is applied.
9. Cheer fits the first 390×844 screen, reaches the wallet with the correct pet ID and chain, then recovers on rejection.
10. Pending actions disable; a simulated successful receipt refreshes the pet, triggers its decoration and disables repeat cheers.
11. Populated board columns remain reachable by local horizontal scrolling at 320/390; long golden-collar labels do not overlap the pet name.
12. Fine-pointer movement produces parallax; reduced motion stops every active animation and clears parallax.
13. The native Pause scene checkbox pauses the scene.
14. Disconnect clears the existing saved-wallet key and restores Connect.
15. Unchanged board entries reuse artwork. XP, stage, mood and collar changes each reload only the affected image. The existing 60-second poll was shortened inside the test harness only.
16. While status hangs, deployment and board reads complete independently; the deployment notice stays hidden before its check completes; the status request reaches its eight-second abort deadline.
17. No console errors or uncaught exceptions during the completed interaction run.

There was no real wallet account, signature, transaction broadcast or on-chain mutation. Synthetic addresses, hashes and SVG fixtures existed only in `test/scratch/`. The shipped app retains its real addresses and transport configuration.

## Better Interface: coverage of six domains

| Domain | Applied/reviewed | Evidence and limits |
| --- | --- | --- |
| Accessibility | Semantic main/section headings, labelled table region, native controls, keyboard focus, target sizes, non-color state labels, decorative SVG hiding, reduced motion | Keyboard connection and focus screenshot inspected; pause and reduced-motion behavior exercised. Screen-reader, native zoom and physical-device sessions not performed. |
| Layout | Shared alignment/padding, content-driven breakpoints, first-screen product/action, wrapping labels, internal table scrolling | Screenshots at 1280/390; overflow checks at 320/390/760/1280/1440; populated-state fixtures. No localization/RTL variant exists; no claim of testing one. |
| Writing | Original page copy preserved; added stage thresholds, mood durations and collar note checked against the brief | Existing recovery/transaction strings remain unchanged except the required new chain guard. Source review; no user-copy rewrite. |
| Typography | Three requested families; small size scale; natural label casing/tracking; numeric alignment; stable measure | Loaded-font inspection and screenshots. Probe: at most six total sizes at desktop and four on phone, three weights/families, 58 first-screen prose words at 390. |
| Colors | Exact requested accent palette; readable secondary text; mobile chip backing; visible focus | Probe measured solid pairs pass. Eight screenshot background samples plus a conservative chip compositing bound are recorded below. Artwork/all gradient pixels are not exhaustively measured. |
| UI | Refined surfaces, wood grain/nails, stage gear, medals, hover/focus/disabled states, icon toast, short sparkle burst and visible-by-default entrances | Real and fixture states inspected. No slow-motion DevTools recording, browser-native screen reader or WebKit session. |

## Findings and corrections

| Severity/domain | Source | Observation → final correction |
| --- | --- | --- |
| High / layout | `index.html:207` | The original tall phone hero displaced the app action. A compact text/landscape layout places Connect and the pet on the first 390px screen. The connected phone hero becomes shorter and dims the scene, and the Cheer action is placed before supporting stats (`index.html:210`), keeping Adopt/Cheer on the first screen too. |
| Medium / typography | `index.html:207` | A populated 390px fixture split “5,000” across lines in a four-column tile row. Phones now use two stat columns; the same state was rerendered and inspected. |
| Medium / colors | `index.html:207` | Phone status text could cross the bright moon. Chips now have 72% navy backing; the conservative white-background contrast bound is 6.28:1. |
| Medium / layout | `index.html:161`, `index.html:171` | The empty leaderboard inherited populated-table width and first-place lighting. Empty rows now fit the box and have no podium glow; real rows keep all columns and medals. |
| Low / UI | `index.html:216` | An independently animated paw could drift outside the hamster. That transform was removed; whole-hamster running motion and speed lines remain. |
| Preventive / layout | `index.html:366`, `index.html:207` | Fixed row offsets for a long pet label were fragile. `.pet-heading` keeps the label, name and description in normal flow; populated 320/390 fixtures confirm no overlap. |
| System / typography | `index.html:24`, `index.html:68` | The earlier style used many sizes and tracked uppercase labels. Shared tokens, natural casing and three weights now carry the hierarchy. Probe type/casing/tracking checks pass. |
| Intentional exception / UI | `index.html:397`, `index.html:207` | The chrome heuristic still identifies the full-width phone Legend card inside Stages as a nested card. The brief explicitly requests “five illustrated cards”; the final portrait sequence is retained. This is a disclosed taste exception, not an overflow or interaction failure. |

All applicable reproduced functional/layout findings were corrected. No requested contract or wallet work was broadened to satisfy a design heuristic. In particular, the wallet-connector reference was read, but its suggested stack replacement is overridden by the instruction to preserve the existing script.

## Contrast evidence

Eight pairs used computed text colors and neighboring rendered-background pixels from a real 1280px Chromium screenshot. Ratios: hero body 11.14:1; hero label 9.17:1; wallet helper 9.15:1; step descriptions 8.13:1; stage captions 7.78:1; stage XP 10.35:1; section heading 12.95:1; primary action 11.28:1. The phone chip backing was additionally composited over worst-case white: cream text remains 6.28:1. Pixel positions and RGB values are retained in `review/contrast.json`.

These are representative samples, not blanket WCAG certification. The probe excludes text over images/gradients (see the final count in `review/checks.json`). The user-supplied contract artwork is not recolored or reworked to change its contrast.

## Final limitations

- The automatic path/byte verifier does not certify behavior. This record only describes tests actually run here.
- WebKit/Safari was not installed; no Safari or real iPhone claim is made.
- Physical wallets, actual signing/mining, native 200% browser zoom and screen readers remain unverified.
- External service availability is outside this static export. A temporary curl relay was needed for this environment's browser checks; it is not a production dependency.
- The pinned probe's remaining card flag is intentionally retained to satisfy the illustrated Stages requirement.
- Publication is outside this assignment. `dist/` is ready for the publisher; no publishing or deployment command was run.

## Submission budget

The changed and new deliverable files total approximately **3.22 MiB**, below the 8 MiB ceiling. The complete static export is 635,665 bytes. The remaining files are source, documentation, optional artwork-export tooling and review evidence. No generated dependency directories, package-manager caches, npm archives or submodules are included. No ignore file was changed.
