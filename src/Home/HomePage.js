import DeckList from "./DeckList";

// Home page for the web application
// Has the button used to create and add a new deck to the database
// Also lists the decks that are currently available
function HomePage() {
    return (
        <div className="homePage">
            <button className="createDeckButton">+ Create Deck</button>
            <DeckList />
        </div>
    );
}

export default HomePage;