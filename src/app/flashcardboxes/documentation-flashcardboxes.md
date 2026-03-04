Page.tsx

Zweck
Die Datei page.tsx implementiert die Seite „Karteikasten“. Sie stellt die drei Karteikästen (Zu Lernen, In Arbeit, Gelernt) dar und enthält die Topbar mit Zurücknavigations- und Einstellungs-Icon.

1. Font "Chewy" deklariert. Kommt zusammen mit der Topbar in die layout.tsx, wenn 

2. BoxCard Komponente stellt einzelne Karteikasten dar. Die Props bestehen aus dem Titel des Kasten, wie "Zu Lernen", der Anzahl an Karten, der Variante, wie "red | yellow | green", und der href Zielroute. Eine Box besteht im Wesentllichen aus dem BoxLidTop, der ist rein visuell für den 3D-Look verantwortlich, dem boxLid, der die Frontseite des Deckels mit dem Titel abbildet, und dem BoxBody, der den Korpus der Kiste mit Kartenanzahl zeigt, und dem BoxShadow, der rein Visuell für den Schatten verantwortlich ist, und aufgrund des - margins des BoxBody notwendig war. 
Die Farbvarianten sind Klassen, die ich in CSS refenziert habe und dort einfach ändern kann.

3. Wiederverwendbare Komponente für die Icon-Buttons (hier Back und Settings).

4. ArrowLeft- und SettingsIcon geben die SVG zurück und ist daher entstanden, da ich so die Farbe und Strokewidth der SVGs in CSS über ".icon" verändern kann.

5. Hauptkomponente BoxCardPage enthält die Topbar mit dem Zurück-Button, dem Titel und Settings-Button. Darunter ist der Content-Bereich. Die Topbar wir nach merging in die Layout.tsx kommen, da sie in jedem screen existiert. Die Daten (counts, routes) sind aktuell nur Platzhalter bis der Merge und das Backend kommen

6. 