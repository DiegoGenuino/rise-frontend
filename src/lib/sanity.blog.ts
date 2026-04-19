import type {BlogPost} from "../types/blog";
import {
  getAllBlogPosts as getFallbackPosts,
  getBlogPostBySlug as getFallbackPostBySlug,
  getRelatedPosts as getFallbackRelatedPosts,
} from "../data/blogPosts";
import {
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_POST_LIST_QUERY,
  BLOG_POST_SLUGS_QUERY,
  BLOG_RELATED_POSTS_QUERY,
  BLOG_RECENT_POSTS_QUERY,
} from "./sanity.queries";
import {isSanityConfigured, sanityClient} from "./sanity.client";
import type {
  SanityPostCardDocument,
  SanityPostDocument,
  SanitySlugDocument,
} from "./sanity.types";
import {mapSanityPost, mapSanityPostCard, sortPostsByDate} from "./blog.mapper";

const BLOG_LOAD_ERROR_MESSAGE = "Nao foi possivel carregar os artigos do CMS no momento.";

export interface BlogListResult {
  posts: BlogPost[];
  errorMessage: string | null;
  source: "sanity" | "fallback";
}

export interface BlogDetailResult {
  post?: BlogPost;
  relatedPosts: BlogPost[];
  errorMessage: string | null;
  source: "sanity" | "fallback";
}

async function fetchPublishedPostCards(): Promise<SanityPostCardDocument[]> {
  if (!sanityClient) {
    return [];
  }

  return sanityClient.fetch<SanityPostCardDocument[]>(BLOG_POST_LIST_QUERY);
}

export async function getBlogList(): Promise<BlogListResult> {
  const fallbackPosts = getFallbackPosts();

  if (!isSanityConfigured || !sanityClient) {
    return {
      posts: fallbackPosts,
      errorMessage: null,
      source: "fallback",
    };
  }

  try {
    const sanityPosts = await fetchPublishedPostCards();
    const mappedPosts = sanityPosts.map(mapSanityPostCard);

    return {
      posts: sortPostsByDate(mappedPosts),
      errorMessage: null,
      source: "sanity",
    };
  } catch (error) {
    console.error("Erro ao buscar listagem de posts no Sanity", error);
    return {
      posts: fallbackPosts,
      errorMessage: BLOG_LOAD_ERROR_MESSAGE,
      source: "fallback",
    };
  }
}

export async function getBlogSlugs(): Promise<string[]> {
  if (!isSanityConfigured || !sanityClient) {
    return getFallbackPosts().map((post) => post.slug);
  }

  try {
    const slugDocuments = await sanityClient.fetch<SanitySlugDocument[]>(BLOG_POST_SLUGS_QUERY);
    const slugs = slugDocuments.map((item) => item.slug).filter(Boolean) as string[];
    return slugs;
  } catch (error) {
    console.error("Erro ao buscar slugs de posts no Sanity", error);
    return getFallbackPosts().map((post) => post.slug);
  }
}

async function getAutomaticRelatedPosts(post: SanityPostDocument): Promise<BlogPost[]> {
  if (!sanityClient || !post.slug) {
    return [];
  }

  const params = {
    slug: post.slug,
    categoryRef: post.categoryRef || "",
    tagRefs: post.tagRefs || [],
    limit: 3,
  };

  const relatedCards = await sanityClient.fetch<SanityPostCardDocument[]>(
    BLOG_RELATED_POSTS_QUERY,
    params,
  );

  if (relatedCards.length > 0) {
    return relatedCards.map(mapSanityPostCard).slice(0, 3);
  }

  const recentCards = await sanityClient.fetch<SanityPostCardDocument[]>(BLOG_RECENT_POSTS_QUERY, {
    slug: post.slug,
    limit: 3,
  });

  return recentCards.map(mapSanityPostCard).slice(0, 3);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogDetailResult> {
  const fallbackPost = getFallbackPostBySlug(slug);

  if (!isSanityConfigured || !sanityClient) {
    if (!fallbackPost) {
      return {
        post: undefined,
        relatedPosts: [],
        errorMessage: null,
        source: "fallback",
      };
    }

    return {
      post: fallbackPost,
      relatedPosts: getFallbackRelatedPosts(fallbackPost, 3),
      errorMessage: null,
      source: "fallback",
    };
  }

  try {
    const sanityPost = await sanityClient.fetch<SanityPostDocument | null>(BLOG_POST_BY_SLUG_QUERY, {
      slug,
    });

    if (!sanityPost) {
      if (!fallbackPost) {
        return {
          post: undefined,
          relatedPosts: [],
          errorMessage: null,
          source: "sanity",
        };
      }

      return {
        post: fallbackPost,
        relatedPosts: getFallbackRelatedPosts(fallbackPost, 3),
        errorMessage: null,
        source: "fallback",
      };
    }

    const post = mapSanityPost(sanityPost);
    let relatedPosts: BlogPost[] = [];

    if (sanityPost.relatedPostsManual && sanityPost.relatedPostsManual.length > 0) {
      relatedPosts = sanityPost.relatedPostsManual
        .map(mapSanityPostCard)
        .filter((relatedPost) => relatedPost.slug !== post.slug)
        .slice(0, 3);
    }

    if (relatedPosts.length === 0) {
      relatedPosts = await getAutomaticRelatedPosts(sanityPost);
    }

    return {
      post,
      relatedPosts,
      errorMessage: null,
      source: "sanity",
    };
  } catch (error) {
    console.error(`Erro ao buscar post ${slug} no Sanity`, error);

    if (!fallbackPost) {
      return {
        post: undefined,
        relatedPosts: [],
        errorMessage: BLOG_LOAD_ERROR_MESSAGE,
        source: "fallback",
      };
    }

    return {
      post: fallbackPost,
      relatedPosts: getFallbackRelatedPosts(fallbackPost, 3),
      errorMessage: BLOG_LOAD_ERROR_MESSAGE,
      source: "fallback",
    };
  }
}
