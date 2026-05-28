// Ursprüngliche Systematik von Adam
// Aussehen und Funktionen überarbeitet von Anne

"use client";

import { useEffect, useState } from "react";
import styles from "./cardsView.module.css";
import Header from "../components/Header/Header";
import Link from "next/link";
import Loading from "@/app/components/Loading/Loading";
import Trashcan from "../components/Icons/Trashcan/Trashcan";

type Card = {
  id: string;
  question: string;
  answer: string;
};

// definiert die States der Karten
export default function CardsView() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [ascending, setAscending] = useState(true);

  // Daten laden
  useEffect(() => {
    async function fetchVocab() {
      try {
        setLoading(true);

        const res = await fetch("/api/vocab");
        const data = await res.json();

        setCards(data);
        setFlipped(new Array(data.length).fill(false));
      } catch (err) {
        console.error("Fehler beim Laden der Vokabeln:", err);
        setCards([]);
      } finally {
        setLoading(false);
      }
    }

    fetchVocab();
  }, []);

  // Flip Funktion
  const toggleCard = (index: number) => {
    setFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  // Karten löschen (JETZT MIT ID)
  const deleteCard = async (id: string) => {
    try {
      const res = await fetch("/api/vocab", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error("Fehler beim Löschen");
      }

      const updatedCards = cards.filter((card) => card.id !== id);

      setCards(updatedCards);
      setFlipped(new Array(updatedCards.length).fill(false));
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
    }
  };

  // Karten sortieren
  const sortCards = () => {
    const sortedCards = [...cards].sort((a, b) => {
      if (ascending) {
        return a.question.localeCompare(b.question);
      }
      return b.question.localeCompare(a.question);
    });

    setCards(sortedCards);
    setAscending(!ascending);
  };

  if (loading) {
    return (
        <>
          <Header title="Alle Vokabelkarten" backHref="/" />
          <main className={styles.app}>
            <Loading />
          </main>
        </>
    );
  }

  return (
      <>
        <Header title="Alle Vokabelkarten" backHref="/" />

        <main className={styles.app}>
          <div className={styles.newCardContainer}>
            <Link className={styles.button} href="/editCards">
              + Neue Karte
            </Link>

            <button className={styles.button} onClick={sortCards}>
              Sortieren {ascending ? "A-Z" : "Z-A"}
            </button>
          </div>

          <ul className={styles.content}>
            {cards.map((card, index) => (
                <li
                    key={card.id}
                    className={styles.li}
                    onClick={() => toggleCard(index)}
                    style={{ cursor: "pointer" }}
                >
              <span>
                {flipped[index] ? card.answer : card.question}
              </span>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <Link
                        className={styles.button}
                        href={`/editCards?question=${encodeURIComponent(
                            card.question
                        )}&answer=${encodeURIComponent(card.answer)}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                      Bearbeiten
                    </Link>

                    <Trashcan onDelete={() => deleteCard(card.id)} />
                  </div>
                </li>
            ))}
          </ul>
        </main>
      </>
  );
}