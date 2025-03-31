import { getShortDescription, processContentForPage } from "../../lib/utils";

export type ProjectFrontmatter = {
  title: string;
  description: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  timestamp: string;
  filename: string;
};

export const projects = (
  await processContentForPage<ProjectFrontmatter, ProjectFrontmatter>("projects", (data) => {
    const shortDescription = getShortDescription(data.frontmatter.description);
    return {
      title: data.frontmatter.title,
      description: shortDescription,
      tags: data.frontmatter.tags,
      githubUrl: data.frontmatter.githubUrl,
      liveUrl: data.frontmatter.liveUrl,
      featured: data.frontmatter.featured,
      timestamp: data.frontmatter.timestamp,
      filename: `/projects/${data.frontmatter.filename}`,
    };
  })
)
  .filter((project) => project !== null)
  .sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB.getTime() - dateA.getTime();
  });
