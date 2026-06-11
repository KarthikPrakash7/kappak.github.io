import { useEffect, useState } from "react";

const API = "https://api.opendota.com/api";

export interface DotaHero {
  name: string;
  games: number;
  winrate: number; // 0..1
}

export interface DotaStats {
  personaName?: string;
  avatar?: string;
  rank: string; // e.g. "Immortal", "Divine 4"
  win: number;
  lose: number;
  winrate: number; // 0..1
  topHeroes: DotaHero[];
}

interface State {
  loading: boolean;
  error: string | null;
  data: DotaStats | null;
}

const MEDALS = [
  "Uncalibrated",
  "Herald",
  "Guardian",
  "Crusader",
  "Archon",
  "Legend",
  "Ancient",
  "Divine",
  "Immortal",
];

function rankFromTier(tier: number | null | undefined): string {
  if (!tier) return "Unranked";
  const medal = Math.floor(tier / 10);
  const stars = tier % 10;
  const name = MEDALS[medal] ?? "Unranked";
  return medal === 8 || stars === 0 ? name : `${name} ${stars}`;
}

async function fetchHeroMap(): Promise<Record<number, string>> {
  const cached = sessionStorage.getItem("od-heroes");
  if (cached) return JSON.parse(cached);
  const res = await fetch(`${API}/heroes`);
  const list: { id: number; localized_name: string }[] = await res.json();
  const map: Record<number, string> = {};
  list.forEach((h) => (map[h.id] = h.localized_name));
  sessionStorage.setItem("od-heroes", JSON.stringify(map));
  return map;
}

/**
 * Fetches a player's profile, win/loss and top heroes from OpenDota.
 * Public API, no key required, CORS-enabled. Result cached in sessionStorage.
 * Pass enabled=false to defer the request until the user opts in (e.g. on click).
 */
export function useOpenDota(accountId: string, enabled: boolean): State {
  const [state, setState] = useState<State>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    if (!enabled || !accountId) return;
    let cancelled = false;

    const cacheKey = `od-player-${accountId}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      setState({ loading: false, error: null, data: JSON.parse(cached) });
      return;
    }

    setState({ loading: true, error: null, data: null });

    (async () => {
      try {
        const [profileRes, wlRes, heroesRes, heroMap] = await Promise.all([
          fetch(`${API}/players/${accountId}`).then((r) => r.json()),
          fetch(`${API}/players/${accountId}/wl`).then((r) => r.json()),
          fetch(`${API}/players/${accountId}/heroes`).then((r) => r.json()),
          fetchHeroMap(),
        ]);

        if (profileRes?.error) throw new Error("Player not found or profile private");

        const win = wlRes.win ?? 0;
        const lose = wlRes.lose ?? 0;
        const topHeroes: DotaHero[] = (heroesRes as any[])
          .filter((h) => h.games > 0)
          .slice(0, 3)
          .map((h) => ({
            name: heroMap[h.hero_id] ?? `Hero ${h.hero_id}`,
            games: h.games,
            winrate: h.games ? h.win / h.games : 0,
          }));

        const data: DotaStats = {
          personaName: profileRes?.profile?.personaname,
          avatar: profileRes?.profile?.avatarmedium,
          rank: rankFromTier(profileRes?.rank_tier),
          win,
          lose,
          winrate: win + lose ? win / (win + lose) : 0,
          topHeroes,
        };

        if (cancelled) return;
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
        setState({ loading: false, error: null, data });
      } catch (e) {
        if (cancelled) return;
        setState({
          loading: false,
          error: e instanceof Error ? e.message : "Failed to load Dota stats",
          data: null,
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [accountId, enabled]);

  return state;
}
