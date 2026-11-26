"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { usePlaceOrder } from "@/hooks/useOrders";
import { useToast } from "@/components/ui/Toast/ToastContext";
import ShippingForm, { ShippingData } from "./ShippingForm";
import PaymentModal from "./PaymentModal";
import styles from "./CheckoutForm.module.css";

export interface CheckoutPayload {
  shipping: ShippingData;
}

interface Props {
  onSubmit?: (payload: CheckoutPayload) => void;
}

export default function CheckoutForm({ onSubmit }: Props) {
  const router = useRouter();
  const { cart } = useCart();
  const { toast } = useToast();
  
  const { mutate: placeOrder, isPending: isPlacing } = usePlaceOrder();

  const [shipping, setShipping] = useState<ShippingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // 👈 Naya state

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirmOrder = (screenshot: File) => {
    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const formData = new FormData();
    
    formData.append("first_name", shipping.firstName);
    formData.append("last_name", shipping.lastName);
    formData.append("email", shipping.email);
    formData.append("phone", shipping.phone);
    formData.append("address", shipping.address);
    formData.append("city", shipping.city);
    formData.append("postal_code", shipping.postalCode);
    formData.append("country", shipping.country);
    formData.append("payment_screenshot", screenshot);

    cart.forEach((item, index) => {
      const price = item.variant 
        ? Number(item.variant.sale_price || item.variant.regular_price)
        : Number(item.product.sale_price || item.product.regular_price || 0);

      formData.append(`cart_items[${index}][product_id]`, String(item.product.id));
      formData.append(`cart_items[${index}][product_name]`, item.product.name);
      formData.append(`cart_items[${index}][price]`, String(price));
      formData.append(`cart_items[${index}][quantity]`, String(item.quantity));
      
      if (item.variant) {
        formData.append(`cart_items[${index}][variant_id]`, String(item.variant.id));
        formData.append(`cart_items[${index}][variant_name]`, item.variant.name);
      }
    });

    placeOrder(formData, {
      onSuccess: (res) => {
        setIsSuccess(true); // 👈 Guard ko rokne ke liye flag true karein
        setIsModalOpen(false);
        toast.success("Order placed successfully!");
        
        if (typeof window !== "undefined") {
          localStorage.removeItem("petlux_cart"); 
          window.dispatchEvent(new CustomEvent('cart:updated', { detail: [] }));
        }

        // Thoda delay dein taaki state update ho jaye
        setTimeout(() => {
          router.push(`/order-confirmation/${res.order_id}`);
        }, 100);
      },
      onError: (error: any) => {
        const errorMsg = error?.response?.data?.message || "Failed to place order.";
        toast.error(errorMsg);
      }
    });
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleProceed}>
        <ShippingForm data={shipping} onChange={setShipping} />
        <button type="submit" className={styles.submitBtn}>
          Proceed to Payment
        </button>
      </form>

      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmOrder}
        isSubmitting={isPlacing}
      />

      {/* 👈 Hidden input jisse parent ko pata chal jaye ke success ho gaya hai */}
      {isSuccess && <span id="order-success-flag" style={{ display: 'none' }}></span>}
    </>
  );
}
