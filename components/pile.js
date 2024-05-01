import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, TouchableWithoutFeedback } from 'react-native';

const PileCreator = ({ cards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const changeCard = () => {
        // Change la carte actuelle pour la suivante dans la pile
        setCurrentIndex((currentIndex + 1) % cards.length);
    };

    return (
        <View>
            {cards.map((card, idx) => {
                const pan = new Animated.ValueXY();

                const panResponder = PanResponder.create({
                    onStartShouldSetPanResponder: () => true,
                    onPanResponderMove: Animated.event(
                        [
                            null,
                            {
                                dx: pan.x,
                                dy: pan.y
                            }
                        ],
                        { useNativeDriver: false }
                    ),
                    onPanResponderRelease: () => {
                        Animated.spring(pan, {
                            toValue: { x: 0, y: 0 },
                            useNativeDriver: false
                        }).start();console.log(pan.x);
                    }
                });

                return (
                    <TouchableWithoutFeedback
                        key={idx}
                        onPress={changeCard}
                    >
                        <Animated.View
                            style={[
                                styles.card,
                                {
                                    transform: [
                                        { translateX: pan.x },
                                        { translateY: pan.y }
                                    ],
                                    zIndex: idx === currentIndex ? 1000 : idx
                                }
                            ]}
                            {...panResponder.panHandlers}
                        >
                            <Text style={styles.cardText}>{card.suit} {card.value}</Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        margin: 5,
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        width: 80,
        height: 100,
        position: 'absolute',
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PileCreator;