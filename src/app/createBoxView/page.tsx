"use client";

import { useEffect, useState } from "react";
import styles from "./createBoxView.module.css";
import Header from "../components/Header/Header";

export default function createBoxView() {
  return (
    <>
      <Header title="Karteikartenbox erstellen" backHref="/" />
    </>
  );
}
