import type { CollectionEntry } from "astro:content";
import { categories, categorySlug, type Category } from "@/config/categories";
import { siteConfig } from "@/config/site";

export type Post = CollectionEntry<"posts">;
export { categories, categorySlug, type Category };

export const categoryFromSlug = (slug: string): Category | undefined =>
  categories.find((category) => categorySlug(category) === slug);

export const tagSlug = (tag: string) =>
  tag
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** Monogram fallback for authors with no portrait in `src/config/authors.ts`. */
export const authorInitials = (author: string) =>
  author
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

export const authorSlug = (author: string) =>
  author
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const postSlug = (post: Post) => post.id.replace(/\/index$/, "");

export const postHref = (post: Post) => `/post/${postSlug(post)}/`;

export const byNewest = (a: Post, b: Post) => b.data.date.getTime() - a.data.date.getTime();

export const visiblePosts = (posts: Post[]) =>
  posts.filter((post) => !post.data.draft).sort(byNewest);

export const excludePosts = (posts: Post[], excluded: Post[]) => {
  const excludedIds = new Set(excluded.map((post) => post.id));
  return posts.filter((post) => !excludedIds.has(post.id));
};

export const getByCategory = (posts: Post[], category: Category, limit?: number) => {
  const list = visiblePosts(posts).filter((post) => post.data.category === category);
  return typeof limit === "number" ? list.slice(0, limit) : list;
};

/**
 * Hero slides: the slugs pinned in `siteConfig.featuredPosts` first, in the
 * order they are listed, then the newest remaining posts to fill `limit`.
 */
export const getFeatured = (posts: Post[], limit = 3) => {
  const visible = visiblePosts(posts);
  const pinned = siteConfig.featuredPosts
    .map((slug) => visible.find((post) => postSlug(post) === slug))
    .filter((post): post is Post => Boolean(post));
  return [...pinned, ...excludePosts(visible, pinned)].slice(0, limit);
};

export const getTrending = (posts: Post[], limit = 5) => {
  const visible = visiblePosts(posts);
  const trending = visible.filter((post) => post.data.trending);
  return [...trending, ...visible.filter((post) => !post.data.trending)].slice(0, limit);
};

export const getRelated = (posts: Post[], current: Post, limit = 3) =>
  visiblePosts(posts)
    .filter((post) => post.id !== current.id)
    .sort((a, b) => {
      const categoryScore =
        Number(b.data.category === current.data.category) -
        Number(a.data.category === current.data.category);
      return categoryScore || byNewest(a, b);
    })
    .slice(0, limit);

export const getAllTags = (posts: Post[]) =>
  Array.from(new Set(visiblePosts(posts).flatMap((post) => post.data.tags))).sort((a, b) =>
    a.localeCompare(b),
  );

export const getAllAuthors = (posts: Post[]) =>
  Array.from(
    visiblePosts(posts)
      .reduce((authorMap, post) => {
        const slug = authorSlug(post.data.author.name);
        const current = authorMap.get(slug);
        authorMap.set(slug, {
          name: post.data.author.name,
          role: post.data.author.role,
          posts: [...(current?.posts ?? []), post],
        });
        return authorMap;
      }, new Map<string, { name: string; role: string; posts: Post[] }>())
      .entries(),
  )
    .map(([slug, author]) => ({ slug, ...author }))
    .sort((a, b) => a.name.localeCompare(b.name));

/** Words for the read-time count: letters and digits, apostrophes and hyphens kept intact. */
const wordPattern = /[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu;

/**
 * Read time estimated from the Markdown body at build time, so posts never
 * carry a hand-maintained number in frontmatter. Code blocks, HTML tags, URLs,
 * and Markdown punctuation are dropped first so only prose is counted, and
 * every post reads as at least a minute.
 */
export const readMinutes = (post: Post) => {
  const prose = (post.body ?? "")
    .replace(/^---\n[\s\S]*?\n---/, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}\[[^\]]+\]:.*$/gm, " ");
  const words = prose.match(wordPattern)?.length ?? 0;
  return Math.max(1, Math.round(words / siteConfig.wordsPerMinute));
};

export const formatDate = (date: Date, style: "short" | "long" = "short") =>
  new Intl.DateTimeFormat(siteConfig.dateLocale, {
    month: style === "short" ? "short" : "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
