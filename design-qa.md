# Design QA

## Evidence

- Source visual truth: local-only captures in `../source-captures/`, including lock, overview and GAD views. They are not committed because the source report contains private data.
- Implementation screenshots: `qa-login-desktop.png`, `qa-client-home-desktop.png`, `qa-question-desktop.png`, `qa-psych-desktop.png`, `qa-psych-gad-desktop.png`, plus corresponding mobile captures. These files remain local and are ignored by Git.
- Desktop viewport: 1280 x 720, full-page captures where needed.
- Mobile viewport: 390 x 844.
- States: login, client introduction, client assignment list, question flow, saved progress, psychologist summary, test report and new-client creation.

## Full-view comparison evidence

The source and implementation were placed together in local comparison boards for login, report summary, GAD answers and mobile login. The implementation preserves the source system: Fraunces display type, DM Sans UI type, warm paper canvas, navy ink, cobalt actions, coral progress, editorial rules and the original geometric photography.

Intentional differences support the new product workflow: the psychologist report adds a persistent client index, the client portal uses standard form controls, and a visible demo notice prevents the static prototype from being mistaken for a production medical-data system.

## Focused comparison evidence

- Login typography and art crop: heading scale, image subject and warm surface match the source language.
- Report hierarchy: large diagnosis title, image split, notice field and ruled result rows match the source.
- Question controls: familiar radio rows use the same restrained palette while meeting 44 px touch-target requirements.
- Mobile: long headings wrap without clipping, action buttons remain reachable and the question flow resets scroll position between steps.

## Fidelity surfaces

- Fonts and typography: passed. Fraunces and DM Sans are served locally with appropriate optical roles and readable line lengths.
- Spacing and layout rhythm: passed. Desktop and mobile grids preserve hierarchy without overlaps or compressed controls.
- Colors and visual tokens: passed. The implementation maps the source palette to documented OKLCH tokens and includes clear semantic states.
- Image quality and asset fidelity: passed. All visible illustration assets are copied from the owned source and preserve aspect ratio. No CSS or SVG substitutes are used.
- Copy and content: passed. Client-facing context explains purpose, duration, privacy and the non-diagnostic role of screening tools.
- States and interactions: passed. Login, introduction, persistence, answer selection, navigation, review, report tabs and client creation were exercised in-browser.
- Accessibility: passed for prototype scope. Semantic labels, keyboard-native controls, focus styles, reduced-motion handling and mobile tap targets are present.

## Findings

No actionable P0, P1 or P2 findings remain.

## Follow-up polish

- P3: the report tab row scrolls horizontally on narrow phones. This is intentional and usable, but a future production version can add a small edge cue for discoverability.
- P3: print output uses the browser print engine. A production backend can generate archival PDFs with version metadata and audit identifiers.

## Patches made during QA

- Added scroll reset when changing test stage or question so mobile users always see the full heading and context.
- Verified that saved answers update assignment progress after leaving a test.
- Kept demo credentials and data explicitly separated from the production architecture.

final result: passed
