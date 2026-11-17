"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ProductGallery.module.css";

interface Props {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: Props) {
  const [activeImage, setActiveImage] = useState(images[0] || "");

  useEffect(() => {
    if (images.length > 0) {
      setActiveImage(images[0]);
    }
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbnails}>
        {images.map((img, idx) => (
          <button
            key={idx}
            className={`${styles.thumbBtn} ${activeImage === img ? styles.active : ""}`}
            onClick={() => setActiveImage(img)}
          >
            <Image src={img} alt={`${name} thumbnail ${idx + 1}`} fill className={styles.thumbImage} />
          </button>
        ))}
      </div>

      <div className={styles.mainImageWrapper}>
        <Image
          src={activeImage}
          alt={name}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          className={styles.mainImage}
        />
      </div>
    </div>
  );
}

