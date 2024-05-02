import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import HomePage from "../Home/HomePage";
import DeckViewer from "../Deck/DeckViewer";
import DeckCreate from "../Deck/DeckCreate";
import DeckStudy from "../Deck/DeckStudy";
import CardCreate from "../Deck/CardCreate";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="deck/new" element={<DeckCreate />} />
            <Route path="decks/:deckId" element={<DeckViewer />}>
              <Route path="edit" element={<DeckCreate />} />
              <Route path="study" element={<DeckStudy />} />
              <Route path="cards/new" element={<CardCreate />} />
              <Route path="cards/:cardId/edit" element={<CardCreate />} />
            </Route>
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
