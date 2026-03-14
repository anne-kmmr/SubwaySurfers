"use client";

import { useEffect, useState } from "react";
import styles from "./learningMode.module.css";
import Header from "../components/Header/Header";

type Vocab = {
  id: number;
  question: string;
  answer: string;
  set: string;
};

export default function Home() {
  const [flipped, setFlipped] = useState(false);
  const [currentVocab, setCurrentVocab] = useState<Vocab | null>(null);

  useEffect(() => {
    async function fetchVocab() {
      const res = await fetch("/api/vocab/");
      const data: Vocab[] = await res.json();
      if (data.length > 0) {
        setCurrentVocab(data[0]); // erstes Element
      }
    }
    fetchVocab();
  }, []);

  const handleFlipBack = async () => {
    setFlipped(false);
    const res = await fetch("/api/vocab/");
    const data: Vocab[] = await res.json();
    if (data.length > 0) {
      setTimeout(() => setCurrentVocab(data[0]), 150);
    }
  };

  return (
    <>
      <Header title="Mathematik lernen" backHref="/" />

      <main className={styles.content}>
        <div className={styles["card-container"]}>
          <div
            className={`${styles.card} ${flipped ? styles.cardFlipped : ""}`}
          >
            <div className={styles["card-front"]}>
              <div className={styles.textOutputDiv}>
                {currentVocab ? currentVocab.question : "Lade..."}
              </div>
              <div className={styles["answer-line"]}></div>
              <button
                type="button"
                className={styles["show-answer-btn"]}
                onClick={() => setFlipped(true)}
              >
                Antwort anzeigen
              </button>
            </div>

            <div className={styles["card-back"]}>
              <div className={styles.textOutputDiv}>
                {currentVocab ? currentVocab.answer : "Lade..."}
              </div>
              <div className={styles["answer-line"]}></div>
              <div className={styles["answer-btns"]}>
                <button
                  type="button"
                  className={styles["correct-btn"]}
                  onClick={handleFlipBack}
                >
                  Richtig
                </button>
                <button
                  type="button"
                  className={styles["wrong-btn"]}
                  onClick={handleFlipBack}
                >
                  Falsch
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
