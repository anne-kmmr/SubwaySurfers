// Datei von Sandro

"use client";

import Link from "next/link";
import styles from "./IconButton.module.css";
import React from "react";

type IconButtonProps = {
  href: string;
  label: string;
  children: React.ReactNode;
};

/* definiert einen Standard-Button, der später mehrmals verwendet werden kann/wird -> verlinkt dauerhaft auf andere
Dateien/Pfade */
export default function IconButton({ href, label, children }: IconButtonProps) {
  return (
    <Link
      href={href}
      className={styles.iconButton}
      aria-label={label}
      title={label}
    >
      {children}
    </Link>
  );
}