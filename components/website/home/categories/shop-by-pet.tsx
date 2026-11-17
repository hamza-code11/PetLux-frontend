import Link from "next/link";
import Image from "next/image";
import styles from "./shop-by-pet.module.css";

const CATEGORIES = [
  { 
    name: "Small Pets", 
    href: "/shop/dogs", 
    image: "/pets/01.jfif" 
  },
  { 
    name: "Dogs", 
    href: "/shop/cats", 
    image: "/pets/02.jfif" 
  },
  { 
    name: "Cate", 
    href: "/shop/small-pets", 
    image: "/pets/03.jfif" 
  },
  { 
    name: "Birds",
    href: "/shop/birds", 
    image: "/pets/04.jfif" 
  },
];

export default function ShopByPet() {
  return (
    <section className={styles.section} aria-labelledby="shop-by-pet-title">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.heading}>
            <span className={styles.eyebrow}>pet</span>
            <h2 id="shop-by-pet-title" className={styles.title}>
              Shop By{" "}
              <span className={styles.highlight}>Pets.</span>
            </h2>
          </div>

          <Link href="/shop" className={styles.viewAll}>
            View all products
            <span className={styles.viewAllArrow} aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <ul className={styles.grid}>
          {CATEGORIES.map((c) => (
            <li key={c.name}>
              <Link href={c.href} className={styles.card}>
                <div className={styles.media}>
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    unoptimized
                    sizes="(max-width: 400px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={styles.image}
                  />
                </div>

                <div className={styles.body}>
                  <div className={styles.info}>
                    <strong>{c.name}</strong>
                  </div>
                  <span className={styles.arrow} aria-hidden="true">&rarr;</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
