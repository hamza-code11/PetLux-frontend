import Link from "next/link";
import Image from "next/image";
import styles from "./shop-by-category.module.css";

const CATEGORIES = [
  { 
    id: "foods", 
    name: "Foods", 
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80", 
    href: "/shop/foods" 
  },
  { 
    id: "toys", 
    name: "Toys", 
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80", 
    href: "/shop/toys" 
  },
  { 
    id: "treats", 
    name: "Treats", 
    image: "https://images.unsplash.com/photo-1623366302587-b25ee0f5c4e3?w=600&q=80", 
    href: "/shop/treats" 
  },
  { 
    id: "accessories", 
    name: "Accessories", 
    image: "https://images.unsplash.com/photo-1558929996-da64ba858215?w=600&q=80", 
    href: "/shop/accessories" 
  },
  { 
    id: "grooming", 
    name: "Grooming", 
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80", 
    href: "/shop/grooming" 
  },
];

export default function ShopByCategory() {
  return (
    <section className={styles.section} aria-labelledby="shop-by-category-title">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 id="shop-by-category-title" className={styles.title}>
            Shop by Category
          </h2>
          <p className={styles.subtitle}>
            Everything your pet needs, neatly organised.
          </p>
        </div>

        <div className={styles.bentoGrid}>
          {/* Pehli Badi Image (Foods) */}
          <Link href={CATEGORIES[0].href} className={`${styles.card} ${styles.mainCard}`}>
            <Image
              src={CATEGORIES[0].image}
              alt={CATEGORIES[0].name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={styles.image}
            />
            <div className={styles.overlay}>
              <span className={styles.name}>{CATEGORIES[0].name}</span>
            </div>
          </Link>

          {/* Baaki 4 Choti Images */}
          {CATEGORIES.slice(1).map((cat) => (
            <Link key={cat.id} href={cat.href} className={styles.card}>
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className={styles.image}
              />
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