// "use client";

// import Image from "next/image";
// import { useCallback, useEffect, useState } from "react";
// import type { CSSProperties } from "react";

// import { heroPets } from "@/data/hero";
// import styles from "./hero.module.css";

// const AUTOPLAY_MS = 3000;
// const RANGE = [-2, -1, 0, 1, 2];
// const SIDE_SIZE = 0.82;

// const mod = (n: number, m: number): number => ((n % m) + m) % m;

// type SlideStyle = CSSProperties & {
//   "--offset": number;
//   "--size": number;
// };

// export default function Hero() {
//   const total = heroPets.length;
//   const [counter, setCounter] = useState<number>(0);
//   const [paused, setPaused] = useState<boolean>(false);

//   const next = useCallback(() => setCounter((c) => c + 1), []);
//   const prev = useCallback(() => setCounter((c) => c - 1), []);

//   useEffect(() => {
//     if (paused) return;
//     const id = setInterval(next, AUTOPLAY_MS);
//     return () => clearInterval(id);
//   }, [next, paused]);

//   const active = mod(counter, total);

//   const goTo = (target: number) => {
//     let diff = target - active;
//     if (diff > total / 2) diff -= total;
//     if (diff < -total / 2) diff += total;
//     setCounter((c) => c + diff);
//   };

//   return (
//     <section className={styles.hero} aria-label="Featured pet categories">
//       <div className={styles.container}>
//         <div
//           className={styles.carousel}
//           onMouseEnter={() => setPaused(true)}
//           onMouseLeave={() => setPaused(false)}
//         >
//           {RANGE.map((offset) => {
//             const n = counter + offset;
//             const pet = heroPets[mod(n, total)];
//             const slideStyle: SlideStyle = {
//               "--offset": offset,
//               "--size": offset === 0 ? 1 : SIDE_SIZE,
//             };
//             return (
//               <div
//                 key={n}
//                 className={styles.slide}
//                 style={slideStyle}
//                 aria-hidden={offset !== 0}
//               >
//                 <Image
//                   src={pet.image}
//                   alt={`${pet.label} products at PetLux`}
//                   fill
//                   priority
//                   sizes="(max-width: 1024px) 100vw, 1200px"
//                   className={styles.image}
//                 />
//               </div>
//             );
//           })}

//           <button
//             type="button"
//             className={`${styles.arrow} ${styles.arrowLeft}`}
//             onClick={prev}
//             aria-label="Previous slide"
//           >
//             <span aria-hidden="true">&#8249;</span>
//           </button>
//           <button
//             type="button"
//             className={`${styles.arrow} ${styles.arrowRight}`}
//             onClick={next}
//             aria-label="Next slide"
//           >
//             <span aria-hidden="true">&#8250;</span>
//           </button>

//           <div className={styles.dots} role="tablist" aria-label="Slide navigation">
//             {heroPets.map((pet, i) => (
//               <button
//                 key={pet.id}
//                 type="button"
//                 role="tab"
//                 aria-selected={i === active}
//                 aria-label={`Go to ${pet.label}`}
//                 className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
//                 onClick={() => goTo(i)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



















// import Link from "next/link";
// import styles from "./hero.module.css";

// const FEATURES = [
//   { title: "Free Delivery", text: "On your first order" },
//   { title: "Vet Formulated", text: "Balanced for every life stage" },
//   { title: "Real Ingredients", text: "No fillers or artificial additives" },
//   { title: "Easy Returns", text: "30-day money-back promise" },
// ];

// const CHECKS = ["Vet-formulated recipes", "No artificial additives", "Fresh to your door"];

// export default function Hero() {
//   return (
//     <section className={styles.hero} aria-labelledby="hero-title">
//       <div className={styles.inner}>
//         <div className={styles.content}>
//           <span className={styles.rating}>
//             <span className={styles.stars} aria-hidden="true">★★★★★</span>
//             Rated 4.9 by 10,000+ pet parents
//           </span>

//           <h1 id="hero-title" className={styles.title}>
//             Real food for pets that{" "}
//             <span className={styles.highlight}>truly thrive.</span>
//           </h1>

//           <p className={styles.description}>
//             Nutritious, vet-formulated meals and everyday essentials, made with
//             honest ingredients and delivered fresh to your door.
//           </p>

//           <div className={styles.actions}>
//             <Link href="/shop" className={styles.primary}>
//               Shop Now
//               <span className={styles.arrow} aria-hidden="true">&rarr;</span>
//             </Link>
//             <Link href="/collections" className={styles.secondary}>
//               Explore Collection
//             </Link>
//           </div>

//           <ul className={styles.checks}>
//             {CHECKS.map((item) => (
//               <li key={item}>
//                 <span className={styles.tick} aria-hidden="true">✓</span>
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className={styles.visual}>
//           <div className={styles.photo}>
//             <video
//               className={styles.video}
//               src="https://assets.mixkit.co/videos/50687/50687-360.mp4"
//               poster="https://assets.mixkit.co/videos/50687/50687-thumb-360-0.jpg"
//               autoPlay
//               muted
//               loop
//               playsInline
//               preload="auto"
//               aria-hidden="true"
//               tabIndex={-1}
//             />
//           </div>
//         </div>
//       </div>

