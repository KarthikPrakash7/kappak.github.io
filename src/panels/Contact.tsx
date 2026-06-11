import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { Section, reveal } from "../components/Section";
import "./Contact.css";

export function Contact() {
  return (
    <Section id="contact" index="07" title="Get in touch">
      <motion.p variants={reveal} className="prose contact-lede">
        Open to new projects, AI/OSINT problems, and good conversations. Email is
        the fastest way to reach me.
      </motion.p>

      <motion.a variants={reveal} className="contact-email" href={`mailto:${profile.email}`}>
        {profile.email}
      </motion.a>

      <motion.div variants={reveal} className="contact-links">
        {profile.socials.map((s) => {
          const dead = s.href === "#";
          return (
            <a
              key={s.label}
              className={`contact-link ${dead ? "dead" : ""}`}
              href={dead ? undefined : s.href}
              target={dead ? undefined : "_blank"}
              rel={dead ? undefined : "noreferrer"}
            >
              <span className="contact-link-label">{s.label}</span>
              <span className="contact-link-handle mono">
                {s.handle} {dead ? "·tbd" : "↗"}
              </span>
            </a>
          );
        })}
      </motion.div>

      <motion.p variants={reveal} className="contact-foot mono">
        ◷ {profile.location} · © {new Date().getFullYear()} Karthik Prakash
      </motion.p>
    </Section>
  );
}
