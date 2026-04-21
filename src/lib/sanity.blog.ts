import type {BlogPost} from "../types/blog";
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
const SANITY_CONFIG_ERROR_MESSAGE = "Sanity nao esta configurado neste ambiente.";

export interface BlogListResult {
  posts: BlogPost[];
  errorMessage: string | null;
}

export interface BlogDetailResult {
  post?: BlogPost;
  relatedPosts: BlogPost[];
  errorMessage: string | null;
}

async function fetchPublishedPostCards(): Promise<SanityPostCardDocument[]> {
  if (!sanityClient) {
    return [];
  }

  return sanityClient.fetch<SanityPostCardDocument[]>(BLOG_POST_LIST_QUERY);
}

export async function getBlogList(): Promise<BlogListResult> {
  if (!isSanityConfigured || !sanityClient) {
    return {
      posts: [],
      errorMessage: SANITY_CONFIG_ERROR_MESSAGE,
    };
  }

  try {
    const sanityPosts = await fetchPublishedPostCards();
    const mappedPosts = sanityPosts.map(mapSanityPostCard);

    return {
      posts: sortPostsByDate(mappedPosts),
      errorMessage: null,
    };
  } catch (error) {
    console.error("Erro ao buscar listagem de posts no Sanity", error);
    return {
      posts: [],
      errorMessage: BLOG_LOAD_ERROR_MESSAGE,
    };
  }
}

export async function getBlogSlugs(): Promise<string[]> {
  if (!isSanityConfigured || !sanityClient) {
    return [];
  }

  try {
    const slugDocuments = await sanityClient.fetch<SanitySlugDocument[]>(BLOG_POST_SLUGS_QUERY);
    const slugs = slugDocuments.map((item) => item.slug).filter(Boolean) as string[];
    return slugs;
  } catch (error) {
    console.error("Erro ao buscar slugs de posts no Sanity", error);
    return [];
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
  if (!isSanityConfigured || !sanityClient) {
    return {
      post: undefined,
      relatedPosts: [],
      errorMessage: SANITY_CONFIG_ERROR_MESSAGE,
    };
  }

  try {
    const sanityPost = await sanityClient.fetch<SanityPostDocument | null>(BLOG_POST_BY_SLUG_QUERY, {
      slug,
    });

    if (!sanityPost) {
      return {
        post: undefined,
        relatedPosts: [],
        errorMessage: null,
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
    };
  } catch (error) {
    console.error(`Erro ao buscar post ${slug} no Sanity`, error);
    return {
      post: undefined,
      relatedPosts: [],
      errorMessage: BLOG_LOAD_ERROR_MESSAGE,
    };
  }
}
