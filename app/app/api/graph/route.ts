// Neo4j Knowledge Graph API
// GET /api/graph?pattern=NOW — Query pattern graph
// POST /api/graph — Record resonance event or user action

import { NextRequest, NextResponse } from "next/server";
import {
  initGraph,
  getPatternGraph,
  getResonanceHistory,
  createUser,
  recordFrequency,
  recordResonance,
} from "@/lib/neo4j";

let graphInitialized = false;

async function ensureInit() {
  if (!graphInitialized) {
    await initGraph();
    graphInitialized = true;
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureInit();

    const { searchParams } = new URL(request.url);
    const pattern = searchParams.get("pattern");

    if (pattern) {
      const graph = await getPatternGraph(pattern);
      return NextResponse.json({ pattern, graph });
    }

    // Default: return resonance history
    const history = await getResonanceHistory();
    return NextResponse.json({ history });
  } catch (error) {
    console.error("Neo4j query error:", error);
    return NextResponse.json(
      { error: "Knowledge graph unavailable" },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureInit();

    const body = await request.json();
    const { action } = body;

    switch (action) {
      case "createUser": {
        const { userId, displayName } = body;
        await createUser(userId, displayName);
        return NextResponse.json({ ok: true });
      }

      case "recordFrequency": {
        const { userId, frequency } = body;
        await recordFrequency(userId, frequency);
        return NextResponse.json({ ok: true });
      }

      case "recordResonance": {
        const { eventId, frequency, userIds } = body;
        await recordResonance(eventId, frequency, userIds);
        return NextResponse.json({ ok: true });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Neo4j write error:", error);
    return NextResponse.json(
      { error: "Knowledge graph write failed" },
      { status: 503 }
    );
  }
}
