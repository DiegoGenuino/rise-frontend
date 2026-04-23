const BLOG_CARD_PROJECTION = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "category": category->title,
  "categorySlug": category->slug.current,
  publishedAt,
  readingTimeMinutes,
  "coverImage": coverImage{
    alt,
    "url": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  },
  "seoDescription": coalesce(seo.description, excerpt),
  "seoImage": coalesce(seo.image.asset->url, coverImage.asset->url),
  heroGhostWord,
  featured,
  "author": author->{
    name,
    role,
    initials,
    bio,
    "avatar": avatar{
      alt,
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  },
  "tags": tags[]->title
`;

export const BLOG_POST_SLUGS_QUERY = `
  *[
    _type == "post" &&
    defined(slug.current) &&
    !(_id in path("drafts.**"))
  ]
  | order(publishedAt desc)
  {
    "slug": slug.current
  }
`;

export const BLOG_CATEGORY_FILTERS_QUERY = `
  *[
    _type == "category" &&
    defined(title) &&
    !(_id in path("drafts.**")) &&
    count(
      *[
        _type == "post" &&
        defined(slug.current) &&
        !(_id in path("drafts.**")) &&
        references(^._id)
      ]
    ) > 0
  ]
  | order(title asc)
  {
    title,
    "slug": slug.current
  }
`;

export const BLOG_POST_LIST_QUERY = `
  *[
    _type == "post" &&
    defined(slug.current) &&
    !(_id in path("drafts.**"))
  ]
  | order(featured desc, publishedAt desc)
  {
    ${BLOG_CARD_PROJECTION}
  }
`;

export const BLOG_POST_BY_SLUG_QUERY = `
  *[
    _type == "post" &&
    slug.current == $slug &&
    !(_id in path("drafts.**"))
  ][0]
  {
    ${BLOG_CARD_PROJECTION},
    "categoryRef": category._ref,
    "tagRefs": tags[]._ref,
    titleLines,
    summaryPoints,
    lead,
    "heroImage": coalesce(heroImage, coverImage){
      alt,
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    },
    seoTitle,
    canonicalUrl,
    noIndex,
    body[]{
      ...,
      _type == "block" => {
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            ...,
            "slug": reference->slug.current
          }
        }
      },
      _type == "ptCalloutBlock" => {
        ...,
        content[]{
          ...,
          markDefs[]{
            ...,
            _type == "internalLink" => {
              ...,
              "slug": reference->slug.current
            }
          }
        }
      },
      _type == "ptImageBlock" => {
        ...,
        image{
          alt,
          caption,
          layout,
          "url": asset->url,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height
        }
      }
    },
    sections[]{
      tocLabel,
      sectionAnchor,
      heading,
      headingHighlight,
      blocks[]{
        _type,
        content,
        label,
        quote,
        attribution,
        items[]{
          title,
          description
        }
      }
    },
    sidebarCta{
      label,
      text,
      buttonText,
      buttonUrl
    },
    footerStats[]{
      label,
      value,
      emphasis
    },
    "relatedPostsManual": relatedPostsManual[]->{
      ${BLOG_CARD_PROJECTION}
    }
  }
`;

export const BLOG_RELATED_POSTS_QUERY = `
  *[
    _type == "post" &&
    defined(slug.current) &&
    slug.current != $slug &&
    !(_id in path("drafts.**")) &&
    (
      category._ref == $categoryRef ||
      count((tags[]._ref)[@ in $tagRefs]) > 0
    )
  ]
  | order(featured desc, publishedAt desc)
  [0...$limit]
  {
    ${BLOG_CARD_PROJECTION}
  }
`;

export const BLOG_RECENT_POSTS_QUERY = `
  *[
    _type == "post" &&
    defined(slug.current) &&
    slug.current != $slug &&
    !(_id in path("drafts.**"))
  ]
  | order(featured desc, publishedAt desc)
  [0...$limit]
  {
    ${BLOG_CARD_PROJECTION}
  }
`;
