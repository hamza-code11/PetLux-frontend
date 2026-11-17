import Image from "next/image";
import Link from "next/link";
import styles from "./asymmetric-banner.module.css";

export default function AsymmetricBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Left Side: Text */}
        <div className={styles.content}>
          <span className={styles.eyebrow}>NUTRITION MEETS FLAVOR</span>
          <h2 className={styles.title}>
            REAL FOOD FOR <br /> HAPPY TAILS
          </h2>
          <p className={styles.description}>
            Give your pet the nutrition they deserve. Our vet-formulated recipes are made with real, wholesome ingredients—no fillers, no artificial preservatives, just pure goodness in every bite.
          </p>
          
          <ul className={styles.features}>
            <li>
              <span className={styles.tick}>✓</span>
              Vet-formulated & grain-free options
            </li>
            <li>
              <span className={styles.tick}>✓</span>
              100% real meat & fresh produce
            </li>
            <li>
              <span className={styles.tick}>✓</span>
              Rich in Omega-3 for a healthy coat
            </li>
          </ul>

          <Link href="/shop/food" className={styles.button}>
            SHOP PREMIUM FOOD
          </Link>
        </div>

        {/* Right Side: Image */}
        <div className={styles.imageSide}>
          <Image
            src="/hero/01.jfif" 
            alt="Premium pet food ingredients"
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={styles.image}
          />
        </div>

      </div>
    </section>
  );
}
