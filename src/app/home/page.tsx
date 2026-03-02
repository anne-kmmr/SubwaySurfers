"use client";

import { useRouter } from "next/navigation";
import styles from "./Home.module.css";

export default function HomePage() {
  const router = useRouter();

 const sets = [
  { id: "mathe", title: "Mathematik", count: 12, color: "#7ed957" },
  { id: "deutsch", title: "Deutsch", count: 8, color: "#ffd93d" },
  { id: "englisch", title: "Englisch", count: 15, color: "#4dabf7" },
]; 

  return (
    <div className={styles.container}>
      <h1>Meine Lernsets</h1>

      {sets.map((set) => (
        <div
  key={set.id}
  className={styles.card}
  style={{ borderLeft: `10px solid ${set.color}` }}
>
          <h2>{set.title}</h2>
          <p>{set.count} Karten</p>

          <div className={styles.buttonRow}>
  <button
    style={{ backgroundColor: set.color, color: "white" }}
    onClick={() => router.push(`/learn/${set.id}`)}
  >
    Lernen
  </button>

  <button
    style={{ backgroundColor: "#ff922b", color: "white" }}
    onClick={() => router.push(`/edit/${set.id}`)}
  >
    ✏️
  </button>

  <button
    style={{ backgroundColor: "#845ef7", color: "white" }}
    onClick={() => router.push(`/boxes/${set.id}`)}
  >
    Karteikasten
  </button>
</div>
        </div>
      ))}
    </div>
  );
}