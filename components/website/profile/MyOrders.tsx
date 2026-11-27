"use client";

import Link from "next/link";
import { useState } from "react";
import { useMyOrders } from "@/hooks/useOrders";
import { formatMoney } from "@/lib/formatMoney";
import { Order } from "@/types/order";
import OrderInvoice from "@/components/admin/orders/OrderInvoice";
import styles from "./MyOrders.module.css";

const STATUS_LABEL: Record<Order["status"], string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function statusClass(status: Order["status"]) {
  return styles[`s_${status}`] ?? "";
}

export default function MyOrders() {
  const { data, isLoading, isError, refetch } = useMyOrders();
  const [printOrder, setPrintOrder] = useState<Order | null>(null);

  const orders = data?.data ?? [];

  // Print jab trigger ho: pehle OrderInvoice mount karo, phir window.print()
  const handlePrint = (order: Order) => {
    setPrintOrder(order);
    // next tick pe print, taake portal render ho jaye
    setTimeout(() => {
      window.print();
      // print dialog band hone ke baad cleanup
      setTimeout(() => setPrintOrder(null), 300);
    }, 100);
  };

  // ---------- LOADING ----------
  if (isLoading) {
    return (
      <div className={styles.list}>
        {[1, 2, 3].map((n) => (
          <div key={n} className={styles.skeletonCard}>
            <div className={styles.skeletonRow}>
              <div className={styles.skLine} style={{ width: "40%" }} />
              <div className={styles.skLine} style={{ width: "20%" }} />
            </div>
            <div className={styles.skLine} style={{ width: "70%" }} />
            <div className={styles.skLine} style={{ width: "30%" }} />
          </div>
        ))}
      </div>
    );
  }

  // ---------- ERROR ----------
  if (isError) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3>Couldn&apos;t load orders</h3>
        <p>Something went wrong while fetching your orders.</p>
        <button type="button" className={styles.primaryBtn} onClick={() => refetch()}>
          Try Again
        </button>
      </div>
    );
  }

  // ---------- EMPTY ----------
  if (orders.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <h3>No orders yet</h3>
        <p>You haven&apos;t placed any orders. Start shopping to see them here.</p>
        <Link href="/shop" className={styles.primaryBtn}>
          Start Shopping
        </Link>
      </div>
    );
  }

  // ---------- LIST ----------
  return (
    <div>
      <div className={styles.listHeader}>
        <h2 className={styles.heading}>My Orders</h2>
        <span className={styles.count}>{orders.length} order(s)</span>
      </div>

      <div className={styles.list}>
        {orders.map((order) => {
          const itemQty = order.items?.reduce((s, it) => s + it.quantity, 0) ?? 0;
          const previewNames =
            order.items?.slice(0, 2).map((it) => it.name).join(", ") ?? "—";
          const moreCount = Math.max(0, (order.items?.length ?? 0) - 2);

          return (
            <article key={order.id} className={styles.orderCard}>
              {/* TOP ROW */}
              <div className={styles.cardTop}>
                <div className={styles.orderInfo}>
                  <span className={styles.orderLabel}>Order</span>
                  <span className={styles.orderNumber}>{order.order_number}</span>
                </div>
                <span className={`${styles.statusPill} ${statusClass(order.status)}`}>
                  {STATUS_LABEL[order.status]}
                </span>
              </div>

              {/* META */}
              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Date</span>
                  <span className={styles.metaValue}>{order.date}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Items</span>
                  <span className={styles.metaValue}>{itemQty}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Total</span>
                  <span className={`${styles.metaValue} ${styles.metaTotal}`}>
                    {formatMoney(order.total)}
                  </span>
                </div>
              </div>

              {/* PREVIEW */}
              <p className={styles.preview}>
                {previewNames}
                {moreCount > 0 && ` + ${moreCount} more`}
              </p>

              {/* ACTIONS */}
              <div className={styles.cardActions}>
                <Link
                  href={`/order-confirmation/${order.id}`}
                  className={styles.primaryBtn}
                >
                  View Details
                </Link>
                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={() => handlePrint(order)}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
                  </svg>
                  Invoice
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Print-only invoice — sirf jab user ne "Invoice" click kiya ho */}
      {printOrder && <OrderInvoice order={printOrder} />}
    </div>
  );
}
