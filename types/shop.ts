// types/shop.ts


export interface ShopRelationRef {
  id: number;
  name: string;
  slug: string;
}


export interface ShopProductImage {
  id: number;
  image_path: string;
  image_url: string;
}

export interface ShopProductVariant {
  id: number;
  name: string;
  regular_price: string;
  sale_price: string | null;
  quantity: number;
  images: ShopProductImage[];
}

export interface ShopProduct {
  id: number;
  name: string;
  slug: string;
  status: string;
  has_variants: boolean;
  regular_price: string | null;
  sale_price: string | null;
  quantity: number;
  short_description: string | null;
  long_description: string | null;
  petType: ShopRelationRef;
  category: ShopRelationRef;
  subcategory: ShopRelationRef | null; 
  // pet_type: { id: number; name: string };
  // category: { id: number; name: string };
  // subcategory: { id: number; name: string } | null;
  images: ShopProductImage[];
  variants: ShopProductVariant[];
}





export interface ShopFilterOption {
  id: number;
  name: string;
  slug: string;
}

export interface ShopCategoryFilter extends ShopFilterOption {
  children: ShopFilterOption[];
}

export interface ShopFiltersData {
  pet_types: ShopFilterOption[];
  categories: ShopCategoryFilter[];
  subcategories: ShopFilterOption[];
}





export interface ProductReview {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ReviewsResponse {
  data: ProductReview[];
  total: number;
  average_rating: number;
}


