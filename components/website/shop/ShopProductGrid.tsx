"use client";

import { useState } from "react";
import { PRODUCTS } from "@/data/products"; // Data import kiya
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import styles from "./ShopProductGrid.module.css";

export default function ShopProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  // Total pages calculate karein
  const totalPages = Math.ceil(PRODUCTS.length / itemsPerPage);
  
  // Current page ke products nikaalein
  const currentProducts = PRODUCTS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </>
  );
}

