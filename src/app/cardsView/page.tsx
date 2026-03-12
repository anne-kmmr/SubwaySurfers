import styles from "./cardsView.module.css";
import Header from "../components/Header/Header";
import Link from "next/link";

const cards = [
  "2 + 2 = ?",
  "2 + 2 = ?",
  "2 + 2 = ?",
  "2 + 2 = ?",
  "2 + 2 = ?",
];

export default function CardsView() {
  return (
    <>
      <Header title="Mathematik Karten" backHref="/" />
      <main className={styles.app}>
        <div className={styles.newCardContainer}>
          <Link className={styles.button} href="/editCards">
            + Neue Karte
          </Link>
        </div>
        <ul className={styles.content}>
          {cards.map((card, index) => (
            <li key={index} className={styles.li}>
              <span>{card}</span>
              <Link className={styles.button} href="/editCards">
                Bearbeiten
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}