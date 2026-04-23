import {toHTML} from "@portabletext/to-html";

import type {
  SanityAuthor,
  SanityCalloutBlock,
  SanityFooterStat,
  SanityHeroImage,
  SanityParagraphBlock,
  SanityPortableText,
  SanityPostCardDocument,
  SanityPostDocument,
  SanityPullquoteBlock,
  SanitySection,
  SanitySectionBlock,
  SanitySidebarCta,
  SanitySubheadingBlock,
  SanityNumberedListBlock,
} from "./sanity.types";
import type {
  BlogAuthor,
  BlogBlock,
  BlogFooterStat,
  BlogPostHeroImage,
  BlogPost,
  BlogSection,
  BlogSidebarCta,
  NumberedListItem,
} from "../types/blog";

const DATE_MONTH_LABELS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const defaultAuthor: BlogAuthor = {
  name: "Equipe Rise Idiomas",
  role: "Time editorial",
  initials: "RI",
  bio: "Conteúdo produzido pelo time da Rise Idiomas.",
};

const defaultSidebarCta: BlogSidebarCta = {
  label: "Rise Idiomas",
  text: "Quer acelerar seu ingles com estrategia e consistencia?",
  buttonText: "Conhecer modalidades",
  buttonUrl: "/#modalities",
};

const defaultFooterStats: BlogFooterStat[] = [
  {
    label: "Rise Blog",
    valueHtml: "Conteudo <span class=\"a\">atualizado</span>",
  },
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function slugifyValue(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 96);
}

function formatPublishDate(isoDate?: string): { date: string; label: string } {
  if (!isoDate) {
    return {
      date: new Date().toISOString().slice(0, 10),
      label: "Sem data",
    };
  }

  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) {
    return {
      date: new Date().toISOString().slice(0, 10),
      label: "Sem data",
    };
  }

  const day = String(parsed.getUTCDate()).padStart(2, "0");
  const month = DATE_MONTH_LABELS[parsed.getUTCMonth()] || "";
  const year = String(parsed.getUTCFullYear());

  return {
    date: parsed.toISOString().slice(0, 10),
    label: `${day} ${month} ${year}`,
  };
}

function buildHeadingHtml(heading?: string, headingHighlight?: string): string {
  const safeHeading = escapeHtml(heading || "Secao");
  if (!heading || !headingHighlight) {
    return safeHeading;
  }

  const source = heading;
  const target = headingHighlight.trim();
  if (!target) {
    return safeHeading;
  }

  const startIndex = source.toLowerCase().indexOf(target.toLowerCase());
  if (startIndex < 0) {
    return safeHeading;
  }

  const before = escapeHtml(source.slice(0, startIndex));
  const match = escapeHtml(source.slice(startIndex, startIndex + target.length));
  const after = escapeHtml(source.slice(startIndex + target.length));

  return `${before}<span class=\"em\">${match}</span>${after}`;
}

function portableToHtml(portableText?: SanityPortableText): string {
  if (!portableText || portableText.length === 0) {
    return "";
  }

  return toHTML(portableText, {
    components: {
      marks: {
        link: ({children, value}) => {
          const href = typeof value?.href === "string" ? value.href : "#";
          const isExternal = /^https?:\/\//i.test(href);
          const rel = isExternal ? " rel=\"noopener noreferrer\" target=\"_blank\"" : "";
          return `<a href=\"${escapeHtml(href)}\"${rel}>${children}</a>`;
        },
      },
    },
  });
}

function mapAuthor(author?: SanityAuthor): BlogAuthor {
  if (!author?.name || !author.role || !author.initials || !author.bio) {
    return defaultAuthor;
  }

  return {
    name: author.name,
    role: author.role,
    initials: author.initials,
    bio: author.bio,
    avatar: mapHeroImage(author.avatar, `Foto de ${author.name}`),
  };
}

function mapSidebarCta(sidebarCta?: SanitySidebarCta): BlogSidebarCta {
  if (
    !sidebarCta?.label ||
    !sidebarCta.text ||
    !sidebarCta.buttonText ||
    !sidebarCta.buttonUrl
  ) {
    return defaultSidebarCta;
  }

  return {
    label: sidebarCta.label,
    text: sidebarCta.text,
    buttonText: sidebarCta.buttonText,
    buttonUrl: sidebarCta.buttonUrl,
  };
}

function mapFooterStat(stat: SanityFooterStat): BlogFooterStat {
  const label = stat.label || "Info";
  const value = stat.value ? escapeHtml(stat.value) : "";
  const emphasis = stat.emphasis ? ` <span class=\"a\">${escapeHtml(stat.emphasis)}</span>` : "";

  return {
    label,
    valueHtml: `${value}${emphasis}`.trim(),
  };
}

function mapHeroImage(
  heroImage?: SanityHeroImage,
  fallbackAlt = "Imagem do artigo",
): BlogPostHeroImage | undefined {
  if (!heroImage?.url) {
    return undefined;
  }

  return {
    alt: heroImage.alt || fallbackAlt,
    url: heroImage.url,
    width: heroImage.width,
    height: heroImage.height,
  };
}

