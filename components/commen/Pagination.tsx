"use client";

import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (limit: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  // Showing Range Calculate karein
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Sirf 3 Page Numbers show karne ka logic
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);

  // Adjust agar shuruat mein hain (e.g. 1, 2, 3)
  if (currentPage === 1) {
    endPage = Math.min(totalPages, 3);
  }
  // Adjust agar aakhir mein hain (e.g. 3, 4, 5)
  if (currentPage === totalPages) {
    startPage = Math.max(1, totalPages - 2);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    if (i > 0) pageNumbers.push(i);
  }

  return (
    <div className={styles.paginationWrapper}>
      
      {/* Left Side: Info & Per Page */}
      <div className={styles.leftSide}>
        <span className={styles.infoText}>
          Showing <strong>{totalItems === 0 ? 0 : startItem}</strong> to <strong>{endItem}</strong> of <strong>{totalItems}</strong> entries
        </span>
        
        <div className={styles.perPageWrapper}>
          <label>Rows per page:</label>
          <select 
            value={itemsPerPage} 
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className={styles.select}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Right Side: Pagination Buttons */}
      <div className={styles.rightSide}>
        
        {/* First Page (<<) */}
        <button 
          onClick={() => onPageChange(1)} 
          disabled={currentPage === 1}
          className={styles.pageBtn}
          title="First Page"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        {/* Previous Page (<) */}
        <button 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className={styles.pageBtn}
          title="Previous Page"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page Numbers (Max 3) */}
        <div className={styles.pageNumbers}>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={`${styles.pageBtn} ${currentPage === number ? styles.activePage : ""}`}
            >
              {number}
            </button>
          ))}
        </div>

        {/* Next Page (>) */}
        <button 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages || totalPages === 0}
          className={styles.pageBtn}
          title="Next Page"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Last Page (>>) */}
        <button 
          onClick={() => onPageChange(totalPages)} 
          disabled={currentPage === totalPages || totalPages === 0}
          className={styles.pageBtn}
          title="Last Page"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>

      </div>
    </div>
  );
}
