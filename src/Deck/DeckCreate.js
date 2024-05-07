import { Link } from "react-router-dom";
import DeckCreateForm from "./DeckCreateForm";

// Deck Creation interface for the user to add new decks to the application
function DeckCreate() {
    return (
        <div className="deckCreate">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item">Create Deck</li>
                </ol>
            </nav>
            <h2>Create Deck</h2>
            <DeckCreateForm />
        </div>
    );
}

export default DeckCreate;