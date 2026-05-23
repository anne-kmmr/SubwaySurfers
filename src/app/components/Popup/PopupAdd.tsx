"use client";

import styles from "./Popup.module.css";

type Props = {
  open: boolean;
  message: string;
  onClose: () => void;
};

export default function PopupAdd({ open, message, onClose }: Props) {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.icon}>✔</div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}