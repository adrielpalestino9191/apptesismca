import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ImageBackground } from 'react-native';
import axios from 'axios';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [opt, setOpt] = useState('1');



  const handleLogin = async () => {
    try {
      const response = await axios.post('https://proyectolibrosminerva.com/Controller/UsuarioController.php', {
        correo: username,
        pwd: password,
        opt:1
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      if(response.data != null){
            if(response.data.id>0){
                var data = {id:response.data.id,correo:response.data.correo,rol:response.data.rol_usu,nombre:response.data.nombre+" "+response.data.app};
                console.log(data)
                navigation.navigate('Menu',data);
            }else{
                alert("Error de usuario");
            }
      }else{
            alert("Error en usuario o contraseña, ingrese nuevamente");
      }

      // Manejar la respuesta aquí
    } catch (error) {
      console.error('Error al realizar la petición:', error);
    }
  };
  
  

  /*const handleLogin = () => {
    // Aquí puedes agregar la lógica para verificar el inicio de sesión
    // Por ahora, simplemente redirigimos al formulario de registro
    navigation.navigate('Menu');
  };*/

  return (
    
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText} >Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.registerText}>Registro de nuevo usuario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;