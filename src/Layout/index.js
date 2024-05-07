import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import HomePage from "../Home/HomePage";
import DeckViewer from "../Deck/DeckViewer";
import DeckCreate from "../Deck/DeckCreate";
import DeckStudy from "../Deck/DeckStudy";
import DeckEdit from "../Deck/DeckEdit";
import CardCreate from "../Deck/CardCreate";
import CardEdit from "../Deck/CardEdit";

// Sets up the layout and routes for the application
function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="decks/new" element={<DeckCreate />} />
          <Route path="decks/:deckId" element={<DeckViewer />} />
          <Route path="decks/:deckId/edit" element={<DeckEdit />} />
          <Route path="decks/:deckId/study" element={<DeckStudy />} />
          <Route path="decks/:deckId/cards/new" element={<CardCreate />} />
          <Route path="decks/:deckId/cards/:cardId/edit" element={<CardEdit />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
