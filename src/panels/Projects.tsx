import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { Section, reveal } from "../components/Section";
import { TagPill } from "../components/ui/TagPill";
import "./Projects.css";

function Link({ href, label }: { href: string; label: string }) {
  const dead = href === "#";
  if (dead) return null;
  return (
    <a className="proj-link mono" href={href} target="_blank" rel="noreferrer">
      {label} ↗
    </a>
  );
}

export function Projects() {
  return (
    <Section id="projects" index="05" title="Projects">
      <div className="proj-list">
        {projects.map((p) => (
          <motion.article key={p.name} variants={reveal} className="proj-item">
            <div className="proj-head">
              <h3 className="proj-name">{p.name}</h3>
              {p.placeholder ? (
                <span className="proj-status in-progress mono">in_progress</span>
              ) : (
                <span className="proj-status live mono">● live</span>
              )}
            </div>
            <p className="proj-blurb">{p.blurb}</p>
            <div className="proj-foot">
              <div className="tag-row">
                {p.tags.map((t) => (
                  <TagPill key={t}>{t}</TagPill>
                ))}
              </div>
              <div className="proj-links">
                <Link href={p.github} label="github" />
                <Link href={p.demo} label="demo" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
