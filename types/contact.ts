export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "read" | "unread";
  created_at: string;
  date?: string; // display-friendly (filled by mapper below)
}

// Laravel paginator (reuse existing if you have it globally)
export interface PaginatedContacts {
  current_page: number;
  data: ContactMessage[];
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}
