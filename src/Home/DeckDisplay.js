import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

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
        if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
            const abortController = new AbortController();
            async function removeDeck() {
                try {
                    deleteDeck(deck.id, abortController.signal);
                } catch(error) {
                    if (error.name === "AbortError"){
                        console.log("Aborted");
                    } else {
                        throw error;
                    }
                }
            }
            removeDeck().then(window.location.reload());
        }
    }

    // Returns the JSX for the individual deck
    return (
        <div class="card" key={deck.id}>
            <div class="card-body">
                <h5 class="card-title">{deck.name}</h5>
                <h6 class="card-subtitle">{deck.cards.length} cards</h6>
                <p class="card-text">{deck.description}</p>
                <button className="viewButton" onClick={viewHandler}>&#128065;View</button>
                <button className="studyButton" onClick={studyHandler}>&#128214;Study</button>
                <button className="deleteButton" onClick={deleteHandler}>&#128465;Delete</button>
            </div>
        </div>
    );
}

export default DeckDisplay;