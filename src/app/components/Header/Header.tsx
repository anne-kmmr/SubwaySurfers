"use client";

import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
import IconButton from "../Icons/IconButton/IconButton";
import SkateboardIcon from "../Icons/SkateboardIcon/SkateboardIcon";
import ArrowLeftIcon from "../Icons/ArrowLeftIcon/ArrowLeftIcon";

type HeaderProps = {
  title: string;
  backHref?: string;
};

export default function Header({ title, backHref }: HeaderProps) {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>

        <div className={styles.left}>
          {backHref ? (
            <IconButton label="Zurück" onClick={() => router.back()}>
              <ArrowLeftIcon width={24} height={24} />
            </IconButton>
          ) : (
            <SkateboardIcon width={34} height={34} />
          )}
        </div>

        <h1 className={styles.headerTitle}>{title}</h1>

        <div className={styles.rightSpacer} />
      </div>
    </header>
  );
}