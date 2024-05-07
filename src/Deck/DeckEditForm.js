import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

// Form on the Edit Deck screen for changing the name and description of a deck
function DeckEditForm() {
    // Set up the state variables to track the current deck being edited
    const [ deck, setDeck ] = useState({});
    // Retrieves the id for the deck being edited from the url
    const { deckId } = useParams();
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
        async function changeDeck() {
            try {
                await updateDeck(deck, abortController.signal);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        // Navigate back to the deck view page AFTER the deck has been updated
        changeDeck().then(() => navigate(`/decks/${deckId}`));
    };

    // Event handler upon form cancellation
    const cancelHandler = () => {
        // Navigate back to the deck viewer without changing anything
        navigate(`/decks/${deckId}`);
    };

    // Loads the current deck's information
    useEffect(() => {
        setDeck({});
        const abortController = new AbortController();
        async function loadDeck() {
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        loadDeck();
        return () => { abortController.abort(); }
    }, [deckId]);

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

export default DeckEditForm;