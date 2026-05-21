//Datei von Sandro

"use client";

import Link from "next/link";
import styles from "./flashcardboxes.module.css";
import Header from "../components/Header/Header";

type BoxCardProps = {
  title: string;
  count: number;
  variant: "red" | "yellow" | "green";
  href: string;
};


//Erstellt die Vokabelboxen
function BoxCard({ title, count, variant, href }: BoxCardProps) {
  return (
    <Link
      className={`${styles.box} ${styles[variant]}`}
      href={href}
      aria-label={`${title} (${count} Karten)`}
    >
      <div className={styles.boxLidTop}></div>
      <div className={styles.boxLid}>
        <div className={styles.boxTitle}>{title}</div>
      </div>
      <div className={styles.boxBody}>
        <div className={styles.boxCount}>
          <span className={styles.boxCountNumber}>{count}</span> Karten
        </div>
      </div>
      <div className={styles.boxShadow} aria-hidden="true"></div>
    </Link>
  );
}

export default function BoxCardPage() {
    //hier nur Beispielimplementierung von Sandro damals, bitte nachbessern!
  const counts = {
    toLearn: 8,
    inProgress: 4,
    learned: 3,
  };

  //gibt die drei Boxen zurück
  return (
    <>
      <Header title="Lernboxen" backHref="/" />
      <main className={styles.content} aria-label="Karteikästen">
        <BoxCard
          title="Zu Lernen"
          count={counts.toLearn}
          variant="red"
          href="/learningMode"
        />
        <BoxCard
          title="In Arbeit"
          count={counts.inProgress}
          variant="yellow"
          href="/learningMode"
        />
        <BoxCard
          title="Gelernt"
          count={counts.learned}
          variant="green"
          href="/learningMode"
        />
      </main>
    </>
  );
}
