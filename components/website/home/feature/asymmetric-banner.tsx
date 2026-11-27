
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCmsSection, FoodContent } from "@/hooks/useCms";
import { getImageUrl } from "@/lib/imageUrl";
import styles from "./asymmetric-banner.module.css";

export default function AsymmetricBanner() {
  const { data, isLoading } =
    useCmsSection<FoodContent>("food_section");

  const content = data?.data?.content;

  if (isLoading || !content) return null;

  const imageUrl = content.image
    ? getImageUrl(content.image)
    : null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Left Side: Dynamic Content */}
        <div className={styles.content}>
          {content.eyebrow && (
            <span className={styles.eyebrow}>
              {content.eyebrow}
            </span>
          )}

          <h2 className={styles.title}>
            {content.title}
          </h2>

          {content.description && (
            <p className={styles.description}>
              {content.description}
            </p>
          )}

          {content.features?.length > 0 && (
            <ul className={styles.features}>
              {content.features
                .filter(Boolean)
                .map((feature, index) => (
                  <li key={index}>
                    <span className={styles.tick}>✓</span>
                    {feature}
                  </li>
                ))}
            </ul>
          )}

          {content.button_text && content.button_link && (
            <Link
              href={content.button_link}
              className={styles.button}
            >
              {content.button_text}
            </Link>
          )}
        </div>

        {/* Right Side: Dynamic Image */}
        <div className={styles.imageSide}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={content.title || "Pet food"}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={styles.image}
            />
          ) : (
            <div className={styles.imageFallback} />
          )}
        </div>

      </div>
    </section>
  );
}


