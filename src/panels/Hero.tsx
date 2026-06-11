import { motion } from "framer-motion";
import { profile } from "../data/profile";
import "./Hero.css";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero-inner">
        <motion.p className="label hero-label" {...fade(0.05)}>
          <span className="arrow" />
          {profile.role}
        </motion.p>

        <motion.h1 className="hero-name" {...fade(0.12)}>
          {profile.name}
        </motion.h1>

        <motion.p className="hero-intro" {...fade(0.2)}>
          {profile.intro}
        </motion.p>

        <motion.div className="hero-meta" {...fade(0.3)}>
          <span className="hero-status">
            <span className="hero-dot" /> Available for new work
          </span>
          <span className="hero-loc mono">◷ {profile.location}</span>
        </motion.div>

        <motion.div className="hero-links" {...fade(0.4)}>
          <a className="hero-link mono" href={`mailto:${profile.email}`}>
            email ↗
          </a>
          {profile.socials.map((s) => {
            const dead = s.href === "#";
            return (
              <a
                key={s.label}
                className={`hero-link mono ${dead ? "dead" : ""}`}
                href={dead ? undefined : s.href}
                target={dead ? undefined : "_blank"}
                rel={dead ? undefined : "noreferrer"}
              >
                {s.label.toLowerCase()} {dead ? "·tbd" : "↗"}
              </a>
            );
          })}
        </motion.div>
      </div>
    </header>
  );
}
