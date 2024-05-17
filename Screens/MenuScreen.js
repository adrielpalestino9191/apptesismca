import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const MenuScreen = ({ navigation ,route}) => {
  const menuOptions = [
    { title: 'Mi Perfil', screen: 'Actualiza' },
    { title: 'Niveles', screen: 'Niveles' },
    { title: 'Mensajes', screen: 'Mensajes' },
    { title: 'Información', screen: 'Informacion' },
    { title: 'Test', screen: 'Examen' },
    { title: 'Mini Juegos', screen: 'Juegos' },
    { title: 'Puntuación', screen: 'Puntuacion' },
    { title: 'Cerrar Sesión', screen: 'Login' }
  ];
  const alumno = route.params;


  const renderMenuOptions = () => {
    return menuOptions.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={styles.option}
        onPress={() => navigation.navigate(option.screen,alumno)}>
        <Text style={styles.optionText}>{option.title}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      {renderMenuOptions()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  option: {
    width: (screenWidth - 60) / 3, // 60 = 2 * paddingHorizontal
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MenuScreen;
