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

function getGhostEndpoint(searchParams: URLSearchParams) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return {
    url: `${supabaseUrl}/functions/v1/ghost-blog?${searchParams.toString()}`,
    anonKey: supabaseAnonKey,
  };
}

async function fetchGhost(searchParams: URLSearchParams): Promise<GhostPostsResponse | null> {
  const endpoint = getGhostEndpoint(searchParams);

  if (!endpoint) {
    return null;
  }

  const response = await fetch(endpoint.url, {
    headers: {
      Authorization: `Bearer ${endpoint.anonKey}`,
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Ghost posts: ${response.status}`);
  }

  return (await response.json()) as GhostPostsResponse;
}

export async function getGhostPosts(page = 1, limit = 12) {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  return (await fetchGhost(searchParams)) ?? EMPTY_POSTS_RESPONSE;
}

export async function getGhostPost(slug: string) {
  const searchParams = new URLSearchParams({ slug });
  const response = await fetchGhost(searchParams);

  return response?.posts[0] ?? null;
}
