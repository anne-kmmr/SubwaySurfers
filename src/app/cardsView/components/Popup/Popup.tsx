// Idee und Implementation durch Anne

"use client";

import styles from "./Popup.module.css";

type Props = {
  open: boolean;
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  onConfirm?: () => void; // optional für Delete-Confirm
};

// default des Popups mit allen Informationen
export default function Popup({
                                open,
                                message,
                                type = "success",
                                onClose,
                                onConfirm,
                              }: Props) {
  if (!open) return null;

  const isError = type === "error";

  // retunted Popup, je nach Gebrauch und Zustand
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

          {onConfirm && (
              <div className={styles.actions}>
                <button onClick={onClose}>
                  Abbrechen
                </button>

                <button onClick={onConfirm}>
                  OK
                </button>
              </div>
          )}
        </div>
      </div>
  );
}