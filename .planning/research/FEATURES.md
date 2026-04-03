# Feature Research

**Domain:** Framework comparison / side-by-side learning tool (Vue 3 vs React)
**Researched:** 2026-03-26
**Confidence:** MEDIUM (based on training data analysis of existing tools: Component Party, TodoMVC, SolidJS tutorial patterns, various "X vs Y" sites; no live web verification available)

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature                    | Why Expected                                                 | Complexity | Notes                                                                                                           |
| -------------------------- | ------------------------------------------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------- |
| Side-by-side live demos    | Core value prop -- seeing both frameworks run the same thing | HIGH       | Mounting 2 framework apps in one page is the hardest technical challenge. Already planned.                      |
| Source code display        | Users need to see the code, not just the output              | MEDIUM     | Syntax-highlighted, collapsible panels below each demo. Use Shiki for highlighting (ships with Vite ecosystem). |
| Topic navigation (sidebar) | 32 topics across 6 categories needs structured nav           | LOW        | Driven by topic registry from shared package. Group by category with collapsible sections.                      |
| URL-based routing          | Users expect to bookmark/share specific topics               | LOW        | Already planned via React Router with `/:category/:topicId` pattern.                                            |
| Responsive layout          | Must not break on smaller screens (though desktop-primary)   | MEDIUM     | Side-by-side naturally needs width. Stack vertically on narrow screens with tab toggle.                         |
| Syntax highlighting        | Raw code without highlighting is unreadable                  | LOW        | Shiki (build-time) or Prism. Shiki recommended -- better Vue/JSX support, used by VitePress.                    |
| Category grouping          | 32 topics flat = overwhelming; categories make it scannable  | LOW        | 6 categories already defined in PROJECT_BRIEF. Sidebar groups by category.                                      |
| Explanation text per topic | Code alone doesn't teach -- needs "what's different and why" | LOW        | Markdown content below the demos. Key differences, mental model shifts.                                         |

### Differentiators (Competitive Advantage)

Features that set the product apart from static comparison articles and existing tools like Component Party.

| Feature                                     | Value Proposition                                                                                                                                   | Complexity | Notes                                                                                                                |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------- |
| Live running demos (not just code snippets) | Component Party shows code only. This project runs both frameworks live -- you can interact with the demos. That's the key differentiator.          | HIGH       | Already core to the architecture. Both apps mount and render real components.                                        |
| Deep dive pages with diagrams               | Most comparison tools stop at "here's the syntax." Deep dives on rendering, reactivity, re-renders with visual diagrams provide real understanding. | MEDIUM     | 3 deep dive topics planned. Use simple SVG/CSS diagrams, not a heavy diagram library.                                |
| Interactive demo state                      | Users can interact with demos (click buttons, type in inputs) and see how both frameworks handle the same interaction                               | MEDIUM     | Natural outcome of mounting real apps. Ensure demos have meaningful interactivity (counters, forms, toggles).        |
| "What I already know" framing               | Content written from "you know Vue, here's the React equivalent" perspective -- not neutral comparison but directed learning                        | LOW        | This is a content/writing approach, not a feature. But it's the strongest differentiator for the target user (Boss). |
| Search/filter topics                        | Quick find across 32 topics by keyword                                                                                                              | LOW        | Simple client-side filter on topic titles and descriptions. Low effort, high convenience.                            |
| Progress tracking (local)                   | Mark topics as "understood" to track learning progress                                                                                              | LOW        | localStorage-based. Checkmarks in sidebar. No backend needed.                                                        |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems for this specific project.

