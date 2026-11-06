# Wheelings revision validation

Checked 2026-11-06 against the final `dist/` export. This records worker observations, not independent certification.

All twelve findings were reproduced before editing. Eleven are fixed; the informational round-fallback report is disputed only because its requested correction requires changing the protected application script. `.imd-responses.json` contains the individual verdicts and evidence. Both inline scripts remain byte-identical to the accepted submission, including the six prescribed fixes.

## Corrections and evidence

| Source | Reproduced behavior | Final result |
| --- | --- | --- |
| `index.html:65` | Pause overrode SVG placement transforms; cottage moved to x=35.2 at 1280px. | Only animation playback pauses. Cottage retains `matrix(1,0,0,1,1010,237)` and all scenery remains visible at 1280/390. |
| `index.html:93` | Desktop nails extended to 19.69px from the edge, into the picture beyond the 12px wood border. | Centers 7/353 and corrected slots keep the nail/stroke extent within 10.25px. Neither script nor image bytes changed. |
| `index.html:93` | At 320px, grain crossed the placeholder in an 88×172.75 frame. | `preserveAspectRatio='none'` makes the overlay follow rectangular frames. Inspected at 320/390. |
| `artwork/og.html:6` | The 546px scene left an 84px flat band; its top edge cut the moon halo. | Scene fills the 630px card, the rule is removed, and the PNG was rerendered with both intended fonts loaded. Inspected the resulting 1200×630 image. |
| `index.html:446`, `index.html:463`, `index.html:470` | Champion/Legend lost their headbands; Legend implied a stage-earned golden collar. | Headbands persist, green cape/tie remains, crown remains, and the collar is reserved for the Squeek-holder note. Checked against `_gear()` in the supplied contract. |
| `index.html:249` | Pointer movement exposed pale bottom/right layer edges. | Hero viewBox `6 4 1088 392` crops past maximum travel. Inspected the same upper-left pointer position after correction. |
| `index.html:497` | Footer hamster/grass used flat colors inconsistent with the hero. | Shared fur/cream/ear gradients, outline, whiskers, fur marks, moss-colored ground and visible grass blades. Inspected desktop/mobile footer. |
| `index.html:208` | Phone Pause scene covered the wheel foot; Sepolia chip covered the moon. | Pause stays at top:12px/right:16px. 200px bottom padding gives 8.38px moon/chip clearance at 390; Connect ends at y=539 and the pet preview at y=789 on the 844px screen. |
| `index.html:70`, `index.html:208` | RPC-error notice touched the hero. | Settled entrance-state gaps measure exactly 24px at 1280 and 16px at 390. |
| `index.html:174` | Rank header started 10px left of the digits. | With populated fixtures, header and rank text both begin at x=134. |
| `index.html:402`, `index.html:419`, `index.html:436`, `index.html:453`, `index.html:470` | Five newly added captions did not explain stage changes. | Captions describe the scored run, hatching, headband, cape and crown. Original page/script text is preserved. |
| `index.html:209` | The probe exposed a small real title crop at 320px. A scratch render without clipping showed 89 gold pixels beyond the hero at device scale 2. | Only below 359px, the title uses 52px instead of 56px. Its italic text now ends at x=286.27, inside the hero's x=304 edge. The final probe reports no clipped text. |

The proposed 190px phone padding still left a slight moon/chip intersection after the corrected hero crop. The final 200px value clears it while preserving first-screen product/action visibility.

## Build, typecheck and interaction results

Executed:

```sh
python3 scripts/export.py
node scripts/check.mjs
node test/scratch/tools/node_modules/typescript/bin/tsc --noEmit --allowJs --checkJs --target ES2022 --lib ES2022,DOM test/scratch/visual-only.js
node test/scratch/verify.mjs final
node test/scratch/interactions.mjs
IMD_PLAYWRIGHT="$PWD/test/scratch/browser-tools.mjs" node .imd/reads/skills/design-critic/scripts/taste.mjs --out test/scratch/taste
```

The first two are the permanent, dependency-free production export/check commands. The other commands name temporary validation scaffolding; `test/scratch/` is removed before submission. TypeScript 5.9.3 checked the extracted, unchanged decorative script; the original application received syntax, integrity and interaction checks. No TypeScript migration or whole-program typecheck is claimed.

Export and checks passed. Source and `dist/` match for all four runtime files; production size is **686,180 bytes**. GET `/` and `/preview/` returned 200 with the title Wheelings; both PNG endpoints returned 200 `image/png`; the relative favicon worked below `/preview/`. `card.png` is unchanged. No frontend dependency, manifest, lockfile, build configuration or contract source was changed.

