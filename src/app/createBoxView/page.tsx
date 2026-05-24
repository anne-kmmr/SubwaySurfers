// Idee und Implementierung durch Anne

"use client";

import React, { useState } from "react";
import styles from "./createBoxView.module.css";
import Header from "../components/Header/Header";
import Popup from "../components/Popup/Popup";
import { useRouter } from "next/navigation";

// Standard-Input
export default function CreateBoxView() {
  const [titel, setTitel] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "Wie soll dein Kästchen heißen?"
  );

  // Zustände für Popup
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState<
    "success" | "error"
  >("success");

  const router = useRouter();

  // max. Zeichenlänge, damit Überschriften im Header beim Lernen nicht zu groß werden
  const MAX_LENGTH = 30;

  // Fehlermeldungen
  const handleSpeichern = () => {
    if (!titel.trim()) {
      setDialogType("error");
      setDialogMessage(
        "Bitte gib einen Namen für den Karteikasten ein."
      );
      setShowDialog(true);

      setTimeout(() => {
        setShowDialog(false);
      }, 1500);

      return;
    }

    // Erstellung Karteikasten bei Success

    setDialogType("success");
    setDialogMessage(
      `Karteikasten "${titel}" wurde erstellt!`
    );
    setShowDialog(true);

    setTimeout(() => {
      setShowDialog(false);
      router.push("/");
    }, 1500);
  };

  // Für Abbruch über Button
  const handleAbbrechen = () => {
    console.log("Erstellung abgebrochen");
    router.push("/");
  };

  // returnt fertige Seite mit Inputfeldern, max. Limit und Buttons
  return (
    <>
      <Header title="Neue Karteikartenbox" backHref="/" />

      <Popup
        open={showDialog}
        message={dialogMessage}
        type={dialogType}
        onClose={() => setShowDialog(false)}
      />

      <main className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.card}>
            <h2>Titel:</h2>

            <input
              type="text"
              className={styles.input}
              value={titel}
              placeholder={placeholder}
              maxLength={MAX_LENGTH}
              onBlur={() =>
                !titel &&
                setPlaceholder(
                  "Wie soll dein Kästchen heißen?"
                )
              }
              onChange={(e) =>
                setTitel(e.target.value.slice(0, MAX_LENGTH))
              }
              style={{ fontFamily: "inherit" }}
            />

            <p className={styles.counter}>
              {titel.length}/{MAX_LENGTH}
            </p>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={handleSpeichern}
          >
            Speichern
          </button>

          <button
            className={styles.button}
            onClick={handleAbbrechen}
          >
            Abbrechen
          </button>
        </div>
      </main>
    </>
  );
}