
"use client";

import Link from "next/link";
import { useGetOrders } from "@/hooks/useOrders";
import { Order } from "@/types/order";
import styles from "./RecentOrders.module.css";

export default function RecentOrders() {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetOrders();

  const orders: Order[] = (response?.data ?? []).slice(0, 5);

  const getStatusClass = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return styles.statusPending;
      case "processing":
        return styles.statusProcessing;
      case "shipped":
        return styles.statusShipped;
      case "delivered":
        return styles.statusDelivered;
      case "cancelled":
        return styles.statusCancelled;
      default:
        return "";
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Recent Orders</h2>
          <p className={styles.subtitle}>
            Latest orders received by your store
          </p>
        </div>

        <Link href="/admin/orders" className={styles.viewAll}>
          View All Orders
          <span>→</span>
        </Link>
      </div>

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
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className={styles.message}>
                  Loading recent orders...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={6} className={styles.message}>
                  <span>Unable to load recent orders.</span>
                  <button onClick={() => refetch()} className={styles.retry}>
                    Retry
                  </button>
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.message}>
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className={styles.orderNumber}>
                    {order.order_number}
                  </td>

                  <td>
                    <div className={styles.customerInfo}>
                      <span className={styles.customerName}>
                        {order.customer_name}
                      </span>
                      <span className={styles.customerEmail}>
                        {order.customer_email}
                      </span>
                    </div>
                  </td>

                  <td className={styles.items}>
                    {order.items_count} item
                    {order.items_count === 1 ? "" : "s"}
                  </td>

                  <td className={styles.total}>
                    ${Number(order.total).toFixed(2)}
                  </td>

                  <td>
                    <span
                      className={`${styles.status} ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className={styles.date}>{order.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

