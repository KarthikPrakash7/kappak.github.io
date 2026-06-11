export interface Skill {
  name: string;
  icon: string; // devicon class
}

export interface SkillGroup {
  group: string;
  skills: Skill[];
}

export const skills: SkillGroup[] = [
  {
    group: "Frontend",
    skills: [
      { name: "React", icon: "devicon-react-original colored" },
      { name: "TypeScript", icon: "devicon-typescript-plain colored" },
      { name: "HTML5", icon: "devicon-html5-plain colored" },
      { name: "CSS3", icon: "devicon-css3-plain colored" },
    ],
  },
  {
    group: "Backend & ML",
    skills: [
      { name: "Python", icon: "devicon-python-plain colored" },
      { name: "Node.js", icon: "devicon-nodejs-plain colored" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
      { name: "FastAPI", icon: "devicon-fastapi-plain colored" },
      { name: "Flask", icon: "devicon-flask-original" },
    ],
  },
  {
    group: "DevOps & Tools",
    skills: [
      { name: "Git", icon: "devicon-git-plain colored" },
      { name: "Docker", icon: "devicon-docker-plain colored" },
      { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark colored" },
      { name: "Azure", icon: "devicon-azure-plain colored" },
      { name: "Kubernetes", icon: "devicon-kubernetes-plain colored" },
      { name: "CI/CD", icon: "devicon-githubactions-plain" },
    ],
  },
];
