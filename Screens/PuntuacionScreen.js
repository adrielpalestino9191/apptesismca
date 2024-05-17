import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Image } from 'react-native';

const PuntuacionScreen = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
  }, [animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, { transform: [{ translateY }] }]}>
        <Text style={styles.puntuacion}>82/100</Text>
      </Animated.View>
      <Text style={styles.texto}>Tu puntuación promedio es 82, ¡felicitaciones!</Text>
      <Animated.Image source={require('./../assets/confetti.png')} style={[styles.confeti, { opacity: animatedValue }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'orange', // Verde agua
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  puntuacion: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  texto: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  confeti: {
    position: 'absolute',
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default PuntuacionScreen;
