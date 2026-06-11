/** Each hobby has a teaser (shown in list) and a typed detail (shown expanded). */
export type HobbyDetail =
  | { kind: "text"; body: string[] }
  | { kind: "books"; genres: { genre: string; books: string[] }[] }
  | { kind: "links"; links: { title: string; href: string; source?: string }[] }
  | { kind: "profiles"; profiles: { label: string; handle: string; href: string }[] }
  | {
      kind: "dota";
      /** Steam32 / Dotabuff account_id (the number in your dotabuff URL) */
      accountId: string;
      links: { label: string; handle: string; href: string }[];
    };

export interface Hobby {
  glyph: string;
  title: string;
  teaser: string;
  detail: HobbyDetail;
}

export const hobbies: Hobby[] = [
  {
    glyph: "⌖",
    title: "OSINT",
    teaser: "Open-source intelligence tooling.",
    detail: {
      kind: "text",
      body: [
        "Messing with open-source intelligence tools to gather and analyze publicly available information.",
        "Most of the fun is in the pivot — turning one stray data point into a whole picture.",
      ],
    },
  },
  {
    glyph: "✦",
    title: "Gaming",
    teaser: "I hate losing. Love the strategy.",
    detail: {
      kind: "dota",
      // TODO: your Steam32 / Dotabuff account_id (number in dotabuff.com/players/<id>)
      accountId: "870551759",
      links: [
        // TODO: replace # with your real profile URLs
        { label: "Steam", handle: "view profile", href: "#" },
        { label: "Dotabuff", handle: "match history", href: "#" },
      ],
    },
  },
  {
    glyph: "❋",
    title: "Reading",
    teaser: "Fiction & fantasy, by genre.",
    detail: {
      kind: "books",
      // TODO: swap in your real favourites
      genres: [
        { genre: "Fantasy", books: ["Title one", "Title two", "Title three"] },
        { genre: "Sci-Fi", books: ["Title one", "Title two"] },
        { genre: "Fiction", books: ["Title one", "Title two"] },
      ],
    },
  },
  {
    glyph: "✺",
    title: "Astrophysics",
    teaser: "Interesting space news.",
    detail: {
      kind: "links",
      // TODO: swap in articles you actually rate
      links: [
        { title: "Add a space-news article here", href: "#", source: "source.com" },
        { title: "And another one", href: "#", source: "source.com" },
        { title: "And one more", href: "#", source: "source.com" },
      ],
    },
  },
  {
    glyph: "➤",
    title: "Running",
    teaser: "Here to boast about one 10k.",
    detail: {
      kind: "text",
      body: ["Here to boast about the one 10k I did last year. The bar is on the floor and I am proud of it."],
    },
  },
  {
    glyph: "▲",
    title: "Climbing",
    teaser: "Falling down, getting back up.",
    detail: {
      kind: "text",
      body: ["I enjoy falling down and getting back up to fall again. Bouldering mostly — the puzzle matters more than the height."],
    },
  },
];
