import React from "react";
import "./SkateboardIcon.module.css";

function SkateboardIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            className="skateboardIcon"
            xmlns="http://www.w3.org/2000/svg"
            width={props.width || 24}
            height={props.height || 24}
            viewBox="0 0 10190 9330"
            fill="currentColor"
            {...props}
        >
            <path d="M1755 8460 c-3 -5 -21 -10 -39 -10 -32 0 -86 -39 -86 -62 0 -10 -25 -38 -34 -38 -3 0 -6 6 -6 14 0 8 -23 26 -52 40 -41 21 -67 26 -123 26 -66 0 -75 -2 -103 -30 -18 -16 -36 -30 -41 -30 -18 0 -61 -54 -61 -76 0 -12 -4 -26 -10 -29 ..."/>
        </svg>
    );
}

export default SkateboardIcon;