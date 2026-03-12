# agents/ — AI Agent Patterns and Orchestration

This folder documents agent coordination frameworks for developing and running Global Rome.

## Rome Super Agent

The core blueprint for multi-agent orchestration during development. Defines system prompt, agent hierarchy (Levels 0-2), MCP hub, spawn system, load balancer, task buckets, and agents.yaml registry.

## AI Agent Thread Patterns

The foundational 7-pattern taxonomy for workflow coordination. Covers basic structures for parallel execution, sequential chaining, meta-level orchestration, and more.

## Thread Lab Patterns (A–G)

Specialized implementations of the base patterns:

- **A: Parallel** — Multiple agents executing independent tasks concurrently
- **B: Meta-Orchestration** — Agents that coordinate and monitor other agents
- **C: Chained Checkpoints** — Sequential execution with validation between steps
- **D: Long-Running** — Agents that persist state across extended operations
- **E: Fusion** — Combining outputs from multiple agents into coherent results
- **F: Zero-Touch** — Fully autonomous execution with minimal human intervention
- **G: Constraint-Based** — Agents enforcing and validating system constraints

---

**Start with:** AI Agent Thread Patterns document for foundational concepts.
**Deep dive:** See ROME_SUPER_AGENT.md for development hierarchy.
