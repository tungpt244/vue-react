---
phase: 1
slug: infrastructure-scaffold
status: draft
shadcn_initialized: false
preset: none
created: 2026-03-26
---

# Phase 1 — UI Design Contract

> Visual and interaction contract for the infrastructure scaffold phase. This phase has minimal UI — just enough to visually verify that both frameworks mount and route sync works. Full layout, navigation, and content display contracts belong to Phase 2.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none |
| Preset | not applicable |
| Component library | none (Phase 1 is framework scaffold — no component library needed) |
| Icon library | lucide-react (React side), lucide-vue-next (Vue side) — installed but not used in Phase 1 |
| Font | System font stack: `ui-sans-serif, system-ui, sans-serif` (TailwindCSS default) |

**Rationale:** This is a Vue 3 + React 19 dual-framework project. shadcn is React-only and would not apply to the Vue side. TailwindCSS v4 provides the unified styling layer across both frameworks.

---

## Spacing Scale

Declared values (must be multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Icon gaps, inline padding |
| sm | 8px | Compact element spacing |
| md | 16px | Default element spacing, panel padding |
| lg | 24px | Section padding |
| xl | 32px | Layout gaps between Vue and React panels |
| 2xl | 48px | Major section breaks |
| 3xl | 64px | Page-level spacing |

Exceptions: none

**Phase 1 usage:** Only `md` (16px panel padding) and `xl` (32px gap between panels) are actively used. Full scale established here for downstream phases.

---

## Typography

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | 14px | 400 (regular) | 1.5 |
| Label | 12px | 600 (semibold) | 1.4 |
| Heading | 20px | 600 (semibold) | 1.2 |
| Display | 28px | 600 (semibold) | 1.2 |

**Phase 1 usage:** Only Body (14px) and Label (12px) are used — for placeholder text and framework labels in the scaffold panels. Heading and Display are established for downstream phases.

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `#ffffff` (white) | Page background |
| Secondary (30%) | `#f8fafc` (slate-50) | Vue panel background, React panel background |
| Accent (10%) | `#3b82f6` (blue-500) | Framework labels only in Phase 1 |
| Destructive | `#ef4444` (red-500) | Not used in Phase 1 — established for downstream |

Accent reserved for: framework identification labels ("Vue 3" badge, "React 19" badge), active route indicator in future phases

**Phase 1 framework identifiers:**

| Framework | Badge Color | Tailwind Class |
|-----------|-------------|----------------|
| Vue 3 | `#42b883` (Vue green) | `bg-emerald-500` |
| React 19 | `#61dafb` (React cyan) | `bg-cyan-400` |

These framework badge colors are in addition to the accent color. They are used exclusively for framework identification labels on each panel.

---

## Layout Contract (Phase 1 Specific)

Phase 1 establishes the **app shell** that all subsequent phases build on.

### HTML Structure

```
body
  #app-shell
    #react-root    ← React app mounts here (includes router, layout, right panel)
    #vue-root      ← Vue app mounts here (left panel content)
```

### Side-by-Side Layout

| Property | Value |
|----------|-------|
| Layout mode | CSS Grid, 2 equal columns |
| Grid template | `grid-template-columns: 1fr 1fr` |
| Gap between panels | 0px (panels are adjacent, separated by a 1px border) |
| Panel min-height | `100vh` |
| Panel padding | 16px (`p-4`) |
| Panel border | 1px solid `#e2e8f0` (slate-200) between panels |

### Panel Header (each side)

| Element | Specification |
|---------|---------------|
| Framework badge | 12px semibold, white text on framework color, 4px border-radius, 4px vertical padding, 8px horizontal padding |
| Route display | 14px regular, `#64748b` (slate-500), shows current `category/topicId` |
| Placeholder text | 14px regular, `#94a3b8` (slate-400), "Waiting for topic selection..." or active topic name |

### Responsive Behavior

Not applicable for Phase 1. Responsive layout (NAV-V2-01) is deferred to v2. Phase 1 assumes desktop viewport (minimum 1024px width).

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | Not applicable — Phase 1 has no user actions |
| Empty state heading | "Vue vs React Comparison Hub" |
| Empty state body (Vue panel) | "Vue 3 — Waiting for topic selection" |
| Empty state body (React panel) | "React 19 — Waiting for topic selection" |
| Error state | Not applicable — Phase 1 has no error states beyond dev server errors |
| Destructive confirmation | Not applicable — no destructive actions in Phase 1 |
| Page title | "Vue vs React Comparison Hub" (in `<title>` tag) |
| Route active display | "{category} / {topicId}" — shown in each panel when a route is active |
| No route display | "No topic selected — navigate to /:category/:topicId" |

---

## Interaction Contract

Phase 1 has exactly **one** interaction to verify:

| Interaction | Trigger | Expected Behavior |
|-------------|---------|-------------------|
| URL navigation | User types `/:category/:topicId` in browser address bar | Both panels update to show the category and topicId. React panel renders via React Router. Vue panel syncs via CustomEvent. |

No click handlers, no forms, no modals, no toasts in Phase 1.

---

## State Contract

| State | Visual Representation |
|-------|-----------------------|
| Both apps mounted, no route | Both panels show framework badge + "No topic selected" message |
| Both apps mounted, valid route | Both panels show framework badge + category/topicId + placeholder topic component |
| HMR update (Vue) | Vue panel content updates without page reload; React panel unchanged |
| HMR update (React) | React panel content updates without page reload; Vue panel unchanged |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | none | not applicable |

No third-party registries. No component library blocks. Phase 1 uses only TailwindCSS utility classes.

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
