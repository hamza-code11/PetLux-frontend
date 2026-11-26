export interface OrderItem {
  id: number;
  name: string;
  variant_name?: string | null;
  quantity: number;
  price: number | string;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country: string;
  subtotal: number | string;
  shipping_fee: number | string;
  total: number | string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items_count: number;
  items: OrderItem[];
  date: string;
  payment_method?: string;            // e.g. "Bank Transfer", "JazzCash", "COD"
  payment_screenshot?: string | null; // image URL
}

