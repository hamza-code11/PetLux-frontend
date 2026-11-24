"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useGetProducts, useDeleteProduct } from "@/hooks/useProducts";
import Pagination from "@/components/commen/Pagination";
import { useToast } from "@/components/ui/Toast/ToastContext";
import styles from "./ProductTable.module.css";

export default function ProductTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { toast } = useToast();

  // Hooks
  const { data, isLoading } = useGetProducts(currentPage, itemsPerPage);
  const { mutate: deleteProduct } = useDeleteProduct();

  // Filters (Client-side on current page)
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredData = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      
      let matchesType = true;
      if (typeFilter === "simple") matchesType = !item.has_variants;
      if (typeFilter === "variants") matchesType = item.has_variants;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [data, searchQuery, statusFilter, typeFilter]);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setDeletingId(id);
      deleteProduct(id, {
        onSuccess: () => {
          toast.success("Product deleted successfully!");
          if (filteredData.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
          setDeletingId(null);
        },
        onError: () => {
          toast.error("Failed to delete product.");
          setDeletingId(null);
        },
      });
    }
  };

  const handleItemsPerPageChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  };

  const handleFilterChange = (setter: any, value: string) => {
    setter(value);
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
            placeholder="Search products..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className={styles.filtersRight}>
          <select 
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
            disabled={isLoading}
          >
            <option value="all">All Status</option>
            <option value="publish">Published</option>
            <option value="draft">Draft</option>
          </select>

          <select 
            className={styles.filterSelect}
            value={typeFilter}
            onChange={(e) => handleFilterChange(setTypeFilter, e.target.value)}
            disabled={isLoading}
          >
            <option value="all">All Types</option>
            <option value="simple">Simple</option>
            <option value="variants">Variants</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableScrollArea}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th className={styles.actionsHead}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className={styles.emptyState}>Loading products...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.emptyState}>
                    {data?.data.length === 0 ? "No products found. Add a new product." : "No products match your filters."}
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => {
                  const isRowDeleting = deletingId === item.id;
                  
                  return (
                    <tr key={item.id}>
                      <td>
                        <div className={styles.nameCol}>
                          {item.name}
                          {item.has_variants && (
                            <span className={styles.typeBadge}>Variants</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className={styles.categoryInfo}>
                          <span>{item.pet_type?.name || "N/A"}</span>
                          <span className={styles.subText}>
                            {item.category?.name || "-"} {item.subcategory?.name ? `/ ${item.subcategory.name}` : ""}
                          </span>
                        </div>
                      </td>
                      <td>
                        {item.has_variants ? (
                          <span className={styles.variantText}>
                            {item.variants?.length || 0} Variants
                          </span>
                        ) : (
                          <div className={styles.priceInfo}>
                            <span className={styles.salePrice}>
                              ${item.sale_price || item.regular_price}
                            </span>
                            {item.sale_price && item.regular_price && item.sale_price !== item.regular_price && (
                              <span className={styles.regularPrice}>
                                ${item.regular_price}
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            item.status === "publish"
                              ? styles.statusPublished
                              : styles.statusDraft
                          }`}
                        >
                          {item.status === "publish" ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <Link
                            href={`/admin/products/edit/${item.id}`}
                            className={styles.iconBtn}
                            title="Edit"
                          >
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

      {/* Pagination */}
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

