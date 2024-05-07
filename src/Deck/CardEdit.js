import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CardEditForm from "./CardEditForm";
import { readDeck } from "../utils/api/index";

function CardEdit() {
    const { deckId, cardId } = useParams();
    const [ deck, setDeck ] = useState({});

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
                <CardEditForm />
            </div>
        );
    }
    return <p>Loading...</p>;
}

export default CardEdit;