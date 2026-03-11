import styles from "./cardsView.module.css";
import Header from "../components/Header/Header";

const content = " 2 + 2 = ?";

export default function createBrowser() {
  return (
    <>
      <Header title="Mathematik Karten" backHref="/" />
      <main className={`${styles.app}`}>
        <div>
          <button type="button" className={`${styles.button}`}>
            +Neue Karte
          </button>
        </div>
        <div className={`${styles.content}`}>
          <li className={`${styles.li}`}>
            {content}
            <button type="button" className={`${styles.button}`}>
              Bearbeiten
            </button>
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
