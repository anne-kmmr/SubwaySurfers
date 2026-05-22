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
  learnColor: string;
};

/* -----------------------------
   CARD COLORS (inkl. rot + lila erlaubt)
------------------------------ */
const cardColors = [
  "--red",
  "--lightred",
  "--darkred",
  "--yellow",
  "--lightyellow",
  "--darkyellow",
  "--blue",
  "--lightblue",
  "--darkblue",
  "--green",
  "--lightgreen",
  "--darkgreen",
  "--purple",
];

/* -----------------------------
   LEARNING COLORS (kein rot, kein lila)
------------------------------ */
const learningColors = [
  "--blue",
  "--lightblue",
  "--darkblue",
  "--green",
  "--lightgreen",
  "--darkgreen",
  "--yellow",
  "--lightyellow",
  "--darkyellow",
];

/* -----------------------------
   HELPERS
------------------------------ */
const getRandomFrom = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const getCardColor = () => getRandomFrom(cardColors);
const getLearningColor = () => getRandomFrom(learningColors);

/* -----------------------------
   PAGE
------------------------------ */
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

        const mapped: Set[] = data.map((set: any) => ({
          ...set,
          color: getCardColor(),
          learnColor: getLearningColor(),
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
              style={{ borderLeft: `10px solid var(${set.color})` }}
            >
              <h2>{set.title}</h2>
              <p>{set.count} Karten</p>

              <div className={styles.buttonRow}>
                {/* LERNEN BUTTON (ruhige Farben) */}
                <Link
                  href={"/learningMode"}
                  className={styles.button}
                  style={{
                    backgroundColor: `var(${set.learnColor})`,
                    color: "white",
                  }}
                >
                  Lernen
                </Link>

                {/* VIEW BUTTON */}
                <Link
                  href={"/cardsView"}
                  style={{ backgroundColor: "transparent", color: "red" }}
                >
                  <EyeIcon className={styles.EyeIcon} />
                </Link>

                {/* FIXE FARBE (stabil & neutral) */}
                <Link
                  href={"/flashcardboxes"}
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