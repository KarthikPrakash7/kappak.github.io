import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { hobbies, type HobbyDetail } from "../data/hobbies";
import { Section, reveal } from "../components/Section";
import { useOpenDota } from "../hooks/useOpenDota";
import "./Hobbies.css";

function DotaStats({ accountId }: { accountId: string }) {
  const { loading, error, data } = useOpenDota(accountId, true);

  if (loading) return <p className="dota-hint mono">loading live stats…</p>;
  if (error) return <p className="dota-hint mono">⚠ {error}</p>;
  if (!data) return null;

  return (
    <div className="dota-stats">
      <div className="dota-row">
        <span className="dota-stat">
          <span className="dota-val">{data.rank}</span>
          <span className="dota-key mono">rank</span>
        </span>
        <span className="dota-stat">
          <span className="dota-val">{Math.round(data.winrate * 100)}%</span>
          <span className="dota-key mono">winrate</span>
        </span>
        <span className="dota-stat">
          <span className="dota-val">
            {data.win}<span className="dota-sub">W</span> / {data.lose}
            <span className="dota-sub">L</span>
          </span>
          <span className="dota-key mono">record</span>
        </span>
      </div>
      {data.topHeroes.length > 0 && (
        <div className="dota-heroes">
          <span className="label dota-heroes-label">most played</span>
          <ul>
            {data.topHeroes.map((h) => (
              <li key={h.name}>
                <span className="dota-hero-name">{h.name}</span>
                <span className="dota-hero-meta mono">
                  {h.games} games · {Math.round(h.winrate * 100)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DetailView({ detail }: { detail: HobbyDetail }) {
  switch (detail.kind) {
    case "climbing":
      return (
        <div className="hd-climbing">
          <div className="hd-grades">
            <span className="label">grades climbed</span>
            <div className="hd-grade-row">
              {detail.grades.map((g) => (
                <span
                  key={g.grade}
                  className={`hd-grade-pill mono ${g.current ? "current" : ""}`}
                >
                  {g.grade}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    case "games":
      return (
        <div className="hd-games">
          {detail.entries.map((e) => {
            const dead = e.href === "#";
            return (
              <div className="hd-game" key={e.name}>
                <div className="hd-game-head">
                  <h4 className="hd-game-name">{e.name}</h4>
                  {e.href && (
                    <a
                      className={`hd-game-link mono ${dead ? "dead" : ""}`}
                      href={dead ? undefined : e.href}
                      target={dead ? undefined : "_blank"}
                      rel={dead ? undefined : "noreferrer"}
                    >
                      {dead ? "·tbd" : `${e.handle} ↗`}
                    </a>
                  )}
                </div>
                {e.live?.source === "opendota" ? (
                  <DotaStats accountId={e.live.accountId} />
                ) : (
                  <span className="hd-game-rank mono">{e.rank}</span>
                )}
              </div>
            );
          })}
        </div>
      );
  }
}

export function Hobbies() {
  // null = nothing selected → grid sits full width, no detail window
  const [active, setActive] = useState<number | null>(null);
  const open = active !== null;
  const current = open ? hobbies[active] : null;

  return (
    <Section id="hobbies" index="06" title="Off the clock">
      <motion.div variants={reveal} className={`hobby-stage ${open ? "open" : ""}`}>
        <div className="hobby-grid">
          {hobbies.map((h, i) => (
            <button
              key={h.title}
              className={`hobby-tile ${active === i ? "active" : ""}`}
              aria-expanded={active === i}
              onClick={() => setActive(active === i ? null : i)}
            >
              <span className="hobby-tile-glyph">{h.glyph}</span>
              <span className="hobby-tile-title">{h.title}</span>
              <span className="hobby-tile-teaser">{h.teaser}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {current && (
            <motion.aside
              key={current.title}
              className="hobby-window"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="hobby-window-glyph">{current.glyph}</span>
              <h3 className="hobby-window-title">{current.title}</h3>
              <DetailView detail={current.detail} />
            </motion.aside>
          )}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