| Feature                                                | Why Requested                              | Why Problematic                                                                                                                                       | Alternative                                                                                                                                                     |
| ------------------------------------------------------ | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Editable code playground (like StackBlitz/CodeSandbox) | "Let users modify code and see changes"    | Massive complexity. Requires bundler-in-browser for both Vue SFC + JSX. Would become the entire project scope. Component Party doesn't do it either.  | Link to StackBlitz/CodeSandbox with pre-loaded examples for topics where users want to experiment.                                                              |
| Full framework documentation                           | "Add all the docs for completeness"        | This is a learning tool, not a docs site. Vue docs and React docs already exist and are excellent.                                                    | Link to official docs for each topic. Focus on comparison and "aha moments."                                                                                    |
| Server-side rendering                                  | "Use Nuxt/Next for SEO"                    | Personal learning tool doesn't need SEO. SSR adds complexity with dual-framework mounting. Already in Out of Scope.                                   | Static SPA is fine. No public audience to SEO-optimize for.                                                                                                     |
| Multi-framework support (Svelte, Solid, Angular)       | "Why stop at 2?"                           | Scope explosion. Architecture is built around 2-panel layout. Adding frameworks means N-panel or tab-based switching, new packages, more maintenance. | Stay focused on Vue vs React. The architecture could support it later but don't design for it now.                                                              |
| Backend/API/database                                   | "Store progress in the cloud, share notes" | Personal tool. localStorage is sufficient. Backend adds hosting cost, auth, deployment complexity.                                                    | localStorage for progress. Export/import JSON if backup is needed.                                                                                              |
| AI-powered explanations                                | "Use AI to generate comparisons"           | Content quality matters. AI-generated comparisons are generic. The value is in opinionated, experience-based explanations.                            | Write content manually. It's a learning exercise itself.                                                                                                        |
| Dark/light theme toggle                                | "Every dev tool needs dark mode"           | Scope creep for v1. TailwindCSS makes it possible later, but it's not table stakes for a personal tool.                                               | Default to dark theme (dev preference). Add toggle in v2 if wanted.                                                                                             |
| Automated code extraction                              | "Auto-extract source from component files" | Tempting but fragile. Vite raw imports or custom loaders add build complexity.                                                                        | Store source code as separate string constants or markdown files. Simple, predictable. Keep code and display-code in sync manually for 32 topics -- manageable. |

## Feature Dependencies

```
[Topic Registry (shared)]
    +--requires--> [Sidebar Navigation]
    +--requires--> [URL Routing]
    +--requires--> [Side-by-side Layout]

[Side-by-side Layout]
    +--requires--> [Host App Dual Mount]
    +--requires--> [Route Sync (CustomEvent)]

[Host App Dual Mount]
    +--requires--> [Vite Config (Vue + React)]

[Source Code Display]
    +--requires--> [Syntax Highlighting]

[Deep Dive Pages]
    +--requires--> [Side-by-side Layout]
    +--enhances--> [Explanation Text]

[Search/Filter]
    +--requires--> [Topic Registry]
    +--enhances--> [Sidebar Navigation]

[Progress Tracking]
    +--requires--> [Topic Registry]
    +--enhances--> [Sidebar Navigation]
```

### Dependency Notes

- **Everything requires Topic Registry:** It's the single source of truth. Build it first.
- **Side-by-side Layout requires Host App Dual Mount:** Can't show demos without both apps running.
- **Host App Dual Mount requires Vite Config:** The trickiest infrastructure piece -- one Vite build handling Vue SFC + React JSX.
- **Deep Dive Pages enhance Explanation Text:** They're richer versions of regular topic pages, not a separate system.
- **Search/Filter and Progress Tracking are independent add-ons:** Both only need the topic registry. Can be added anytime after core is working.

## MVP Definition

### Launch With (v1)

Minimum viable product -- what's needed to validate the learning approach works.

- [ ] Host app mounting both Vue and React apps side-by-side -- the core technical challenge
- [ ] Topic registry with at least 5 Essentials topics -- enough to validate the pattern
- [ ] Sidebar navigation with category grouping -- navigate between topics
- [ ] URL routing with React Router + CustomEvent sync to Vue -- bookmarkable topics
- [ ] Source code display with syntax highlighting -- see the code behind each demo
- [ ] Basic explanation text per topic -- "here's what's the same, here's what's different"

### Add After Validation (v1.x)

Features to add once the side-by-side pattern is proven and first 5 topics work.

- [ ] Remaining Essentials topics (6 more) -- fill out the first category
- [ ] Components In-Depth topics (7 topics) -- second major category
- [ ] Reusability + Built-in topics (8 topics) -- complete the intermediate content
- [ ] Search/filter functionality -- becomes valuable as topic count grows past ~10
- [ ] Progress tracking (localStorage) -- useful once there's enough content to track
- [ ] Responsive layout (stacked on mobile) -- nice to have for tablet/laptop use

### Future Consideration (v2+)

Features to defer until core content is complete.

