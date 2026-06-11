export interface Project {
  name: string;
  blurb: string;
  tags: string[];
  github: string;
  demo: string;
  /** placeholder = links are TODO, surfaced visually */
  placeholder?: boolean;
}

export const projects: Project[] = [
  {
    name: "Reddit Scraper",
    blurb:
      "Scrapes Reddit posts and comments at scale for sentiment analysis and opinion mining. Multi-subreddit, configurable scrape intervals.",
    tags: ["Python", "BeautifulSoup", "Pandas", "HuggingFace"],
    github: "#",
    demo: "#",
  },
  {
    name: "Boulder-gram",
    blurb:
      "An app for climbers to log bouldering sessions and routes, get recommendations, and track performance over time.",
    tags: ["React", "Node.js", "Express", "Python"],
    github: "#",
    demo: "#",
  },
  {
    name: "Weather Dashboard",
    blurb:
      "Interactive weather dashboard with forecasts, maps, and historical data viz. Responsive, dark-mode first.",
    tags: ["React", "D3.js", "Chart.js", "OpenWeather"],
    github: "#",
    demo: "#",
    placeholder: true,
  },
  {
    name: "Portfolio CMS",
    blurb:
      "Drag-and-drop portfolio builder with SEO tooling and analytics integration.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "AWS S3"],
    github: "#",
    demo: "#",
    placeholder: true,
  },
];
