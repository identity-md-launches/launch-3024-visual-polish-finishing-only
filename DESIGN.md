# Wheelings design system

## Overview

Wheelings is a Sepolia pet dapp: adopt a soulbound pet, cheer a real hamster's wheel, and grow from its certified work. The page keeps the existing moonlit field, wooden wheel, pet frame, medal board and sleeping-hamster footer. Warm gold identifies actions; cream type and cool blue surfaces make the night readable.

The implemented source of truth is `index.html`: tokens at line 24, components in its inline stylesheet, the landscape and Stages artwork in inline SVG, and a separate decorative script at the end. The original app script has only the six specified fixes. The landscape and stage portraits are illustrations; the actual pet image is the SVG returned by the contract.

## Colors

| Token | Value | Role |
| --- | --- | --- |
| `--ink` | `#0d1222` | Page and darkest night |
| `--ink-2` | `#111830` | Reserved existing night token |
| `--panel` | `#151d30` | Main panels |
| `--panel-2` | `#1b263b` | Existing secondary surface token |
| `--fg` | `#f1ead9` | Primary cream text |
| `--muted` | `#acb7cc` | Descriptions and captions |
| `--dim` | `#99a7be` | Table headings and quiet indicators |
| `--gold` | `#ffc861` | Actions, focus, XP, collar accents |
| `--gold-hi` / `--gold-lo` | `#ffe2a3` / `#f0a33b` | Existing warm accent range |
| `--ember` | `#ff7a59` | Hungry mood, warning details, progress accent |
| `--moss` | `#7bd389` | Running/healthy indicators and Happy mood |
| `--sky` | `#7cc7ff` | Sleepy mood and cool highlights |
| `--line` | `#32425b` | Secondary control borders |
| `--line-soft` | `rgba(124,199,255,.13)` | Separators |
| `--wood` / `--wood-dk` / `--wood-hi` | `#a8743f` / `#6b4423` / `#d39b5d` | Existing wood family |

Hero gradients, wood grain, fur and moonlight have additional illustration colors. They do not introduce extra interface status meanings. Status always retains its text label. On phones, status chips have a 72% navy backing so the moon cannot wash out their text. Selection uses gold with navy text; keyboard focus uses a 2px gold perimeter, 5px outside the control. Forced-colors mode uses system colors.

Measured contrast samples and their limitations are in `review/contrast.json` and `VALIDATION.md`. A gradient or illustration is not assumed to pass because its base token passes.

## Typography

The existing Google Fonts request supplies Fraunces, Figtree and JetBrains Mono. No font files or external JavaScript are bundled. All three families were observed loaded in Chromium, including the normal and italic Fraunces faces.

| Role | Implementation |
| --- | --- |
| Product name | Fraunces 700, 96px desktop / 72px intermediate / 56px phone, line-height 1, tracking `-.055em`; italic gold “ings” |
| Pet name | Fraunces 600, 36px desktop, 24px below 760px, line-height 1.15 |
| Section, step and stage headings | Fraunces 600, 24px, line-height 1.25, tracking `-.025em` |
| Body | Figtree 400, 16px, line-height 1.6; compact descriptions 14px |
| Controls | Figtree 600, 14px; primary Adopt/Cheer action 16px |
| Captions, metadata | 12px Figtree; JetBrains Mono 400 for XP thresholds, addresses, round numbers and countdowns |
| Emphasis | 600; the product title and inherited bold content can use 700 |

The six size tokens are 12, 14, 16, 24, 36 and 96px, with breakpoint replacements for the display sizes. Headings balance; descriptions use pretty wrapping. Body text stays selectable. Changing numeric values use tabular figures. The title's italic is a real font face, not synthesized.

Fallbacks: Fraunces → Iowan Old Style / Palatino Linotype / Georgia; Figtree → Segoe UI / system UI / Helvetica Neue / Arial; JetBrains Mono → system monospace / SFMono-Regular / Menlo / Consolas.

## Layout

The content column is at most 1120px. Outer padding is 16px with safe-area support, and 32px at the top on desktop. Common spacing follows 4, 8, 12, 16, 20, 24, 32, 40 and 48px steps. Main sections have 24px gaps, reduced to 16px on phones. Default panels have 32px padding; the pet panel has 40px and a 48px column gap.

Existing section order is preserved: hero, deployment notice when needed, wallet, pet, current wheel, **new Stages**, board, scored rounds, footer. A semantic `main` groups the app panels. Existing text and element IDs are retained.

| Breakpoint | Behavior |
| --- | --- |
| Above 980px | 340px pet art column; four stat tiles; five stage cards; three how-to columns |
| 980px | Pet art column becomes 300px; stats use two columns; spacing reduces |
| 760px | Compact hero type; how-to steps stack; Stages uses three columns; populated pet uses stacked art/info |
| 540px | Hero text above a cropped landscape; 56px title; compact pet preview beside its heading; populated pet stats/actions span the panel; two stat columns; two stage columns with Legend spanning the final row |
| 359px | Narrower pet preview and panel insets; content remains readable at 320px |

