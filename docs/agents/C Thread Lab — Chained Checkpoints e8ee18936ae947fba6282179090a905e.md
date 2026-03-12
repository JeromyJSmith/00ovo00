# C Thread Lab — Chained Checkpoints

# C Thread — Chained Threads

**Phased checkpoints:** Break large objective into phases with intentional human re-entry

Not agent failure — deliberate chunking for context or production risk.[[1]](https://www.youtube.com/watch?v=-WBHNFAB0OE)

---

## Pattern Definition

### Structure

```mermaid
flowchart LR
  H1[Human: Phase 1 Prompt] --> A1[Agent: Execute Phase 1]
  A1 --> V1[Human: Review Phase 1]
  V1 --> H2[Human: Phase 2 Prompt]
  H2 --> A2[Agent: Execute Phase 2]
  A2 --> V2[Human: Review Phase 2]
  V2 --> H3[Human: Phase 3 Prompt]
  H3 --> A3[Agent: Execute Phase 3]
  A3 --> V3[Human: Final Review]
```

### Core Principle

**Phase contract:** phase N output becomes phase N+1 input

Each checkpoint:

- Validates previous phase
- Adjusts strategy if needed
- Initiates next phase

---

## Primary Use Cases

### 1. Work doesn't fit single context window

**Scenario:** Large refactor spanning many files

**Solution:** Phase by module or subsystem

### 2. High-pressure production work

**Scenario:** Database migration in production

**Solution:** Phase by risk level (backup → schema → data → verify)[[1]](https://www.youtube.com/watch?v=-WBHNFAB0OE)

---

## Critical Requirements

### Verifiable Artifacts

Each phase **must** produce:

✅ **Migration plan approved**

✅ **PR created**

✅ **Tests green**

✅ **Staging verified**

✅ **Monitoring active**

### Stop Mechanism

Agent must know how to:

- Pause execution
- Signal completion
- Request human input
- Resume from checkpoint[[1]](https://www.youtube.com/watch?v=-WBHNFAB0OE)

**Claude Code tools:**

- `ask_user_question` — explicit pause for input
- System notifications — signal phase completion
- Text-to-speech hooks — audible completion alerts

---

## Phase Design Patterns

### Pattern 1: Risk-based phases

```
Phase 1: Read-only analysis (safe)
Phase 2: Test environment changes (low risk)
Phase 3: Staging deployment (medium risk)
Phase 4: Production deployment (high risk)
```

### Pattern 2: Context-based phases

```
Phase 1: Understand architecture (context building)
Phase 2: Design solution (context application)
Phase 3: Implement core (focused work)
Phase 4: Implement edges (extension)
```

### Pattern 3: Validation-based phases

```
Phase 1: Generate candidates
Phase 2: Test candidates
Phase 3: Select best candidate
Phase 4: Refine and deploy
```

---

## Failure Modes

### Too Many Phases

**Problem:** Excessive human overhead

**Symptoms:**

- Spending more time reviewing than agent spent executing
- Losing context between phases
- Temptation to skip reviews

**Fix:** Merge adjacent low-risk phases

### Poor Phase Boundaries

**Problem:** Repeated work or unclear state

**Symptoms:**

- Phase 2 redoes Phase 1 work
- Unclear what Phase 1 actually accomplished
- Dependencies between phases not explicit

**Fix:** Define clear phase contracts with artifacts

---

## Boris Cherny Approach

### Verification Strategy

**Option 1: Background agent verification**

After agent completes work, run second agent to verify:[[1]](https://www.youtube.com/watch?v=-WBHNFAB0OE)

```
Phase 1: Implementation agent completes work
Phase 2: Verification agent reviews
Phase 3: Human reviews both outputs
```

**Option 2: Agent stop hook**

Deterministic code runs when agent tries to stop:

```
Agent signals completion
  ↓
Stop hook intercepts
  ↓
Run deterministic checks
  ↓
Decision: continue loop or finish
```

---

## Experimentation Workspace

### Current Experiments

- **Experiment 1: Production migration**

- **Experiment 2: Large refactor**

- **Experiment 3: Multi-repo change**

---

## Implementation Notes

### Your Checkpoint Strategy

**Primary use cases:**

**Phase design approach:**

**Stop mechanism:**

### Prompt Templates

**Phase 1 template: Analysis**

```
Analyze [system/problem]:
- Document current state
- Identify constraints
- Propose solution approach

Deliverable: Written analysis + proposed plan
DO NOT IMPLEMENT — analysis only
```

**Phase 2 template: Implementation**

```
Implement solution from Phase 1:
- Follow approved plan: [link/paste]
- Create tests first
- Implement incrementally

Deliverable: Working implementation + green tests
Pause after implementation for review
```

**Phase 3 template: Deployment**

```
Deploy Phase 2 work to [environment]:
- Run pre-deploy checks
- Execute deployment
- Verify monitoring

Deliverable: Deployed system + health check results
```

---

## Success Metrics

### KPIs to Track

| Metric | Target | Current |
| --- | --- | --- |
| Phases per C-thread | 3-5 | — |
| Review time per phase | < 5 min | — |
| Rework rate (phase N fails) | < 10% | — |
| Time between phases | < 2 min | — |
| Phase contract clarity | Subjective | — |

### Optimization Signals

✅ Can predict phase boundaries upfront

✅ Rarely need to add unexpected phases

✅ Clear artifacts make review fast

✅ Ready to reduce phases (moving toward L Thread)

---

## Next Evolution

C Thread mastery enables:

→ **L Thread** — Remove checkpoints, extend autonomy

→ **B Thread** — Chain becomes internal to orchestrator

→ **Trust building** — Fewer phases over time