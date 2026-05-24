// Idee und Implementierung durch Raul
// Popup-Implementierung durch Anne

"use client";

import React, { useState, useEffect } from "react";
import styles from "./editCardStyles.module.css";
import Header from "../components/Header/Header";
import { useSearchParams } from "next/navigation";
import Popup from "../components/Popup/Popup";

const EditCardsInner: React.FC = () => {
    const searchParams = useSearchParams();

    const [frage, setFrage] = useState("");
    const [antwort, setAntwort] = useState("");

    const [frageFontSize, setFrageFontSize] = useState(20);
    const [antwortFontSize, setAntwortFontSize] = useState(20);

    // Popup-Zustände
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState<
        "success" | "error"
    >("success");

    // Prüft auf Vollständigkeit
    const isEditMode =
        Boolean(searchParams.get("question") || searchParams.get("answer"));

    useEffect(() => {
        setFrage(searchParams.get("question") || "");
        setAntwort(searchParams.get("answer") || "");
    }, [searchParams]);

    useEffect(() => {
        const length = frage.length;

        if (length < 30) setFrageFontSize(24);
        else if (length < 60) setFrageFontSize(20);
        else if (length < 120) setFrageFontSize(18);
        else setFrageFontSize(16);
    }, [frage]);

    useEffect(() => {
        const length = antwort.length;

        if (length < 30) setAntwortFontSize(24);
        else if (length < 60) setAntwortFontSize(20);
        else if (length < 120) setAntwortFontSize(18);
        else setAntwortFontSize(16);
    }, [antwort]);

    const saveCard = () => {
        console.log("Gespeichert:", { frage, antwort });

        setPopupType("success");
        setPopupMessage(
            isEditMode
                ? "Änderung erfolgreich gespeichert!"
                : "Karte erfolgreich erstellt!"
        );

        setShowPopup(true);

        setTimeout(() => {
            setShowPopup(false);

            if (!isEditMode) {
                setFrage("");
                setAntwort("");
            }
        }, 1200);
    };

    // Prüft auf Vollständigkeit und gibt Problem als Popup aus
    const handleSpeichern = () => {
        if (!frage.trim() || !antwort.trim()) {
            setPopupType("error");
            setPopupMessage(
                "Bitte fülle sowohl Frage als auch Antwort aus."
            );
            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
            }, 1500);

            return;
        }

        saveCard();
    };

    // für Abbruch
    const handleAbbrechen = () => {
        console.log("Abgebrochen");
    };

    // returnt Seite mit Layout der Karten
    return (
        <>
            <Header title="Karte Bearbeiten" backHref="/" />

            <Popup
                open={showPopup}
                message={popupMessage}
                type={popupType}
                onClose={() => setShowPopup(false)}
            />

            <main className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.card}>
                        <h2>Frage:</h2>

                        <textarea
                            className={styles.input}
                            style={{
                                fontSize: `${frageFontSize}px`,
                            }}
                            value={frage}
                            onChange={(e) =>
                                setFrage(e.target.value)
                            }
                        />
                    </div>

                    <div className={styles.card}>
                        <h2>Antwort:</h2>

                        <textarea
                            className={styles.input}
                            style={{
                                fontSize: `${antwortFontSize}px`,
                            }}
                            value={antwort}
                            onChange={(e) =>
                                setAntwort(e.target.value)
                            }
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
};

export default EditCardsInner;