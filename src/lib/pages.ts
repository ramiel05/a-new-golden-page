export type ContentType = "posts" | "projects" | "music" | "bookmarks" | "webring";

export type Page = {
  name: string;
  contentType?: ContentType;
};

export const pages: Page[] = [
  { name: "home" },
  { name: "fragments", contentType: "posts" },
  { name: "lab", contentType: "projects" },
  { name: "resonance", contentType: "music" },
  { name: "i-like-these", contentType: "bookmarks" },
  { name: "webring", contentType: "webring" },
];
