import React from 'react';
import { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, PanResponder, Animated } from 'react-native';

const CartCreator = ({ cards }) => {
    return (
        <View style={styles.column}>
            {cards.map((card, index) => {
                // Créez une nouvelle Animated.ValueXY pour chaque carte
                const pan = new Animated.ValueXY();

                // Définissez les gestionnaires de pan pour chaque carte
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
                        }).start();
                    }
                });

                return (
                    <Animated.View
                        key={index}
                        style={[
                            styles.card,
                            {
                                transform: [
                                    { translateX: pan.x },
                                    { translateY: pan.y }
                                ],
                                zIndex: index === cards.length - 1 ? 1000 : index,
                                top: index * 20, // Ajustez la position verticale de chaque cart
                            }
                        ]}
                        {...panResponder.panHandlers}
                    >
                        <Text style={styles.cardText}>{card.suit} {card.value}</Text>
                    </Animated.View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    column: {
        alignItems: 'center',
        marginBottom: 10,
    },
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

export default CartCreator;