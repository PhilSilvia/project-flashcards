import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck } from "../utils/api/index";

// Page for studying a deck's cards, flipping them and restarting the process
function DeckStudy() {
    // State variables for the deck
    const [ deck, setDeck ] = useState({});
    // State variables for the currently viewed card
    const [ currentCard, setCurrentCard ] = useState(1);
    // State variables for whether or not we are displaying the card's front or back
    const [ showFront, setShowFront ] = useState(true);
    // Alias for navigation
    const navigate = useNavigate();
    // Retrieve the current deck id from the url
    const { deckId } = useParams();

    // Load the deck's information on page load and should the deck id change
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

    // Event handler for the flip button, which will swap between front and back view
    const flipHandler = () => {
        setShowFront(!showFront);
    };

    // Event handler for the add card button, which shows up if there aren't sufficient cards in the deck
    const addCardHandler = () => {
        navigate(`/decks/${deckId}/cards/new`);
    };

    // Event handler for the next button, which moves on to the next card or offers to reset if at the last card
    const nextHandler = () => {
        // If we are on the last card, offer to restart or return home
        if (currentCard === deck.cards.length){
            // If we restart, reset the current card and return to the card's front
            if (window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.")) {
                setCurrentCard(1);
                setShowFront(true);
            } 
            // If we don't want to restart, return home
            else {
                navigate("/");
            }
        } 
        // If we're not on the last card, move on to the front of the next one
        else {
            setCurrentCard(currentCard + 1);
            setShowFront(true);
        }
    };

    // Once we've loaded the deck successfully, return the JSX for the page
    if (deck && deck.cards) {                
        return (
            <div className="deckStudy">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li class="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li class="breadcrumb-item">Study</li>
                    </ol>
                </nav>
                <h2>Study: {deck.name}</h2>
                {deck.cards.length > 2 ? (
                    <div class="card">
                        <div class="card-title" >
                            <h5 class="card-title">Card {currentCard} of {deck.cards.length}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">
                                {showFront ? deck.cards[currentCard - 1].front : deck.cards[currentCard - 1].back}
                            </p>
                            <button className="flipButton" onClick={flipHandler}>Flip</button>
                            {showFront ? "" : <button className="nextButton" onClick={nextHandler}>Next</button>}
                        </div>
                    </div>
                 ) : (
                    <div>
                        <h5>Not Enough Cards</h5>
                        <p>You need at least 3 cards to study</p>
                        <button className="addCardButton" onClick={addCardHandler}>+ Add Cards</button>
                    </div>
                )}
            </div>
        ); 
    }
    // If we are still waiting on the deck load, show a simple loading page
    return <p>Loading...</p>;
}

export default DeckStudy;