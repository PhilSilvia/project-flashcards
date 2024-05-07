import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CardEditForm from "./CardEditForm";
import { readDeck, readCard } from "../utils/api/index";

// Card Editor page for the user to edit the front and back of an existing card
function CardEdit() {
    // Retrieves the deck id and card id from the url
    const { deckId, cardId } = useParams();
    // State variable to store the current deck information, mostly for the breadcrumb navigation
    const [ deck, setDeck ] = useState({});
    // State variable to store the current card information
    const [ card, setCard ] = useState({});

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

    // Once the deck is loaded successfully, display the JSX for the page
    if (deck){ 
        return (
            <div className="cardEdit">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li class="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li class="breadcrumb-item">Edit Card {cardId}</li>
                    </ol>
                </nav>
                <h2>Edit Card</h2>
                <CardEditForm card={card} setCard={setCard}/>
            </div>
        );
    }
    return <p>Loading...</p>;
}

export default CardEdit;