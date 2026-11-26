"use client";

import { useState, useEffect } from "react";
import OrdersTable from "@/components/admin/orders/OrdersTable";
import { useGetOrders } from "@/hooks/useOrders";
import { useGetShippingCharges, useUpdateShippingCharges } from "@/hooks/useSettings"; // ✅ New Hook
import { useToast } from "@/components/ui/Toast/ToastContext";
import styles from "./OrdersPage.module.css";

export default function AdminOrdersPage() {
  const { data: ordersData, isLoading: isOrdersLoading } = useGetOrders({ per_page: 10 });
  const { data: shippingData, isLoading: isShippingLoading } = useGetShippingCharges();
  const { mutate: updateShipping, isPending: isSaving } = useUpdateShippingCharges();
  const { toast } = useToast();

  const [isEditingShipping, setIsEditingShipping] = useState(false);
  const [shippingFee, setShippingFee] = useState<string>("");

  // Backend se value aane par input me set karein
  useEffect(() => {
    if (shippingData?.data?.shipping_charges !== undefined) {
      setShippingFee(String(shippingData.data.shipping_charges));
    }
  }, [shippingData]);

  const handleSaveShipping = () => {
    if (!shippingFee || Number(shippingFee) < 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    updateShipping(
      { shipping_charges: Number(shippingFee) },
      {
        onSuccess: () => {
          setIsEditingShipping(false);
          toast.success("Shipping charges updated successfully.");
        },
        onError: () => {
          toast.error("Failed to update shipping charges.");
        },
      }
    );
  };

  const handleCancelShipping = () => {
    // Reset to original value
    if (shippingData?.data?.shipping_charges !== undefined) {
      setShippingFee(String(shippingData.data.shipping_charges));
    }
    setIsEditingShipping(false);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Orders</h1>
          <p className={styles.subtitle}>
            Manage customer orders, shipping and delivery status.
          </p>
        </div>

        {/* Shipping edit control */}
        <div className={styles.shippingControl}>
          {isEditingShipping ? (
            <>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Shipping Charges ($)</label>
                <input
                  type="number"
                  min={0}
                  value={shippingFee}
                  onChange={(e) => setShippingFee(e.target.value)}
                  className={styles.input}
                  autoFocus
                  disabled={isSaving}
                />
              </div>
              <div className={styles.btnGroup}>
                <button
                  className={styles.cancelBtn}
                  onClick={handleCancelShipping}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  className={styles.saveBtn}
                  onClick={handleSaveShipping}
                  disabled={isSaving || isShippingLoading}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </>
          ) : (
            <button
              className={styles.editBtn}
              onClick={() => setIsEditingShipping(true)}
              disabled={isShippingLoading}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              {isShippingLoading ? "Loading..." : `Edit Charges (${shippingData?.data?.shipping_charges ? `$${shippingData.data.shipping_charges}` : '$0'})`}
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      {isOrdersLoading ? (
        <div className={styles.loading}>Loading orders...</div>
      ) : (
        <OrdersTable initialData={ordersData?.data ?? []} />
      )}
    </div>
  );
}
