import { Suspense } from "react";
import LearningModeClient from "./LearningModeClient";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LearningModeClient />
        </Suspense>
    );
}