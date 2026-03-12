// Supabase client — Global Rome Realtime frequency broadcast
"use client";

import { createClient, SupabaseClient, RealtimeChannel } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    if (!url) {
      // Return a noop client during build/SSR when env vars aren't available
      console.warn("Supabase URL not configured — running in offline mode");
      return createClient("https://placeholder.supabase.co", "placeholder");
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}

export interface TriangleRow {
  id: string;
  owl_address: string | null;
  frequency: number;
  spin_direction: "cw" | "ccw";
  geohash: string | null;
  color: string | null;
  nft_token_id: string | null;
  created_at: string;
  last_update: string;
}

export interface CeremonyRow {
  id: string;
  name: string;
  target_frequency: number;
  resonance_threshold: number;
  started_at: string | null;
  resonance_achieved_at: string | null;
}

// Broadcast channel for realtime frequency sharing
// Uses Supabase Realtime Broadcast (no database writes for high-frequency updates)
let channel: RealtimeChannel | null = null;

export interface FrequencyBroadcast {
  userId: string;
  frequency: number;
  timestamp: number;
}

export function subscribeToFrequencies(
  ceremonyId: string,
  onUpdate: (data: FrequencyBroadcast) => void
): RealtimeChannel {
  channel = getSupabase().channel(`ceremony:${ceremonyId}`, {
    config: { broadcast: { self: true } },
  });

  channel
    .on("broadcast", { event: "frequency" }, (payload) => {
      onUpdate(payload.payload as FrequencyBroadcast);
    })
    .subscribe();

  return channel;
}

export function broadcastFrequency(
  userId: string,
  frequency: number
): void {
  if (!channel) return;

  channel.send({
    type: "broadcast",
    event: "frequency",
    payload: {
      userId,
      frequency,
      timestamp: Date.now(),
    } satisfies FrequencyBroadcast,
  });
}

export function unsubscribe(): void {
  if (channel) {
    getSupabase().removeChannel(channel);
    channel = null;
  }
}

// Database operations for persistent state
export async function upsertTriangle(
  userId: string,
  frequency: number,
  color: string,
  spinDirection: "cw" | "ccw"
) {
  return getSupabase().from("triangles").upsert(
    {
      owl_address: userId,
      frequency,
      color,
      spin_direction: spinDirection,
      last_update: new Date().toISOString(),
    },
    { onConflict: "owl_address" }
  );
}

export async function getActiveCeremony(): Promise<CeremonyRow | null> {
  const { data } = await getSupabase()
    .from("ceremonies")
    .select("*")
    .is("resonance_achieved_at", null)
    .order("started_at", { ascending: false })
    .limit(1)
    .single();

  return data;
}

export async function markResonanceAchieved(ceremonyId: string) {
  return getSupabase()
    .from("ceremonies")
    .update({ resonance_achieved_at: new Date().toISOString() })
    .eq("id", ceremonyId);
}
