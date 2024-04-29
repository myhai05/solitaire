import React, { useState } from 'react';
import { View, Text, Button } from "react-native";
import CartCreator from '../components/cart';
import createDeck from '../utils/jeux';
import shuffle from '../components/mix';
import distributeCards from '../components/distribution';

const CardDeck = () => {
    const [cards, setCards] = useState([]);
    const [columns, setColumns] = useState([[], [], [], []]);

    const handleCreateDeck = () => {
        const newDeck = createDeck();
        setCards(newDeck);
        distributeCards(newDeck, setColumns);
    };

    const handleShuffle = () => {
        const shuffledDeck = shuffle(cards);
        setColumns(shuffledDeck);
        distributeCards(shuffledDeck, setColumns);
    };

    const handleCreateAndShuffle = () => {
        handleCreateDeck();
        handleShuffle();
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>        
            <View style={{ flexDirection: 'row' }}>
                {columns.map((column, columnIndex) => (
                    <View key={columnIndex} style={{ flex: 1 }}>
                        <CartCreator cards={column} />
                    </View>
                ))}
            </View>
            <Button title="Créer un nouveau jeu de cartes" onPress={handleCreateAndShuffle} />
        </View>
    );
};

export default CardDeck;