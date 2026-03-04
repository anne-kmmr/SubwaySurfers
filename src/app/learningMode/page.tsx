"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./learningMode.module.css";

export default function Home() {
  const [flipped, setFlipped] = useState(false);

const Header = () => (
  <div className={styles.header}>
    <h1 className={styles.backButton} onClick={() => router.push("/")}>
      ➜
    </h1>
    <h1 className={styles.kartenTitel}>Fach <br /> lernen</h1>
    <button className={styles.settingsBtn} onClick={() => router.push("/")}>&#9881;</button>
  </div>
);

  const CardFront = ({ onShowAnswer }: { onShowAnswer: () => void }) => (
    <div className={styles["card-front"]}>
      <div className={styles.textOutputDiv}>Frage: 2 + 2 = ?</div>
      <div className={styles["answer-line"]}></div>
      <button className={styles["show-answer-btn"]} onClick={onShowAnswer}>Antwort anzeigen</button>
    </div>
  );

  const CardBack = ({ onFlipBack }: { onFlipBack: () => void }) => (
    <div className={styles["card-back"]}>
      <div className={styles.textOutputDiv}>Antwort: 4</div>
      <div className={styles["answer-line"]}></div>
      <div className={styles["answer-btns"]}>
        <button className={styles["correct-btn"]} onClick={onFlipBack}>Richtig</button>
        <button className={styles["wrong-btn"]} onClick={onFlipBack}>Falsch</button>
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
    <div>
      <Header />
      <div className={styles.content}><Card /></div>
    </div>
  );
}