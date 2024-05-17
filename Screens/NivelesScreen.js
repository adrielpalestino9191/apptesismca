import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const NivelesScreen = ({route}) => {
  const alumno = route.params;
  const [nivel, setNivel] = useState(1);
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    fetch('https://proyectolibrosminerva.com/Controller/TestController.php?opt=2&id='+alumno.id)
      .then(response => response.json())
      .then(data => {
        const nivelObtenido = data[0].nivel;
        console.log(nivelObtenido)
        if (nivelObtenido >= 1 && nivelObtenido <= 3) {
          setNivel(nivelObtenido);
        }
      })
      .catch(error => console.error('Error al obtener el nivel:', error));

    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  return (
    <View style={styles.container}>
      <View style={styles.nodeContainer}>
        <Text style={styles.nodeText}>Nivel 1</Text>
        <Animated.View style={[styles.node, (nivel === '1' ? styles.enabledNode : styles.disabledNode), { transform: [{ translateY }] }]} />
      </View>
      <View style={styles.line} />
      <View style={styles.nodeContainer}>
        <Text style={styles.nodeText}>Nivel 2</Text>
        <Animated.View style={[styles.node, (nivel === '2' ? styles.enabledNode : styles.disabledNode), { transform: [{ translateY }] }]} />
      </View>
      <View style={styles.line} />
      <View style={styles.nodeContainer}>
        <Text style={styles.nodeText}>Nivel 3</Text>
        <Animated.View style={[styles.node, (nivel === '3' ? styles.enabledNode : styles.disabledNode), { transform: [{ translateY }] }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  nodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  node: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'limegreen',
    margin: 10,
  },
  enabledNode: {
    backgroundColor: 'limegreen',
    elevation: 5,
  },
  disabledNode: {
    backgroundColor: '#ccc',
  },
  nodeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  line: {
    width: 2,
    height: 80,
    backgroundColor: 'black',
  },
});

export default NivelesScreen;
