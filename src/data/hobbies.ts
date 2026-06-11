/** Each hobby has a teaser (shown in list) and a typed detail (shown expanded). */
export type HobbyDetail =
  | {
      kind: "climbing";
      grades: { grade: string; current?: boolean }[];
    }
  | {
      kind: "games";
      entries: {
        name: string;
        rank: string;
        handle?: string;
        href?: string;
        /** Pull live stats from a third-party API instead of showing `rank` */
        live?: { source: "opendota"; accountId: string };
      }[];
    };

export interface Hobby {
  glyph: string;
  title: string;
  teaser: string;
  detail: HobbyDetail;
}

export const hobbies: Hobby[] = [
  {
    glyph: "▲",
    title: "Bouldering",
    teaser: "Falling down, getting back up.",
    detail: {
      kind: "climbing",
      grades: [
        // TODO: mark your current/highest grade with current: true
        { grade: "V0" },
        { grade: "V1" },
        { grade: "V2" },
        { grade: "V3"},
        { grade: "V4-5", current: true },
      ],
    },
  },
  {
    glyph: "✦",
    title: "Gaming",
    teaser: "I hate losing. Love the strategy.",
    detail: {
      kind: "games",
      entries: [
        {
          name: "Dota 2",
          rank: "—",
          handle: "view profile",
          href: "#", // TODO: replace with your Steam/Dotabuff profile URL
          live: { source: "opendota", accountId: "870551759" },
        },
        {
          name: "League of Legends",
          rank: "Silver II",
          handle: "Chaeyonnie#LOVE",
          href: "https://op.gg/lol/summoners/euw/Chaeyonnie-LOVE",
        },
      ],
    },
  },
];
