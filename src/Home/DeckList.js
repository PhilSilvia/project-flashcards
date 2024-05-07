import React from "react";
import { useState, useEffect } from "react";
import { listDecks } from "../utils/api/index";
import DeckDisplay from "./DeckDisplay";

// Lists all of the available decks on the homepage
function DeckList() {
    // Sets the state variable for the duecks
    const [decks, setDecks] = useState([]);
    // Stores the JSX for the decks
    let deckDisplay = "";

    // Retrieve the decks from the database
    useEffect(() => {
        setDecks([]);
        const abortController = new AbortController();
        async function loadDecks() {
            try {
                const response = await listDecks(abortController.signal);
                setDecks(response);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        loadDecks();

        return () => { abortController.abort(); }
    }, []);

    // If we successfully retrieved the decks, we set up the JSX for the list display
    if (decks && decks.length > 0){
        deckDisplay = decks.map((deck) => <DeckDisplay deck={deck} />);
    }

    // Returns the JSX for the list
    return (
        <div className="deckList">
            {deckDisplay}
        </div>
    );
}

export default DeckList;