The phone layout keeps the product and Connect wallet action on the initial 390×844 screen. Once connected on a phone, the hero becomes compact and its scene dims behind the copy. Adopt remains visible, and Cheer occupies the row immediately below the pet heading, before supporting stats. All copy and section order remain intact. Long pet labels flow inside `.pet-heading`; they are not absolutely positioned. At small widths the populated leaderboard scrolls inside `.tablewrap`, which is keyboard focusable and labelled. No values are ellipsized by CSS. Empty board messages use the available width without unnecessary horizontal scrolling; empty-table column headings are suppressed on phones.

Observed widths: 320, 390, 760, 1280 and 1440px. These viewport checks are not a claim of physical-device or native zoom testing.

## Elevation & depth

Panels use a quiet diagonal glass highlight and an inset top highlight. The hero has a soft external shadow; the wallet row is separated by a single line. The pet frame supplies the strongest tactile depth: warm illumination behind the wood, carved grain, corner nails and a restrained shadow.

The landscape has three parallax depths, layered hills and trees, a lit cottage, fences, soft moon beams, clouds, fireflies, mushrooms and a lantern. Wheel spokes rotate independently of the shaded running hamster. Podium lighting is confined to the first populated board row; empty states have no podium treatment.

## Shapes

Main panel radius is 24px, 20px on phones. Hero radius is 28px, 22px on phones. Buttons use 10px, large actions 12px, stage portraits 16px, table rows 12px, and toast 14px. The wooden frame uses a 12px rim, reduced to 8px on phones. Its inner image is contained without cropping, filtering or animation transforms.

## Components

- **Hero:** `header.hero`, `.scene`, `.hero-copy`, `.chips`. The scene is decorative and excluded from the accessibility tree. Its native “Pause scene” checkbox pauses the scene without changing dapp logic. Mouse parallax has at most 4px horizontal and 2.5px vertical travel at full depth, stops on pointer exit, and is disabled for touch, coarse pointers and reduced motion.
- **Panels:** `.panel`, `.section-title`, `.section-heading`, `.sub`, `.label`. Reuse the common padding and typography rather than adding a new surface or type scale.
- **Wallet/actions:** `.btn`, `.primary`, `.big`, `.wallet`, `.wbtns`. Controls have at least 44px height; large actions have at least 54px height. Hover, active, disabled and keyboard focus states are explicit. Existing wallet discovery, connection, network switching and transaction behavior are retained.
- **Pet:** `.home`, `.petart`, `.pet-heading`, `.stats`, `.bar`, `.actions`, `.queue`. The frame decorations are pseudo-elements that survive the original script replacing the image. `.cheering` produces a 1.4-second burst of stars; reduced motion uses a static star treatment. The contract SVG itself stays untouched.
- **Stages:** `.stage-grid`, `.stage-card`, `.stage-picture`, `.stage-xp`, `.mood-legend`. Egg, Pup, Runner, Champion and Legend use shared SVG fur/cream gradients. Gear identifies growth: headband, green cape, crown. Thresholds and mood/collar notes are real text, not baked into pictures.
- **Board:** `.tablewrap`, `table`, `.num`, `.thumb`, `#board`. Gold/silver/bronze medal ranks, aligned numeric columns, warm first-place glow and a separate “me” highlight. Owner links remain usable and every column remains reachable.
- **Toast:** `#toast` retains its existing polite status role and message lifecycle. A CSS information icon, solid readable surface, safe-area-aware placement and responsive width improve presentation without changing its text or timer.
- **Motion:** 600ms one-time section entrances start from 75% opacity; content is visible before enhancement. Interactive transitions name their properties. The reduced-motion rule disables all animation/transition/parallax. The live pet image has no transform or filter.

## Do's and don'ts

Use the existing `.wrap`, `.panel` and size tokens for additional content. Keep static explanations visually quieter than wallet and pet actions. Use the existing SVG illustration vocabulary for decorative art. Preserve real state and its recovery messages.

Do not replace contract artwork with the illustrated stage portraits, add fake chain data, recolor the pet image, change contract/wallet configuration as a visual fix, or add a runtime framework. Keep `dist/` byte-for-byte synchronized with the four runtime source files using the export helper.

## Guidance attribution

Design review applied the pinned Better Interface guide by Jakub Krehel (MIT), commit `267330e1adfc66a718fb65fa6918c1f06d0a689e`. Documentation structure was informed by Paul Bakaus's Impeccable (Apache-2.0), commit `9d715cc4f5564a990ca8345abfdd5df6dc9b41c8`. See `review/NOTICE.md` and the accompanying guidance license texts.
