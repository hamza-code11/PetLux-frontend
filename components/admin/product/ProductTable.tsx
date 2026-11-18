"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Product } from "@/types/product";
import Pagination from "@/components/commen/Pagination";
import styles from "./ProductTable.module.css";

interface Props {
  initialData: Product[];
}

export default function ProductTable({ initialData }: Props) {
  const [data, setData] = useState<Product[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Filtering Logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      
      let matchesType = true;
      if (typeFilter === "simple") matchesType = !item.hasVariants;
      if (typeFilter === "variants") matchesType = item.hasVariants;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [data, searchQuery, statusFilter, typeFilter]);

  // Pagination Logic on Filtered Data
  const currentItems = useMemo(() => {
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    return filteredData.slice(firstItemIndex, lastItemIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleDelete = (id?: number) => {
    if (!id) return;
    if (confirm("Are you sure you want to delete this product?")) {
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

  // Reset Page on Filter Change
  const handleFilterChange = (setter: any, value: string) => {
    setter(value);
    setCurrentPage(1);
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
          />
        </div>

        <div className={styles.filtersRight}>
          <select 
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="publish">Published</option>
            <option value="draft">Draft</option>
          </select>

          <select 
            className={styles.filterSelect}
            value={typeFilter}
            onChange={(e) => handleFilterChange(setTypeFilter, e.target.value)}
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
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.emptyState}>
                    No products found matching your filters.
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.nameCol}>
                        {item.name}
                        {item.hasVariants && (
                          <span className={styles.typeBadge}>Variants</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className={styles.categoryInfo}>
                        <span>{item.petType}</span>
                        <span className={styles.subText}>
                          {item.category} / {item.subcategory}
                        </span>
                      </div>
                    </td>
                    <td>
                      {item.hasVariants ? (
                        <span className={styles.variantText}>
                          {item.variants?.length} Variants
                        </span>
                      ) : (
                        <div className={styles.priceInfo}>
                          <span className={styles.salePrice}>
                            ${item.salePrice || item.regularPrice}
                          </span>
                          {item.salePrice && item.regularPrice && item.salePrice !== item.regularPrice && (
                            <span className={styles.regularPrice}>
                              ${item.regularPrice}
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

      {/* Pagination */}
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

