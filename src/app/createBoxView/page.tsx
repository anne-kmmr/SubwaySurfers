// Datei von Anne

"use client";

import React, { useState } from "react";
import styles from "./createBoxView.module.css";
import Header from "../components/Header/Header";
import Popup from "../components/Popup/Popup";
import { useRouter } from "next/navigation";

export default function CreateBoxView() {
  const [titel, setTitel] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "Wie soll dein Kästchen heißen?"
  );

  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  // ✅ NEU: Popup-Typ
  const [dialogType, setDialogType] = useState<
    "success" | "error"
  >("success");

  const router = useRouter();

  const handleSpeichern = () => {
    // ❌ Fehlerfall: kein Titel
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

    // ✅ Erfolg
    console.log("Neuer Karteikasten erstellt:");
    console.log("Titel:", titel);

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

  const handleAbbrechen = () => {
    console.log("Erstellung abgebrochen");
    router.push("/");
  };

  return (
    <>
      <Header title="Neue Karteikartenbox" backHref="/" />

      {/* POPUP */}
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
              onBlur={() =>
                !titel &&
                setPlaceholder(
                  "Wie soll dein Kästchen heißen?"
                )
              }
              onChange={(e) => setTitel(e.target.value)}
              style={{ fontFamily: "inherit" }}
            />
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