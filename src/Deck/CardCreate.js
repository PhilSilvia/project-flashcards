import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CardCreateForm from "./CardCreateForm";
import { readDeck } from "../utils/api/index";

function CardCreate() {
    const { deckId } = useParams();
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

    // Once we've loaded the deck, then return our JSX for the page
    if (deck){ 
        return (
            <div className="cardCreate">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li class="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li class="breadcrumb-item">Add Card</li>
                    </ol>
                </nav>
                <h2>{deck.name}: Add Card</h2>
                <CardCreateForm />
            </div>
        );
    }
    return <p>Loading...</p>;
}

export default CardCreate;