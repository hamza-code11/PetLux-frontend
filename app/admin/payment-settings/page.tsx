"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/Toast/ToastContext";
import { useGetPaymentSettings, useUpdatePaymentSettings } from "@/hooks/useSettings";
import { getImageUrl } from "@/lib/imageUrl";
import styles from "./PaymentSettingsPage.module.css";

export default function PaymentSettingsPage() {
  const { toast } = useToast();
  
  const { data, isLoading } = useGetPaymentSettings();
  const { mutate: updateSettings, isPending: isSaving } = useUpdatePaymentSettings();

  const [formData, setFormData] = useState({
    bank_name: "",
    account_title: "",
    account_number: "",
    iban: "",
    instructions: "",
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isRemovingImage, setIsRemovingImage] = useState(false); // 👈 Naya state

  useEffect(() => {
    if (data?.data) {
      setFormData({
        bank_name: data.data.bank_name || "",
        account_title: data.data.account_title || "",
        account_number: data.data.account_number || "",
        iban: data.data.iban || "",
        instructions: data.data.instructions || "",
      });

      if (data.data.qr_image_path) {
        setPreview(getImageUrl(data.data.qr_image_path));
      } else {
        setPreview(null);
      }
      setIsRemovingImage(false);
    }
  }, [data]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 👈 Frontend Validation (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      e.target.value = ""; // Input reset
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setIsRemovingImage(false);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setImageFile(null);
    setIsRemovingImage(true); // 👈 Backend ko batayenge ke image delete karni hai
  };

  // ... imports same rahenge ...

  const handleSave = () => {
    const submitData = new FormData();
    
    submitData.append("bank_name", formData.bank_name);
    submitData.append("account_title", formData.account_title);
    submitData.append("account_number", formData.account_number);
    submitData.append("iban", formData.iban);
    submitData.append("instructions", formData.instructions);

    if (imageFile) {
      submitData.append("qr_image", imageFile);
    }

    if (isRemovingImage) {
      submitData.append("remove_qr", "1");
    }

    updateSettings(
      { formData: submitData },
      {
        onSuccess: (res: any) => {
          toast.success("Payment settings saved successfully.");
          setImageFile(null);
          setIsRemovingImage(false);
          
          // 👈 Backend se aane wale naye path ko preview me set karein
          if (isRemovingImage) {
            setPreview(null);
          } else if (res?.data?.qr_image_path) {
            setPreview(getImageUrl(res.data.qr_image_path));
          }
        },
        onError: (error: any) => {
          // 👈 Exact Error show karein (e.g. File size issue)
          if (error?.response?.data?.errors) {
            const firstError = Object.values(error.response.data.errors)[0] as string[];
            toast.error(firstError[0]);
          } else {
            toast.error(error?.response?.data?.message || "Failed to save settings.");
          }
        },
      }
    );
  };

// ... baaki UI same rahega ...


  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loading}>Loading settings...</div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Payment Settings</h1>
          <p className={styles.subtitle}>
            Manage bank details and QR code for customer payments.
          </p>
        </div>
        <button 
          className={styles.saveBtn} 
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className={styles.contentBox}>
        
        {/* LEFT: FORM */}
        <div className={styles.leftSection}>
          <h2 className={styles.sectionTitle}>Bank Account Details</h2>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Bank Name</label>
            <input
              type="text"
              className={styles.input}
              value={formData.bank_name}
              onChange={(e) => handleInputChange("bank_name", e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Account Title</label>
            <input
              type="text"
              className={styles.input}
              value={formData.account_title}
              onChange={(e) => handleInputChange("account_title", e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Account Number</label>
            <input
              type="text"
              className={styles.input}
              value={formData.account_number}
              onChange={(e) => handleInputChange("account_number", e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>IBAN</label>
            <input
              type="text"
              className={styles.input}
              value={formData.iban}
              onChange={(e) => handleInputChange("iban", e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Payment Instructions</label>
            <textarea
              className={styles.textarea}
              rows={4}
              value={formData.instructions}
              onChange={(e) => handleInputChange("instructions", e.target.value)}
            />
          </div>
        </div>

        {/* RIGHT: IMAGE UPLOAD */}
        <div className={styles.rightSection}>
          <h2 className={styles.sectionTitle}>Payment QR / Screenshot</h2>
          
          <div className={styles.uploadBox}>
            {preview ? (
              <div className={styles.previewWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={preview} 
                  alt="Payment QR" 
                  className={styles.previewImage} 
                />
                <button 
                  className={styles.removeBtn}
                  onClick={handleRemoveImage}
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className={styles.uploadLabel}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className={styles.uploadText}>Click to upload QR or Screenshot</span>
                <span className={styles.uploadHint}>PNG, JPG, WEBP, SVG up to 5MB</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className={styles.fileInput} 
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}