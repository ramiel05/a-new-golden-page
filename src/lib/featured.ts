import type { PostFrontmatter } from "../pages/posts/data";
import type { ProjectFrontmatter } from "../pages/projects/data";
import { getShortDescription, processContentForPage } from "./utils";

const isFeaturedContent = (content: unknown): content is { featured: boolean } => {
  return typeof content === "object" && content !== null && "featured" in content;
};

export const featuredProjects = (
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
  .filter((project) => isFeaturedContent(project))
  .sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB.getTime() - dateA.getTime();
  });

export const featuredPosts = (
  await processContentForPage<PostFrontmatter, PostFrontmatter>("posts", (data) => {
    const shortDescription = getShortDescription(data.frontmatter.description);
    return {
      title: data.frontmatter.title,
      description: shortDescription,
      tags: data.frontmatter.tags,
      featured: data.frontmatter.featured,
      timestamp: data.frontmatter.timestamp,
      filename: `/posts/${data.frontmatter.filename}`,
    };
  })
)
  .filter((project) => isFeaturedContent(project))
  .sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB.getTime() - dateA.getTime();
  });
