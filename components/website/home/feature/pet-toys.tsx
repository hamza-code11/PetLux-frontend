"use client";

import Image from "next/image";
import Link from "next/link";
import { useCmsSection, PetToysContent } from "@/hooks/useCms";
import { getImageUrl } from "@/lib/imageUrl";
import styles from "./pet-toys.module.css";

export default function PetToys() {
  const { data, isLoading } = useCmsSection<PetToysContent>("pet_toys");
  const c = data?.data?.content;

  if (isLoading || !c) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: 60 }}>
            Loading...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageGrid}>
          {c.images.map((img, idx) => (
            <Link
              key={idx}
              href={`/shop/${img.slug}`}
              className={styles.imageItem}
              aria-label={img.slug}
            >
              <Image
                src={getImageUrl(img.src)}
                alt={img.slug}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className={styles.image}
              />
            </Link>
          ))}
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>{c.title}</h2>
          <p className={styles.description}>{c.description}</p>

          <ul className={styles.features}>
            {c.features.map((feature, idx) => (
              <li key={idx}>
                <span className={styles.tick}>✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <div className={styles.bottomSection}>
            <Link href={c.button_link || "/shop"} className={styles.button}>
              {c.button_text || "SHOP"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
