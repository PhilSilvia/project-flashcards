import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../utils/api/index";

// Deck Creation form for the Deck Create screen so the user can create a new Deck
function DeckCreateForm() {
    // Initializes a blank deck for the form
    const blankDeck = { name: "", description: "" };
    // Set up the state variables to track the current deck being edited
    const [ deck, setDeck ] = useState({...blankDeck});
    // Set up the navigation
    const navigate = useNavigate();
    
    // Event handler to keep track of the form values as they change
    const changeHandler = ({ target }) => {
        const value = target.value;
        setDeck({
            ...deck,
            [target.name]: value,
        });
    };

    // Event handler upon form submission
    const submitHandler = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        let deckId = 0;
        async function makeDeck() {
            try {
                const response = await createDeck(deck, abortController.signal);
                deckId = response.id;
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        // Navigate to the deck view page AFTER the deck has been updated
        makeDeck().then(() => navigate(`/decks/${deckId}`));
    };

    // Event handler upon form cancellation
    const cancelHandler = () => {
        // Navigate home without creating or changing anything
        navigate(`/`);
    };

    // Returns the JSX for the form
    return (
        <form onSubmit={submitHandler}>
            <div class="d-flex flex-column">
                <label htmlFor="name">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    onChange={changeHandler} 
                    value={deck.name} />
                <label htmlFor="description">Description</label>
                <textarea 
                    name="description" 
                    id="description" 
                    rows="3" 
                    onChange={changeHandler}
                    value={deck.description}>
                </textarea>
                <div class="row">
                    <button className="cancelButton" onClick={cancelHandler}>Cancel</button>
                    <button className="submitButton" type="submit">Submit</button>
                </div>
            </div>
        </form>
    );
}

export default DeckCreateForm;