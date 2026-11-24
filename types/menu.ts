// types/menu.ts (Update karein)

export interface MenuSubcategory {
  id: number;
  name: string;
  slug: string;
}

export interface MenuCategory {
  id: number;
  name: string;
  slug: string;
  children: MenuSubcategory[];
}

export interface MenuPetType {
  id: number;
  name: string;
  slug: string;
  categories: MenuCategory[];
}
