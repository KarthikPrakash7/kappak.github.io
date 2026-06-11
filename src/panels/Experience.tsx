import { motion } from "framer-motion";
import { experience } from "../data/experience";
import { Section, reveal } from "../components/Section";
import { TagPill } from "../components/ui/TagPill";
import "./Experience.css";

export function Experience() {
  return (
    <Section id="experience" index="02" title="Experience">
      <div className="exp-list">
        {experience.map((role) => (
          <motion.article key={role.title + role.company} variants={reveal} className="exp-item">
            <div className="exp-head">
              <h3 className="exp-title">
                {role.title} <span className="exp-at">@ {role.company}</span>
              </h3>
              <span className="exp-date mono">{role.date}</span>
            </div>
            <ul className="exp-bullets">
              {role.bullets.map((b) => (
                <li key={b} className="arrow">
                  {b}
                </li>
              ))}
            </ul>
            <div className="tag-row">
              {role.tags.map((t) => (
                <TagPill key={t}>{t}</TagPill>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