- [ ] Deep Dive pages with diagrams (3 topics) -- high effort content, save for when basics are solid
- [ ] Scaling Up topics (4 topics) -- these involve larger patterns (routing, state management)
- [ ] Dark/light theme toggle -- cosmetic, defer
- [ ] Export progress as JSON -- only if localStorage proves insufficient

## Feature Prioritization Matrix

| Feature                            | User Value | Implementation Cost | Priority |
| ---------------------------------- | ---------- | ------------------- | -------- |
| Host dual mount (Vue + React)      | HIGH       | HIGH                | P1       |
| Topic registry (shared)            | HIGH       | LOW                 | P1       |
| Side-by-side layout                | HIGH       | MEDIUM              | P1       |
| URL routing + CustomEvent sync     | HIGH       | MEDIUM              | P1       |
| Sidebar navigation                 | HIGH       | LOW                 | P1       |
| Source code display + highlighting | HIGH       | MEDIUM              | P1       |
| Explanation text per topic         | HIGH       | LOW                 | P1       |
| 5 Essentials topic implementations | HIGH       | MEDIUM              | P1       |
| Remaining Essentials topics        | MEDIUM     | MEDIUM              | P2       |
| Components In-Depth topics         | MEDIUM     | MEDIUM              | P2       |
| Search/filter                      | MEDIUM     | LOW                 | P2       |
| Progress tracking                  | LOW        | LOW                 | P2       |
| Responsive stacked layout          | MEDIUM     | MEDIUM              | P2       |
| Deep Dive pages + diagrams         | HIGH       | HIGH                | P3       |
| Reusability + Built-in topics      | MEDIUM     | MEDIUM              | P3       |
| Scaling Up topics                  | MEDIUM     | HIGH                | P3       |

**Priority key:**

- P1: Must have for launch -- proves the concept works
- P2: Should have, add once core is validated
- P3: Nice to have, future consideration

## Competitor Feature Analysis

| Feature                    | Component Party                    | TodoMVC                     | This Project                                     |
| -------------------------- | ---------------------------------- | --------------------------- | ------------------------------------------------ |
| Side-by-side code          | Yes (multi-framework tabs)         | No (one framework per impl) | Yes (2-panel, Vue left, React right)             |
| Live running demos         | No (code snippets only)            | Yes (full apps)             | Yes (interactive demos per topic)                |
| Syntax highlighting        | Yes                                | N/A                         | Yes (Shiki)                                      |
| Explanation of differences | No (just code)                     | No (just code)              | Yes (written comparisons, "why" not just "what") |
| Topic categorization       | Yes (by concept)                   | No (one concept)            | Yes (6 categories, 32 topics)                    |
| Deep dive / diagrams       | No                                 | No                          | Yes (3 deep dive topics with visual diagrams)    |
| Editable code              | No                                 | No                          | No (anti-feature, link to playground instead)    |
| Framework coverage         | 10+ frameworks                     | 20+ frameworks              | 2 frameworks (focused depth over breadth)        |
| Target audience            | Any developer exploring frameworks | Any developer               | Vue developer learning React (specific persona)  |
| Progress tracking          | No                                 | No                          | Yes (localStorage)                               |

**Key insight:** Component Party goes wide (many frameworks, many snippets), this project goes deep (2 frameworks, live demos, explanations, diagrams). TodoMVC proves one concept with full apps. This project combines TodoMVC's "full running app" approach with Component Party's "many concepts" coverage, then adds explanatory content on top.

## Sources

- Component Party (component-party.dev) -- multi-framework code comparison tool [training data, MEDIUM confidence]
- TodoMVC (todomvc.com) -- framework comparison via single app implementation [training data, HIGH confidence]
- Vue.js official docs (vuejs.org) -- feature reference [training data, HIGH confidence]
- React official docs (react.dev) -- feature reference [training data, HIGH confidence]
- VitePress / Shiki -- syntax highlighting ecosystem [training data, MEDIUM confidence]
- PROJECT_BRIEF.md and PROJECT.md -- project-specific requirements [direct source, HIGH confidence]

**Note:** Web search and fetch tools were unavailable during this research. All competitor analysis is based on training data (cutoff ~May 2025). Recommend verifying Component Party's current feature set before finalizing differentiator strategy.

---

_Feature research for: Framework comparison / side-by-side learning tool_
_Researched: 2026-03-26_
