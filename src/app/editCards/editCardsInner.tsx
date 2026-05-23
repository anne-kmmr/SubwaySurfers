"use client";

import React, { useState, useEffect } from "react";
import styles from "./editCardStyles.module.css";
import Header from "../components/Header/Header";
import { useSearchParams } from "next/navigation";

import PopupAdd from "../components/Popup/PopupAdd";
import PopupConfirm from "../components/Popup/PopupConfirm";

const EditCardsInner: React.FC = () => {
    const searchParams = useSearchParams();

    const [frage, setFrage] = useState("");
    const [antwort, setAntwort] = useState("");

    const [frageFontSize, setFrageFontSize] = useState(20);
    const [antwortFontSize, setAntwortFontSize] = useState(20);

    // Popup State
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupMode, setPopupMode] = useState<"add" | "confirm">("add");

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

    // echte Speicherlogik
    const saveCard = () => {
        console.log("Gespeichert:");
        console.log("Frage:", frage);
        console.log("Antwort:", antwort);

        setPopupMode("add");
        setPopupMessage(
            isEditMode
                ? "Änderung erfolgreich gespeichert!"
                : "Karte erfolgreich erstellt!"
        );

        setShowPopup(true);

        setTimeout(() => {
            setShowPopup(false);
        }, 1500);
    };

    // Klick auf Speichern
    const handleSpeichern = () => {
        if (isEditMode) {
            setPopupMode("confirm");
            setPopupMessage("Änderungen übernehmen?");
            setShowPopup(true);
        } else {
            saveCard();
        }
    };

    const handleAbbrechen = () => {
        console.log("Abgebrochen");
    };

    const preventEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    return (
        <>
            <Header title="Karte Bearbeiten" backHref="/" />

            {/* POPUP ADD */}
            {popupMode === "add" && (
                <PopupAdd
                    open={showPopup}
                    message={popupMessage}
                    onClose={() => setShowPopup(false)}
                />
            )}

            {/* POPUP CONFIRM */}
            {popupMode === "confirm" && (
                <PopupConfirm
                    open={showPopup}
                    message={popupMessage}
                    onCancel={() => setShowPopup(false)}
                    onConfirm={() => {
                        setShowPopup(false);
                        saveCard();
                    }}
                />
            )}

            <main className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.card}>
                        <h2>Frage:</h2>

                        <textarea
                            className={styles.input}
                            style={{ fontSize: `${frageFontSize}px` }}
                            value={frage}
                            onChange={(e) => setFrage(e.target.value)}
                            onKeyDown={preventEnter}
                        />
                    </div>

                    <div className={styles.card}>
                        <h2>Antwort:</h2>

                        <textarea
                            className={styles.input}
                            style={{ fontSize: `${antwortFontSize}px` }}
                            value={antwort}
                            onChange={(e) => setAntwort(e.target.value)}
                            onKeyDown={preventEnter}
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