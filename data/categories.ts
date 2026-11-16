export type Category = {
  id: string;
  label: string;
  description: string;
  image: string;
  href: string;
};

export const categories: Category[] = [
  {
    id: "dog",
    label: "Dog",
    description: "Food, toys and grooming",
    image: "/images/categories/dog.jpg",
    href: "/shop?category=dog",
  },
  {
    id: "cat",
    label: "Cat",
    description: "Treats, litter and comfort",
    image: "/images/categories/cat.jpg",
    href: "/shop?category=cat",
  },
  {
    id: "small-animal",
    label: "Small Animal",
    description: "Cages, food and care",
    image: "/images/categories/small-animal.jpg",
    href: "/shop?category=small-animal",
  },
  {
    id: "accessories",
    label: "Accessories",
    description: "Collars, beds and more",
    image: "/images/categories/accessories.jpg",
    href: "/shop?category=accessories",
  },
];
