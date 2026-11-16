"use client";

import { useState } from "react";
import ProductCard, { Product } from "./ProductCard";
import Pagination from "./Pagination";
import styles from "./ShopProductGrid.module.css";

// Total 20 Products
const PRODUCTS: Product[] = [
  // Page 1 (1 se 16)
  { id: 1, name: "Chicken & Sweet Potato Dog Food", price: "$45.00", oldPrice: "$50.00", image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80" },
  { id: 2, name: "Durable Rope Tug Toy", price: "$12.00", image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80" },
  { id: 3, name: "Organic Cat Treats", price: "$8.50", image: "https://images.unsplash.com/photo-1623366302587-b25ee0f5c4e3?w=600&q=80" },
  { id: 4, name: "Leather Dog Collar", price: "$20.00", image: "https://images.unsplash.com/photo-1558929996-da64ba858215?w=600&q=80" },
  { id: 5, name: "Grooming Brush", price: "$15.00", image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80" },
  { id: 6, name: "Cozy Pet Bed", price: "$65.00", image: "https://images.unsplash.com/photo-1541883053-4c4c5e3b1c4d?w=600&q=80" },
  { id: 7, name: "Interactive Cat Wand", price: "$10.00", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80" },
  { id: 8, name: "Pet Shampoo", price: "$18.00", image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80" },
  { id: 9, name: "Premium Dry Cat Food", price: "$35.00", image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80" },
  { id: 10, name: "Squeaky Plush Toy", price: "$9.00", image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80" },
  { id: 11, name: "Dental Chews for Dogs", price: "$14.50", image: "https://images.unsplash.com/photo-1623366302587-b25ee0f5c4e3?w=600&q=80" },
  { id: 12, name: "Adjustable Harness", price: "$25.00", image: "https://images.unsplash.com/photo-1558929996-da64ba858215?w=600&q=80" },
  { id: 13, name: "Flea & Tick Shampoo", price: "$22.00", image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80" },
  { id: 14, name: "Orthopedic Dog Bed", price: "$85.00", image: "https://images.unsplash.com/photo-1541883053-4c4c5e3b1c4d?w=600&q=80" },
  { id: 15, name: "Catnip Toy Set", price: "$12.00", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80" },
  { id: 16, name: "Pet Conditioner", price: "$16.00", image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80" },
  
  // Page 2 (17 se 20)
  { id: 17, name: "Grain Free Dog Food", price: "$55.00", image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80" },
  { id: 18, name: "Rubber Chew Ball", price: "$7.50", image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80" },
  { id: 19, name: "Training Treats Pack", price: "$11.00", image: "https://images.unsplash.com/photo-1623366302587-b25ee0f5c4e3?w=600&q=80" },
  { id: 20, name: "Travel Pet Carrier", price: "$45.00", image: "https://images.unsplash.com/photo-1558929996-da64ba858215?w=600&q=80" },
];

export default function ShopProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const totalPages = Math.ceil(PRODUCTS.length / itemsPerPage);
  const currentProducts = PRODUCTS.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className={styles.grid}>
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  );
}