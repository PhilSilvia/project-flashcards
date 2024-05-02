import { useNavigate } from "react-router-dom";

// Display for an individual deck within the Deck List on the Homepage
function DeckDisplay({ deck }) {
    // Navigation for the buttons
    const navigate = useNavigate();

    // Event handler for the View button
    const viewHandler = () => {
        navigate(`./decks/${deck.id}`);
    }

    // Event handler for the Study button
    const studyHandler = () => {
        navigate(`./decks/${deck.id}/study`)
    }
    // Event handler for the Delete button
    const deleteHandler = () => {

    }

    return (
        <div class="card" key={deck.id}>
            <div class="card-body">
                <h5 class="card-title">{deck.name}</h5>
                <h6 class="card-subtitle">{deck.cards.length} Cards</h6>
                <p class="card-text">{deck.description}</p>
                <button className="viewButton" onClick={viewHandler}>&#128065;View</button>
                <button className="studyButton" onClick={studyHandler}>&#128214;Study</button>
                <button className="deleteButton" onClick={deleteHandler}>&#128465;Delete</button>
            </div>
        </div>
    );
}

export default DeckDisplay;