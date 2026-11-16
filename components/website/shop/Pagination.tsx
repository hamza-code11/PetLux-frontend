"use client";
import styles from "./Pagination.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }: any) {
  if (totalPages <= 1) return null;
  return (
    <div className={styles.pagination}>
      <button className={styles.navBtn} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
      {[...Array(totalPages)].map((_, i) => (
        <button key={i} className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.active : ""}`} onClick={() => onPageChange(i + 1)}>
          {i + 1}
        </button>
      ))}
      <button className={styles.navBtn} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
}
