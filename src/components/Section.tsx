import { motion } from "framer-motion";
import type { ReactNode } from "react";
import "./Section.css";

interface Props {
  id: string;
  index: string; // e.g. "01"
  title: string;
  children: ReactNode;
}

export function Section({ id, index, title, children }: Props) {
  return (
    <motion.section
      id={id}
      className="section"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{ show: { transition: { staggerChildren: 0.07 } } }}
    >
      <motion.div variants={reveal} className="section-head">
        <span className="label mono">{index}</span>
        <h2 className="section-title">{title}</h2>
      </motion.div>
      {children}
    </motion.section>
  );
}

export const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
