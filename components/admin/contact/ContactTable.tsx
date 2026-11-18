"use client";

import { useState, useMemo } from "react";
import { ContactMessage } from "@/types/contact";
import Pagination from "@/components/commen/Pagination";
import styles from "./ContactTable.module.css";

interface Props {
  initialData: ContactMessage[];
}

export default function ContactTable({ initialData }: Props) {
  const [data, setData] = useState<ContactMessage[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  const currentItems = useMemo(() => {
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    return filteredData.slice(firstItemIndex, lastItemIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this message?")) {
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
    setCurrentPage(1);
  };

  const getStatusBadgeClass = (status: string) => {
    return status === "unread" ? styles.statusUnread : styles.statusRead;
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
            placeholder="Search by name, email, or subject..."
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
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      <div className={styles.tableScrollArea}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Sender</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Status</th>
                <th>Date</th>
                <th className={styles.actionsHead}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.emptyState}>
                    No messages found.
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.senderInfo}>
                        <span className={styles.senderName}>{item.name}</span>
                        <span className={styles.senderEmail}>{item.email}</span>
                      </div>
                    </td>
                    <td className={styles.subject}>{item.subject}</td>
                    <td>
                      <p className={styles.message}>{item.message}</p>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${getStatusBadgeClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className={styles.date}>{item.date}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          onClick={() => alert("View functionality coming soon!")}
                          className={styles.iconBtn}
                          title="View Message"
                        >
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
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
