"use client";

import { Suspense } from "react";
import EditCardsInner from "./EditCardsInner";

export default function Page() {
  return (
      <Suspense fallback={<div>Lädt…</div>}>
        <EditCardsInner />
      </Suspense>
  );
}