import DeckList from "./DeckList";
import { useNavigate } from "react-router-dom";

// Home page for the web application
// Has the button used to create and add a new deck to the database
// Also lists the decks that are currently available
function HomePage() {
    const navigate = useNavigate();

    const createDeckHandler = () => {
        navigate("/decks/new");
    };

    return (
        <div className="homePage">
            <button className="createDeckButton" onClick={createDeckHandler}>+ Create Deck</button>
            <DeckList />
        </div>
    );
}

export default HomePage;