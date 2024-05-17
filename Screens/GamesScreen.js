import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const GamesScreen = ({navigation}) => {
  const games = [
    { id: 1, name: 'Adivinador de Sumas' },
    { id: 2, name: 'Juego 2' },
    { id: 3, name: 'Juego 3' },
    // Agrega más juegos si lo deseas
  ];

  const renderGameItem = ({ item }) => (
    <TouchableOpacity style={styles.gameItemContainer} onPress={()=>navigation.navigate("GameSumGuessingGameScreen")}>
      <Text style={styles.gameItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Juegos</Text>
      <FlatList
        data={games}
        renderItem={renderGameItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.gameList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gameList: {
    alignItems: 'center',
  },
  gameItemContainer: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  gameItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default GamesScreen;
