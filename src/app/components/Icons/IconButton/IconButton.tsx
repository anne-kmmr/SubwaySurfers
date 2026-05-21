import Link from "next/link";
import styles from "./IconButton.module.css";

type IconButtonProps = {
  href?: string;
  onClick?: () => void;
  label: string;
  children: React.ReactNode;
};

export default function IconButton({
  href,
  onClick,
  label,
  children,
}: IconButtonProps) {
  // FALL 1: Link
  if (href) {
    return (
      <Link href={href} className={styles.iconButton} aria-label={label}>
        {children}
      </Link>
    );
  }

  // FALL 2: Button
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