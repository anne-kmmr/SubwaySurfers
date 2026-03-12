import styles from "./cardsView.module.css";
import Header from "../components/Header/Header";
import Link from "next/link";

const content = " 2 + 2 = ?";

export default function createBrowser() {
  return (
    <>
      <Header title="Mathematik Karten" backHref="/" />
      <main className={`${styles.app}`}>
        <div>
          <Link className={`${styles.button}`} href={"/editCards"}>
            +Neue Karte
          </Link>
        </div>
        <div className={`${styles.content}`}>
          <li className={`${styles.li}`}>
            {content}
            <Link className={`${styles.button}`} href={"/editCards"}>
              Bearbeiten
            </Link>
          </li>
        </div>
      </main>
    </>
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
