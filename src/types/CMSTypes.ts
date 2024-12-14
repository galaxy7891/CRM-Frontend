export interface articleTypes {
  id?: string;
  title: string;
  status: string;
  description?: string | null;
  post_date?: string;
  image_url?: string | null;
  image_public_id?: string | null;
  updated_at?: string;
}

export interface CMSState {
  article: articleTypes | null;
  articles: articleTypes[];
}
