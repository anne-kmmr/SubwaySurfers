// Datei von Anne

"use client";

import React, { useState } from "react";
import styles from "./createBoxView.module.css";
import Header from "../components/Header/Header";
import Link from "next/link";

// Setzt Platzhalter für Eingabefeld und co.
export default function CreateBoxView() {
  const [titel, setTitel] = useState("");
  const [placeholder, setPlaceholder] = useState("Wie soll dein Kästchen heißen?");

  // Loggt mit Handle (Prozess-ID) die Eingaben des Nutzers
  const handleSpeichern = () => {
    console.log("Neuer Karteikasten erstellt:");
    console.log("Titel:", titel);
    alert(`Karteikasten "${titel}" wurde erstellt!`);
  };

  const handleAbbrechen = () => {
    console.log("Erstellung abgebrochen");
  };

  //returnt die Seite mit Platzhaltern und allem drum und dran
  return (
      <>
        <Header title="Neue Karteikastenbox" backHref="/" />
        <main className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.card}>
              <h2>Titel:</h2>
              <input
                  type="text"
                  className={styles.input}
                  value={titel}
                  placeholder={placeholder}
                  onBlur={() => !titel && setPlaceholder("Wie soll dein Kästchen heißen?")}
                  onChange={(e) => setTitel(e.target.value)}
                  style={{ fontFamily: "inherit" }}
              />
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Link
                className={styles.button}
                href="/"
                onClick={handleSpeichern}
            >
              Speichern
            </Link>

            <Link
                className={styles.button}
                href="/"
                onClick={handleAbbrechen}
            >
              Abbrechen
            </Link>
          </div>
        </main>
      </>
  );
}