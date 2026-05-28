import { Suspense } from "react";
import CardsViewClient from "./CardsViewClient";

export default function Page() {
    return (
        <Suspense fallback={<div>Lade...</div>}>
            <CardsViewClient />
        </Suspense>
    );
}