import styles from "./test.module.css";
import { Chewy } from "next/font/google";
import settings  from "./settings_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import arrowBack from "./arrow_back_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"

const chewy = Chewy({
    subsets: ["latin"],
    weight: "400",
});

const title = "Mathematik\n Karten";
const content = " 2 + 2 = ?";

export default function createBrowser() {
    return (
            <div className={`${styles.app} ${chewy.className}`}>
                <div className={`${styles.topbar}`}>
                    <div className={`${styles.icons}`}>
                        <img src={settings}></img>
                        </div>

                        <div className={`${styles.title}`}>
                            {title}
                        </div>

                        <div className={`${styles.icons}`}>
                            <img src={arrowBack}></img>
                        </div>
                    </div>
                    <div ><button type="button" className={`${styles.button}`}>+Neue Karte</button></div>
                    <div className={`${styles.content}`}>
                        <li className={`${styles.li}`}>
                        {content}
                        <button type="button" className={`${styles.button}`}>Bearbeiten</button>
                        </li>
                        </div>
            </div>
    );
}

/* Future

type Cards = {
    value: String | Number;
}

function createCards() {
//Future?
}

function putCardsInList(cards: Cards) {
    const list = [];
    const cardList = list.push(cards);
    return (
    <div>
        <li>{cardList}</li>
    </div>
    );
}
*/
