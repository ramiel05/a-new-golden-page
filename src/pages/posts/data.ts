import { getShortDescription, processContentForPage } from "../../lib/utils";

export type PostFrontmatter = {
  title: string;
  description: string;
  tags?: string[];
  featured: boolean;
  timestamp: string;
  filename: string;
};

export const posts = (
  await processContentForPage<PostFrontmatter, PostFrontmatter>("posts", (data) => {
    const shortDescription = getShortDescription(data.frontmatter.description);
    return {
      title: data.frontmatter.title,
      description: shortDescription,
      tags: data.frontmatter.tags,
      featured: data.frontmatter.featured,
      timestamp: data.frontmatter.timestamp,
      filename: `/blog/${data.frontmatter.filename}`,
    };
  })
)
  .filter((post) => post !== null)
  .sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB.getTime() - dateA.getTime();
  });
