"use client";

import styles from "./Home.module.css";
import Header from "./components/Header/Header";
import EyeIcon from "@/app/components/Icons/EyeIcon/EyeIcon";
import Loading from "@/app/components/Loading/Loading";
import Link from "next/link";
import { useEffect, useState } from "react";

type Set = {
  id: string;
  title: string;
  count: number;
  color: string;
};

const setColors = ["--green", "--yellow", "--blue"];

export default function HomePage() {
  const [sets, setSets] = useState<Set[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        setLoading(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchSets();
  }, []);

  // 🔥 LOADING STATE → jetzt mit deiner Komponente
  if (loading) {
    return (
      <>
        <Header title="Home" />

        <main className={styles.container}>
          <Loading />
        </main>
      </>
    );
  }

  // 🔥 NORMAL STATE
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
                <Link
                  href="/learningMode"
                  className={styles.button}
                  style={{
                    backgroundColor: `var(${set.color})`,
                    color: "white",
                  }}
                >
                  Lernen
                </Link>

                <Link
                  href="/cardsView"
                  className={styles.button}
                  style={{
                    backgroundColor: "var(--red)",
                    color: "white",
                    padding: "10px",
                    minWidth: "50px",
                  }}
                >
                  <EyeIcon />
                </Link>

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