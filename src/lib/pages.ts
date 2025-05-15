export type ContentType = "posts" | "projects" | "music" | "bookmarks" | "webring";

export type Page = {
  name: string;
  contentType?: ContentType;
};

/* Order matters. First to last is reflected in navbar item order. */
export const pages: Page[] = [
  { name: "home" },
  { name: "log", contentType: "posts" },
  { name: "builds", contentType: "projects" },
  { name: "resonance", contentType: "music" },
  { name: "stars", contentType: "bookmarks" },
  { name: "webring", contentType: "webring" },
];
