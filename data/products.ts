// export interface ProductVariant {
//   id: string;
//   title: string; 
//   name: string;
//   price: string;
//   oldPrice?: string;
//   images: string[];
// }

// export interface Product {
//   id: number;
//   slug: string;
//   name: string;
//   category: string;
//   rating: number;
//   reviewsCount: number;
//   description: string;
//   features: string[];
//   variants?: ProductVariant[];
//   images?: string[];
//   displayPrice: string;
//   displayOldPrice?: string;
//   displayImage: string;
// }

// export const PRODUCTS: Product[] = [
//   {
//     id: 1,
//     slug: "chicken-sweet-potato-dog-food",
//     name: "Chicken & Sweet Potato Dog Food",
//     category: "Dog Food",
//     rating: 4.8,
//     reviewsCount: 124,
//     description: "Give your dog the nutrition they deserve with our premium Chicken & Sweet Potato recipe.",
//     features: ["100% real chicken", "Grain-free", "Rich in Omega-3"],
//     variants: [
//       { 
//         id: "18oz", title: "Size", name: "18 oz", price: "$7.99", 
//         images: [
//           "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=80",
//           "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80",
//           "https://images.unsplash.com/photo-1541883053-4c4c5e3b1c4d?w=800&q=80"
//         ]
//       },
//       { 
//         id: "48oz", title: "Size", name: "48 oz", price: "$14.99", 
//         images: [
//           "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=80&v=2", // Thodi alag dikhne ke liye (ya apni images dalein)
//           "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&q=80",
//           "https://images.unsplash.com/photo-1623366302587-b25ee0f5c4e3?w=800&q=80"
//         ]
//       },
//       { 
//         id: "9lb", title: "Size", name: "9 lb", price: "$31.99", 
//         images: [
//           "https://images.unsplash.com/photo-1541883053-4c4c5e3b1c4d?w=800&q=80",
//           "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80&v=2",
//           "https://images.unsplash.com/photo-1558929996-da64ba858215?w=800&q=80"
//         ]
//       },
//     ],
//     displayPrice: "$7.99",
//     displayImage: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80",
//   },
//   {
//     id: 2,
//     slug: "premium-wet-cat-food",
//     name: "Premium Wet Cat Food",
//     category: "Cat Food",
//     rating: 4.9,
//     reviewsCount: 85,
//     description: "Delicious wet food for your cats, made with natural ingredients.",
//     features: ["Real meat", "No by-products", "Hydrating"],
//     variants: [
//       { 
//         id: "chicken", title: "Flavour", name: "Chicken", price: "$2.50", 
//         images: [
//           "https://images.unsplash.com/photo-1623366302587-b25ee0f5c4e3?w=800&q=80",
//           "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
//           "https://images.unsplash.com/photo-1541883053-4c4c5e3b1c4d?w=800&q=80"
//         ]
//       },
//       { 
//         id: "tuna", title: "Flavour", name: "Tuna", price: "$2.80", 
//         images: [
//           "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80&v=2",
//           "https://images.unsplash.com/photo-1623366302587-b25ee0f5c4e3?w=800&q=80&v=2",
//           "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80"
//         ]
//       },
//     ],
//     displayPrice: "$2.50",
//     displayImage: "https://images.unsplash.com/photo-1623366302587-b25ee0f5c4e3?w=600&q=80",
//   },
//   // Baaki 18 products (bina variant ke) same rahenge...
//   { id: 3, slug: "durable-rope-tug-toy", name: "Durable Rope Tug Toy", category: "Dog Toys", rating: 4.5, reviewsCount: 40, description: "A strong rope toy.", features: ["Heavy duty"], images: ["https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80"], displayPrice: "$12.00", displayImage: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80" },
//   { id: 4, slug: "organic-cat-treats", name: "Organic Cat Treats", category: "Cat Treats", rating: 4.6, reviewsCount: 30, description: "Organic treats.", features: ["Organic"], images: ["https://images.unsplash.com/photo-1623366302587-b25ee0f5c4e3?w=600&q=80"], displayPrice: "$8.50", displayImage: "https://images.unsplash.com/photo-1623366302587-b25ee0f5c4e3?w=600&q=80" },
//   { id: 5, slug: "leather-dog-collar", name: "Leather Dog Collar", category: "Accessories", rating: 4.7, reviewsCount: 60, description: "Leather collar.", features: ["Leather"], images: ["https://images.unsplash.com/photo-1558929996-da64ba858215?w=600&q=80"], displayPrice: "$20.00", displayImage: "https://images.unsplash.com/photo-1558929996-da64ba858215?w=600&q=80" },
//   { id: 6, slug: "grooming-brush", name: "Grooming Brush", category: "Grooming", rating: 4.4, reviewsCount: 25, description: "Brush for pets.", features: ["Soft bristles"], images: ["https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80"], displayPrice: "$15.00", displayImage: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80" },
//   { id: 7, slug: "cozy-pet-bed", name: "Cozy Pet Bed", category: "Supplies", rating: 4.8, reviewsCount: 110, description: "Soft bed.", features: ["Washable"], images: ["https://images.unsplash.com/photo-1541883053-4c4c5e3b1c4d?w=600&q=80"], displayPrice: "$65.00", displayImage: "https://images.unsplash.com/photo-1541883053-4c4c5e3b1c4d?w=600&q=80" },
//   { id: 8, slug: "interactive-cat-wand", name: "Interactive Cat Wand", category: "Toys", rating: 4.5, reviewsCount: 50, description: "Cat wand.", features: ["Interactive"], images: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80"], displayPrice: "$10.00", displayImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80" },
//   { id: 9, slug: "pet-shampoo", name: "Pet Shampoo", category: "Grooming", rating: 4.3, reviewsCount: 45, description: "Shampoo.", features: ["Gentle"], images: ["https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80"], displayPrice: "$18.00", displayImage: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80" },
//   { id: 10, slug: "premium-dry-cat-food", name: "Premium Dry Cat Food", category: "Cat Food", rating: 4.7, reviewsCount: 90, description: "Dry food.", features: ["Nutritious"], images: ["https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80"], displayPrice: "$35.00", displayImage: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80" },
//   { id: 11, slug: "squeaky-plush-toy", name: "Squeaky Plush Toy", category: "Toys", rating: 4.6, reviewsCount: 70, description: "Plush toy.", features: ["Squeaky"], images: ["https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80"], displayPrice: "$9.00", displayImage: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80" },
//   { id: 12, slug: "dental-chews", name: "Dental Chews for Dogs", category: "Treats", rating: 4.8, reviewsCount: 130, description: "Dental chews.", features: ["Dental health"], images: ["https://images.unsplash.com/photo-1623366302587-b25ee0f5c4e3?w=600&q=80"], displayPrice: "$14.50", displayImage: "https://images.unsplash.com/photo-1623366302587-b25ee0f5c4e3?w=600&q=80" },
//   { id: 13, slug: "adjustable-harness", name: "Adjustable Harness", category: "Accessories", rating: 4.5, reviewsCount: 55, description: "Harness.", features: ["Adjustable"], images: ["https://images.unsplash.com/photo-1558929996-da64ba858215?w=600&q=80"], displayPrice: "$25.00", displayImage: "https://images.unsplash.com/photo-1558929996-da64ba858215?w=600&q=80" },
//   { id: 14, slug: "flea-tick-shampoo", name: "Flea & Tick Shampoo", category: "Grooming", rating: 4.4, reviewsCount: 40, description: "Flea shampoo.", features: ["Medicated"], images: ["https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80"], displayPrice: "$22.00", displayImage: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80" },
//   { id: 15, slug: "orthopedic-dog-bed", name: "Orthopedic Dog Bed", category: "Supplies", rating: 4.9, reviewsCount: 200, description: "Orthopedic bed.", features: ["Memory foam"], images: ["https://images.unsplash.com/photo-1541883053-4c4c5e3b1c4d?w=600&q=80"], displayPrice: "$85.00", displayImage: "https://images.unsplash.com/photo-1541883053-4c4c5e3b1c4d?w=600&q=80" },
//   { id: 16, slug: "catnip-toy-set", name: "Catnip Toy Set", category: "Toys", rating: 4.7, reviewsCount: 80, description: "Catnip toys.", features: ["Catnip"], images: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80"], displayPrice: "$12.00", displayImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80" },
//   { id: 17, slug: "pet-conditioner", name: "Pet Conditioner", category: "Grooming", rating: 4.3, reviewsCount: 35, description: "Conditioner.", features: ["Smooth coat"], images: ["https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80"], displayPrice: "$16.00", displayImage: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80" },
//   { id: 18, slug: "grain-free-dog-food", name: "Grain Free Dog Food", category: "Dog Food", rating: 4.8, reviewsCount: 150, description: "Grain free food.", features: ["No grains"], images: ["https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80"], displayPrice: "$55.00", displayImage: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80" },
//   { id: 19, slug: "rubber-chew-ball", name: "Rubber Chew Ball", category: "Toys", rating: 4.5, reviewsCount: 60, description: "Chew ball.", features: ["Rubber"], images: ["https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80"], displayPrice: "$7.50", displayImage: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80" },
//   { id: 20, slug: "training-treats-pack", name: "Training Treats Pack", category: "Treats", rating: 4.7, reviewsCount: 95, description: "Training treats.", features: ["Small bites"], images: ["https://images.unsplash.com/photo-1623366302587-b25ee0f5c4e3?w=600&q=80"], displayPrice: "$11.00", displayImage: "https://images.unsplash.com/photo-1623366302587-b25ee0f5c4e3?w=600&q=80" },
// ];