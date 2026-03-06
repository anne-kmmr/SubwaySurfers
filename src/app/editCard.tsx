import React, { useState } from "react";
import "./styles.css";

const KartenBearbeiten: React.FC = () => {
  const [frage, setFrage] = useState<string>("2 + 2 = ?");
  const [antwort, setAntwort] = useState<string>("4");

  const handleSpeichern = () => {
    console.log("Gespeichert:");
    console.log("Frage:", frage);
    console.log("Antwort:", antwort);
  };

  const handleAbbrechen = () => {
    console.log("Abgebrochen");
  };

  return (
    <div>
      <div className="header">
        <h1 id="backButton">➜</h1>
        <h1 id="kartenTitel">
          Karte <br /> Bearbeiten
        </h1>
        <button id="settingsBtn">&#9881;</button>
      </div>

      <div className="content">
        <div className="frageDiv">
          <h2>Frage:</h2>
          <input
            type="text"
            className="textInpt"
            placeholder="Frage eingeben..."
            value={frage}
            onChange={(e) => setFrage(e.target.value)}
          />
        </div>

        <div className="antwortDiv" id="antwort">
          <h2>Antwort:</h2>
          <input
            type="text"
            className="textInpt"
            placeholder="Antwort eingeben..."
            value={antwort}
            onChange={(e) => setAntwort(e.target.value)}
          />
        </div>
      </div>

      <div className="submitChanges">
        <button className="änderungBtn" id="speichernBtn" onClick={handleSpeichern}>
          Speichern
        </button>
        <button className="änderungBtn" id="abbrechenBtn" onClick={handleAbbrechen}>
          Abbrechen
        </button>
      </div>
    </div>
  );
};

export default KartenBearbeiten;