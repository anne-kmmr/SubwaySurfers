"use client";

import { useEffect, useState } from "react";
import styles from "./settings.module.css";
import Header from "../components/Header/Header";

export default function Setting() {
  return (
    <>
      <Header title="Settings" backHref="/" />
    </>
  );
}
