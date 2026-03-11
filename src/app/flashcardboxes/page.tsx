import Link from "next/link";
import styles from "./flashcardBoxes.module.css";
import Header from "../components/Header/Header";

type BoxCardProps = {
  title: string;
  count: number;
  variant: "red" | "yellow" | "green";
  href: string;
};

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
    <>
      <Header title="Lernboxen" backHref="/" />
      <main className={styles.content} aria-label="Karteikästen">
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
      </main>
    </>
  );
}
