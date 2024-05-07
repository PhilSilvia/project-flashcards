import { useNavigate } from "react-router-dom";
import { deleteCard } from "../utils/api";

// Component that lists the cards for in the deck viewing screen
function CardList({ cards }) {
    // Aliases our navigation
    const navigate = useNavigate();
    
    // Event handler for the card edit button
    const editHandler = (event) => {
        // Retrieves the card id from the specific card that was clicked
        const cardId = event.target.parentNode.parentNode.id;
        // Navigate to the card edit page
        navigate(`/decks/${cards[0].deckId}/cards/${cardId}/edit`)
    };

    // Event handler for the card delete button
    const deleteHandler = (event) => {
        // Retrieves the card id from the specific card that was clicked
        const cardId = event.target.parentNode.parentNode.id;
        // Ensure the user wants the card to be deleted
        if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")){
            // Use the API delete card call
            const abortController = new AbortController();
            async function removeCard() {
                try {
                    deleteCard(cardId, abortController.signal);
                } catch(error) {
                    if (error.name === "AbortError"){
                        console.log("Aborted");
                    } else {
                        throw error;
                    }
                }
            }
            // Remove the card then reload the page so the deleted card is no longer shown
            removeCard().then(window.location.reload());
        }
    };

    // Initialize our card list display
    let cardListDisplay = "";
    // Once the cards are successfully loaded, and if deck isn't empty
    if (cards && cards.length > 0){
        // Map over each card and create the JSX for that card's display
        cardListDisplay = cards.map((card) => {
            return (
                <div class="card" key={card.id} id={card.id}>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <p class="card-text">{card.front}</p>
                            </div>
                            <div class="col-6">
                                <p class="card-text">{card.back}</p>
                            </div>
                        </div>
                        <button className="editButton" onClick={editHandler}>&#128393;Edit</button>
                        <button className="deleteButton" onClick={deleteHandler}>&#128465;Delete</button>
                    </div>
                </div>
            );
        });
    }
    return cardListDisplay;
}

export default CardList;