"use client";

import { useState, useMemo, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ContactMessage } from "@/types/contact";
import Pagination from "@/components/commen/Pagination";
import { useToast } from "@/components/ui/Toast/ToastContext";
import {
  useDeleteContactMessage,
  useUpdateContactStatus,
  useGetContactMessage,
} from "@/hooks/useContact";
import styles from "./ContactTable.module.css";

interface Props {
  initialData: ContactMessage[];
}

export default function ContactTable({ initialData }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [viewingId, setViewingId] = useState<number | null>(null);

  const { toast } = useToast();
  const { mutate: deleteMessage, isPending: isDeleting } = useDeleteContactMessage();
  const { mutate: updateStatus } = useUpdateContactStatus();

  const data = initialData;

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  const currentItems = useMemo(() => {
    const last = currentPage * itemsPerPage;
    return filteredData.slice(last - itemsPerPage, last);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    deleteMessage(id, {
      onSuccess: () => {
        toast.success("Message deleted.");
        if (currentItems.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      },
      onError: () => toast.error("Failed to delete message."),
    });
  };

  const handleToggleStatus = (item: ContactMessage) => {
    const next = item.status === "read" ? "unread" : "read";
    updateStatus(
      { id: item.id, status: next },
      {
        onSuccess: () => toast.success(`Marked as ${next}.`),
        onError: () => toast.error("Failed to update status."),
      }
    );
  };

  const handleItemsPerPageChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  };

  const handleFilterChange = (setter: any, value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  const getStatusBadgeClass = (status: string) =>
    status === "unread" ? styles.statusUnread : styles.statusRead;

  return (
    <div className={styles.tableLayout}>
      <div className={styles.filterBar}>
        <div className={styles.searchWrapper}>
          <svg
            className={styles.searchIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
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
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(item)}
                        className={`${styles.statusBadge} ${getStatusBadgeClass(
                          item.status
                        )}`}
                        title="Click to toggle status"
                        style={{ border: "none", cursor: "pointer" }}
                      >
                        {item.status}
                      </button>
                    </td>
                    <td className={styles.date}>{item.date ?? "—"}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          onClick={() => setViewingId(item.id)}
                          className={styles.iconBtn}
                          title="View Message"
                        >
                          <svg
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={isDeleting}
                          className={`${styles.iconBtn} ${styles.deleteBtn}`}
                          title="Delete"
                        >
                          <svg
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
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

      {viewingId !== null && (
        <MessageModal id={viewingId} onClose={() => setViewingId(null)} />
      )}
    </div>
  );
}

/* ---------- Message View Modal ---------- */
function MessageModal({ id, onClose }: { id: number; onClose: () => void }) {
  const { data, isLoading } = useGetContactMessage(id);
  const msg = data?.data;
  const queryClient = useQueryClient();

  // When the detail loads, the backend has already flipped unread → read.
  // Refresh the list so the table badge updates without a full page reload.
  useEffect(() => {
    if (!isLoading && msg) {
      queryClient.invalidateQueries({ queryKey: ["contactMessages"] });
    }
  }, [isLoading, msg?.id, msg?.status, queryClient]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: "28px",
          width: "100%",
          maxWidth: "560px",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        {isLoading || !msg ? (
          <p style={{ color: "var(--color-muted)" }}>Loading...</p>
        ) : (
          <>
            <h3 style={{ marginTop: 0, marginBottom: 4 }}>{msg.subject}</h3>
            <p
              style={{
                margin: "0 0 16px",
                color: "var(--color-muted)",
                fontSize: "var(--text-sm)",
              }}
            >
              From <strong>{msg.name}</strong> &middot; {msg.email}
            </p>
            <p
              style={{
                whiteSpace: "pre-line",
                lineHeight: 1.6,
                color: "var(--color-foreground)",
              }}
            >
              {msg.message}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "24px",
              }}
            >
              <button
                onClick={onClose}
                style={{
                  padding: "10px 18px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-background)",
                  color: "var(--color-foreground)",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

