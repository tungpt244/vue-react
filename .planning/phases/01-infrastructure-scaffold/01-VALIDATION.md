---
phase: 01
slug: infrastructure-scaffold
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-26
---

# Phase 01 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
| **Config file** | none — Wave 0 installs |
| **Quick run command** | `pnpm -r typecheck` |
| **Full suite command** | `pnpm -r typecheck && pnpm dev --host 2>&1 & sleep 5 && curl -s http://localhost:5173 | grep -q vue-root && kill %1` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm -r typecheck`
- **After every plan wave:** Run full suite command
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | INFRA-01 | integration | `pnpm -r typecheck` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 1 | INFRA-02 | integration | `pnpm dev` | ❌ W0 | ⬜ pending |
| 01-02-01 | 02 | 1 | INFRA-03 | integration | `pnpm -r typecheck` | ❌ W0 | ⬜ pending |
| 01-02-02 | 02 | 1 | INFRA-04 | integration | `pnpm dev` | ❌ W0 | ⬜ pending |
| 01-03-01 | 03 | 2 | INFRA-05 | manual | browser navigation test | ❌ | ⬜ pending |
| 01-03-02 | 03 | 2 | INFRA-06 | integration | `pnpm -r typecheck` | ❌ W0 | ⬜ pending |
| 01-03-03 | 03 | 2 | INFRA-07 | manual | HMR edit test | ❌ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `packages/shared/tsconfig.json` — TypeScript config
- [ ] `packages/host/tsconfig.json` — TypeScript config
- [ ] `packages/vue-app/tsconfig.json` — TypeScript config
- [ ] `packages/react-app/tsconfig.json` — TypeScript config
- [ ] `pnpm-workspace.yaml` — workspace config

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| HMR hot reload Vue side | INFRA-07 | Requires live browser + file edit | Edit .vue file, verify only Vue side updates |
| HMR hot reload React side | INFRA-07 | Requires live browser + file edit | Edit .tsx file, verify only React side updates |
| Browser URL navigation | INFRA-05 | Requires browser interaction | Navigate to /:category/:topicId, verify both sides render |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
