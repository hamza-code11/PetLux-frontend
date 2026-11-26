"use client";

import { useState, useMemo } from "react";
import { Order } from "@/types/order";
import Pagination from "@/components/commen/Pagination";
import { useToast } from "@/components/ui/Toast/ToastContext";
import { useUpdateOrderStatus, useDeleteOrder } from "@/hooks/useOrders";
import Link from "next/link";
import styles from "./OrdersTable.module.css";

interface Props {
  initialData: Order[];
}

const STATUS_OPTIONS: Order["status"][] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function OrdersTable({ initialData }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Order["status"]>("all");

  const { toast } = useToast();
  const { mutate: updateStatus } = useUpdateOrderStatus();
  
  // ✅ Delete hook initialize kiya
  const { mutate: deleteOrder, isPending: isDeleting } = useDeleteOrder();

  const data = initialData;

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.customer_name.toLowerCase().includes(q) ||
        item.customer_email.toLowerCase().includes(q) ||
        item.order_number.toLowerCase().includes(q);

      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const last = currentPage * itemsPerPage;
    return filteredData.slice(last - itemsPerPage, last);
  }, [filteredData, currentPage, itemsPerPage]);

  const handleStatusChange = (order: Order, next: Order["status"]) => {
    if (order.status === next) return;
    updateStatus(
      { id: order.id, status: next },
      {
        onSuccess: () => toast.success(`Order marked as ${next}.`),
        onError: () => toast.error("Failed to update order status."),
      }
    );
  };

  // ✅ Delete handler
  const handleDelete = (id: number, orderNumber: string) => {
    if (!confirm(`Are you sure you want to delete order ${orderNumber}? This cannot be undone.`)) return;
    
    deleteOrder(id, {
      onSuccess: () => {
        toast.success("Order deleted successfully.");
        if (currentItems.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      },
      onError: () => toast.error("Failed to delete order."),
    });
  };

  const handleFilterChange = (setter: (v: any) => void, value: any) => {
    setter(value);
    setCurrentPage(1);
  };

  const getStatusClass = (status: Order["status"]) => {
    switch (status) {
      case "pending": return styles.statusPending;
      case "processing": return styles.statusProcessing;
      case "shipped": return styles.statusShipped;
      case "delivered": return styles.statusDelivered;
      case "cancelled": return styles.statusCancelled;
      default: return "";
    }
  };

  return (
    <div className={styles.tableLayout}>
      {/* FILTER BAR */}
      <div className={styles.filterBar}>
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by order #, name, or email..."
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
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className={styles.tableScrollArea}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th className={styles.actionsHead}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.emptyState}>
                    No orders found.
                  </td>
                </tr>
              ) : (
                currentItems.map((order) => (
                  <tr key={order.id}>
                    <td className={styles.orderNumber}>{order.order_number}</td>
                    <td>
                      <div className={styles.customerInfo}>
                        <span className={styles.customerName}>{order.customer_name}</span>
                        <span className={styles.customerEmail}>{order.customer_email}</span>
                      </div>
                    </td>
                    <td className={styles.itemsCell}>{order.items_count} item{order.items_count === 1 ? "" : "s"}</td>
                    <td className={styles.totalCell}>${Number(order.total).toFixed(2)}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order, e.target.value as Order["status"])}
                        className={`${styles.statusSelect} ${getStatusClass(order.status)}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className={styles.date}>{order.date}</td>
                    
                    {/* ✅ ACTIONS CELL UPDATED */}
                    <td>
                      <div className={styles.actions}>
                        {/* View Icon */}
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className={styles.iconBtn}
                          title="View Order"
                        >
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        
                        {/* ✅ Delete Button */}
                        <button
                          onClick={() => handleDelete(order.id, order.order_number)}
                          disabled={isDeleting}
                          className={`${styles.iconBtn} ${styles.deleteBtn}`}
                          title="Delete Order"
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

      {/* PAGINATION */}
      <div className={styles.paginationWrapper}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(limit) => { setItemsPerPage(limit); setCurrentPage(1); }}
        />
      </div>

    </div>
  );
}
