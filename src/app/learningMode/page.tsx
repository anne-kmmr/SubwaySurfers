import React, { useState } from "react";
import styles from "./learningMode.module.css";

interface LearningModeProps {
fach: string;
}

const LearningMode: React.FC<LearningModeProps> = ({ fach }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleShowAnswer = () => {
    setIsFlipped(true);
    };

    const handleResetCard = () => {
    setIsFlipped(false);
    };

    return (
    <div>
        <div className={styles.header}>
            <h1 id="backButton">➜</h1>
            <h1 id="kartenTitel">
                {fach} <br /> lernen
            </h1>
            <button id="settingsBtn">&#9881;</button>
        </div>

        <div className={styles.content}>
            <div className={styles["card-container"]}>
                <div
                        className={`${styles.card} ${
                        isFlipped ? styles.flipped : ""
                }`}
                >
                <div className={styles["card-front"]}>
                    <div className={styles.textOutputDiv}>
                        Frage: 2 + 2 = ?
                    </div>
                    <div className={styles["answer-line"]}></div>
                    <button
                            className={styles["show-answer-btn"]}
                            onClick={handleShowAnswer}
                    >
                        Antwort anzeigen
                    </button>
                </div>

                <div className={styles["card-back"]}>
                    <div className={styles.textOutputDiv}>
                        Antwort: 4
                    </div>
                    <div className={styles["answer-btns"]}>
                        <button
                                className={styles["correct-btn"]}
                                onClick={handleResetCard}
                        >
                            Richtig
                        </button>
                        <button
                                className={styles["wrong-btn"]}
                                onClick={handleResetCard}
                        >
                            Falsch
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
    };
