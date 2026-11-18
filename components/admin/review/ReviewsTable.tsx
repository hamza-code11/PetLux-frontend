"use client";

import { useState, useMemo } from "react";
import { Review } from "@/types/review";
import Pagination from "@/components/commen/Pagination";
import styles from "./ReviewsTable.module.css";

interface Props {
  initialData: Review[];
}

export default function ReviewsTable({ initialData }: Props) {
  const [data, setData] = useState<Review[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  // Filter Logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = 
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRating = ratingFilter === "all" || item.rating === Number(ratingFilter);

      return matchesSearch && matchesRating;
    });
  }, [data, searchQuery, ratingFilter]);

  // Pagination Logic on Filtered Data
  const currentItems = useMemo(() => {
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    return filteredData.slice(firstItemIndex, lastItemIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleItemsPerPageChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  };

  const handleFilterChange = (setter: any, value: string) => {
    setter(value);
    setCurrentPage(1); // Reset page on filter change
  };

  const renderStars = (rating: number) => {
    return (
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={star <= rating ? styles.starFilled : styles.starEmpty}
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.tableLayout}>
      
      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by product, user, or email..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
          />
        </div>

        <div className={styles.filtersRight}>
          <select 
            className={styles.filterSelect}
            value={ratingFilter}
            onChange={(e) => handleFilterChange(setRatingFilter, e.target.value)}
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableScrollArea}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>User Details</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Date</th>
                <th className={styles.actionsHead}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.emptyState}>
                    No reviews found matching your filters.
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id}>
                    <td className={styles.productName}>{item.productName}</td>
                    <td>
                      <div className={styles.userInfo}>
                        <span className={styles.userName}>{item.userName}</span>
                        <span className={styles.userEmail}>{item.userEmail}</span>
                      </div>
                    </td>
                    <td>{renderStars(item.rating)}</td>
                    <td>
                      <p className={styles.comment}>{item.comment}</p>
                    </td>
                    <td className={styles.date}>{item.date}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className={`${styles.iconBtn} ${styles.deleteBtn}`}
                          title="Delete Review"
                        >
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.paginationWrapper}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
}
