import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DropZone = ({ onDrop }) => {
    const [columns, setColumns] = useState([[], [], [], []]);
    
    const handleDrop = (index, card) => {
        setColumns(prevColumns => {
            const newColumns = [...prevColumns];
            newColumns[index].push(card);
            return newColumns;
        });
        onDrop(index, card);
    };

    return (
        <View style={styles.container}>
            {columns.map((column, columnIndex) => (
                <View key={columnIndex} style={styles.column}>
                    <Text>Column {columnIndex}</Text>
                    <View style={styles.dropZone}>
                        {column.map((card, cardIndex) => (
                            <View key={cardIndex} style={styles.card}>
                                <Text>{card}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    column: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
    },
    dropZone: {
        borderWidth: 2,
        borderColor: 'black',
        padding: 5,
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        width: 80,
        height: 100,
    },
    card: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        width: 70,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default DropZone;