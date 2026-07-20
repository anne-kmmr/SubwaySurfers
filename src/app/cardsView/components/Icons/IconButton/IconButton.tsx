// Implementierung durch Anne

import Link from "next/link";
import styles from "./IconButton.module.css";

type IconButtonProps = {
  href?: string;
  onClick?: () => void;
  label: string;
  children: React.ReactNode;
};

// legt Standard für den Button mit Link und ohne fest
export default function IconButton({
  href,
  onClick,
  label,
  children,
}: IconButtonProps) {
  if (href) {
    return (
      <Link href={href} className={styles.iconButton} aria-label={label}>
        {children}
      </Link>
    );
  }

  // returnt Button
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.iconButton}
      aria-label={label}
    >
      {children}
    </button>
  );
}