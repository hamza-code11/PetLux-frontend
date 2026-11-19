// types/petType.ts

export interface PetType {
  id: number;
  name: string;
  slug: string;
  image_path: string;
  image_url: string; // Backend Model $appends se aayega
  created_at: string;
}

export interface CreatePetTypePayload {
  name: string;
  slug: string;
  image: File;
}

export interface UpdatePetTypePayload {
  name: string;
  slug: string;
  image?: File; // Optional kyunki update mein image zaroori nahi
}

// Laravel Pagination Response structure
export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: { url: string | null; label: string; active: boolean }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
