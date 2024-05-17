import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const ActualizaScreen = ({ route }) => {
  const alumno = route.params;
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
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    // Fetch data
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://proyectolibrosminerva.com/Controller/UsuarioController.php?opt=5&id=' + alumno.id);
      console.log('https://proyectolibrosminerva.com/Controller/UsuarioController.php?opt=5&id=' + alumno.id);
      const data = response.data;
      setNombre(data.nombre);
      setApellidoPaterno(data.app);
      setApellidoMaterno(data.apm);
      setFechaNacimiento(data.fecha);
      setNombrePadre(data.tutor);
      setCorreoElectronico(data.correo);
      setWhatsapp(data.whatsapp);
      setGradoEstudios(data.grado);
      setPassword(data.pwd);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleActualizar = async () => {
    try {
      const response = await axios.post('https://proyectolibrosminerva.com/Controller/UsuarioController.php?opt=6', {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        fechaNacimiento,
        nombrePadre,
        correo: correoElectronico,
        telefono,
        whatsapp,
        gradoEstudios,
        pwd: password,
      });
      console.log('Respuesta del servidor:', response.data);
      // Handle response
    } catch (error) {
      console.error('Error al realizar la petición:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Actualizar Información</Text>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Apellido Paterno:</Text>
        <TextInput
          style={styles.input}
          placeholder="Apellido Paterno"
          value={apellidoPaterno}
          onChangeText={setApellidoPaterno}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Apellido Materno:</Text>
        <TextInput
          style={styles.input}
          placeholder="Apellido Materno"
          value={apellidoMaterno}
          onChangeText={setApellidoMaterno}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Nombre del Padre o Tutor:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del Padre o Tutor"
          value={nombrePadre}
          onChangeText={setNombrePadre}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Correo Electrónico:</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={correoElectronico}
          onChangeText={setCorreoElectronico}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Teléfono:</Text>
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Número de WhatsApp:</Text>
        <TextInput
          style={styles.input}
          placeholder="Número de WhatsApp"
          value={whatsapp}
          onChangeText={setWhatsapp}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Grado de Estudios:</Text>
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
      </View>
      <TouchableOpacity style={styles.button} onPress={handleActualizar}>
        <Text style={styles.buttonText}>Actualizar</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'ComicSans',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    width: 150,
    marginRight: 10,
    fontFamily: 'ComicSans',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontFamily: 'ComicSans',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'ComicSans',
  },
});

export default ActualizaScreen;
