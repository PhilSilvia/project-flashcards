import { useState, useEffect } from "react";
import { useParams,  Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import DeckEditForm from "./DeckEditForm";

function DeckEdit() {
    const [ deck, setDeck ] = useState({});
    const { deckId } = useParams();

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

    return (
        <div className="deckEdit">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li class="breadcrumb-item">Study</li>
                </ol>
            </nav>
            <h2>Edit Deck</h2>
            <DeckEditForm />
        </div>
    );
}

export default DeckEdit;