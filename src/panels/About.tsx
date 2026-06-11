import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "../data/profile";
import { Section, reveal } from "../components/Section";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "./About.css";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, mv, reduced]);

  return (
    <span ref={ref} className="stat-value">
      {display}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <Section id="about" index="01" title="About">
      <motion.div variants={reveal} className="prose">
        {profile.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </motion.div>

      <motion.div variants={reveal} className="stat-row">
        {profile.stats.map((s) => (
          <div className="stat" key={s.label}>
            <Counter value={s.value} suffix={s.suffix} />
            <span className="stat-label mono">{s.label}</span>
          </div>
        ))}
      </motion.div>
    </Section>
  );
}
