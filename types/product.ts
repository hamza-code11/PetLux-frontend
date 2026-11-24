// types/product.ts

// Nested Image Type (Product aur Variant dono ke liye)
export interface ProductImage {
  id: number;
  image_path: string;
  image_url: string;
}

// Variant Type
export interface ProductVariant {
  id: number;
  product_id: number;
  name: string;
  slug: string;
  regular_price: string;
  sale_price: string | null;
  quantity: number;
  description: string | null;
  images: ProductImage[];
  created_at: string;
  updated_at: string;
}

// Product Type
export interface Product {
  id: number;
  name: string;
  slug: string;
  status: "draft" | "publish";
  pet_type_id: number | null;
  category_id: number | null;
  subcategory_id: number | null;
  short_description: string | null;
  long_description: string | null;
  has_variants: boolean;
  regular_price: string | null;
  sale_price: string | null;
  quantity: number;
  created_at: string;
  updated_at: string;
  
  // Relationships
  pet_type?: { id: number; name: string };
  category?: { id: number; name: string };
  subcategory?: { id: number; name: string };
  
  // Nested Data
  images: ProductImage[];
  variants?: ProductVariant[];
}

// Paginated Response (Same as before)
export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
