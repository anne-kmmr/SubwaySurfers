// Ursprüngliche Systematik von Adam
// Aussehen und Funktionen überarbeitet von Anne

"use client";

import { useEffect, useState } from "react";
import styles from "./cardsView.module.css";
import Header from "../components/Header/Header";
import Link from "next/link";
import Loading from "@/app/components/Loading/Loading";
import Trashcan from "../components/Icons/Trashcan/Trashcan";
import Popup from "../components/Popup/Popup";
import { useSearchParams } from "next/navigation";

type Card = {
  id: string;
  question: string;
  answer: string;
};

export default function CardsView() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [ascending, setAscending] = useState(true);

  // Popup State
  const [popupOpen, setPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);

  // settet "Set" in URL und kann so weiter arbeiten
  const searchParams = useSearchParams();
  const currentSet = searchParams.get("set");

  // behält Ordnung bei
  useEffect(() => {
    const savedSort = localStorage.getItem("sortAscending");
    if (savedSort !== null) {
      setAscending(savedSort === "true");
    }
  }, []);

  // sucht nach Vokabeln
  useEffect(() => {
    async function fetchVocab() {
      try {
        setLoading(true);

        const query = new URLSearchParams();
        if (currentSet) {
          query.append("set", currentSet);
        }

        const res = await fetch(`/api/vocab?${query.toString()}`);
        const data = await res.json();

        const savedSort = localStorage.getItem("sortAscending");
        const isAsc = savedSort === "true";

        const sorted = [...data].sort((a: Card, b: Card) =>
            isAsc
                ? a.question.localeCompare(b.question)
                : b.question.localeCompare(a.question)
        );

        setCards(sorted);
        setFlipped(new Array(sorted.length).fill(false));
        setAscending(isAsc);
      } catch (err) {
        console.error("Fehler beim Laden der Vokabeln:", err);
        setCards([]);
      } finally {
        setLoading(false);
      }
    }

    fetchVocab();
  }, [currentSet]);

  // "flipped" karte
  const toggleCard = (index: number) => {
    setFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  // Popup und delete
  const askDeleteCard = (id: string) => {
    setCardToDelete(id);
    setPopupOpen(true);
  };

  // confirmed das Delete und löscht
  const confirmDelete = async () => {
    if (!cardToDelete) return;

    try {
      const res = await fetch("/api/vocab", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: cardToDelete }),
      });

      if (!res.ok) throw new Error("Fehler beim Löschen");

      const updated = cards.filter((c) => c.id !== cardToDelete);

      setCards(updated);
      setFlipped(new Array(updated.length).fill(false));

      setPopupOpen(false);
      setCardToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Abbrechen
  const cancelDelete = () => {
    setPopupOpen(false);
    setCardToDelete(null);
  };

  // sortiert A-Z / Z-A
  const sortCards = () => {
    const newAscending = !ascending;

    const sorted = [...cards].sort((a, b) =>
        newAscending
            ? a.question.localeCompare(b.question)
            : b.question.localeCompare(a.question)
    );

    setCards(sorted);
    setAscending(newAscending);

    localStorage.setItem("sortAscending", String(newAscending));
  };

  // loading
  if (loading) {
    return (
        <>
          <Header
              title={`${currentSet || "Alle"} Vokabelkarten`}
              backHref="/"
          />
          <main className={styles.app}>
            <Loading />
          </main>
        </>
    );
  }

  // returnt Seite mit Vokabeln
  return (
      <>
        <Header
            title={`${currentSet || "Alle"} Vokabelkarten`}
            backHref="/"
        />

        <main className={styles.app}>
          <div className={styles.newCardContainer}>
            <Link className={styles.button} href="/editCards">
              + Neue Karte
            </Link>

            <button className={styles.button} onClick={sortCards}>
              Sortieren ({ascending ? "Alphabetisch ↑" : "Alphabetisch ↓"})
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
                  <span>{flipped[index] ? card.answer : card.question}</span>

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

                    <Trashcan onDelete={() => askDeleteCard(card.id)} />
                  </div>
                </li>
            ))}
          </ul>

          <Popup
              open={popupOpen}
              type="error"
              message="Willst du diese Karte wirklich löschen?"
              onClose={cancelDelete}
              onConfirm={confirmDelete}
          />
        </main>
      </>
  );
}