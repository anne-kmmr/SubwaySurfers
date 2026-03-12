"use client";

import Link from "next/link";
import styles from "./IconButton.module.css";

type IconButtonProps = {
  href: string;
  label: string;
  children: React.ReactNode;
};

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