function mapNumberedItems(items: SanityNumberedListBlock["items"]): NumberedListItem[] {
  if (!items || items.length === 0) {
    return [];
  }

  return items
    .filter((item) => Boolean(item?.title) && Boolean(item?.description))
    .map((item) => ({
      title: item.title as string,
      description: item.description as string,
    }));
}

function mapBlock(block: SanitySectionBlock): BlogBlock | null {
  switch (block._type) {
    case "paragraphBlock": {
      const paragraph = block as SanityParagraphBlock;
      const content = portableToHtml(paragraph.content);
      if (!content) {
        return null;
      }

      return {
        type: "paragraph",
        content,
      };
    }

    case "subheadingBlock": {
      const subheading = block as SanitySubheadingBlock;
      if (!subheading.content) {
        return null;
      }

      return {
        type: "subheading",
        content: subheading.content,
      };
    }

    case "calloutBlock": {
      const callout = block as SanityCalloutBlock;
      const content = portableToHtml(callout.content);
      if (!content) {
        return null;
      }

      return {
        type: "callout",
        label: callout.label || "Dica",
        content,
      };
    }

    case "pullquoteBlock": {
      const pullquote = block as SanityPullquoteBlock;
      if (!pullquote.quote) {
        return null;
      }

      return {
        type: "pullquote",
        quote: pullquote.quote,
        attribution: pullquote.attribution || "",
      };
    }

    case "numberedListBlock": {
      const numberedList = block as SanityNumberedListBlock;
      const items = mapNumberedItems(numberedList.items);
      if (items.length === 0) {
        return null;
      }

      return {
        type: "numbered-list",
        items,
      };
    }

    case "dividerBlock":
      return {type: "divider"};

    default:
      return null;
  }
}

function mapSection(section: SanitySection, index: number): BlogSection {
  const fallbackLabel = section.tocLabel || section.heading || `Secao ${index + 1}`;
  const sectionId = section.sectionAnchor?.current || slugifyValue(fallbackLabel) || `secao-${index + 1}`;
  const blocks = (section.blocks || []).map(mapBlock).filter(Boolean) as BlogBlock[];

  return {
    id: sectionId,
    tocLabel: section.tocLabel || fallbackLabel,
    headingHtml: buildHeadingHtml(section.heading, section.headingHighlight),
    blocks,
  };
}

function mapBasePostData(post: SanityPostCardDocument): Omit<BlogPost, "lead" | "sections" | "sidebarCta" | "footerStats"> {
  const publishDate = formatPublishDate(post.publishedAt);
  const category = post.category || "Sem categoria";
  const excerpt = post.excerpt || "Novo conteudo em breve.";

  return {
    slug: post.slug || "sem-slug",
    title: post.title || "Post sem titulo",
    titleLines: undefined,
    featured: Boolean(post.featured),
    excerpt,
    category,
    publishDate: publishDate.date,
    publishDateLabel: publishDate.label,
    readingTimeMinutes: post.readingTimeMinutes || 1,
    summaryPoints: undefined,
    seoDescription: post.seoDescription || excerpt,
    seoTitle: undefined,
    seoImage: post.seoImage,
    canonicalUrl: undefined,
    noIndex: undefined,
    coverImage: mapHeroImage(post.coverImage, `Capa do post ${post.title || "artigo"}`),
    heroImage: mapHeroImage(post.heroImage),
    heroGhostWord: post.heroGhostWord,
    portableBody: [],
    author: mapAuthor(post.author),
    tags: (post.tags || []).filter(Boolean),
  };
}

export function mapSanityPostCard(post: SanityPostCardDocument): BlogPost {
  const baseData = mapBasePostData(post);

  return {
    ...baseData,
    lead: post.excerpt || "",
    sections: [],
    sidebarCta: defaultSidebarCta,
    footerStats: defaultFooterStats,
  };
}

export function mapSanityPost(post: SanityPostDocument): BlogPost {
  const baseData = mapBasePostData(post);
  const sections = (post.sections || []).map(mapSection).filter((section) => section.blocks.length > 0);

  return {
    ...baseData,
    titleLines: post.titleLines && post.titleLines.length > 0 ? post.titleLines : undefined,
    lead: post.lead || baseData.excerpt,
    portableBody: post.body && post.body.length > 0 ? post.body : [],
    summaryPoints: post.summaryPoints && post.summaryPoints.length > 0 ? post.summaryPoints : undefined,
    seoTitle: post.seoTitle || undefined,
    canonicalUrl: post.canonicalUrl || undefined,
    noIndex: typeof post.noIndex === "boolean" ? post.noIndex : undefined,
    sections,
    sidebarCta: mapSidebarCta(post.sidebarCta),
    footerStats:
      post.footerStats && post.footerStats.length > 0
        ? post.footerStats.map(mapFooterStat)
        : defaultFooterStats,
  };
}

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((firstPost, secondPost) => {
    return (
      new Date(secondPost.publishDate).getTime() -
      new Date(firstPost.publishDate).getTime()
    );
  });
}
