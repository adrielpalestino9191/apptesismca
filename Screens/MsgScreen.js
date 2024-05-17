import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const MsgScreen = ({ route }) => {
  const { messageContent } = route.params;

  // Simulación de datos del mensaje
  const mensaje = {
    remitente: 'Amigo 1',
    contenido: '¡Hola! ¿Cómo estás? Espero que todo vaya bien contigo. ¿Qué has estado haciendo últimamente? ¡Cuéntame más! ¡Hola! ¿Cómo estás? Espero que todo vaya bien contigo. ¿Qué has estado haciendo últimamente? ¡Cuéntame más! ¡Hola! ¿Cómo estás? Espero que todo vaya bien contigo. ¿Qué has estado haciendo últimamente? ¡Cuéntame más!',
    fecha: '10/05/2024',
    hora: '10:30 AM',
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.msgContainer}>
          <View style={styles.balloon}>
            <Text style={styles.balloonText}>{messageContent}</Text>
          </View>
         
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  msgContainer: {
    marginTop: 20,
    backgroundColor: '#e6f2ff',
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  balloon: {
    backgroundColor: '#b3d9ff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  balloonText: {
    color: '#000',
  },
  fechaHora: {
    marginTop: 5,
    color: '#666',
    textAlign: 'right',
  },
});

export default MsgScreen;
