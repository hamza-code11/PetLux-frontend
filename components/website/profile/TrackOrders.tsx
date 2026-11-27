"use client";

import { useState } from "react";
import Link from "next/link";
import { useTrackOrder } from "@/hooks/useOrders";
import { formatMoney } from "@/lib/formatMoney";
import { Order } from "@/types/order";
import styles from "./TrackOrders.module.css";

const STEPS: Order["status"][] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
];

const STEP_LABEL: Record<Order["status"], string> = {
  pending: "Order Placed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function getStepIndex(status: Order["status"]) {
  if (status === "cancelled") return -1;
  return STEPS.indexOf(status);
}

export default function TrackOrders() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(""); // actual query string

  const { data, isLoading, isError, error } = useTrackOrder(query);

  const order = data?.data;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setQuery(trimmed);
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h2 className={styles.heading}>Track Your Order</h2>
      </div>

      {/* ============ SEARCH BOX ============ */}
      <div className={styles.searchCard}>
        <p className={styles.searchHint}>
          Enter your order number to see the current status of your order.
        </p>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.input}
            placeholder="e.g. ORD-AB12CD34"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className={styles.primaryBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Track Order
          </button>
        </form>
      </div>

      {/* ============ LOADING ============ */}
      {isLoading && query && (
        <div className={styles.loadingWrap}>
          <div className={styles.spinner} />
          <p>Looking up your order...</p>
        </div>
      )}

      {/* ============ ERROR / NOT FOUND ============ */}
      {isError && query && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3>Order not found</h3>
          <p>
            {(error as any)?.response?.data?.message ??
              "We couldn't find an order with that number. Please check and try again."}
          </p>
        </div>
      )}

      {/* ============ RESULT ============ */}
      {order && (
        <div className={styles.detail}>
          <div className={styles.detailHeader}>
            <div>
              <span className={styles.detailLabel}>Order</span>
              <h3 className={styles.detailNumber}>{order.order_number}</h3>
            </div>
            <span className={`${styles.statusPill} ${styles[`s_${order.status}`]}`}>
              {STEP_LABEL[order.status]}
            </span>
          </div>

          {/* ---- TIMELINE ---- */}
          {order.status === "cancelled" ? (
            <div className={styles.cancelledBox}>
              <div className={styles.cancelledIcon}>✕</div>
              <div>
                <h4>Order Cancelled</h4>
                <p>This order has been cancelled. Contact support if you need help.</p>
              </div>
            </div>
          ) : (
            <ol className={styles.timeline}>
              {STEPS.map((step, idx) => {
                const activeIndex = getStepIndex(order.status);
                const done = idx < activeIndex;
                const current = idx === activeIndex;
                const upcoming = idx > activeIndex;
                return (
                  <li
                    key={step}
                    className={`${styles.timelineItem} ${done ? styles.done : ""} ${current ? styles.current : ""} ${upcoming ? styles.upcoming : ""}`}
                  >
                    <div className={styles.dot}>{done ? "✓" : current ? "●" : ""}</div>
                    <div className={styles.timelineContent}>
                      <span className={styles.timelineLabel}>{STEP_LABEL[step]}</span>
                      <span className={styles.timelineHint}>
                        {done ? "Completed" : current ? "In progress" : "Pending"}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}

          {/* ---- SUMMARY ---- */}
          <div className={styles.detailGrid}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Order Date</span>
              <span className={styles.detailValue}>{order.date}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Items</span>
              <span className={styles.detailValue}>
                {order.items.reduce((s, it) => s + it.quantity, 0)}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Total</span>
              <span className={`${styles.detailValue} ${styles.detailTotal}`}>
                {formatMoney(order.total)}
              </span>
            </div>
          </div>

          {/* ---- ACTIONS ---- */}
          <div className={styles.actions}>
            <Link
              href={`/order-confirmation/${order.id}`}
              className={styles.primaryBtn}
            >
              View Order Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
