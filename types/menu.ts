export interface MenuSubCategory {
  id: number;
  name: string;
  slug: string;
}

export interface MenuCategory {
  id: number;
  name: string;
  slug: string;
  children: MenuSubCategory[];
}

export interface MenuPetType {
  id: number;
  name: string;
  slug: string;
  categories: MenuCategory[];
}