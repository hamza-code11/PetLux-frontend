"use client";

import { useState, useMemo } from "react";
import { Review, ReviewStatus } from "@/types/review";
import Pagination from "@/components/commen/Pagination";
import {
  useApproveReview,
  useRejectReview,
  useDeleteReview,
} from "@/hooks/useAdminReviews";
import { useToast } from "@/components/ui/Toast/ToastContext";
import styles from "./ReviewsTable.module.css";

interface Props {
  initialData: Review[];
}

export default function ReviewsTable({ initialData }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { toast } = useToast();
  const { mutate: approve, isPending: isApproving } = useApproveReview();
  const { mutate: reject, isPending: isRejecting } = useRejectReview();
  const { mutate: remove, isPending: isDeleting } = useDeleteReview();

  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      const matchesSearch =
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userEmail.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRating =
        ratingFilter === "all" || item.rating === Number(ratingFilter);

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesRating && matchesStatus;
    });
  }, [initialData, searchQuery, ratingFilter, statusFilter]);

  const currentItems = useMemo(() => {
    const last = currentPage * itemsPerPage;
    return filteredData.slice(last - itemsPerPage, last);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleApprove = (id: number) => {
    approve(id, {
      onSuccess: () => toast.success("Review approved."),
      onError: () => toast.error("Failed to approve review."),
    });
  };

  const handleReject = (id: number) => {
    if (!confirm("Reject this review? It will be hidden from the storefront.")) return;
    reject(id, {
      onSuccess: () => toast.success("Review rejected."),
      onError: () => toast.error("Failed to reject review."),
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this review permanently?")) return;
    remove(id, {
      onSuccess: () => {
        toast.success("Review deleted.");
        if (currentItems.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      },
      onError: () => toast.error("Failed to delete review."),
    });
  };

  const handleItemsPerPageChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  };

  const handleFilterChange = (setter: any, value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  const renderStars = (rating: number) => (
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

  const renderStatus = (status: ReviewStatus) => {
    const map: Record<ReviewStatus, string> = {
      pending: styles.statusPending,
      approved: styles.statusApproved,
      rejected: styles.statusRejected,
    };
    return (
      <span className={`${styles.statusBadge} ${map[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className={styles.tableLayout}>
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
            value={statusFilter}
            onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

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

      <div className={styles.tableScrollArea}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>User Details</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Status</th>
                <th>Date</th>
                <th className={styles.actionsHead}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.emptyState}>
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
                    <td>{renderStatus(item.status)}</td>
                    <td className={styles.date}>{item.date}</td>
                    <td>
                      <div className={styles.actions}>
                        {item.status !== "approved" && (
                          <button
                            onClick={() => handleApprove(item.id)}
                            disabled={isApproving}
                            className={`${styles.iconBtn} ${styles.approveBtn}`}
                            title="Approve"
                          >
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        )}

                        {item.status !== "rejected" && (
                          <button
                            onClick={() => handleReject(item.id)}
                            disabled={isRejecting}
                            className={`${styles.iconBtn} ${styles.rejectBtn}`}
                            title="Reject"
                          >
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={isDeleting}
                          className={`${styles.iconBtn} ${styles.deleteBtn}`}
                          title="Delete"
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

