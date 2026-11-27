"use client";

import Link from "next/link";
import { use } from "react";
import { useGetOrder } from "@/hooks/useOrders";
import { formatMoney } from "@/lib/formatMoney";
import { getImageUrl } from "@/lib/imageUrl";
import { STORE_INFO } from "@/lib/storeInfo";
import OrderInvoice from "@/components/admin/orders/OrderInvoice";
import styles from "./OrderConfirmation.module.css";

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const orderId = Number(resolvedParams.id);

  const { data, isLoading } = useGetOrder(orderId);
  const order = data?.data;

  // ---------- LOADING ----------
  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.centerCard}>
          <div className={styles.spinner} />
          <p className={styles.muted}>Loading your order...</p>
        </div>
      </div>
    );
  }

  // ---------- NOT FOUND ----------
  if (!order) {
    return (
      <div className={styles.page}>
        <div className={styles.centerCard}>
          <h1 className={styles.title}>Order not found</h1>
          <p className={styles.subtitle}>
            We couldn't find order #{orderId}. Please check the link again.
          </p>
          <Link href="/shop" className={styles.primaryBtn}>Back to Shop</Link>
        </div>
      </div>
    );
  }

  const screenshotUrl = order.payment_screenshot
    ? getImageUrl(order.payment_screenshot)
    : "";
  const firstName = order.customer_name.split(" ")[0];

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        {/* ============ HERO ============ */}
        <header className={styles.hero}>
          <div className={styles.heroLeft}>
            <span className={styles.eyebrow}>Order Confirmed</span>
            <h1 className={styles.heroTitle}>Thank you, {firstName}!</h1>
            <p className={styles.heroSubtitle}>
              Your order <strong>#{order.order_number}</strong> has been placed
              successfully. We'll verify your payment and update the status shortly.
            </p>
          </div>

          <div className={styles.heroActions}>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => window.print()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print Invoice
            </button>
            <Link href="/shop" className={styles.secondaryBtn}>
              Continue Shopping
            </Link>
          </div>
        </header>

        {/* ============ STATS ============ */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Order Date</span>
            <span className={styles.statValue}>{order.date}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Status</span>
            <span className={`${styles.statusPill} ${styles[`s_${order.status}`]}`}>
              {order.status}
            </span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Payment</span>
            <span className={styles.statValue}>{order.payment_method || "—"}</span>
          </div>
          <div className={`${styles.statCard} ${styles.statCardDark}`}>
            <span className={styles.statLabel}>Total Paid</span>
            <span className={styles.statValueLarge}>{formatMoney(order.total)}</span>
          </div>
        </div>

        {/* ============ MAIN GRID ============ */}
        <div className={styles.mainGrid}>
          {/* LEFT */}
          <div className={styles.column}>
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Items Ordered</h2>
                <span className={styles.cardMeta}>{order.items_count} item(s)</span>
              </div>
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
                          <span className={styles.qtyPill}>{it.quantity}</span>
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

            {order.payment_screenshot && (
              <section className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Payment Proof</h2>
                </div>
                <a href={screenshotUrl} target="_blank" rel="noopener noreferrer"
                  className={styles.proofLink}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={screenshotUrl} alt="Payment screenshot" className={styles.proofImg} />
                </a>
                <p className={styles.proofHint}>Click image to open full size</p>
              </section>
            )}
          </div>

          {/* RIGHT */}
          <div className={styles.column}>
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Customer</h2>
              </div>
              <dl className={styles.dataList}>
                <div className={styles.dataRow}>
                  <dt>Name</dt><dd>{order.customer_name}</dd>
                </div>
                <div className={styles.dataRow}>
                  <dt>Email</dt>
                  <dd><a href={`mailto:${order.customer_email}`} className={styles.link}>{order.customer_email}</a></dd>
                </div>
                <div className={styles.dataRow}>
                  <dt>Phone</dt><dd>{order.customer_phone}</dd>
                </div>
              </dl>
            </section>

            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Shipping Address</h2>
              </div>
              <address className={styles.address}>
                <strong>{order.customer_name}</strong>
                <span>{order.shipping_address}</span>
                <span>{order.shipping_city}, {order.shipping_postal_code}</span>
                <span>{order.shipping_country}</span>
              </address>
            </section>

            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Order Summary</h2>
              </div>
              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span><span>{formatMoney(order.subtotal)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span><span>{formatMoney(order.shipping_fee)}</span>
                </div>
                <div className={styles.summaryDivider} />
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span>Total</span><span>{formatMoney(order.total)}</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ============ FOOTER ============ */}
        <footer className={styles.footer}>
          <p>
            Need help?{" "}
            {STORE_INFO.email && (
              <>
                Email us at{" "}
                <a href={`mailto:${STORE_INFO.email}`} className={styles.link}>
                  {STORE_INFO.email}
                </a>
              </>
            )}
            {STORE_INFO.email && STORE_INFO.phone && " or "}
            {STORE_INFO.phone && (
              <>
                call{" "}
                <a href={`tel:${STORE_INFO.phone}`} className={styles.link}>
                  {STORE_INFO.phone}
                </a>
              </>
            )}
          </p>
          <p className={styles.footerBrand}>
            {STORE_INFO.name}
            {STORE_INFO.address ? ` · ${STORE_INFO.address}` : ""}
          </p>
        </footer>
      </div>

      {/* Print-only invoice (already handles its own print CSS) */}
      <OrderInvoice order={order} />
    </div>
  );
}
