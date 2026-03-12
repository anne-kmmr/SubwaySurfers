"use client";

import { useState } from "react";
import styles from "./learningMode.module.css";
import Header from "../components/Header/Header";

export default function Home() {
  const [flipped, setFlipped] = useState(false);

  const CardFront = ({ onShowAnswer }: { onShowAnswer: () => void }) => (
    <div className={styles["card-front"]}>
      <div className={styles.textOutputDiv}>Frage: 2 + 2 = ?</div>
      <div className={styles["answer-line"]}></div>
      <button className={styles["show-answer-btn"]} onClick={onShowAnswer}>
        Antwort anzeigen
      </button>
    </div>
  );

  const CardBack = ({ onFlipBack }: { onFlipBack: () => void }) => (
    <div className={styles["card-back"]}>
      <div className={styles.textOutputDiv}>Antwort: 4</div>
      <div className={styles["answer-line"]}></div>
      <div className={styles["answer-btns"]}>
        <button className={styles["correct-btn"]} onClick={onFlipBack}>
          Richtig
        </button>
        <button className={styles["wrong-btn"]} onClick={onFlipBack}>
          Falsch
        </button>
      </div>
    </div>
  );

  const Card = () => (
    <div className={styles["card-container"]}>
      <div className={`${styles.card} ${flipped ? styles.flipped : ""}`}>
        <CardFront onShowAnswer={() => setFlipped(true)} />
        <CardBack onFlipBack={() => setFlipped(false)} />
      </div>
    </div>
  );

  return (
    <>
      <Header title="Fach lernen" backHref="/" />
      <main className={styles.content}>
        <Card />
      </main>
    </>
  );
}
