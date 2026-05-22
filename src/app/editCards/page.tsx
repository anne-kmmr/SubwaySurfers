// Daten von Raul

"use client";

import { Suspense } from "react";
import EditCardsInner from "./editCardsInner";

export default function Page() {
  return (
      <Suspense fallback={<div>Lädt…</div>}>
        <EditCardsInner />
      </Suspense>
  );
}