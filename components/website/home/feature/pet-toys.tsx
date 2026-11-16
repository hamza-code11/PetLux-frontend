import Image from "next/image";
import Link from "next/link";
import styles from "./pet-toys.module.css";

const TOY_IMAGES = [
  {
    src: "https://images.pexels.com/photos/18478445/pexels-photo-18478445.jpeg?w=600&q=80",
    alt: "Dog playing with rope toy",
  },
  {
    src: "https://images.pexels.com/photos/39366703/pexels-photo-39366703.jpeg?w=600&q=80",
    alt: "Cat playing with toy",
  },
  {
    src: "https://images.pexels.com/photos/35384288/pexels-photo-35384288.jpeg?w=600&q=80",
    alt: "Puppy with carrot toy",
  },
  {
    src: "https://images.pexels.com/photos/9182007/pexels-photo-9182007.jpeg?w=600&q=80",
    alt: "Dog chewing rope toy",
  },
];

const FEATURES = [
  "Durable & non-toxic materials",
  "Designed for active play",
  "Vet-approved for safe chewing",
  "Interactive & engaging designs",
];

export default function PetToys() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Left Side: 4 Image Grid */}
        <div className={styles.imageGrid}>
          {TOY_IMAGES.map((img, idx) => (
            <div key={idx} className={styles.imageItem}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className={styles.image}
              />
            </div>
          ))}
        </div>

        {/* Right Side: Content */}
        <div className={styles.content}>
          <h2 className={styles.title}>
            PET TOYS
          </h2>
          
          <p className={styles.description}>
            Keep your furry friend entertained and active with our premium collection of pet toys. From durable rope toys to interactive plushies, every piece is crafted to spark joy, stimulate their mind, and strengthen the bond between you and your pet.
          </p>
          
          <ul className={styles.features}>
            {FEATURES.map((feature, idx) => (
              <li key={idx}>
                <span className={styles.tick}>✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <div className={styles.bottomSection}>
            <Link href="/shop/toys" className={styles.button}>
              SHOP TOYS
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
