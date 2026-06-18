# Design QA

## Evidence

- Source visual truth: temporary local captures of the owned lock, overview and GAD views were used and then deleted because the source report contains private data.
- Implementation screenshots: `qa-login-desktop.png`, `qa-client-home-desktop.png`, `qa-question-desktop.png`, `qa-psych-desktop.png`, `qa-psych-gad-desktop.png`, plus corresponding mobile captures. These files remain local and are ignored by Git.
- Desktop viewport: 1280 x 720, full-page captures where needed.
- Mobile viewport: 390 x 844.
- States: login, client introduction, selectable assignment list, gendered GAD-7 and BDI-II flows, SCID with conditional justification, numeric keyboard input, Enter navigation, saved progress, psychologist summary, test report, client search, contact editing, assignment editing, credential recovery, password regeneration, deletion confirmation, empty client state and new-client creation.

## Full-view comparison evidence

The source and implementation were placed together in local comparison boards for login, report summary, GAD answers and mobile login. The implementation preserves the source system: Fraunces display type, DM Sans UI type, warm paper canvas, navy ink, cobalt actions, coral progress, editorial rules and the original geometric photography.

Intentional differences support the new product workflow: the psychologist report adds a persistent client index, the client portal uses standard form controls, and a visible demo notice prevents the static prototype from being mistaken for a production medical-data system.

## Focused comparison evidence

- Login typography and art crop: heading scale, image subject and warm surface match the source language.
- Report hierarchy: large diagnosis title, image split, notice field and ruled result rows match the source.
- Question controls: familiar radio rows use the same restrained palette, expose direct 0-to-0 numeric shortcuts and meet 44 px touch-target requirements.
- Mobile: long headings wrap without clipping, action buttons remain reachable and the question flow resets scroll position between steps.

## Fidelity surfaces

- Fonts and typography: passed. Fraunces and DM Sans are served locally with appropriate optical roles and readable line lengths.
- Spacing and layout rhythm: passed. Desktop and mobile grids preserve hierarchy without overlaps or compressed controls.
- Colors and visual tokens: passed. The implementation maps the source palette to documented OKLCH tokens and includes clear semantic states.
- Image quality and asset fidelity: passed. All visible illustration assets are copied from the owned source and preserve aspect ratio. No CSS or SVG substitutes are used.
- Copy and content: passed. Client-facing context explains purpose, duration, privacy and the non-diagnostic role of screening tools.
- States and interactions: passed. Login, introduction, persistence, answer selection, numeric shortcuts, Enter navigation, review, report tabs, client creation and credential handoff were exercised in-browser.
- Accessibility: passed for prototype scope. Semantic labels, direct numeric shortcuts, keyboard-native controls, visible radio focus, reduced-motion handling and mobile tap targets are present.

## Findings

No actionable P0, P1 or P2 findings remain.

## Follow-up polish

- P3: the report tab row scrolls horizontally on narrow phones. This is intentional and usable, but a future production version can add a small edge cue for discoverability.
- P3: print output uses the browser print engine. A production backend can generate archival PDFs with version metadata and audit identifiers.

## Patches made during QA

- Added scroll reset when changing test stage or question so mobile users always see the full heading and context.
- Added female, male and neutral grammatical variants selected while creating the client account and reused in the psychologist report.
- Added scale-matched number keys without automatic navigation, so every key maps predictably to the visible answer value; Enter confirms the current answer and advances.
- Rebuilt account handoff so the panel immediately exposes the URL, login, password and a ready-to-copy client message without collecting an e-mail address.
- Matched the assignment list to all five stages from the original message: GAD-7 and BDI-II, SCID, developmental interview, AQ result and childhood materials.
- Made all six forms independently selectable, with the complete set selected by default and one-click select-all/clear controls.
- Added the 21-part BDI-II flow with gender-aware answer wording, source-form scoring thresholds and an immediate safety notice for answers indicating suicidal thoughts.
- Added all 106 SCID questions; every TAK answer requires a written example or justification before the next question becomes available.
- Added operational client management: searchable contact records, editable assignments and deadlines, reusable access handoff, password regeneration, inline destructive confirmation and a recoverable empty state.
- Verified that saved answers update assignment progress after leaving a test.
- Kept demo credentials and data explicitly separated from the production architecture.

final result: passed
