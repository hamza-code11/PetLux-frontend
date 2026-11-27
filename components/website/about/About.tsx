
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCmsSection, type AboutContent } from "@/hooks/useCms";
import { getImageUrl } from "@/lib/imageUrl";
import styles from "./About.module.css";

export default function About() {
  const { data, isLoading, isError, error } =
    useCmsSection<AboutContent>("about_section");

  console.log("About CMS API Response:", data);
  console.log("About CMS Error:", error);

  if (isLoading) {
    return <div>Loading About page...</div>;
  }

  if (isError) {
    return (
      <div>
        Failed to load About page.
        <pre>{String(error)}</pre>
      </div>
    );
  }

  const content = data?.data?.content;

  if (!content) {
    return (
      <div>
        About CMS content not found.
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }

  if (!content.hero || !content.mission || !content.team) {
    return (
      <div>
        About CMS data structure is incomplete.
        <pre>{JSON.stringify(content, null, 2)}</pre>
      </div>
    );
  }

  const getSectionImage = (key: string) => {
    const image = content.images?.find((item) => item.key === key);
    return image?.src ? getImageUrl(image.src) : null;
  };

  const heroImage = getSectionImage("hero");
  const missionImage = getSectionImage("mission");

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            {content.hero.eyebrow}
          </span>
          <h1 className={styles.heroTitle}>{content.hero.title}</h1>
          <p className={styles.heroDesc}>
            {content.hero.description}
          </p>
        </div>

        <div className={styles.heroImage}>
          {heroImage && (
            <Image
              src={heroImage}
              alt="About PetLux"
              fill
              priority
              unoptimized
              className={styles.imageCover}
            />
          )}
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.statsInner}>
          {content.stats?.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.mission}>
        <div className={styles.missionContent}>
          <span className={styles.eyebrow}>
            {content.mission.eyebrow}
          </span>
          <h2 className={styles.sectionTitle}>
            {content.mission.title}
          </h2>
          <p className={styles.desc}>
            {content.mission.description_one}
          </p>
          <p className={styles.desc}>
            {content.mission.description_two}
          </p>

          {content.mission.button_text &&
            content.mission.button_link && (
              <Link
                href={content.mission.button_link}
                className={styles.primaryBtn}
              >
                {content.mission.button_text}
              </Link>
            )}
        </div>

        <div className={styles.missionImage}>
          {missionImage && (
            <Image
              src={missionImage}
              alt="PetLux mission"
              fill
              unoptimized
              className={styles.imageCover}
            />
          )}
        </div>
      </section>

      <section className={styles.team}>
        <div className={styles.teamHeader}>
          <span className={styles.eyebrow}>
            {content.team.eyebrow}
          </span>
          <h2 className={styles.sectionTitle}>
            {content.team.title}
          </h2>
        </div>

        <div className={styles.teamGrid}>
          {content.team.members?.map((member, index) => (
            <div key={index} className={styles.teamCard}>
              <div className={styles.teamImageWrapper}>
                {member.image && (
                  <Image
                    src={getImageUrl(member.image)}
                    alt={member.name}
                    fill
                    unoptimized
                    className={styles.imageCover}
                  />
                )}
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

