export interface ProductImage {
  id: string;
  file: File | null;
  previewUrl: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  slug: string;
  regularPrice: string;
  salePrice: string;
  quantity: string;
  description: string;
  images: ProductImage[];
}

export interface Product {
  id?: number;
  name: string;
  slug: string;
  status: "draft" | "publish";
  quantity?: string; // <-- YAHAN OPTIONAL (?) LAGA DIYA
  shortDescription: string;
  longDescription: string;
  petType: string;
  category: string;
  subcategory: string;
  hasVariants: boolean;
  regularPrice?: string;
  salePrice?: string;
  images: ProductImage[];
  variants?: ProductVariant[];
}