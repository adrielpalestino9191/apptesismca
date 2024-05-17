import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const RegistroScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [nombrePadre, setNombrePadre] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [gradoEstudios, setGradoEstudios] = useState('1');

  const handleRegistro = async () => {
    console.log("Entrando")
    try {
        const response = await axios.post('https://proyectolibrosminerva.com/Controller/UsuarioController.php', {
          nombre: nombre,
          apellidoPaterno:apellidoPaterno,
          apellidoMaterno:apellidoMaterno,
          fechaNacimiento:fechaNacimiento,
          nombrePadre:nombrePadre,
          correo:correoElectronico,
          telefono:whatsapp,
          gradoEstudios:gradoEstudios,
          pwd:password,
          opt:"2"
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        console.log('Respuesta del servidor:', response.data);
        if(response.data == "true" || response.data){
            alert("Registrado correctamente, recibiras un correo para tu confirmación, aun que ya puedes iniciar sesión")
            navigation.navigate("Login");
        }
        // Manejar la respuesta aquí
      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Instrucciones:</Text>
      <Text style={styles.instructions}>
        Captura correctamente todos los campos que se presentan a continuación.
        Este registro lo deberá realizar el tutor o los padres del niño que cursa la primaria.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido Paterno"
        value={apellidoPaterno}
        onChangeText={setApellidoPaterno}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido Materno"
        value={apellidoMaterno}
        onChangeText={setApellidoMaterno}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de Nacimiento"
        value={fechaNacimiento}
        onChangeText={setFechaNacimiento}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del Padre o Tutor"
        value={nombrePadre}
        onChangeText={setNombrePadre}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={correoElectronico}
        onChangeText={setCorreoElectronico}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de WhatsApp"
        value={whatsapp}
        onChangeText={setWhatsapp}
      />
      <Picker
        style={styles.input}
        selectedValue={gradoEstudios}
        onValueChange={(itemValue) => setGradoEstudios(itemValue)}>
        <Picker.Item label="1ero" value="1" />
        <Picker.Item label="2do" value="2" />
        <Picker.Item label="3ero" value="3" />
        <Picker.Item label="4to" value="4" />
        <Picker.Item label="5to" value="5" />
        <Picker.Item label="6to" value="6" />
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleRegistro}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'ComicSans',
  },
  instructions: {
    textAlign: 'justify',
    marginBottom: 10,
    fontFamily: 'ComicSans',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    fontFamily: 'ComicSans',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'ComicSans',
  },
});

export default RegistroScreen;
