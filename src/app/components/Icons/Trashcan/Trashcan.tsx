// Implementierung durch Anne

"use client";

import Image from "next/image";
import trashcan from "./Trashcan.svg";

type TrashcanProps = {
    // @ts-ignore
    onDelete: () => void;
};

export default function Trashcan({ onDelete }: TrashcanProps) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onDelete();
            }}
            style={{
                backgroundColor: "var(--darkblue)", // blau
                border: "none",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Image
                src={trashcan}
                alt="Löschen"
                width={18}
                height={18}
                style={{
                    filter: "brightness(0) invert(1)", // macht SVG weiß
                }}
            />
        </button>
    );
}