// import type {
//   MenuCategory,
//   MenuPetType,
//   MenuSubCategory,
// } from "@/types/menu";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// /* ---------- Helpers (id + slug auto generate hote hain) ---------- */

// let uid = 0;

// const slugify = (value: string) =>
//   value
//     .toLowerCase()
//     .replace(/&/g, "")
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-+|-+$/g, "");

// const sub = (name: string): MenuSubCategory => ({
//   id: ++uid,
//   name,
//   slug: slugify(name),
// });

// const cat = (name: string, children: string[] = []): MenuCategory => ({
//   id: ++uid,
//   name,
//   slug: slugify(name),
//   children: children.map(sub),
// });

// const pet = (name: string, categories: MenuCategory[]): MenuPetType => ({
//   id: ++uid,
//   name,
//   slug: slugify(name),
//   categories,
// });

// /* ---------- Fallback / demo data ---------- */

// export const menuData: MenuPetType[] = [
//   pet("Dog", [
//     cat("Dog Food", [
//       "Dry Food",
//       "Wet Food",
//       "Frozen",
//       "Freeze Dried",
//       "Puppy Food",
//       "Senior Food",
//       "Grain Free",
//       "Veterinary Diets",
//     ]),
//     cat("Treats", [
//       "Biscuits",
//       "Dental Chews",
//       "Training Treats",
//       "Natural Chews",
//       "Bones",
//       "Jerky",
//     ]),
//     cat("Accessories", [
//       "Beds",
//       "Bowls & Feeding",
//       "Collars",
//       "Leashes",
//       "Harnesses",
//       "Clothing",
//       "Travel & Carriers",
//     ]),
//     cat("Toys", [
//       "Chew Toys",
//       "Plush Toys",
//       "Balls",
//       "Rope Toys",
//       "Interactive Toys",
//     ]),
//     cat("Grooming & Health", [
//       "Shampoo & Conditioner",
//       "Brushes & Combs",
//       "Flea & Tick",
//       "Supplements",
//       "Dental Care",
//       "Ear & Eye Care",
//     ]),
//     cat("Supplies", [
//       "Waste Bags",
//       "Crates & Gates",
//       "Training Pads",
//       "Cleaning & Odour",
//       "Feeding Mats",
//     ]),
//   ]),

//   pet("Cat", [
//     cat("Cat Food", [
//       "Dry Food",
//       "Wet Food",
//       "Kitten Food",
//       "Senior Food",
//       "Grain Free",
//       "Veterinary Diets",
//       "Raw & Freeze Dried",
//     ]),
//     cat("Treats", [
//       "Crunchy Treats",
//       "Creamy Treats",
//       "Dental Treats",
//       "Catnip & Grass",
//     ]),
//     cat("Litter & Hygiene", [
//       "Clumping Litter",
//       "Crystal Litter",
//       "Litter Trays",
//       "Litter Scoops",
//       "Odour Control",
//     ]),
//     cat("Accessories", [
//       "Beds & Blankets",
//       "Bowls & Fountains",
//       "Collars & Tags",
//       "Harnesses & Leashes",
//       "Carriers",
//       "Cat Trees & Scratchers",
//     ]),
//     cat("Toys", [
//       "Wand Toys",
//       "Balls & Mice",
//       "Interactive Toys",
//       "Catnip Toys",
//       "Tunnels",
//     ]),
//     cat("Grooming & Health", [
//       "Brushes & Combs",
//       "Shampoo",
//       "Flea & Tick",
//       "Supplements",
//       "Dental Care",
//     ]),
//   ]),

//   pet("Small Animal", [
//     cat("Food", [
//       "Rabbit Food",
//       "Guinea Pig Food",
//       "Hamster & Gerbil Food",
//       "Rat & Mouse Food",
//       "Chinchilla Food",
//       "Treats & Chews",
//     ]),
//     cat("Hay & Bedding", [
//       "Timothy Hay",
//       "Meadow Hay",
//       "Paper Bedding",
//       "Wood Shavings",
//       "Litter",
//     ]),
//     cat("Cages & Habitats", [
//       "Rabbit Hutches",
//       "Hamster Cages",
//       "Guinea Pig Cages",
//       "Playpens & Runs",
//       "Travel Carriers",
//     ]),
//     cat("Accessories", [
//       "Water Bottles",
//       "Food Bowls",
//       "Hideouts & Houses",
//       "Exercise Wheels",
//       "Harnesses & Leads",
//     ]),
//     cat("Toys & Enrichment", [
//       "Chew Toys",
//       "Tunnels & Tubes",
//       "Foraging Toys",
//       "Swings & Ladders",
//     ]),
//     cat("Health & Care", [
//       "Grooming",
//       "Supplements",
//       "Cleaning Supplies",
//       "Parasite Control",
//     ]),
//   ]),
// ];

// /* ---------- Data fetching ---------- */

// export async function getMenu(): Promise<MenuPetType[]> {
//   if (!API_URL) return menuData;

//   try {
//     const res = await fetch(`${API_URL}/menu`, {
//       next: { revalidate: 300 }, // 5 min cache
//     });

//     if (!res.ok) throw new Error("Menu fetch failed");

//     const json = await res.json();
//     return json.data as MenuPetType[];
//   } catch {
//     return menuData;
//   }
// }