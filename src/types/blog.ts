export interface BlogAuthor {
  name: string;
  role: string;
  initials: string;
  bio: string;
}

export interface BlogSidebarCta {
  label: string;
  text: string;
  buttonText: string;
  buttonUrl: string;
}

export interface BlogFooterStat {
  label: string;
  valueHtml: string;
}

export interface NumberedListItem {
  title: string;
  description: string;
}

export type BlogBlock =
  | {
      type: "paragraph";
      content: string;
    }
  | {
      type: "subheading";
      content: string;
    }
  | {
      type: "callout";
      label: string;
      content: string;
    }
  | {
      type: "pullquote";
      quote: string;
      attribution: string;
    }
  | {
      type: "numbered-list";
      items: NumberedListItem[];
    }
  | {
      type: "divider";
    };

export interface BlogSection {
  id: string;
  tocLabel: string;
  headingHtml: string;
  blocks: BlogBlock[];
}

export interface BlogPost {
  slug: string;
  title: string;
  titleLines?: string[];
  excerpt: string;
  category: string;
  publishDate: string;
  publishDateLabel: string;
  readingTimeMinutes: number;
  seoDescription?: string;
  seoImage?: string;
  heroGhostWord?: string;
  lead: string;
  author: BlogAuthor;
  sections: BlogSection[];
  tags: string[];
  sidebarCta: BlogSidebarCta;
  footerStats: BlogFooterStat[];
}
