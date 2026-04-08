export interface GhostTag {
  id: string;
  name: string;
  slug: string;
}

export interface GhostAuthor {
  id: string;
  name: string;
  profile_image: string | null;
}

export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  published_at: string;
  reading_time: number;
  tags: GhostTag[];
  authors: GhostAuthor[];
}

export interface GhostPostsResponse {
  posts: GhostPost[];
  meta: {
    pagination: {
      page: number;
      limit: number;
      pages: number;
      total: number;
    };
  };
}

const EMPTY_POSTS_RESPONSE: GhostPostsResponse = {
  posts: [],
  meta: {
    pagination: {
      page: 1,
      limit: 0,
      pages: 0,
      total: 0,
    },
  },
};

const GHOST_URL = process.env.GHOST_URL;
const GHOST_CONTENT_API_KEY = process.env.GHOST_CONTENT_API_KEY;

export async function getGhostPosts(page = 1, limit = 12): Promise<GhostPostsResponse> {
  if (!GHOST_URL || !GHOST_CONTENT_API_KEY) {
    console.warn("Ghost API env vars not set");
    return EMPTY_POSTS_RESPONSE;
  }

  const params = new URLSearchParams({
    key: GHOST_CONTENT_API_KEY,
    include: "tags,authors",
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(`${GHOST_URL}/ghost/api/content/posts/?${params}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Ghost API error: ${response.status}`);
  }

  return (await response.json()) as GhostPostsResponse;
}

export async function getGhostPost(slug: string): Promise<GhostPost | null> {
  if (!GHOST_URL || !GHOST_CONTENT_API_KEY) {
    return null;
  }

  const params = new URLSearchParams({
    key: GHOST_CONTENT_API_KEY,
    include: "tags,authors",
  });

  const response = await fetch(
    `${GHOST_URL}/ghost/api/content/posts/slug/${slug}/?${params}`,
    { next: { revalidate: 300 } }
  );

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as GhostPostsResponse;
  return data.posts[0] ?? null;
}
