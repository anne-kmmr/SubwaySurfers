"use client";

import { useEffect, useState } from "react";
import styles from "./learningMode.module.css";
import Header from "../components/Header/Header";

type Vocab = {
    id: number;
    question: string;
    answer: string;
    set: string;
};

export default function Home() {
    const [flipped, setFlipped] = useState(false);
    const [currentVocab, setCurrentVocab] = useState<Vocab | null>(null);

    useEffect(() => {
        async function fetchVocab() {
            const res = await fetch("/api/vocab/");
            const data: Vocab[] = await res.json();
            if (data.length > 0) {
                setCurrentVocab(data[0]); // erstes Element
            }
        }
        fetchVocab();
    }, []);

    const handleFlipBack = async () => {
        setFlipped(false);
        const res = await fetch("/api/vocab/");
        const data: Vocab[] = await res.json();
        if (data.length > 0) {
            setCurrentVocab(data[0]);
        }
    };

    const CardFront = ({ onShowAnswer }: { onShowAnswer: () => void }) => (
        <div className={styles["card-front"]}>
            <div className={styles.textOutputDiv}>{currentVocab ? currentVocab.question : "Lade..."}</div>
            <div className={styles["answer-line"]}></div>
            <button className={styles["show-answer-btn"]} onClick={onShowAnswer}>Antwort anzeigen</button>
        </div>
    );

    const CardBack = ({ onFlipBack }: { onFlipBack: () => void }) => (
        <div className={styles["card-back"]}>
            <div className={styles.textOutputDiv}>{currentVocab ? currentVocab.answer : "Lade..."}</div>
            <div className={styles["answer-line"]}></div>
            <div className={styles["answer-btns"]}>
                <button className={styles["correct-btn"]} onClick={onFlipBack}>Richtig</button>
                <button className={styles["wrong-btn"]} onClick={onFlipBack}>Falsch</button>
            </div>
        </div>
    );

    const Card = () => (
        <div className={styles["card-container"]}>
            <div className={`${styles.card} ${flipped ? styles.cardFlipped : ""}`}>
                <CardFront onShowAnswer={() => setFlipped(true)} />
                <CardBack onFlipBack={handleFlipBack} />
            </div>
        </div>
    );

    return (
        <>
            <Header title="Mathematik lernen" backHref="/" />
            <main className={styles.content}><Card /></main>
        </>
    );
}
