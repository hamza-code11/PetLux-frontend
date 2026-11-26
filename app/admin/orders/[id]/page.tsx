"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useGetOrder, useUpdateOrderStatus } from "@/hooks/useOrders";
import { useToast } from "@/components/ui/Toast/ToastContext";
import { Order } from "@/types/order";
import { formatMoney } from "@/lib/formatMoney";
import OrderInvoice from "@/components/admin/orders/OrderInvoice";
import styles from "./OrderDetailsPage.module.css";

const STATUS_OPTIONS: Order["status"][] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const orderId = Number(resolvedParams.id);

  const { toast } = useToast();
  const { data, isLoading } = useGetOrder(orderId);
  const order = data?.data;

  const { mutate: updateStatus, isPending: isUpdating } = useUpdateOrderStatus();
  const [currentStatus, setCurrentStatus] = useState<Order["status"]>("pending");

  useEffect(() => {
    if (order?.status) setCurrentStatus(order.status);
  }, [order?.status]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Order["status"];
    setCurrentStatus(newStatus);

    updateStatus(
      { id: orderId, status: newStatus },
      {
        onSuccess: () => toast.success(`Order status updated to ${newStatus}.`),
        onError: () => {
          setCurrentStatus(order?.status || "pending");
          toast.error("Failed to update order status.");
        },
      }
    );
  };

  if (isLoading || !order) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loading}>Loading order details...</div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {/* HEADER */}
      <div className={styles.card}>
        <div className={styles.headerBox}>
          <div className={styles.headerLeft}>
            <Link href="/admin/orders" className={styles.backBtn} aria-label="Back to orders">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className={styles.titleBlock}>
              <div className={styles.breadcrumbs}>
                <Link href="/admin/orders">Orders</Link>
                <span>/</span>
                <span className={styles.current}>{order.order_number}</span>
              </div>
              <h1 className={styles.title}>Order {order.order_number}</h1>
            </div>
          </div>

          <div className={styles.headerRight}>
            <span className={styles.statusLabel}>Order Status</span>
            <select
              value={currentStatus}
              onChange={handleStatusChange}
              disabled={isUpdating}
              className={`${styles.statusSelect} ${styles[`status_${currentStatus}`]}`}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Order Date</span>
          <span className={styles.statValue}>{order.date}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Items</span>
          <span className={styles.statValue}>{order.items_count}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Payment Method</span>
          <span className={styles.statValue}>{order.payment_method || "—"}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total</span>
          <span className={`${styles.statValue} ${styles.statHighlight}`}>{formatMoney(order.total)}</span>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className={styles.mainGrid}>
        {/* LEFT: items + payment proof */}
        <div className={styles.column}>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Order Items</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Variant</th>
                    <th className={styles.textCenter}>Qty</th>
                    <th className={styles.textRight}>Price</th>
                    <th className={styles.textRight}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((it) => (
                    <tr key={it.id}>
                      <td className={styles.fontBold}>{it.name}</td>
                      <td className={styles.textMuted}>{it.variant_name || "Standard"}</td>
                      <td className={styles.textCenter}>
                        <span className={styles.qtyBox}>{it.quantity}</span>
                      </td>
                      <td className={styles.textRight}>{formatMoney(it.price)}</td>
                      <td className={`${styles.textRight} ${styles.fontBold}`}>
                        {formatMoney(Number(it.price) * it.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Payment Proof</h2>
            {order.payment_screenshot ? (
              <>
                <a
                  href={order.payment_screenshot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.proofLink}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={order.payment_screenshot}
                    alt="Payment screenshot"
                    className={styles.proofImg}
                  />
                </a>
                <p className={styles.proofHint}>Click image to open full size</p>
              </>
            ) : (
              <div className={styles.proofEmpty}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span>No payment screenshot uploaded</span>
              </div>
            )}
          </section>
        </div>

        {/* RIGHT: customer, shipping, summary */}
        <div className={styles.column}>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Customer</h2>
            <div className={styles.dataList}>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Name</span>
                <span className={styles.dataValue}>{order.customer_name}</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Email</span>
                <a href={`mailto:${order.customer_email}`} className={styles.dataLink}>{order.customer_email}</a>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Phone</span>
                <span className={styles.dataValue}>{order.customer_phone}</span>
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Shipping Address</h2>
            <div className={styles.addressBox}>
              <p className={styles.fontBold}>{order.customer_name}</p>
              <p>{order.shipping_address}</p>
              <p>{order.shipping_city}, {order.shipping_postal_code}</p>
              <p>{order.shipping_country}</p>
            </div>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Order Summary</h2>
            <div className={styles.summaryBlock}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Subtotal</span>
                <span className={styles.summaryValue}>{formatMoney(order.subtotal)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Shipping Fee</span>
                <span className={styles.summaryValue}>{formatMoney(order.shipping_fee)}</span>
              </div>
              <div className={styles.summaryDivider} />
              <div className={styles.totalRow}>
                <span>Total</span>
                <span>{formatMoney(order.total)}</span>
              </div>
            </div>
            <button className={styles.primaryBtn} onClick={() => window.print()}>
              Print Invoice
            </button>
          </section>
        </div>
      </div>

      {/* Invoice: screen par hidden, sirf print mein dikhta hai */}
      <OrderInvoice order={order} />
    </div>
  );
}