//       <div className={styles.features}>
//         <ul className={styles.featuresInner}>
//           {FEATURES.map((f) => (
//             <li key={f.title} className={styles.feature}>
//               <span className={styles.featureIcon} aria-hidden="true">✓</span>
//               <div>
//                 <strong>{f.title}</strong>
//                 <span>{f.text}</span>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// }































import Link from "next/link";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import styles from "./hero.module.css";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hero",
  display: "swap",
});

const FEATURES = [
  { lines: ["Premium Quality", "Ingredients"], icon: "shield" },
  { lines: ["Supports Overall", "Health"], icon: "heart" },
  { lines: ["Loved by", "Pets"], icon: "paw" },
  { lines: ["Fast & Reliable", "Delivery"], icon: "truck" },
] as const;

function FeatureIcon({ type }: { type: (typeof FEATURES)[number]["icon"] }) {
  const common = {
    className: styles.featureIcon,
    viewBox: "0 0 48 48",
    fill: "none",
    "aria-hidden": true,
  } as const;

  if (type === "shield") {
    return (
      <svg {...common}>
        <path
          d="M24 3 42 10v14c0 10-8 18-18 22C14 42 6 34 6 24V10z"
          fill="#FECC10"
          stroke="#111"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="m16 24 6 6 11-12"
          stroke="#111"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "heart") {
    return (
      <svg {...common}>
        <path
          d="M24 42C6 28 4 18 10 11c6-6 13-2 14 3 1-5 8-9 14-3 6 7 4 17-14 31z"
          fill="#FECC10"
          stroke="#111"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "paw") {
    return (
      <svg {...common} fill="#FECC10">
        <use href="#kk-paw" width="48" height="48" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M2 18h9M4 25h9M7 32h6" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      <rect x="15" y="12" width="22" height="22" rx="2" fill="#FECC10" stroke="#111" strokeWidth="3" />
      <path
        d="M37 19h6l5 7v8H37z"
        fill="#FECC10"
        stroke="#111"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="23" cy="37" r="4.5" fill="#fff" stroke="#111" strokeWidth="3" />
      <circle cx="42" cy="37" r="4.5" fill="#fff" stroke="#111" strokeWidth="3" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      className={`${font.variable} ${styles.hero}`}
      aria-labelledby="hero-title"
    >
      {/* Paw shape (ek baar define, baar baar use hota hai) */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <symbol id="kk-paw" viewBox="0 0 100 100">
            <ellipse cx="17" cy="45" rx="9" ry="12" transform="rotate(-20 17 45)" />
            <ellipse cx="38" cy="22" rx="10" ry="14" transform="rotate(-8 38 22)" />
            <ellipse cx="62" cy="22" rx="10" ry="14" transform="rotate(8 62 22)" />
            <ellipse cx="83" cy="45" rx="9" ry="12" transform="rotate(20 83 45)" />
            <path d="M50 48C32 48 18 66 22 80c3 10 14 10 28 6 14 4 25 4 28-6 4-14-10-32-28-32z" />
          </symbol>
        </defs>
      </svg>

      {/* ---------- Photo ---------- */}
      <Image
        src="/images/hero-pets.jpg"
        alt="Golden retriever and cat beside a bowl of food and a Kam KarP pet food bag"
        width={1197}
        height={646}
        priority
        sizes="(max-width: 860px) 100vw, 72vw"
        className={styles.photo}
      />

      {/* ---------- Background decoration ---------- */}
      <svg
        className={styles.decor}
        viewBox="0 0 1667 826"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 0H132C98 30 58 76 0 98Z" fill="#FDDB5D" />
        <path d="M0 548C62 560 134 602 226 636L0 658Z" fill="#FECC10" />
        <path d="M1667 626C1556 652 1418 742 1288 826H1667Z" fill="#FECC10" />
        <use href="#kk-paw" x="1566" y="700" width="76" height="76" fill="#fff" opacity="0.55" />
        <use href="#kk-paw" x="-22" y="418" width="70" height="70" fill="#E9E3DB" opacity="0.7" />
      </svg>

      {/* ---------- Content ---------- */}
      <div className={styles.content}>
        <span className={styles.badge}>
          <span className={styles.badgeIcon}>
            <svg viewBox="0 0 100 100" fill="#111" aria-hidden="true">
              <use href="#kk-paw" width="100" height="100" />
            </svg>
          </span>
          Healthy Food &nbsp;•&nbsp; Happy Pets
        </span>

        <h1 id="hero-title" className={styles.title}>
          <span className={styles.line}>PetLux</span>
          <span className={styles.line}>
            Pet{" "}
            <span className={styles.foods}>
              Foods
              <svg
                className={styles.swoosh}
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M3 11C45 3 120 1 197 7"
                  stroke="#FECC10"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </span>
        </h1>

        <p className={styles.tagline}>
          Nutritious, Delicious &amp; Trusted Pet Food for a Healthier, Happier
          Life.
        </p>

        <Link href="/shop" className={styles.cta}>
          Shop Now
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      {/* ---------- Features bar ---------- */}
      <ul className={styles.features}>
        {FEATURES.map((f) => (
          <li key={f.icon} className={styles.feature}>
            <FeatureIcon type={f.icon} />
            <span className={styles.featureText}>
              {f.lines.map((line) => (
                <span key={line} className={styles.featureLine}>
                  {line}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}


