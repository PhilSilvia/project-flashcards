import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateCard, createCard } from "../utils/api/index";

// Card editing form so the user can change existing cards within a deck
function CardEditForm({ card, setCard }) {
    // Retrieve the deck id and card id from the url
    const { deckId } = useParams();
    // Sets up the state variables to store the current card information
    // Aliases our navigation
    const navigate = useNavigate();

    // Event handler to keep track of the form values as they change
    const changeHandler = ({ target }) => {
        const value = target.value;
        setCard({
            ...card,
            [target.name]: value,
        });
    };

    // Event handler for form submission
    const submitHandler = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        async function changeCard() {
            try {
                if (card.id){
                    await updateCard(card, abortController.signal);
                } else {
                    await createCard(deckId, card, abortController.signal);
                }
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        // Navigate back to the deck view page AFTER the deck has been updated
        changeCard().then(() => navigate(`/decks/${deckId}`));
    };

    // Event handler for cancelling the form, which simply navigates back to the deck view without changing anything
    const cancelHandler = () => {
        navigate(`/decks/${deckId}`);
    }

    // Returns the card update form JSX
    if (card) {
        return (
            <form onSubmit={submitHandler}>
                <div class="d-flex flex-column">
                    <label htmlFor="front">Front</label>
                    <textarea 
                        name="front" 
                        id="front" 
                        rows="3" 
                        onChange={changeHandler}
                        value={card.front}>
                    </textarea>
                    <label htmlFor="back">Back</label>
                    <textarea 
                        name="back" 
                        id="back" 
                        rows="3" 
                        onChange={changeHandler}
                        value={card.back}>
                    </textarea>
                    <div class="row">
                        <button className="cancelButton" onClick={cancelHandler}>Cancel</button>
                        <button className="submitButton" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        );
    } 
    return <p>Loading...</p>;
}

export default CardEditForm;