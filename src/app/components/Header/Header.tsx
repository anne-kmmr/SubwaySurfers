"use client"

import styles from "./Header.module.css";
import {useState, useRef, useEffect} from "react";
import IconButton from "../Icons/IconButton/IconButton";
import SkateboardIcon from "../Icons/SkateboardIcon/SkateboardIcon";
import ArrowLeftIcon from "../Icons/ArrowLeftIcon/ArrowLeftIcon";
import SettingsIcon from "../Icons/SettingsIcon/SettingsIcon";

type HeaderProps = {
  title: string;
  backHref?: string;
};

export default function Header({ title, backHref }: HeaderProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [twoLines, setTwoLines] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const lines = Math.round(el.clientHeight / lineHeight);

    setTwoLines(lines > 1);
  }, [title]);

  const routes = {
    settings: "/settings",
  };

  return (
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          {backHref ? (
              <IconButton href={backHref} label="Zurück">
                <ArrowLeftIcon width={24} height={24}/>
              </IconButton>
          ) : (
              <div
                  style={{
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
              >
                <SkateboardIcon width={150} height={150} />
              </div>
          )}

          <h1
              ref={titleRef}
              className={`${styles.headerTitle} ${twoLines ? styles.smallTitle : styles.bigTitle}`}
          >
            {title}
          </h1>

          <IconButton href={routes.settings} label="Einstellungen">
            <SettingsIcon width={24} height={24}/>
          </IconButton>
        </div>
      </header>
  );
}

