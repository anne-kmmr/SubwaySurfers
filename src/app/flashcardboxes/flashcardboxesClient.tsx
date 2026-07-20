//Datei von Sandro

"use client";

import Link from "next/link";
import styles from "./flashcardboxes.module.css";
import Header from "../cardsView/components/Header/Header";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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
  const [counts, setCounts] = useState({
    toLearn: 0,
    inProgress: 0,
    learned: 0,
  });

  const searchParams = useSearchParams();
  const currentSet = searchParams.get('set')

  useEffect(() => {
    if (currentSet) {
    loadCounts();
    }
  }, [currentSet])

  const loadCounts = async () => {
    try{ const response = await fetch(
      `http://localhost:3001/learningStatus?set=${encodeURIComponent(currentSet ?? '')}`
    )

    const data = await response.json();

    setCounts({
      toLearn: data.learning,
      inProgress: data.inProgress,
      learned: data.learned,
    });

    } catch (err) {
      console.log(err);
  }
}

  //gibt die drei Boxen zurück
  return (
    <>
      <Header title="Lernboxen" backHref="/" />
      <main className={styles.content} aria-label="Karteikästen">
        <BoxCard
          title="Zu Lernen"
          count={counts.toLearn}
          variant="red"
          href={`/learningMode?set=${encodeURIComponent(currentSet ?? "")}&status=learning`}
        />
        <BoxCard
          title="In Arbeit"
          count={counts.inProgress}
          variant="yellow"
          href={`/learningMode?set=${encodeURIComponent(currentSet ?? "")}&status=inProgress`}
        />
        <BoxCard
          title="Gelernt"
          count={counts.learned}
          variant="green"
          href={`/learningMode?set=${encodeURIComponent(currentSet ?? "")}&status=learned`}
        />
      </main>
    </>
  );
}
