import Link from "next/link";
import styles from "./FlashcardBoxes.module.css";
import { Chewy } from "next/font/google";

const chewy = Chewy({
  subsets: ["latin"],
  weight: "400",
});

type BoxCardProps = {
  title: string;
  count: number;
  variant: "red" | "yellow" | "green";
  href: string;
};

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

function BoxCard({ title, count, variant, href }: BoxCardProps) {
  return (
    <Link
      className={`${styles.box} ${styles[variant]}`}
      href={href}
      aria-label={`${title} (${count} Karten)`}
    >
      <div className={styles.boxLidTop}></div>
      <div className={styles.boxLid}>
        <div className={styles.boxTitle}>{title}</div>
      </div>
      <div className={styles.boxBody}>
        <div className={styles.boxCount}>
          <span className={styles.boxCountNumber}>{count}</span> Karten
        </div>
      </div>
      <div className={styles.boxShadow} aria-hidden="true"></div>
    </Link>
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

export default function BoxCardPage() {
  //TODO: später dynamisch aus DB holen
  const counts = {
    toLearn: 8,
    inProgress: 4,
    learned: 3,
  };

  //TODO: später richtige Routen einfügen
  const routes = {
    back: "/",
    settings: "/",
    toLearn: "/",
    inProgress: "/",
    learned: "/",
  };

  return (
    <main className={`${styles.page} ${chewy.className}`}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <IconButton href={routes.back} label="Zurück">
            <ArrowLeftIcon width={24} height={24} />
          </IconButton>

          <h1 className={styles.title}>Karteikasten</h1>

          <IconButton href={routes.settings} label="Einstellungen">
            <SettingsIcon width={24} height={24} />
          </IconButton>
        </div>
      </header>

      <section className={styles.content} aria-label="Karteikästen">
        <BoxCard
          title="Zu Lernen"
          count={counts.toLearn}
          variant="red"
          href={routes.toLearn}
        />
        <BoxCard
          title="In Arbeit"
          count={counts.inProgress}
          variant="yellow"
          href={routes.inProgress}
        />
        <BoxCard
          title="Gelernt"
          count={counts.learned}
          variant="green"
          href={routes.learned}
        />
      </section>
    </main>
  );
}
