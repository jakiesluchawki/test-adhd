# Design System

## Direction

Editorial product UI grounded in the existing PRIVATE RESULTS portal. Warm paper surfaces, deep navy typography, restrained cobalt and coral actions, and original tactile geometric photography. Product controls remain familiar and highly legible.

## Color

- Canvas: `oklch(0.965 0.012 73)`
- Paper: `oklch(0.985 0.008 76)`
- Ink: `oklch(0.245 0.045 252)`
- Muted text: `oklch(0.49 0.025 250)`
- Rule: `oklch(0.84 0.014 78)`
- Cobalt: `oklch(0.49 0.13 252)`
- Cobalt soft: `oklch(0.93 0.035 252)`
- Coral: `oklch(0.68 0.13 34)`
- Coral soft: `oklch(0.94 0.035 35)`
- Success: `oklch(0.58 0.09 155)`
- Warning: `oklch(0.72 0.12 82)`
- Error: `oklch(0.57 0.18 24)`

## Typography

- Display and report headings: Fraunces, weight 500.
- Product UI, body, labels and controls: DM Sans, weights 400, 500, 600 and 700.
- Body line length: 68 characters maximum for explanatory prose.
- UI scale: 12, 14, 16, 18, 22, 28, 40 and 56 px.

## Layout

- Desktop shell: 1180 px maximum width with 32 px gutters.
- Client test flow: contextual rail plus a focused question stage.
- Psychologist view: left client index, central report, compact status controls.
- Mobile: single column, sticky progress and bottom action bar where useful.
- Spacing rhythm: 4, 8, 12, 16, 24, 32, 48 and 72 px.

## Components

- Buttons: 44 px minimum height, 6 px radius, solid primary and quiet secondary.
- Inputs: explicit labels, 48 px height, clear error and focus states.
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
