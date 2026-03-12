"use client";

import styles from "./Home.module.css";
import Header from "./components/Header/Header";
import IconButton from "./components/Icons/IconButton/IconButton";
import PencilIcon from "./components/Icons/PencilIcon/PencilIcon";
import Link from "next/link";

export default function HomePage() {
  const sets = [
    { id: "mathe", title: "Mathematik", count: 12, color: "#7ed957" },
    { id: "deutsch", title: "Deutsch", count: 8, color: "#ffd93d" },
    { id: "englisch", title: "Englisch", count: 15, color: "#4dabf7" },
  ];

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

                <IconButton href="/cardsView" label="Karten bearbeiten">
                  <PencilIcon className={styles.PencilIcon} />
                </IconButton>

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