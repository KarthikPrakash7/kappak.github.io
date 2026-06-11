import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { hobbies, type HobbyDetail } from "../data/hobbies";
import { Section, reveal } from "../components/Section";
import { useOpenDota } from "../hooks/useOpenDota";
import "./Hobbies.css";

function DotaStats({
  accountId,
  links,
}: {
  accountId: string;
  links: { label: string; handle: string; href: string }[];
}) {
  const { loading, error, data } = useOpenDota(accountId, true);

  return (
    <div className="dota">
      <div className="dota-profiles">
        {links.map((p) => {
          const dead = p.href === "#";
          return (
            <a
              key={p.label}
              className={`hd-profile ${dead ? "dead" : ""}`}
              href={dead ? undefined : p.href}
              target={dead ? undefined : "_blank"}
              rel={dead ? undefined : "noreferrer"}
            >
              <span className="hd-profile-label">{p.label}</span>
              <span className="hd-profile-handle mono">
                {dead ? "·tbd" : p.handle} {dead ? "" : "↗"}
              </span>
            </a>
          );
        })}
      </div>

      <div className="dota-game">
        <h4 className="dota-game-title">
          Dota 2 <span className="dota-game-src mono">· opendota</span>
        </h4>
      </div>

      {!accountId && (
        <p className="dota-hint mono">
          add your account_id in data/hobbies.ts to pull live stats
        </p>
      )}
      {accountId && loading && <p className="dota-hint mono">loading live stats…</p>}
      {accountId && error && <p className="dota-hint mono">⚠ {error}</p>}

      {data && (
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
      )}
    </div>
  );
}

function DetailView({ detail }: { detail: HobbyDetail }) {
  switch (detail.kind) {
    case "text":
      return (
        <div className="hd-text">
          {detail.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      );
    case "books":
      return (
        <div className="hd-books">
          {detail.genres.map((g) => (
            <div className="hd-genre" key={g.genre}>
              <h4 className="hd-genre-name mono">{g.genre}</h4>
              <ul>
                {g.books.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "links":
      return (
        <ul className="hd-links">
          {detail.links.map((l) => {
            const dead = l.href === "#";
            return (
              <li key={l.title}>
                <a
                  className={`hd-link ${dead ? "dead" : ""}`}
                  href={dead ? undefined : l.href}
                  target={dead ? undefined : "_blank"}
                  rel={dead ? undefined : "noreferrer"}
                >
                  <span className="hd-link-title">{l.title}</span>
                  {l.source && <span className="hd-link-src mono">{l.source}</span>}
                  <span className="hd-link-arrow mono">{dead ? "·tbd" : "↗"}</span>
                </a>
              </li>
            );
          })}
        </ul>
      );
    case "profiles":
      return (
        <div className="hd-profiles">
          {detail.profiles.map((p) => {
            const dead = p.href === "#";
            return (
              <a
                key={p.label}
                className={`hd-profile ${dead ? "dead" : ""}`}
                href={dead ? undefined : p.href}
                target={dead ? undefined : "_blank"}
                rel={dead ? undefined : "noreferrer"}
              >
                <span className="hd-profile-label">{p.label}</span>
                <span className="hd-profile-handle mono">
                  {dead ? "·tbd" : p.handle} {dead ? "" : "↗"}
                </span>
              </a>
            );
          })}
        </div>
      );
    case "dota":
      return <DotaStats accountId={detail.accountId} links={detail.links} />;
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
