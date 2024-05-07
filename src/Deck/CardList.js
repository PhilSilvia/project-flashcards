import { useNavigate } from "react-router-dom";
import { deleteCard } from "../utils/api";

function CardList({ cards }) {
    const navigate = useNavigate();
    
    const editHandler = (event) => {
        const cardId = event.target.parentNode.parentNode.id;
        navigate(`/decks/${cards[0].deckId}/cards/${cardId}/edit`)
    };

    const deleteHandler = (event) => {
        const cardId = event.target.parentNode.parentNode.id;
        if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")){
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
            removeCard().then(window.location.reload());
        }
    };

    let cardListDisplay = "";
    if (cards && cards.length > 0){
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