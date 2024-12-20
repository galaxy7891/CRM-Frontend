export interface articleTypes {
  id?: string;
  slug?: string;
  title: string;
  status: string;
  description?: string;
  post_date?: string;
  photo?: string | null;
  image_url?: string | null;
  image_public_id?: string | null;
  updated_at?: string;
}

export interface CMSState {
  publicArticle: articleTypes | null;
  publicArticles: articleTypes[];
  article: articleTypes | null;
  articles: articleTypes[];
}
