
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCmsSection, BannerContent } from "@/hooks/useCms";
import { getImageUrl } from "@/lib/imageUrl";
import styles from "./banner.module.css";

export default function Banner() {
  const { data, isLoading } =
    useCmsSection<BannerContent>("banner_section");

  const content = data?.data?.content;

  if (isLoading || !content?.image) return null;

  const imageUrl = getImageUrl(content.image);

  return (
    <section className={styles.section} aria-label="Promotional Banner">
      <div className={styles.bannerWrapper}>
        {content.link ? (
          <Link
            href={content.link}
            className={styles.bannerLink}
            aria-label="View promotional offer"
          >
            <Image
              src={imageUrl}
              alt="PetLux Promotional Banner"
              fill
              priority
              sizes="100vw"
              className={styles.image}
            />
          </Link>
        ) : (
          <Image
            src={imageUrl}
            alt="PetLux Promotional Banner"
            fill
            priority
            sizes="100vw"
            className={styles.image}
          />
        )}
      </div>
    </section>
  );
}

