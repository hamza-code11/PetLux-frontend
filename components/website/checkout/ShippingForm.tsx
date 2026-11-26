"use client";

import styles from "./ShippingForm.module.css";

export interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface Props {
  data: ShippingData;
  onChange: (data: ShippingData) => void;
}

export default function ShippingForm({ data, onChange }: Props) {
  const handleChange = (field: keyof ShippingData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shipping Information</h2>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.label}>First Name</label>
          <input
            type="text"
            className={styles.input}
            value={data.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Last Name</label>
          <input
            type="text"
            className={styles.input}
            value={data.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.input}
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Phone</label>
          <input
            type="tel"
            className={styles.input}
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />
        </div>

        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label className={styles.label}>Address</label>
          <input
            type="text"
            className={styles.input}
            value={data.address}
            onChange={(e) => handleChange("address", e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>City</label>
          <input
            type="text"
            className={styles.input}
            value={data.city}
            onChange={(e) => handleChange("city", e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Postal Code</label>
          <input
            type="text"
            className={styles.input}
            value={data.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            required
          />
        </div>

        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label className={styles.label}>Country</label>
          <input
            type="text"
            className={styles.input}
            value={data.country}
            onChange={(e) => handleChange("country", e.target.value)}
            required
          />
        </div>
      </div>
    </section>
  );
}
