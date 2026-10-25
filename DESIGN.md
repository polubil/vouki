# VOUKI — DESIGN.md

## Positioning
An interactive competition concept, not a commercial homepage. Show how three opposing interests can align through a shared event model while preserving uncertainty. Visitors are hackathon judges evaluating analytical thinking.

## Visual signature
Three distinct human/business interests orbit an explainable event core. The product reasoning and architecture are the proof; lines and gradients should not mask uncertainty.

## Palette
- Night `#0a1118`
- Elevated `#111e25`
- Pale `#f0f3ef`
- Ink `#172421`
- Lime `#d5f69a`
- Midtone `#758985`
- Amber `#e7ba77`

## Typography
System font: Inter (fallback system ui) display with tight tracking; body system ui. Utility monospace only for structural labels, size >= 12px. Body >= 15px. Contrast and hierarchy take priority over atmospheric density.

## Layout
Max width 1320 px, side pads 24-48px, spacious sections; Product story cards and an architecture schematic remain responsive on mobile. Avoid fixed 500px-wide mobile illustrations and avoid horizontal overflow at 320px.

## Motion and interaction
Use transform/opacity for reveals; scroll progress; hover states. Three participant tabs with tab semantics and keyboard arrow controls. The three stakeholder perspectives remain keyboard-accessible tabs; no interactive laboratory. Support reduced motion, visible focus, live regions. No fetched dependencies.

## Narrative
Hook with conflict → three stakeholder stories → data architecture → permissions and MVP → open questions → concise ending. The video is a separate 16:9 interpretation with short captions, not a scroll capture.

## Claims
Technical and business decisions are hypotheses unless directly required by case. Do not claim validated recommendations, consent, performance or conversion lift. No personal customer data.

## Persistent question compass (V3)
The header is an annotated reading outline rather than a duplicate navigation menu. A second sticky tier shows one current question and five clickable chapters that correspond exactly to content anchors. Scroll activates the chapter when its section enters the readable area beneath the header. Chapter swaps fade/slide only the question, not the whole page, and reduced-motion users receive instantaneous updates. On narrow screens the six links remain available as a compact numbered strip.

## V5 outline alignment
The five chapter links correspond 1:1 to the five real sections and display matching names: Продуктовая концепция, Продуктовая логика, Системная логика, Решения и границы, Вопросы к заказчику. The interactive laboratory and all its anchors, buttons and JavaScript were removed at user request.

## Presentation copy rule (V6)
Audience-facing screens deliver one claim per block: value, product behavior, or direct question. Never insert internal approvals, preliminary-status disclaimers, planning jargon, technical caveat summaries, or process commentary into the public presentation. Required uncertainty is expressed through meaningful product questions. Keep implementation-specific context in README only.
