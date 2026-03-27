# Phase 2: First 5 Topics - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-27
**Phase:** 02-first-5-topics
**Areas discussed:** Sidebar layout, Topic component structure, Explanation text, Demo interactivity
**Mode:** --auto (all decisions auto-selected with recommended defaults)

---

## Sidebar Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Host app (shared) | Sidebar in host/React, controls both panels | ✓ |
| Per-panel sidebar | Each framework panel has own nav | |
| Top navigation | Horizontal nav bar instead of sidebar | |

**User's choice:** [auto] Host app (shared between both panels) — recommended default
**Notes:** Standard pattern for dual-panel learning tools. Sidebar controls React Router which dispatches to Vue via CustomEvent.

| Option | Description | Selected |
|--------|-------------|----------|
| Left sidebar, collapsible | Standard, saves space | ✓ |
| Fixed left sidebar | Always visible | |
| Right sidebar | Less conventional | |

**User's choice:** [auto] Left sidebar, collapsible — recommended default

---

## Topic Component Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Single component (demo + explanation inline) | Simplest, all in one file | ✓ |
| Separate demo + explanation components | More modular, more files | |
| Data-driven (JSON/MD + renderer) | Content separate from code | |

**User's choice:** [auto] Single component with demo + explanation inline — recommended default
**Notes:** For 6 topics, simplicity wins. Can refactor to separate components in Phase 3 if pattern proves unwieldy.

| Option | Description | Selected |
|--------|-------------|----------|
| Inline in component | Content is code | ✓ |
| Separate markdown files | Content/code split | |
| Shared data module | Centralized content | |

**User's choice:** [auto] Inline in each topic component as JSX/template — recommended default

---

## Explanation Text

| Option | Description | Selected |
|--------|-------------|----------|
| Short paragraph(s) | Focus on key differences | ✓ |
| Detailed comparison table | Structured but verbose | |
| Bullet points | Quick reference style | |

**User's choice:** [auto] Short paragraph highlighting key differences — recommended default

---

## Demo Interactivity

| Option | Description | Selected |
|--------|-------------|----------|
| Fully interactive | Buttons, inputs, state changes | ✓ |
| Static examples | Code shown, not runnable | |
| Partially interactive | Some demos interactive, some static | |

**User's choice:** [auto] Fully interactive — recommended default
**Notes:** Live interactive demos are the core value proposition of the project.

---

## Claude's Discretion

- Sidebar width and collapse mechanism
- Exact demo scenarios per topic
- Styling details within Tailwind
- Category display order
- Loading/fallback states

## Deferred Ideas

None
