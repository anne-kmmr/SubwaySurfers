"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./editCardStyles.module.css";

const KartenBearbeiten: React.FC = () => {
  const [frage, setFrage] = useState("2 + 2 = ?");
  const [antwort, setAntwort] = useState("4");

  const handleSpeichern = () => {
    console.log("Gespeichert:");
    console.log("Frage:", frage);
    console.log("Antwort:", antwort);
  };

  const handleAbbrechen = () => {
    console.log("Abgebrochen");
  };

  return (
    <div className={styles.wrapper}>
      
      <div className={styles.header}>
        <h1 className={styles.backButton}>←</h1>

        <h1 className={styles.kartenTitel}>
          Karte
          <br />
          Bearbeiten
        </h1>

        <button className={styles.settingsBtn}>⚙</button>
      </div>

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
        <button className={styles.button} onClick={handleSpeichern}>
          Speichern
        </button>

        <button className={styles.button} onClick={handleAbbrechen}>
          Abbrechen
        </button>
      </div>

    </div>
  );
};

export default KartenBearbeiten;