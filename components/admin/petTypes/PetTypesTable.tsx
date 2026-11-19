"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useGetPetTypes, useDeletePetType } from "@/hooks/usePetTypes";
import Pagination from "@/components/commen/Pagination";
import { useToast } from "@/components/ui/Toast/ToastContext";
import { isLocalImage, getImageUrl } from "@/lib/imageUrl";
import styles from "./PetTypesTable.module.css";

export default function PetTypesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { toast } = useToast();

  // Hooks
  const { data, isLoading } = useGetPetTypes(currentPage, itemsPerPage);
  const { mutate: deletePetType, isPending: isDeleting } = useDeletePetType();

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this pet type?")) {
      deletePetType(id, {
        onSuccess: () => {
          toast.success("Pet type deleted successfully!");
          // Agar current page ka last item delete hua, toh pichle page par jayein
          if (data?.data.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        },
        onError: () => toast.error("Failed to delete pet type."),
      });
    }
  };

  const handleItemsPerPageChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  };

  if (isLoading) return <div style={{ padding: '20px' }}>Loading pet types...</div>;
  if (!data) return null;

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
              {data.data.length === 0 ? (
                <tr>
                  <td colSpan={4} className={styles.emptyState}>No pet types found.</td>
                </tr>
              ) : (
                data.data.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.imageWrapper}>
                        <Image
                          src={getImageUrl(item.image_path)} // <--- Yahan image_path pass karein, image_url nahi
                          alt={item.name}
                          fill
                          className={styles.image}
                          unoptimized={isLocalImage(getImageUrl(item.image_path))}
                        />
                      </div>
                    </td>
                    <td className={styles.nameCol}>{item.name}</td>
                    <td>
                      <span className={styles.slugBadge}>{item.slug}</span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <Link href={`/admin/petTypes/edit/${item.id}`} className={styles.iconBtn} title="Edit">
                          {/* Edit Icon SVG */}
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className={`${styles.iconBtn} ${styles.deleteBtn}`}
                          title="Delete"
                          disabled={isDeleting}
                        >
                          {/* Delete Icon SVG */}
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
          currentPage={data.current_page}
          totalPages={data.last_page}
          totalItems={data.total}
          itemsPerPage={data.per_page}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
}

