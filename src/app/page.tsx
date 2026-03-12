"use client";

import styles from "./Home.module.css";
import Header from "./components/Header/Header";
import Link from "next/link";

export default function HomePage() {

  const sets = [
    { id: "mathe", title: "Mathematik", count: 12, color: "#7ed957" },
    { id: "deutsch", title: "Deutsch", count: 8, color: "#ffd93d" },
    { id: "englisch", title: "Englisch", count: 15, color: "#4dabf7" },
  ];

  return (
    <>
      <Header title="Home" backHref="/" />
      <main className={styles.container}>
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
                className={styles.button}
                style={{ backgroundColor: "#ff922b", color: "white" }}
              >
                ✏️
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
      </main>
    </>
  );
}
