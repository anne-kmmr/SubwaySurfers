"use client";

import styles from "./Popup.module.css";

type Props = {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function PopupConfirm({
  open,
  message,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.icon}>?</div>

        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.cancel}`} onClick={onCancel}>
            Abbrechen
          </button>

          <button className={`${styles.button} ${styles.confirm}`} onClick={onConfirm}>
            Bestätigen
          </button>
        </div>
      </div>
    </div>
  );
}