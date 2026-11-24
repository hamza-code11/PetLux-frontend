"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useGetCategories, useDeleteCategory } from "@/hooks/useCategories";
import Pagination from "@/components/commen/Pagination";
import { useToast } from "@/components/ui/Toast/ToastContext";
import { getImageUrl, isLocalImage } from "@/lib/imageUrl";
import styles from "./CategoryTable.module.css";

// Local placeholder path from public folder
const PLACEHOLDER_IMAGE = "/placeholder.jpg";

export default function CategoryTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { toast } = useToast();

  // Hooks
  const { data, isLoading } = useGetCategories(currentPage, itemsPerPage);
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setDeletingId(id);
      deleteCategory(id, {
        onSuccess: () => {
          toast.success("Category deleted successfully!");
          if (data?.data.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
          setDeletingId(null);
        },
        onError: () => {
          toast.error("Failed to delete category.");
          setDeletingId(null);
        },
      });
    }
  };

  const handleItemsPerPageChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  };

  return (
    <div className={styles.tableLayout}>
      <div className={styles.tableScrollArea}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.imageHead}>Image</th>
                <th>Name</th>
                <th>Slug</th>
                <th className={styles.actionsHead}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className={styles.emptyState}>
                    Loading categories...
                  </td>
                </tr>
              ) : !data || data.data.length === 0 ? (
                <tr>
                  <td colSpan={4} className={styles.emptyState}>
                    No categories found.
                  </td>
                </tr>
              ) : (
                data.data.map((item) => {
                  const isRowDeleting = deletingId === item.id;
                  const fullImageUrl = getImageUrl(item.image_path);

                  // Agar image_path hai toh use karo, warna placeholder
                  const displayImage = fullImageUrl || PLACEHOLDER_IMAGE;

                  return (
                    <tr key={item.id}>
                      <td>
                        <div className={styles.imageWrapper}>
                          <Image
                            src={displayImage}
                            alt={item.name}
                            fill
                            className={styles.image}
                            unoptimized={
                              displayImage === PLACEHOLDER_IMAGE 
                                ? true // Local placeholder ko optimize karne ki zaroorat nahi
                                : isLocalImage(displayImage)
                            }
                            onError={(e) => {
                              // Agar backend image fail ho jaye, toh placeholder par switch karo
                              const target = e.target as HTMLImageElement;
                              if (target.src !== window.location.origin + PLACEHOLDER_IMAGE) {
                                target.src = PLACEHOLDER_IMAGE;
                              }
                            }}
                          />
                        </div>
                      </td>
                      <td className={styles.nameCol}>{item.name}</td>
                      <td>
                        <span className={styles.slugBadge}>{item.slug}</span>
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <Link href={`/admin/categories/edit/${item.id}`} className={styles.iconBtn} title="Edit">
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className={`${styles.iconBtn} ${styles.deleteBtn}`}
                            title="Delete"
                            disabled={isRowDeleting}
                          >
                            {isRowDeleting ? (
                              <span style={{ fontSize: '12px' }}>...</span>
                            ) : (
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!isLoading && data && data.data.length > 0 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={data.current_page}
            totalPages={data.last_page}
            totalItems={data.total}
            itemsPerPage={data.per_page}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      )}
    </div>
  );
}
