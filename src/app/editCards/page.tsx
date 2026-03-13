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

  const [frageFontSize, setFrageFontSize] = useState(20);
  const [antwortFontSize, setAntwortFontSize] = useState(20);

  useEffect(() => {
    setFrage(searchParams.get("question") || "");
    setAntwort(searchParams.get("answer") || "");
  }, [searchParams]);

  // Schriftgröße automatisch anpassen (Frage)
  useEffect(() => {
    const length = frage.length;

    if (length < 30) setFrageFontSize(24);
    else if (length < 60) setFrageFontSize(20);
    else if (length < 120) setFrageFontSize(18);
    else setFrageFontSize(16);
  }, [frage]);

  // Schriftgröße automatisch anpassen (Antwort)
  useEffect(() => {
    const length = antwort.length;

    if (length < 30) setAntwortFontSize(24);
    else if (length < 60) setAntwortFontSize(20);
    else if (length < 120) setAntwortFontSize(18);
    else setAntwortFontSize(16);
  }, [antwort]);

  const handleSpeichern = () => {
    console.log("Gespeichert:");
    console.log("Frage:", frage);
    console.log("Antwort:", antwort);
  };

  const handleAbbrechen = () => {
    console.log("Abgebrochen");
  };

  const preventEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
      <>
        <Header title="Karte Bearbeiten" backHref="/" />

        <main className={styles.wrapper}>
          <div className={styles.content}>

            <div className={styles.card}>
              <h2>Frage:</h2>

              <textarea
                  className={styles.input}
                  style={{ fontSize: `${frageFontSize}px` }}
                  value={frage}
                  onChange={(e) => setFrage(e.target.value)}
                  onKeyDown={preventEnter}
              />
            </div>

            <div className={styles.card}>
              <h2>Antwort:</h2>

              <textarea
                  className={styles.input}
                  style={{ fontSize: `${antwortFontSize}px` }}
                  value={antwort}
                  onChange={(e) => setAntwort(e.target.value)}
                  onKeyDown={preventEnter}
              />
            </div>

          </div>

          <div className={styles.buttonContainer}>
            <Link
                className={styles.button}
                href="/cardsView"
                onClick={handleSpeichern}
            >
              Speichern
            </Link>

            <Link
                className={styles.button}
                href="/cardsView"
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