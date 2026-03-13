"use client";

import { useEffect, useState } from "react";
import styles from "./cardsView.module.css";
import Header from "../components/Header/Header";
import Link from "next/link";

export default function CardsView() {
  const [cards, setCards] = useState<{ question: string; answer: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState<boolean[]>([]); // welche Karten umgedreht sind

  useEffect(() => {
    async function fetchVocab() {
      try {
        const res = await fetch("/api/vocab"); // alle Vokabeln holen
        const data = await res.json();
        setCards(data);
        setFlipped(new Array(data.length).fill(false)); // alle Karten starten ungedreht
      } catch (err) {
        console.error("Fehler beim Laden der Vokabeln:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchVocab();
  }, []);

  const toggleCard = (index: number) => {
    setFlipped(prev => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  if (loading) {
    return <p>Lädt...</p>;
  }

  return (
      <>
        <Header title="Alle Vokabelkarten" backHref="/" />
        <main className={styles.app}>
          <div className={styles.newCardContainer}>
            <Link className={styles.button} href="/editCards">
              + Neue Karte
            </Link>
          </div>
          <ul className={styles.content}>
            {cards.map((card, index) => (
                <li
                    key={index}
                    className={styles.li}
                    onClick={() => toggleCard(index)}
                    style={{ cursor: "pointer" }}
                >
              <span>
                {flipped[index] ? card.answer : card.question}
              </span>
                  <Link
                      className={styles.button}
                      href={`/editCards?question=${encodeURIComponent(card.question)}&answer=${encodeURIComponent(card.answer)}`}
                  >
                    Bearbeiten
                  </Link>
                </li>
            ))}
          </ul>
        </main>
      </>
  );
}