"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useGetPetTypes, useDeletePetType, useTogglePetTypeNavbar } from "@/hooks/usePetTypes";
import Pagination from "@/components/commen/Pagination";
import { useToast } from "@/components/ui/Toast/ToastContext";
import { getImageUrl, isLocalImage } from "@/lib/imageUrl";
import styles from "./PetTypesTable.module.css";

export default function PetTypesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const { toast } = useToast();
  const { data, isLoading } = useGetPetTypes(currentPage, itemsPerPage);
  const { mutate: deletePetType } = useDeletePetType();
  const { mutate: toggleNavbar } = useTogglePetTypeNavbar();

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this pet type?")) {
      setDeletingId(id);
      deletePetType(id, {
        onSuccess: () => {
          toast.success("Pet type deleted successfully!");
          if (data?.data.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
          setDeletingId(null);
        },
        onError: () => {
          toast.error("Failed to delete pet type.");
          setDeletingId(null);
        },
      });
    }
  };

  const handleToggleNavbar = (id: number) => {
    setTogglingId(id);
    toggleNavbar(id, {
      onSuccess: (res) => {
        toast.success(res.message || "Navbar visibility updated!");
        setTogglingId(null);
      },
      onError: () => {
        toast.error("Failed to update navbar visibility.");
        setTogglingId(null);
      },
    });
  };

  const handleItemsPerPageChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  };

  // Boolean check (1, true, "1" sab handle karega)
  const isChecked = (val: any) => val === 1 || val === true || val === "1";

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
                <th>Show in Navbar</th>
                <th className={styles.actionsHead}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className={styles.emptyState}>
                    Loading pet types...
                  </td>
                </tr>
              ) : !data || data.data.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.emptyState}>
                    No pet types found.
                  </td>
                </tr>
              ) : (
                data.data.map((item: any) => {
                  const isRowDeleting = deletingId === item.id;
                  const isRowToggling = togglingId === item.id;
                  const fullImageUrl = getImageUrl(item.image_path);

                  return (
                    <tr key={item.id}>
                      <td>
                        <div className={styles.imageWrapper}>
                          {fullImageUrl ? (
                            <Image
                              src={fullImageUrl}
                              alt={item.name}
                              fill
                              className={styles.image}
                              unoptimized={isLocalImage(fullImageUrl)}
                            />
                          ) : (
                            <div style={{ width: '100%', height: '100%', background: 'var(--color-gray-100)' }} />
                          )}
                        </div>
                      </td>
                      <td className={styles.nameCol}>{item.name}</td>
                      <td>
                        <span className={styles.slugBadge}>{item.slug}</span>
                      </td>
                      <td>
                        <label className={styles.switch}>
                          <input 
                            type="checkbox" 
                            checked={isChecked(item.show_in_navbar)}
                            onChange={() => handleToggleNavbar(item.id)}
                            disabled={isRowToggling}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <Link href={`/admin/petTypes/edit/${item.id}`} className={styles.iconBtn} title="Edit">
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

