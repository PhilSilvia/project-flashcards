import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api/index";
import CardList from "./CardList";

function DeckViewer() {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    const navigate = useNavigate();

    const studyHandler = () => {
        navigate(`/decks/${deckId}/study`);
    };

    const addCardHandler = () => {
        navigate(`/decks/${deckId}/cards/new`);
    };

    const editHandler = () => {
        navigate(`/decks/${deckId}/edit`);
    };

    const deleteHandler = () => {
        if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
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
            removeDeck().then(() => navigate("/"));
        }
    };

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

export default DeckViewer;