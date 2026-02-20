const headerTitel = document.getElementById("headerTitel") as HTMLHeadingElement | null;

let bearbeitung: boolean = false;

if (!headerTitel) {
  throw new Error("Elemente nicht gefunden. Prüfe die IDs in index.html.");
}

headerTitel.addEventListener("click", () => {
  if (bearbeitung == false) {
    headerTitel.textContent = "Karte erstellen";
  } else if (bearbeitung == true) {
    headerTitel.textContent = "Karte bearbeiten";
  }
});