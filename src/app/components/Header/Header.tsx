import styles from "./Header.module.css";
import Link from "next/link";

type HeaderProps = {
  title: string;
  backHref?: string;
};

export default function Header({ title, backHref }: HeaderProps) {
  const routes = {
    back: "/",
    settings: "/",
    toLearn: "/",
    inProgress: "/",
    learned: "/",
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <IconButton href={routes.back} label="Zurück">
          <ArrowLeftIcon width={24} height={24} />
        </IconButton>

        <h1 className={styles.headerTitle}>{title}</h1>

        <IconButton href={routes.settings} label="Einstellungen">
          <SettingsIcon width={24} height={24} />
        </IconButton>
      </div>
    </header>
  );
}

function IconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
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

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
