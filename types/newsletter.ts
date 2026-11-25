export interface NewsletterSubscriber {
  id: number;
  email: string;
  created_at: string;
  date?: string; // display-friendly (filled by mapper)
}

export interface SubscribePayload {
  email: string;
}

export interface PaginatedNewsletters {
  current_page: number;
  data: NewsletterSubscriber[];
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

