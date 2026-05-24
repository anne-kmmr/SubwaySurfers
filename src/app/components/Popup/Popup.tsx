"use client";

import styles from "./Popup.module.css";

type Props = {
  open: boolean;
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

export default function Popup({
  open,
  message,
  type = "success",
  onClose,
}: Props) {
  if (!open) return null;

  const isError = type === "error";

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.popup} ${
          isError ? styles.popupError : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ICON */}
        <div
          className={
            isError ? styles.iconError : styles.iconSuccess
          }
        >
          {isError ? "!" : "✓"}
        </div>

        {/* MESSAGE */}
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}