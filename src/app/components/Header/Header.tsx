"use client";

import styles from "./Header.module.css";
import { useState, useRef, useEffect } from "react";
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

  const titleRef = useRef<HTMLHeadingElement>(null);
  const [twoLines, setTwoLines] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const lines = Math.round(el.clientHeight / lineHeight);

    setTwoLines(lines > 1);
  }, [title]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>

        {/* BACK BUTTON */}
        {backHref ? (
          <IconButton
            label="Zurück"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon width={24} height={24} />
          </IconButton>
        ) : (
          <div
            style={{
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SkateboardIcon width={150} height={150} />
          </div>
        )}

        {/* TITLE */}
        <h1
          ref={titleRef}
          className={`${styles.headerTitle} ${
            twoLines ? styles.smallTitle : styles.bigTitle
          }`}
        >
          {title}
        </h1>

      </div>
    </header>
  );
}