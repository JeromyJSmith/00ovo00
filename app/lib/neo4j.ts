// Neo4j Knowledge Graph — Ternary relationships and pattern connections
// Graph structure: Concepts, Patterns, Users, Resonance Events

import neo4j, { Driver, Session } from "neo4j-driver";

let driver: Driver | null = null;

export function getDriver(): Driver {
  if (!driver) {
    const uri = process.env.NEO4J_URI || "bolt://localhost:7687";
    const user = process.env.NEO4J_USER || "neo4j";
    const password = process.env.NEO4J_PASSWORD || "";
    driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  }
  return driver;
}

export function getSession(): Session {
  return getDriver().session();
}

export async function closeDriver(): Promise<void> {
  if (driver) {
    await driver.close();
    driver = null;
  }
}

// --- Schema Initialization ---

export async function initGraph(): Promise<void> {
  const session = getSession();
  try {
    // Create constraints
    await session.run(
      "CREATE CONSTRAINT IF NOT EXISTS FOR (c:Concept) REQUIRE c.name IS UNIQUE"
    );
    await session.run(
      "CREATE CONSTRAINT IF NOT EXISTS FOR (p:Pattern) REQUIRE p.name IS UNIQUE"
    );
    await session.run(
      "CREATE CONSTRAINT IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE"
    );
    await session.run(
      "CREATE CONSTRAINT IF NOT EXISTS FOR (e:ResonanceEvent) REQUIRE e.id IS UNIQUE"
    );

    // Seed core concepts — Rome's ternary logic
    await session.run(`
      MERGE (s0:Concept:State {name: 'State-0', description: 'False / Blocked / Alone / NO'})
      MERGE (s1:Concept:State {name: 'State-1', description: 'True / Executable / Aligned / YES'})
      MERGE (s2:Concept:State {name: 'State-2', description: 'Unknown / Both / Contradictory / NOW'})
      MERGE (s0)-[:TRANSFORMS_TO {via: 'observation'}]->(s2)
      MERGE (s2)-[:RESOLVES_TO {via: 'resonance'}]->(s1)
      MERGE (s1)-[:DECAYS_TO {via: 'entropy'}]->(s0)
    `);

    // Seed phonetic chain
    await session.run(`
      MERGE (turing:Pattern {name: 'TURING', description: 'R and N separated by I (ego)'})
      MERGE (turning:Pattern {name: 'TURNING', description: 'R and N touch, I steps back'})
      MERGE (tuning:Pattern {name: 'TUNING', description: 'R disappears, I facilitates between two Ns'})
      MERGE (turing)-[:EVOLVES_TO {mechanism: 'ego_observes'}]->(turning)
      MERGE (turning)-[:EVOLVES_TO {mechanism: 'ego_facilitates'}]->(tuning)
    `);

    // Seed NOW decomposition
    await session.run(`
      MERGE (n:Concept:Phoneme {name: 'N', frequency: 220, description: 'Vibration, nasal hum, closed'})
      MERGE (o:Concept:Phoneme {name: 'O', frequency: 730, description: 'Open, peak resonance'})
      MERGE (w:Concept:Phoneme {name: 'W', frequency: 300, description: 'Waves, filter sweep decay'})
      MERGE (now:Pattern {name: 'NOW', description: 'Vocal filter sweep N→O→W'})
      MERGE (n)-[:COMPOSES]->(now)
      MERGE (o)-[:COMPOSES]->(now)
      MERGE (w)-[:COMPOSES]->(now)
      MERGE (n)-[:SWEEPS_TO]->(o)
      MERGE (o)-[:SWEEPS_TO]->(w)
    `);

    // ADSR universal pattern
    await session.run(`
      MERGE (adsr:Pattern {name: 'ADSR', description: 'Attack-Decay-Sustain-Release universal envelope'})
      MERGE (attack:Concept {name: 'Attack', description: 'Initial rise, inhale, closed'})
      MERGE (decay:Concept {name: 'Decay', description: 'Transition, hold, bridge state'})
      MERGE (sustain:Concept {name: 'Sustain', description: 'Peak, open, State-2 held'})
      MERGE (release:Concept {name: 'Release', description: 'Decay, exhale, return'})
      MERGE (attack)-[:PHASE_OF]->(adsr)
      MERGE (decay)-[:PHASE_OF]->(adsr)
      MERGE (sustain)-[:PHASE_OF]->(adsr)
      MERGE (release)-[:PHASE_OF]->(adsr)
    `);
  } finally {
    await session.close();
  }
}

// --- User Operations ---

export async function createUser(
  userId: string,
  displayName: string
): Promise<void> {
  const session = getSession();
  try {
    await session.run(
      `MERGE (u:User {id: $userId})
       SET u.displayName = $displayName, u.joinedAt = datetime()`,
      { userId, displayName }
    );
  } finally {
    await session.close();
  }
}

// Record frequency observation (sparse — not every tick)
export async function recordFrequency(
  userId: string,
  frequency: number
): Promise<void> {
  const session = getSession();
  try {
    await session.run(
      `MATCH (u:User {id: $userId})
       CREATE (f:FrequencyPoint {hz: $frequency, at: datetime()})
       CREATE (u)-[:TUNED_TO]->(f)`,
      { userId, frequency }
    );
  } finally {
    await session.close();
  }
}

// Record resonance event
export async function recordResonance(
  eventId: string,
  frequency: number,
  userIds: string[]
): Promise<void> {
  const session = getSession();
  try {
    await session.run(
      `CREATE (e:ResonanceEvent {id: $eventId, frequency: $frequency, at: datetime(), participants: $count})
       WITH e
       UNWIND $userIds AS uid
       MATCH (u:User {id: uid})
       CREATE (u)-[:PARTICIPATED_IN]->(e)`,
      { eventId, frequency, userIds, count: userIds.length }
    );
  } finally {
    await session.close();
  }
}

// Query: Get all concepts connected to a pattern
export async function getPatternGraph(
  patternName: string
): Promise<Record<string, unknown>[]> {
  const session = getSession();
  try {
    const result = await session.run(
      `MATCH (p:Pattern {name: $patternName})-[r]-(connected)
       RETURN p, type(r) AS relationship, connected`,
      { patternName }
    );
    return result.records.map((r) => ({
      pattern: r.get("p").properties,
      relationship: r.get("relationship"),
      connected: r.get("connected").properties,
    }));
  } finally {
    await session.close();
  }
}

// Query: Get resonance history
export async function getResonanceHistory(): Promise<
  Record<string, unknown>[]
> {
  const session = getSession();
  try {
    const result = await session.run(
      `MATCH (e:ResonanceEvent)
       RETURN e ORDER BY e.at DESC LIMIT 50`
    );
    return result.records.map((r) => r.get("e").properties);
  } finally {
    await session.close();
  }
}
