import Image from "next/image";
import styles from "./banner.module.css";

export default function Banner() {
  return (
    <section className={styles.section} aria-label="Promotional Banner">
      <div className={styles.bannerWrapper}>
        <Image
          src="/banner/01.png" // <-- Yahan apna image path dein
          alt="PetLux Promotional Banner"
          fill
          priority
          sizes="100vw" // Full width image optimize karne ke liye
          className={styles.image}
        />
      </div>
    </section>
  );
}