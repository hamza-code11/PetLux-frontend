import Image from "next/image";
import Link from "next/link";
import styles from "./About.module.css";

const STATS = [
  { value: "10K+", label: "Happy Pets" },
  { value: "500+", label: "Premium Products" },
  { value: "50+", label: "Trusted Brands" },
  { value: "4.9", label: "Average Rating" },
];

const TEAM = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
  },
  {
    name: "Emily Davis",
    role: "Veterinary Advisor",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
  },
];

export default function About() {
  return (
    <div className={styles.container}>
      
      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Our Story</span>
          <h1 className={styles.heroTitle}>
            We believe every pet deserves the best.
          </h1>
          <p className={styles.heroDesc}>
            At PetLux, we're on a mission to make premium pet care accessible to everyone. 
            From vet-formulated food to thoughtfully designed essentials, everything we do 
            is driven by our love for animals.
          </p>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&q=80"
            alt="Happy dogs"
            fill
            priority
            className={styles.imageCover}
          />
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statsInner}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Mission Section */}
      <section className={styles.mission}>
        <div className={styles.missionContent}>
          <span className={styles.eyebrow}>Our Mission</span>
          <h2 className={styles.sectionTitle}>
            More than just a pet store.
          </h2>
          <p className={styles.desc}>
            We started PetLux because we were frustrated with the lack of transparency 
            in the pet products industry. Too many brands hide behind vague ingredient lists, 
            use cheap fillers, and prioritize profit over the health of our furry friends. 
            We knew there had to be a better way.
          </p>
          <p className={styles.desc}>
            That's why every single product on our shelves is carefully vetted by our 
            in-house veterinary team. We dig deep into sourcing, manufacturing processes, 
            and nutritional value. We only stock what we would confidently feed our own pets — 
            nothing less. Our promise is simple: honest ingredients, transparent pricing, 
            and exceptional quality that you can trust.
          </p>
          <Link href="/shop" className={styles.primaryBtn}>
            Shop Our Collection
          </Link>
        </div>
        <div className={styles.missionImage}>
          <Image
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80"
            alt="Vet examining pet"
            fill
            className={styles.imageCover}
          />
        </div>
      </section>

      {/* 4. Team Section */}
      <section className={styles.team}>
        <div className={styles.teamHeader}>
          <span className={styles.eyebrow}>Meet the Team</span>
          <h2 className={styles.sectionTitle}>The people behind PetLux</h2>
        </div>
        <div className={styles.teamGrid}>
          {TEAM.map((member) => (
            <div key={member.name} className={styles.teamCard}>
              <div className={styles.teamImageWrapper}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className={styles.imageCover}
                />
              </div>
              <div className={styles.teamInfo}>
                <h3 className={styles.teamName}>{member.name}</h3>
                <span className={styles.teamRole}>{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