The geometry/motion suite passed. No page overflow at 320, 390, 760, 1280 or 1440. Reduced motion stopped all active animations and parallax while preserving the cottage transform. The paused scene, narrow rectangular frame, final Stages, footer, share card, desktop page and phone page were inspected as rendered screenshots. The four refreshed screenshots in `review/` show real read-only data; populated fixtures remain in deleted scratch space.

Eleven interaction checks passed:

1. Keyboard Enter opens the existing four wallet-app links; Back restores Connect.
2. An EIP-6963 test provider connects by name on Sepolia; Adopt fits the first 390×844 screen.
3. Adopt requests the deployed contract, original selector, zero value and explicit Sepolia chain; cancellation recovers.
4. A chain change during gas estimation prevents sending and shows the exact prescribed recovery message.
5. Switch to Sepolia requests the original wallet network switch.
6. Test SVG bytes are displayed unchanged without image filters/transforms; Cheer fits the first screen.
7. Cheer requests the correct selector, pet ID and chain; cancellation restores the action.
8. Cheering adds the sparkle pseudo-element without transforming the image.
9. At 320/390, a populated board scrolls internally to its last column without page overflow.
10. Disconnect clears the original saved-wallet key and restores Connect.
11. The live read and fixture interaction runs have no console errors or uncaught exceptions.

Initial reads reached the real status API and Sepolia contract: round 342 and “0 Wheelings adopted” were observed. The phone screenshot crossed the next round boundary. These observations are not hardcoded data. Wallet requests, owned-pet artwork and later interaction RPC responses were synthetic fixtures; nothing was signed or broadcast.

## Design probe and Better Interface coverage

The final pinned probe ran successfully and passed **14/16** checks. Its layout flag is a false positive: `.eyebrow` is a full-width block, but its actual text range is x=36–183 and Pause scene's text is x=289–358 at 390px. The 106px gap and screenshot show no text overlap. No source change was made to satisfy that false positive. The chrome flag remains the required Legend card inside Stages, an intentional exception to the probe's nested-card heuristic. The previously observed real 320px title crop was fixed and disappeared from the final probe. Full check outputs and geometry are retained in `revision-checks.json`.

| Domain | Coverage in this revision | Limits |
| --- | --- | --- |
| Accessibility | Native pause/keyboard control, connection via keyboard, reduced motion, original accessible names/status roles, usable targets. | No screen-reader or physical-device session; native zoom and forced-colors were not retested. |
| Layout | Pause/chip placement, notice spacing, rank alignment, rectangular frame, first-screen actions, populated internal table scrolling and five viewport widths. | English layout only; no RTL/localization variant exists. |
| Writing | Replaced only the five new captions with factual stage changes; reviewed holder-only collar wording against the contract. | Protected application strings and the informational round fallback remain unchanged. |
| Typography | Same three font families/weights; loaded faces checked; narrow title crop corrected; numeric alignment checked. | Browser rendering in Chromium only. |
| Colors | Required palette preserved; footer reuses hero colors; all solid text pairs measured by the probe passed. | 102 text boxes over images/gradients were outside the final probe's contrast measurement. Historical contrast samples remain explicitly labelled as first-round evidence. |
| UI | Pause preserves scenery; no nails/grain over art; cumulative gear; edge-safe parallax; full-height share card; footer shading; cancellation/recovery and celebration states. | No 10%-speed DevTools recording, Safari/WebKit or real wallet signing. |

## Preserved limitation and environment

With RPC unavailable, the existing hard-coded fallback showed round 1,530–1,531 while live reads showed 342 and loaded genesis `1793735400`. This is reproduced and left unchanged, as requested by the informational finding. The requester must authorize correcting the constant or showing a dash until the read arrives. No missing input prevents delivery of the visual revision.

The supplied browser service failed with “Socket path too long.” Local Playwright with the installed Chromium headless shell worked. Temporary request routing used curl for actual Google Fonts, API and read-only RPC responses because direct browser transport is restricted on this machine. That adapter is test-only and is not shipped. Browser screenshots are not screen-reader, native-device, real signing or independent-certification evidence. No hosting, publication or on-chain deployment was performed.

Both inline scripts retain their accepted SHA-256 values:

- Application: `be602d8a55f0cd17092efe718597d11039309a9f8aa74ab65cf2e4820087e516`.
- Decorative enhancement: `a9a611b84b32dad66ef84f9835445a04dd6a8a8686122eebc7451477dff50dbd`.

Only presentation, new captions, share artwork, static export and review documentation/evidence changed. Dependency/cache directories remain excluded from Git at every level; no submodule was added. The required `.imd-responses.json` was initially ignored by the workspace's existing rules. A root `.gitignore` adds only its exact-path inclusion. Explicit path budget: `/.imd-responses.json` at most 16 KiB and `/.gitignore` at most 256 bytes; no other path is unignored. The changed/new submission files total about **3.24 MiB**, under 8 MiB.
