import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createCard } from "../utils/api";

function CardCreateForm() {
    // Initialize our blank card for the user to fill in
    const blankCard = {
        front: "",
        back: "",
    };
    // Create our state variables for tracking the card information
    const [ card, setCard ] = useState({...blankCard});
    // Load the deck id from the url
    const { deckId } = useParams();
    // Set our navigation alias
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
        async function makeCard() {
            try {
                await createCard(deckId, card, abortController.signal);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        // Navigate back to the deck view page AFTER the card has been added to it
        makeCard().then(() => navigate(`/decks/${deckId}`));
    };

    // Event handler for cancelling the form, which simply navigates back to the deck view without changing anything
    const cancelHandler = () => {
        navigate(`/decks/${deckId}`);
    }

    // Returns the card update form JSX
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

export default CardCreateForm;