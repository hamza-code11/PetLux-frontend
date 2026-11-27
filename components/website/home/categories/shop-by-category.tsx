"use client";

import Link from "next/link";
import Image from "next/image";
import { useCmsSection, CategoryContent } from "@/hooks/useCms";
import { getImageUrl } from "@/lib/imageUrl";
import styles from "./shop-by-category.module.css";

export default function ShopByCategory() {
  const { data, isLoading } = useCmsSection<CategoryContent>("category_section");
  const c = data?.data?.content;
  const categories = c?.categories ?? [];

  // Loading / empty: section hide (ya skeleton)
  if (isLoading) {
    return (
      <section className={styles.section} aria-labelledby="shop-by-category-title">
        <div className={styles.inner}>
          <div className={styles.header}>
            <h2 id="shop-by-category-title" className={styles.title}>
              Shop by Category
            </h2>
            <p className={styles.subtitle}>Loading categories...</p>
          </div>
          <div className={styles.bentoGrid}>
            <div className={styles.card} style={{ gridRow: "span 2" }} />
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className={styles.card} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!c || categories.length === 0) return null;

  const [main, ...rest] = categories;
  const smallCategories = rest.slice(0, 4); // max 4 chhoti

  return (
    <section className={styles.section} aria-labelledby="shop-by-category-title">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 id="shop-by-category-title" className={styles.title}>
            {c.title || "Shop by Category"}
          </h2>
          {c.subtitle && <p className={styles.subtitle}>{c.subtitle}</p>}
        </div>

        <div className={styles.bentoGrid}>
          {/* Main (badi) card */}
          {main && (
            <Link
              href={`/shop/${main.slug}`}
              className={`${styles.card} ${styles.mainCard}`}
            >
              {main.image ? (
                <Image
                  src={getImageUrl(main.image)}
                  alt={main.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={styles.image}
                />
              ) : (
                <div className={styles.imageFallback} />
              )}
              <div className={styles.overlay}>
                <span className={styles.name}>{main.name}</span>
              </div>
            </Link>
          )}

          {/* Chhoti cards */}
          {smallCategories.map((cat, idx) => (
            <Link key={idx} href={`/shop/${cat.slug}`} className={styles.card}>
              {cat.image ? (
                <Image
                  src={getImageUrl(cat.image)}
                  alt={cat.name}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className={styles.image}
                />
              ) : (
                <div className={styles.imageFallback} />
              )}
              <div className={styles.overlay}>
                <span className={styles.name}>{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
