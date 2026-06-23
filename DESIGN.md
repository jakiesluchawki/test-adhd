# Design System

## Direction

Quiet clinical product UI aligned with the public visual language of Psychoterapia W RÓWNOWADZE without copying its logo. Warm paper surfaces, sage typography and actions, dusty-rose accents, generous spacing, and the product's original tactile geometric photography.

## Color

- Canvas: `#f4f1ed`
- Paper: `#fffdf9`
- Ink: `#5c695f`
- Muted text: `#777d78`
- Rule: `#dfdcd5`
- Sage action: `#657a70`
- Sage dark: `#4f6258`
- Sage soft: `#e6ede8`
- Dusty rose: `#c69582`
- Dusty rose soft: `#f3e5df`
- Success: `#668d78`
- Warning: `#b98767`
- Error: `#a85f58`

## Typography

- Display, navigation, controls and body: Comfortaa, weights 400–700.
- DM Sans remains a legibility fallback for dense data and system fallback.
- Body line length: 68 characters maximum for explanatory prose.
- UI scale: 12, 14, 16, 18, 22, 28, 40 and 56 px.

## Layout

- Desktop shell: 1180 px maximum width with 32 px gutters.
- Client test flow: contextual rail plus a focused question stage.
- Psychologist view: left client index, central report, compact status controls.
- Mobile: single column, sticky progress and bottom action bar where useful.
- Spacing rhythm: 4, 8, 12, 16, 24, 32, 48 and 72 px.

## Components

- Buttons: 44 px minimum height, pill shape, solid sage primary and quiet secondary.
- Inputs: explicit labels, 48 px height, 14 px radius, clear error and focus states.
- Answer options: full-width radio rows with a numbered scale and supporting label.
- Progress: labeled count plus linear indicator, never color alone.
- Status chips: compact, bordered, sentence case.
- Reports: typographic sections separated by rules, not nested cards.

## Motion

- 180 to 220 ms transitions with ease-out-quart.
- Motion only for state changes such as progress, validation and view transitions.
- Respect `prefers-reduced-motion`.

## Imagery

Use the existing original geometric scenes from the PRIVATE RESULTS portal. Preserve aspect ratio and intentional cropping. No CSS drawings or generic stock healthcare photography.
