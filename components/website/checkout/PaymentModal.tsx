"use client";

import { useState, useEffect } from "react";
import { useGetPaymentSettings } from "@/hooks/useSettings";
import { getImageUrl } from "@/lib/imageUrl";
import styles from "./PaymentModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (screenshot: File) => void;
  isSubmitting: boolean;
}

export default function PaymentModal({ isOpen, onClose, onConfirm, isSubmitting }: Props) {
  const { data, isLoading } = useGetPaymentSettings();
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setScreenshot(null);
      setPreview(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const settings = data?.data;

  return (
    <div className={styles.overlay} onClick={!isSubmitting ? onClose : undefined}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>Complete Payment</h2>
          <button className={styles.closeBtn} onClick={onClose} disabled={isSubmitting}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isLoading ? (
          <div className={styles.loading}>Loading bank details...</div>
        ) : (
          <div className={styles.contentArea}>
            
            {/* MAIN TWO-COLUMN GRID */}
            <div className={styles.gridLayout}>
              
              {/* LEFT COLUMN: Bank Details & QR */}
              <div className={styles.leftCol}>
                
                {/* Bank Details */}
                <h3 className={styles.sectionTitle}>Bank Account Details</h3>
                <div className={styles.bankDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Bank Name:</span>
                    <span className={styles.value}>{settings?.bank_name || "—"}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Account Title:</span>
                    <span className={styles.value}>{settings?.account_title || "—"}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Account Number:</span>
                    <span className={styles.value}>{settings?.account_number || "—"}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>IBAN:</span>
                    <span className={styles.value}>{settings?.iban || "—"}</span>
                  </div>
                </div>

                {/* QR Code */}
                {settings?.qr_image_path && (
                  <>
                    <h3 className={`${styles.sectionTitle} ${styles.qrTitle}`}>Scan QR to Pay</h3>
                    <div className={styles.qrWrapper}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={getImageUrl(settings.qr_image_path)} 
                        alt="Payment QR" 
                        className={styles.qrImage} 
                      />
                    </div>
                  </>
                )}
              </div>

              {/* RIGHT COLUMN: Image Upload */}
              <div className={styles.rightCol}>
                <h3 className={styles.sectionTitle}>Upload Payment Proof *</h3>
                <div className={styles.uploadArea}>
                  {!preview ? (
                    <label className={styles.uploadBox}>
                      <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className={styles.uploadText}>Click to upload</span>
                      <span className={styles.uploadHint}>PNG, JPG up to 5MB</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className={styles.fileInput} 
                      />
                    </label>
                  ) : (
                    <div className={styles.previewWrapper}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={preview} alt="Screenshot Preview" className={styles.previewImage} />
                      <button className={styles.removeBtn} onClick={() => { setScreenshot(null); setPreview(null); }}>
                        Change Image
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* FULL WIDTH INSTRUCTIONS ROW */}
            {settings?.instructions && (
              <div className={styles.instructionsBox}>
                <p>{settings.instructions}</p>
              </div>
            )}

          </div>
        )}

        <div className={styles.footer}>
          <button 
            className={styles.cancelBtn} 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            className={styles.confirmBtn} 
            onClick={() => screenshot && onConfirm(screenshot)}
            disabled={!screenshot || isSubmitting}
          >
            {isSubmitting ? "Placing Order..." : "Confirm Order"}
          </button>
        </div>

      </div>
    </div>
  );
}