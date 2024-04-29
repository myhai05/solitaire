import React, { useState } from 'react';
import { View, StyleSheet, PanResponder, Animated, Text } from 'react-native';

const DropZone = () => {
    const [cards, setCards] = useState([]);
    const [cardPositions, setCardPositions] = useState({});

    const addCard = (card) => {
        setCards([...cards, card]);
        // Initialize position for the new card
        setCardPositions({
            ...cardPositions,
            [card]: new Animated.ValueXY(),
        });
    };

    const removeCard = (index) => {
        const updatedCards = [...cards];
        updatedCards.splice(index, 1);
        setCards(updatedCards);
    };

    const renderCards = () => {
        return cards.map((card, index) => (
            <Animated.View
                key={index}
                style={[
                    styles.card,
                    {
                        transform: cardPositions[card].getTranslateTransform(),
                    }
                ]}
                {...panResponder.panHandlers}
            >
                <Text>{card}</Text>
            </Animated.View>
        ));
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            // Update the position of the dragged card
            const { dx, dy } = gestureState;
            Object.keys(cardPositions).forEach(card => {
                cardPositions[card].setValue({ x: dx, y: dy });
            });
        },
        onPanResponderRelease: (event, gestureState) => {
            const containerWidth = 4 * 80; // Largeur du conteneur
            const cardWidth = 50; // Largeur de la carte
            const cardPositionX = gestureState.moveX - gestureState.x0; // Position ajustée de la carte
            const halfContainer = containerWidth / 2;
        
            // Calculez la nouvelle position la plus proche pour garder la carte à l'intérieur du conteneur
            let newPositionX = cardPositionX;
            if (cardPositionX > halfContainer - cardWidth) {
                newPositionX = halfContainer - cardWidth;
            } else if (cardPositionX < -halfContainer + cardWidth) {
                newPositionX = -halfContainer + cardWidth;
            }
        
            // Animer chaque carte vers sa nouvelle position
            Object.keys(cardPositions).forEach(card => {
                Animated.spring(cardPositions[card], {
                    toValue: { x: newPositionX, y: 0 },
                    useNativeDriver: false
                }).start();
            });
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.dropZone} />
            <View style={styles.dropZone} />
            <View style={styles.dropZone} />
            <View style={styles.dropZone}>
                {renderCards()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    dropZone: {
        width: 80,
        height: 100,
        backgroundColor: 'lightblue',
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: 50,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
});

export default DropZone;