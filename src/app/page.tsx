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

        setSets(data);
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
              style={{ borderLeft: `10px solid ${set.color}` }}
            >
              <h2>{set.title}</h2>
              <p>{set.count} Karten</p>

              <div className={styles.buttonRow}>
                <Link
                  href={"/learningMode"}
                  className={styles.button}
                  style={{ backgroundColor: set.color, color: "white" }}
                >
                  Lernen
                </Link>

                <Link
                  href={"/cardsView"}
                  style={{ backgroundColor: "transparent", color: "red" }}
                >
                  <EyeIcon className={styles.EyeIcon} />
                </Link>

                <Link
                  href={"/flashcardboxes"}
                  className={styles.button}
                  style={{ backgroundColor: "#845ef7", color: "white" }}
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