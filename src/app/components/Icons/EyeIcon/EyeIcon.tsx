"use client";

import React from "react";
import styles from "./PencilIcon.module.css";

export default function PencilIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <div className={styles.pencilIcon}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5 20.5 7.5 7 21H3v-4L16.5 3.5z" />
      </svg>
    </div>
  );
}