import { supabase } from "./supabaseClient";

export const fmtPlays = (n) =>
  (n >= 1000 ? `${(n / 1000).toFixed(1).replace(".0", "")} هزار` : n) + " پخش";

export async function getArtists() {
  const { data } = await supabase.from("artists").select("*").order("name");
  return data || [];
}

export async function getArtist(id) {
  const { data: artist } = await supabase.from("artists").select("*").eq("id", id).single();
  if (!artist) return null;
  const { data: tracks } = await supabase
    .from("tracks")
    .select("*")
    .eq("artist_id", id)
    .order("released_at", { ascending: false });
  return { ...artist, tracks: tracks || [] };
}

export async function getProducers() {
  const { data } = await supabase.from("producers").select("*").order("name");
  return data || [];
}

export async function getProducer(id) {
  const { data: producer } = await supabase.from("producers").select("*").eq("id", id).single();
  if (!producer) return null;
  const { data: beats } = await supabase
    .from("beats")
    .select("*")
    .eq("producer_id", id)
    .order("released_at", { ascending: false });
  return { ...producer, beats: beats || [] };
}

export async function getTopTracks() {
  const { data } = await supabase
    .from("tracks")
    .select("*, artists(name)")
    .order("plays", { ascending: false })
    .limit(5);
  return (data || []).map((t) => ({ ...t, sub: t.artists?.name, audio: t.audio_url, duration: t.duration_seconds ? `${Math.floor(t.duration_seconds / 60)}:${String(t.duration_seconds % 60).padStart(2, "0")}` : "" }));
}

export async function getTopBeats() {
  const { data } = await supabase
    .from("beats")
    .select("*, producers(name)")
    .order("plays", { ascending: false })
    .limit(5);
  return (data || []).map((b) => ({ ...b, sub: b.producers?.name, audio: b.audio_url, duration: `${b.bpm} BPM` }));
}

export async function getFreshDrops() {
  const { data: tracks } = await supabase
    .from("tracks")
    .select("*, artists(name)")
    .order("released_at", { ascending: false })
    .limit(6);
  const { data: beats } = await supabase
    .from("beats")
    .select("*, producers(name)")
    .order("released_at", { ascending: false })
    .limit(6);
  const t = (tracks || []).map((x) => ({ ...x, sub: x.artists?.name, audio: x.audio_url, kind: "ترک" }));
  const b = (beats || []).map((x) => ({ ...x, sub: x.producers?.name, audio: x.audio_url, kind: "بیت" }));
  return [...t, ...b]
    .sort((a, c) => new Date(c.released_at) - new Date(a.released_at))
    .slice(0, 6)
    .map((d) => ({ ...d, isNew: (Date.now() - new Date(d.released_at)) / 86400000 < 7 }));
}
