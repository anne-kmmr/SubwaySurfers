"use client";

import styles from "./Home.module.css";
import Header from "./components/Header/Header";
import EyeIcon from "@/app/components/Icons/EyeIcon/EyeIcon";
import Link from "next/link";
import { useEffect, useState } from "react";

type Set = {
  id: string;
  title: string;
  count: number;
  color: string;
};

/* -----------------------------
   SET COLORS
   1. Set = Rot
   2. Set = Gelb
   3. Set = Grün
   danach wiederholen
------------------------------ */
const setColors = [
  "--red",
  "--yellow",
  "--green",
];

export default function HomePage() {
  const [sets, setSets] = useState<Set[]>([]);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const res = await fetch("/api/sets");
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("API hat kein Array zurückgegeben");
        }

        const mapped: Set[] = data.map((set: any, index: number) => ({
          ...set,
          color: setColors[index % setColors.length],
        }));

        setSets(mapped);
      } catch (err) {
        console.error("Fetch error:", err);
        setSets([]);
      }
    };

    fetchSets();
  }, []);

  return (
    <>
      <Header title="Home" />

      <main className={styles.container}>
        <div className={styles.newBoxContainer}>
          <Link className={styles.newBoxLink} href="/createBoxView">
            + Neue Karteikartenbox
          </Link>
        </div>

        <div className={styles.cardsWrapper}>
          {sets.map((set) => (
            <div
              key={set.id}
              className={styles.card}
              style={{
                borderLeft: `10px solid var(${set.color})`,
              }}
            >
              <h2>{set.title}</h2>
              <p>{set.count} Karten</p>

              <div className={styles.buttonRow}>
                {/* Lernen = immer blau */}
                <Link
                  href="/learningMode"
                  className={styles.button}
                  style={{
                    backgroundColor: "var(--blue)",
                    color: "white",
                  }}
                >
                  Lernen
                </Link>

                {/* Auge = immer rot */}
                <Link
                  href="/cardsView"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--red)",
                  }}
                >
                  <EyeIcon className={styles.EyeIcon} />
                </Link>

                {/* Karteikasten = immer lila */}
                <Link
                  href="/flashcardboxes"
                  className={styles.button}
                  style={{
                    backgroundColor: "var(--purple)",
                    color: "white",
                  }}
                >
                  Karteikasten
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}