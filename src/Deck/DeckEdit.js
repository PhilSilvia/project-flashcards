import React from "react";
import { useState, useEffect } from "react";
import { useParams,  Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import DeckEditForm from "./DeckEditForm";

// Deck editing screen for the user to update the name and description of an existing deck
function DeckEdit() {
    // Set up our state variables for the deck
    const [ deck, setDeck ] = useState({});
    // Retrieve the deck id from the url
    const { deckId } = useParams();

    // Load the deck on initial page load and should the deck's id change
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

    // Return the JSX for the breadcrumb navigation and the subsequent form
    return (
        <div className="deckEdit">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li class="breadcrumb-item">Edit Deck</li>
                </ol>
            </nav>
            <h2>Edit Deck</h2>
            <DeckEditForm />
        </div>
    );
}

export default DeckEdit;