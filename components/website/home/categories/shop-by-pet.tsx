"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetPublicPetTypes } from "@/hooks/usePetTypes";
import styles from "./shop-by-pet.module.css";

const VISIBLE_COUNT = 4;

export default function ShopByPet() {
  const { data, isLoading } = useGetPublicPetTypes();
  const petTypes = data?.data ?? [];
  const isCarousel = petTypes.length > VISIBLE_COUNT;

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    if (!isCarousel) return;
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);

    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
      ro.disconnect();
    };
  }, [isCarousel, updateArrows, petTypes.length]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    const cardWidth = firstCard?.offsetWidth ?? 300;
    const gap = 24;
    el.scrollBy({ left: dir * (cardWidth + gap), behavior: "smooth" });
  };

  if (!isLoading && petTypes.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="shop-by-pet-title">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.heading}>
            <span className={styles.eyebrow}>pet</span>
            <h2 id="shop-by-pet-title" className={styles.title}>
              Shop By <span className={styles.highlight}>Pets.</span>
            </h2>
          </div>

          <div className={styles.headerRight}>
            {isCarousel && (canScrollLeft || canScrollRight) && (
              <div className={styles.arrows}>
                <button
                  type="button"
                  className={styles.arrowBtn}
                  onClick={() => scrollByCard(-1)}
                  disabled={!canScrollLeft}
                  aria-label="Previous pets"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={styles.arrowBtn}
                  onClick={() => scrollByCard(1)}
                  disabled={!canScrollRight}
                  aria-label="Next pets"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            <Link href="/shop" className={styles.viewAll}>
              View all products
              <span className={styles.viewAllArrow} aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <ul className={styles.grid}>
            {[1, 2, 3, 4].map((i) => (
              <li key={i}>
                <div className={`${styles.card} ${styles.skeleton}`}>
                  <div className={styles.media} />
                  <div className={styles.body}>
                    <div className={styles.info}>
                      <strong className={styles.skelLine} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : !isCarousel ? (
          /* ---------- Original 4-col grid (≤4 items) ---------- */
          <ul className={styles.grid}>
            {petTypes.map((p) => (
              <li key={p.id}>
                <Link href={`/shop/${p.slug}`} className={styles.card}>
                  <div className={styles.media}>
                    {p.image_url && (
                      <Image
                        src={p.image_url}
                        alt={p.name}
                        fill
                        unoptimized
                        sizes="(max-width: 400px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className={styles.image}
                      />
                    )}
                  </div>
                  <div className={styles.body}>
                    <div className={styles.info}>
                      <strong>{p.name}</strong>
                    </div>
                    <span className={styles.arrow} aria-hidden="true">&rarr;</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          /* ---------- Carousel (>4 items) ---------- */
          <div className={styles.scrollWrap}>
            <ul className={`${styles.grid} ${styles.gridScroll}`} ref={scrollRef as any}>
              {petTypes.map((p) => (
                <li key={p.id} data-card className={styles.gridItem}>
                  <Link href={`/shop/${p.slug}`} className={styles.card}>
                    <div className={styles.media}>
                      {p.image_url && (
                        <Image
                          src={p.image_url}
                          alt={p.name}
                          fill
                          unoptimized
                          sizes="(max-width: 400px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className={styles.image}
                        />
                      )}
                    </div>
                    <div className={styles.body}>
                      <div className={styles.info}>
                        <strong>{p.name}</strong>
                      </div>
                      <span className={styles.arrow} aria-hidden="true">&rarr;</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
