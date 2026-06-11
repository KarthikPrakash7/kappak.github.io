import { Analytics } from "@vercel/analytics/react";
import { TopNav } from "./components/nav/TopNav";
import { NodeGraphBackground } from "./components/NodeGraphBackground";
import { Hero } from "./panels/Hero";
import { About } from "./panels/About";
import { Experience } from "./panels/Experience";
import { Education } from "./panels/Education";
import { Skills } from "./panels/Skills";
import { Projects } from "./panels/Projects";
import { Hobbies } from "./panels/Hobbies";
import { Contact } from "./panels/Contact";

const NAV = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "education", label: "education" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "hobbies", label: "hobbies" },
  { id: "contact", label: "contact" },
];

export default function App() {
  return (
    <>
      <NodeGraphBackground />
      <TopNav items={NAV} />
      <main className="page">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Hobbies />
        <Contact />
      </main>
      <Analytics />
    </>
  );
}
