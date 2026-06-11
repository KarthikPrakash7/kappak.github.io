import { motion } from "framer-motion";
import { skills } from "../data/skills";
import { Section, reveal } from "../components/Section";
import "./Skills.css";

export function Skills() {
  return (
    <Section id="skills" index="04" title="Skills">
      <div className="skill-list">
        {skills.map((group) => (
          <motion.div key={group.group} variants={reveal} className="skill-group">
            <h3 className="skill-group-title label">{group.group}</h3>
            <div className="skill-icons">
              {group.skills.map((s) => (
                <div className="skill-icon" key={s.name} title={s.name}>
                  <i className={s.icon} />
                  <span className="skill-name mono">{s.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
