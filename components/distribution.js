import React from "react";

const distributeCards = (deck, setColumns) => {
     

    let columnsCopy = [[], [], [], []];
    let columnIndex = 0;
    deck.forEach((card, index) => {
        columnsCopy[columnIndex].push(card);
        columnIndex = (columnIndex + 1) % 4;
    });
    setColumns(columnsCopy);
};

export default distributeCards;