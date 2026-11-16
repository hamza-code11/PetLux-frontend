import type { HeroPet, HeroTrustItem } from "@/types/hero";

export const heroPets: HeroPet[] = [
  {
    id: "dog",
    label: "Dog",
    href: "/shop/dog",
    description:
      "Nutritious food, durable toys and everyday essentials for happy tails and healthy coats.",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=1200&q=80",
  },
  {
    id: "cat",
    label: "Cat",
    href: "/shop/cat",
    description:
      "From gourmet wet food to cosy scratchers, everything your cat needs to purr about.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&q=80",
  },
  {
    id: "small-animal",
    label: "Small Animal",
    href: "/shop/small-animal",
    description:
      "Fresh hay, balanced food and roomy habitats for rabbits, hamsters and guinea pigs.",
    image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=1200&q=80",
  },
];

export const heroTrust: HeroTrustItem[] = [
  { title: "Free delivery", text: "On orders over Rs. 5,000" },
  { title: "Trusted brands", text: "Vet recommended food" },
  { title: "Easy returns", text: "Within 7 days" },
];