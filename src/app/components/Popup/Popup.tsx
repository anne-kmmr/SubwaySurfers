// Idee und Implementation durch Anne

"use client";

import styles from "./Popup.module.css";

type Props = {
  open: boolean;
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

// default des Popups mit allen Informationen
export default function Popup({
  open,
  message,
  type = "success",
  onClose,
}: Props) {
  if (!open) return null;

  // für Error-Meldungen
  const isError = type === "error";

  //returnt Popup mit Icon und Message, je nach Verwendungszweck
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.popup} ${
          isError ? styles.popupError : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={
            isError ? styles.iconError : styles.iconSuccess
          }
        >
          {isError ? "!" : "✓"}
        </div>

        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}