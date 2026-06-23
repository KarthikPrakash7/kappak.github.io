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
    name: "SAP Security Scanner",
    blurb:
      "Catches CVEs, leaked secrets, and BTP misconfigurations in MTA/CAP projects before deploy. Static analysis tuned for SAP Cloud Application Programming model.",
    tags: ["Python", "SAP BTP", "Security", "CAP", "Static Analysis"],
    github: "https://github.com/KarthikPrakash7/sap-security-scanner",
    demo: "#",
  },
  {
    name: "Hold & Grasp Study",
    blurb:
      "Research pipeline benchmarking open-vocabulary VLMs (LocateAnything, Grounding DINO, YOLOv8) on climbing hold detection and classification, with planned transfer to robotic grasp affordances.",
    tags: ["Python", "Computer Vision", "YOLOv8", "Grounding DINO", "VLMs"],
    github: "https://github.com/KarthikPrakash7/hold-grasp-study",
    demo: "#",
  },
  {
    name: "StockDash",
    blurb:
      "Self-retraining stock prediction dashboard. Daily pipeline ingests OHLCV data, engineers features, retrains an XGBoost model, and serves predictions to a React UI with candlestick charts.",
    tags: ["Python", "FastAPI", "XGBoost", "React", "Docker"],
    github: "https://github.com/KarthikPrakash7/stockdash",
    demo: "#",
  },
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
];
