import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api/index";
import CardList from "./CardList";

// Deck viewer page, for when the user wants to inspect a specific deck
function DeckViewer() {
    // Sets the state variables for the deck information
    const [deck, setDeck] = useState({});
    // Retrieve the deck id from the url
    const { deckId } = useParams();
    // Alias the navigation
    const navigate = useNavigate();

    // Event handler for the study button. Navigates to the deck's study page
    const studyHandler = () => {
        navigate(`/decks/${deckId}/study`);
    };

    // Event handler for the add card button. Navigates to the new card page
    const addCardHandler = () => {
        navigate(`/decks/${deckId}/cards/new`);
    };

    // Event handler for the edit deck button. Navigates to the deck editor page
    const editHandler = () => {
        navigate(`/decks/${deckId}/edit`);
    };

    // Event handler for the delete deck button
    const deleteHandler = () => {
        // Confirms whether or not the user wants to delete the deck
        if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
            // If they do, then use the API call to delete the deck
            const abortController = new AbortController();
            async function removeDeck() {
                try {
                    deleteDeck(deckId, abortController.signal);
                } catch(error) {
                    if (error.name === "AbortError"){
                        console.log("Aborted");
                    } else {
                        throw error;
                    }
                }
            }
            // Once the deck is removed, navigate back home
            removeDeck().then(() => navigate("/"));
        }
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

    // Return the JSX for the breadcrumb nav and deck display once it is loaded
    if (deck) {
        return (
            <div className="deckViewer">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li class="breadcrumb-item">{deck.name}</li>
                    </ol>
                </nav>
                <section>
                    <h3>{deck.name}</h3>
                    <p>{deck.description}</p>
                    <button className="editButton" onClick={editHandler}>&#128393;Edit</button>
                    <button className="studyButton" onClick={studyHandler}>&#128214;Study</button>
                    <button className="addCardButton" onClick={addCardHandler}>+ Add Cards</button>
                    <button className="deleteButton" onClick={deleteHandler}>&#128465;Delete</button>
                    <h2>Cards</h2>
                </section>
                <CardList cards={deck.cards} />
            </div>
        );
    }
    // If we haven't loaded the deck yet, show a simple loading page
    else {
        return <p>Loading...</p>;
    }
}

export default DeckViewer;