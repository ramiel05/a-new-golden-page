import fs from "node:fs/promises";
import { GLOBAL } from "./variables";
import type { ContentType, Page } from "./pages";

type MarkdownData<T extends object> = {
  frontmatter: T;
  file: string;
  url: string;
};

const processData = async <T extends object, K>(
  file: string,
  contentType: ContentType,
  processFn: (data: MarkdownData<T>) => K,
) => {
  const globbies: Record<ContentType, Record<string, () => Promise<unknown>>> = {
    bookmarks: import.meta.glob("/src/pages/bookmarks/*.md"),
    music: import.meta.glob("/src/pages/music/*.md"),
    posts: import.meta.glob("/src/pages/posts/*.md"),
    projects: import.meta.glob("/src/pages/projects/*.md"),
    webring: import.meta.glob("/src/pages/webring/*.md"),
  };
  const files = globbies[contentType][`/src/pages/${contentType}/${file}.md`]();
  const data = (await files) as {
    frontmatter: T;
    file: string;
    url: string;
  };
  return processFn(data);
};

/**
 * This function processes the content of a directory and returns an array of processed content.
 * It takes a content type, a function to process the content, and an optional directory.
 * If no directory is provided, it defaults to the current working directory.
 *
 * @param contentType the type of content to process
 * @param processFn the function to process the content
 * @param dir the directory to process the content from
 * @returns a promise that resolves to an array of processed content
 */
export const processContentForPage = async <T extends object, K>(
  contentType: Page["contentType"],
  processFn: (data: MarkdownData<T>) => K,
  dir: string = process.cwd(),
) => {
  const files = await fs.readdir(dir + `/src/pages/${contentType}`);
  const markdownFiles = files.filter((file: string) => file.endsWith(".md")).map((file) => file.split(".")[0]);
  const readMdFileContent = async (file: string) => {
    return contentType ? processData(file, contentType, processFn) : null;
  };
  return await Promise.all(markdownFiles.map(readMdFileContent));
};

/**
 * Shortens a string by removing words at the end until it fits within a certain length.
 * @param content the content to shorten
 * @param maxLength the maximum length of the shortened content (default is 20)
 * @returns a shortened version of the content
 */
export const getShortDescription = (content: string, maxLength = 20) => {
  const splitByWord = content.split(" ");
  const length = splitByWord.length;
  return length > maxLength ? splitByWord.slice(0, maxLength).join(" ") + "..." : content;
};

/**
 * Processes the date of an article and returns a string representing the processed date.
 * @param timestamp the timestamp to process
 * @returns a string representing the processed timestamp
 */
export const processPostDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const monthSmall = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${monthSmall} ${day}, ${year}`;
};

/**
 * Generates a source URL for a content item. The URL is used in meta tags and social media cards.
 * @param sourceUrl the source URL of the content
 * @param contentType the type of content (either "projects" or "posts")
 * @returns a string representing the source URL with the appropriate domain
 */
export const generateSourceUrl = (sourceUrl: string, contentType: "projects" | "posts") => {
  return `${GLOBAL.rootUrl}/${contentType}/${sourceUrl}`;
};
