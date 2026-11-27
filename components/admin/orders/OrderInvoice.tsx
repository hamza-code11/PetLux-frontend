"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Order } from "@/types/order";
import { formatMoney } from "@/lib/formatMoney";
import { STORE_INFO } from "@/lib/storeInfo";
import styles from "./OrderInvoice.module.css";

// @page margin 0 => browser ka header/footer (date, title, URL, page no.) nahi aata
const PRINT_CSS = `
@media print {
  @page { margin: 0; size: A4; }
  html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
  body > *:not(#invoice-print-root) { display: none !important; }
  #invoice-print-root { display: block !important; }
}
`;

export default function OrderInvoice({ order }: { order: Order }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <>
      <style>{PRINT_CSS}</style>
      <div id="invoice-print-root" className={styles.invoice}>
        <div className={styles.top}>
          <div>
            <h1 className={styles.brand}>{STORE_INFO.name}</h1>
            {STORE_INFO.address && <p className={styles.muted}>{STORE_INFO.address}</p>}
            {STORE_INFO.email && <p className={styles.muted}>{STORE_INFO.email}</p>}
            {STORE_INFO.phone && <p className={styles.muted}>{STORE_INFO.phone}</p>}
          </div>
          <div className={styles.right}>
            <h2 className={styles.invoiceTitle}>INVOICE</h2>
            <p><strong>#</strong> {order.order_number}</p>
            <p><strong>Date:</strong> {order.date}</p>
          </div>
        </div>

        <div className={styles.parties}>
          <div>
            <h3 className={styles.label}>Bill To</h3>
            <p className={styles.bold}>{order.customer_name}</p>
            <p>{order.customer_email}</p>
            <p>{order.customer_phone}</p>
          </div>
          <div>
            <h3 className={styles.label}>Ship To</h3>
            <p>{order.shipping_address}</p>
            <p>{order.shipping_city}, {order.shipping_postal_code}</p>
            <p>{order.shipping_country}</p>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Variant</th>
              <th className={styles.center}>Qty</th>
              <th className={styles.right}>Price</th>
              <th className={styles.right}>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it) => (
              <tr key={it.id}>
                <td>{it.name}</td>
                <td>{it.variant_name || "Standard"}</td>
                <td className={styles.center}>{it.quantity}</td>
                <td className={styles.right}>{formatMoney(it.price)}</td>
                <td className={styles.right}>{formatMoney(Number(it.price) * it.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.totals}>
          <div><span>Subtotal</span><span>{formatMoney(order.subtotal)}</span></div>
          <div><span>Shipping</span><span>{formatMoney(order.shipping_fee)}</span></div>
          <div className={styles.grand}><span>Total</span><span>{formatMoney(order.total)}</span></div>
        </div>

        {order.payment_method && (
          <p className={styles.muted}>Payment method: {order.payment_method}</p>
        )}

        <p className={styles.footer}>Thank you for your order!</p>
      </div>
    </>,
    document.body
  );
}