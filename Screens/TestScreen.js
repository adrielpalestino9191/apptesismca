import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Button, Text, CheckBox } from 'react-native-elements';
import axios from 'axios';
const TestScreen = ({navigation, route }) => {
  const { preguntas, alumno } = route.params;

  const [preguntaIndex, setPreguntaIndex] = useState(0);
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState([]);
  const [habilitado, setHabilitado] = useState(false);

  const preguntaActual = preguntas[preguntaIndex];

  const handleRespuestaSeleccionada = (idRespuesta) => {
    // Verificar si la respuesta ya está seleccionada
    setHabilitado(true)
    const respuestaIndex = respuestasSeleccionadas.indexOf(idRespuesta);
    
    // Si la respuesta ya está seleccionada, la eliminamos del array
    setRespuestasSeleccionadas([...respuestasSeleccionadas, idRespuesta]);

  };

  const checkUltimaPregunta = () => {
    // Habilitar el botón "Siguiente" solo si se ha seleccionado al menos una respuesta
   // setHabilitado(respuestasSeleccionadas.length > 0);
  
   console.log(preguntas.length )
   console.log(preguntaIndex)
   if(preguntaIndex == preguntas.length - 2){
    
    setHabilitado(true)
   }
  };

  const handleSiguientePregunta = () => {

    if(preguntaIndex < preguntas.length - 1){
        setHabilitado(false)
        setPreguntaIndex((prevIndex) => prevIndex + 1);
        
        checkUltimaPregunta(); // Llamar a la función para verificar si es la última pregunta
    }else{
        setHabilitado(false)
    }
  };

  const handleGuardar = () => {
    // Aquí puedes enviar las respuestas seleccionadas a una función
    console.log("alumno ",alumno);
    console.log(respuestasSeleccionadas);

    // Objeto con los datos a enviar en la solicitud POST
  const data = {
    id: alumno.id,
    respuestas: respuestasSeleccionadas
  };

  // Realizar la solicitud POST
  axios.post('https://proyectolibrosminerva.com/Controller/TestController.php?opt=3', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => {
    // Manejar la respuesta aquí si es necesario
    alert("Examen guardado, revisa tu puntuación y observaciones en el menú principal");
    navigation.navigate("Menu",alumno);
    console.log('Respuesta del servidor:', response.data);
  })
  .catch(error => {
    // Manejar los errores aquí si es necesario
    console.error('Error al enviar la solicitud:', error);
  });
  };

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Pregunta</Card.Title>
        <Text style={styles.textoJustificado}>{preguntaActual.preg}</Text>
      </Card>

      {preguntaActual.respuestas.map((respuesta) => (
        <CheckBox
          key={respuesta.id_respuesta}
          title={respuesta.resp}
          checked={respuestasSeleccionadas.includes(respuesta.id_respuesta)}
          onPress={() => handleRespuestaSeleccionada(respuesta.id_respuesta)}
        />
      ))}

      <Button title="Siguiente" onPress={handleSiguientePregunta} disabled={!habilitado} />

      {preguntaIndex === preguntas.length - 1 && (
        <Button title="Guardar" onPress={handleGuardar} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 20,
    borderWidth: 0, // Eliminar el borde de la tarjeta
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5, // Para sombra en Android
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textoJustificado: {
    textAlign: 'justify',
  },
});

export default TestScreen;
