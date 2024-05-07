import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readCard, updateCard } from "../utils/api/index";

// Card editing form so the user can change existing cards within a deck
function CardEditForm() {
    // Retrieve the deck id and card id from the url
    const { deckId, cardId } = useParams();
    // Sets up the state variables to store the current card information
    const [ card, setCard ] = useState({});
    // Aliases our navigation
    const navigate = useNavigate();

    // Loads the current card's information
    useEffect(() => {
        setCard({});
        const abortController = new AbortController();
        async function loadCard() {
            try {
                const response = await readCard(cardId, abortController.signal);
                setCard(response);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        loadCard();
        return () => { abortController.abort(); }
    }, [cardId]);

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
                await updateCard(card, abortController.signal);
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

export default CardEditForm;