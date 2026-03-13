"use client";

import React, { useState, useEffect } from "react";
import styles from "./editCardStyles.module.css";
import Header from "../components/Header/Header";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const KartenBearbeiten: React.FC = () => {
  const searchParams = useSearchParams();
  const [frage, setFrage] = useState("");
  const [antwort, setAntwort] = useState("");

  useEffect(() => {
    setFrage(searchParams.get("question") || "");
    setAntwort(searchParams.get("answer") || "");
  }, [searchParams]);

  const handleSpeichern = () => {
    console.log("Gespeichert:");
    console.log("Frage:", frage);
    console.log("Antwort:", antwort);
  };

  const handleAbbrechen = () => {
    console.log("Abgebrochen");
  };

  return (
      <>
        <Header title="Karte Bearbeiten" backHref="/" />
        <main className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.card}>
              <h2>Frage:</h2>
              <input
                  type="text"
                  className={styles.input}
                  value={frage}
                  onChange={(e) => setFrage(e.target.value)}
              />
            </div>

            <div className={styles.card}>
              <h2>Antwort:</h2>
              <input
                  type="text"
                  className={styles.input}
                  value={antwort}
                  onChange={(e) => setAntwort(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Link
                className={styles.button}
                href={"/cardsView"}
                onClick={handleSpeichern}
            >
              Speichern
            </Link>

            <Link
                className={styles.button}
                href={"/cardsView"}
                onClick={handleAbbrechen}
            >
              Abbrechen
            </Link>
          </div>
        </main>
      </>
  );
};

export default KartenBearbeiten;