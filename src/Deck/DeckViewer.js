import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardList from "./CardList";

function DeckViewer() {
    const [deck, setDeck] = useState({});
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
        <div className="deckViewer">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item">Deck Name</li>
                </ol>
            </nav>
            <section>
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <button className="editButton">&#128393;Edit</button>
                <button className="studyButton">&#128214;Study</button>
                <button className="addCardButton">+ Add Cards</button>
                <button className="deleteButton">&#128465;Delete</button>
                <h2>Cards</h2>
            </section>
            <CardList cards={deck.cards} />
        </div>
    );
}

export default DeckViewer;