import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck } from "../utils/api/index";
//import CardStudy from "./CardStudy";

function DeckStudy() {
    const [ deck, setDeck ] = useState({});
    const [ currentCard, setCurrentCard ] = useState(1);
    const [ showFront, setShowFront ] = useState(true);
    const navigate = useNavigate();
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

    useEffect(() => {

    }, [currentCard]);

    const flipHandler = () => {
        setShowFront(!showFront);
    };

    const nextHandler = () => {
        if (currentCard === deck.cards.length){
            if (window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.")) {
                setCurrentCard(1);
                setShowFront(true);
            } else {
                navigate("/");
            }
        } else {
            setCurrentCard(currentCard + 1);
            setShowFront(true);
        }
    };

    if (deck && deck.cards) {
        const cardBody = showFront? (
            <div class="card-body">
                <p class="card-text">{deck.cards[currentCard - 1].front}</p>
                <button className="flipButton" onClick={flipHandler}>Flip</button>
            </div>
            
        ) : (
            <div class="card-body">
                <p class="card-text">{deck.cards[currentCard - 1].back}</p>
                <button className="flipButton" onClick={flipHandler}>Flip</button>
                <button className="nextButton" onClick={nextHandler}>Next</button>
            </div>
        )
        return (
            <div className="deckStudy">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li class="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li class="breadcrumb-item">Study</li>
                    </ol>
                </nav>
                <h2>{deck.name}</h2>
                <div class="card">
                    <div class="card-title" >
                        <h5 class="card-title">Card {currentCard} of {deck.cards.length}</h5>
                        {cardBody}
                    </div>
                    
                </div>
            </div>
        ); 
    }
    return <p>Loading...</p>;
}

export default DeckStudy;