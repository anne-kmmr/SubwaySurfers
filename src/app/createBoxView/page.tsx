// Datei von Anne

"use client";

import React, { useState } from "react";
import styles from "./createBoxView.module.css";
import Header from "../components/Header/Header";
import PopupAdd from "../components/Popup/PopupAdd";
import { useRouter } from "next/navigation";

// Setzt Platzhalter für Eingabefeld und co.
export default function CreateBoxView() {
  const [titel, setTitel] = useState("");
  const [placeholder, setPlaceholder] = useState("Wie soll dein Kästchen heißen?");

  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const router = useRouter();

  // Loggt mit Handle (Prozess-ID) die Eingaben des Nutzers
  const handleSpeichern = () => {
    console.log("Neuer Karteikasten erstellt:");
    console.log("Titel:", titel);

    setDialogMessage(`Karteikasten "${titel}" wurde erstellt!`);
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

  //returnt die Seite mit Platzhaltern und allem drum und dran
  return (
    <>
      <Header title="Neue Karteikartenbox" backHref="/" />

      {/* POPUP ADD */}
      <PopupAdd
        open={showDialog}
        message={dialogMessage}
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
                !titel && setPlaceholder("Wie soll dein Kästchen heißen?")
              }
              onChange={(e) => setTitel(e.target.value)}
              style={{ fontFamily: "inherit" }}
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
      </main>
    </>
  );
}