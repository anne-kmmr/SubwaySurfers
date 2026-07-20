import { Suspense } from "react";
import BoxCardPage from "./flashcardboxesClient";

export default function Page() {
    return (
    <Suspense fallback={<div>Lädt...</div>}>
        <BoxCardPage />
    </Suspense>
    );
}