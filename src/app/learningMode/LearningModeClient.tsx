// Implementierung durch Anne

"use client";

import { useEffect, useState } from "react";
import styles from "./learningMode.module.css";
import Header from "../../app/cardsView/components/Header/Header";
import { useSearchParams } from "next/navigation";

type Vocab = {
  id: number;
  question: string;
  answer: string;
  set: string;
  status: string;
};

export default function LearningMode() {
  const [flipped, setFlipped] = useState(false);
  const [currentVocab, setCurrentVocab] = useState<Vocab | null>(null);

  const searchParams = useSearchParams();

  const currentSet = searchParams.get("set");
  const currentStatus = searchParams.get("status");

  // Vokabel laden
  useEffect(() => {
    loadVocab();
  }, [currentSet, currentStatus]);

  const loadVocab = async () => {
    try {
      const query = new URLSearchParams();

      if (currentSet) {
        query.append("set", currentSet);
      }

      if (currentStatus) {
        query.append("status", currentStatus);
      }

      query.append("random", "true");

      const res = await fetch(`https://subwaysurfers-kw5l.onrender.com/vocab?${query.toString()}`);
      const data: Vocab[] = await res.json();

      if (data.length > 0) {
        setCurrentVocab(data[0]);
      } else {
        setCurrentVocab(null);
      }
    } catch (err) {
      console.error("Fehler beim Laden der Vokabeln:", err);
      setCurrentVocab(null);
    }
  };

  // Status speichern
  const updateStatus = async (
    status:  'learning' | 'inProgress' | 'learned'
  ) => {
    if (!currentVocab) return;

    try {
      await fetch("https://subwaysurfers-kw5l.onrender.com/vocab", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentVocab.id,
          status,
        }),
      });
    } catch (err) {
      console.error("Fehler beim Status-Update:", err);
    }
  };

  // nächste Karte laden
  const nextCard = async () => {
    setFlipped(false);
    await loadVocab();
  };

  // Abfrage des statuses

  const handleCorrect = async () => {

  let nextStatus: 'learning' | 'inProgress' | 'learned';

  if(!currentVocab) return;

  switch(currentVocab.status) {
    case 'learning': nextStatus = 'inProgress';
      break;
    
    case 'inProgress': nextStatus = 'learned';
      break;

    case 'learned': nextStatus = 'learned';
      break;

    default: nextStatus = 'learning';

  }

  await updateStatus(nextStatus);
};

  if (!currentVocab) {
    return (
        <Header
            title={`${currentSet || "Vokabeln"} lernen`}
            backHref="/"
        />
    );
  }

  // returnt Header standartisiert bei Fehler oder mit Namen sowie die restliche Seite
  return (
      <>
        <Header
            title={`${currentSet || "Vokabeln"} lernen`}
            backHref="/"
        />

        <main className={styles.content}>
          <div className={styles["card-container"]}>
            <div
                className={`${styles.card} ${
                    flipped ? styles.cardFlipped : ""
                }`}
            >
              <div className={styles["card-front"]}>
                <div className={styles.textOutputDiv}>
                  {currentVocab.question}
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
                  {currentVocab.answer}
                </div>

                <div className={styles["answer-line"]}></div>

                <div className={styles["answer-btns"]}>
                  <button
                      type="button"
                      className={styles["correct-btn"]}
                      onClick={async () => {
                        await handleCorrect();
                        await nextCard();
                      }}
                  >
                    Richtig
                  </button>

                  <button
                      type="button"
                      className={styles["wrong-btn"]}
                      onClick={async () => {
                        await updateStatus('learning');
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