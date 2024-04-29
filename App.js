import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import CardDeck from './screen/display';
import React from 'react';
import DropZone from './components/dropZone';

export default function App() {
  return (
    <View style={styles.container}>
      <DropZone />
      <CardDeck />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
