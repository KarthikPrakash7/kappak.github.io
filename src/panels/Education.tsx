import { motion } from "framer-motion";
import { education } from "../data/education";
import { Section, reveal } from "../components/Section";
import "./Education.css";

export function Education() {
  return (
    <Section id="education" index="03" title="Education">
      <div className="edu-list">
        {education.map((e) => (
          <motion.div key={e.school} variants={reveal} className="edu-item">
            <div className="edu-main">
              <h3 className="edu-degree">{e.degree}</h3>
              <p className="edu-school">
                {e.school} <span className="edu-loc">· {e.location}</span>
              </p>
            </div>
            <span className="edu-date mono">{e.date}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
