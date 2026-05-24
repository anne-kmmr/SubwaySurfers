// Implementierung durch Anne

"use client";

import { useEffect, useState } from "react";
import styles from "./learningMode.module.css";
import Header from "../components/Header/Header";

type Vocab = {
  id: number;
  question: string;
  answer: string;
  set: string;
  status?: string;
};

// Definition State
export default function LearningMode() {
  const [flipped, setFlipped] = useState(false);
  const [currentVocab, setCurrentVocab] = useState<Vocab | null>(null);
  const [loading, setLoading] = useState(true);

  // Vokabel laden
  useEffect(() => {
    loadVocab();
  }, []);

  // Sucht Vokabeln mittels API und gibt sie mittels JSON zurück
  const loadVocab = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/vocab");
      const data: Vocab[] = await res.json();

      console.log("VOCAB DATA:", data);

      if (data.length > 0) {
        setCurrentVocab(data[0]);
      } else {
        setCurrentVocab(null);
      }
    } catch (err) {
      console.error("Fehler beim Laden der Vokabeln:", err);
      setCurrentVocab(null);
    } finally {
      setLoading(false);
    }
  };

  // Status speichern
  const updateStatus = async (status: "correct" | "wrong") => {
    console.log("UPDATE STATUS CLICKED:", status);
    console.log("CURRENT VOCAB:", currentVocab);

    if (!currentVocab) {
      console.error("Keine Vokabel geladen");
      return;
    }

    try {
      const res = await fetch("/api/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentVocab.id,
          status,
        }),
      });

      const result = await res.json();
      console.log("API RESPONSE:", result);
    } catch (err) {
      console.error("Fehler beim Status-Update:", err);
    }
  };

  // nächste Karte laden
  const nextCard = async () => {
    setFlipped(false);
    await loadVocab();
  };

  // returnt die fertige Seite
  return (
    <>
      <Header title="{} lernen" backHref="/" />

      <main className={styles.content}>
        <div className={styles["card-container"]}>
          <div className={`${styles.card} ${flipped ? styles.cardFlipped : ""}`}>

            <div className={styles["card-front"]}>
              <div className={styles.textOutputDiv}>
                {currentVocab?.question ?? "Keine Vokabel"}
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
                {currentVocab?.answer ?? "Keine Vokabel"}
              </div>

              <div className={styles["answer-line"]}></div>

              <div className={styles["answer-btns"]}>
                <button
                  type="button"
                  className={styles["correct-btn"]}
                  onClick={async () => {
                    await updateStatus("correct");
                    await nextCard();
                  }}
                >
                  Richtig
                </button>

                <button
                  type="button"
                  className={styles["wrong-btn"]}
                  onClick={async () => {
                    await updateStatus("wrong");
                    await nextCard();
                  }}
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