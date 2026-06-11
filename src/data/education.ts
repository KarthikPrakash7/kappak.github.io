export interface Edu {
  degree: string;
  school: string;
  location: string;
  date: string;
  glyph: string;
}

export const education: Edu[] = [
  {
    degree: "MSc, Computer Science",
    school: "TU Delft",
    location: "Delft, Netherlands",
    date: "Aug 2022 — Jul 2024",
    glyph: "◆",
  },
  {
    degree: "BTech, Computer Science",
    school: "SRM University",
    location: "Chennai, India",
    date: "2018 — 2022",
    glyph: "◇",
  },
];
