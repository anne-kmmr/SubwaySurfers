"use client"

import styles from "./Header.module.css";
import {useState, useRef, useEffect} from "react";
import IconButton from "../Icons/IconButton/IconButton";

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
              <div style={{width: "44px", display: "flex", justifyContent: "center"}}>
                <SkateboardIcon width={24} height={24}/>
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

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 24}
      height={props.height || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function SkateboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
      <svg
          className="SkateboardIcon"
          xmlns="http://www.w3.org/2000/svg"
          width={props.width || 24}
          height={props.height || 24}
          viewBox="0 0 10190 9330"
          fill="none"
          stroke="blue"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
      >
        <path d="M1755 8460 c-3 -5 -21 -10 -39 -10 -32 0 -86 -39 -86 -62 0 -10 -25 -38 -34 -38 -3 0 -6 6 -6 14 0 8 -23 26 -52 40 -41 21 -67 26 -123 26 -66 0 -75 -2 -103 -30 -18 -16 -36 -30 -41 -30 -18 0 -61 -54 -61 -76 0 -12 -4 -26 -10 -29 ..."/>
      </svg>
  );
}

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 24}
      height={props.height || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
