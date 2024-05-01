import React, { useState } from 'react';
import { View, Text, Button } from "react-native";
import CartCreator from '../components/cart';
import createDeck from '../utils/jeux';
import shuffle from '../components/mix';
import distributeCards from '../components/distribution';
import createPile from '../utils/pile';
import PileCreator from '../components/pile';

const CardDeck = () => {

    const [columns, setColumns] = useState([]);
    const [pile, setPile] = useState([]);
   

    const newDeck = createDeck();// un tableau avec de cartes non mélangés
    const newPile = createPile();

    const handleShuffle = () => {
        const shuffledDeck = shuffle(newDeck);//cela melange les cartes
        // setColumns(shuffledDeck);
        const shuffledPile = shuffle(newPile);

        distributeCards(shuffledDeck, setColumns);
        setPile(shuffledPile);
    };

    const handleCreateAndShuffle = () => {
        handleShuffle();
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: -100 }}>
            <View style={{ marginBottom: 150, marginLeft: 200 }}>
                <PileCreator cards={pile} />
            </View>
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
