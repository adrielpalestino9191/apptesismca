import React,{ useState ,useEffect} from 'react';
import { TouchableOpacity, View,Text ,Image} from 'react-native';
import axios from 'axios';



const ExamenScreen = ({navigation,route}) => {

const alumno = route.params;
const [preguntas, setPreguntas] = useState([]);

const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get('https://proyectolibrosminerva.com/Controller/TestController.php?opt=1&id='+alumno.id);
       
        console.log('https://proyectolibrosminerva.com/Controller/TestController.php?opt=1&id='+alumno.id)
        const simplifiedJSON = response.data.reduce((acc, curr) => {
          const { id, preg } = curr;
          const { id_respuesta, resp, correcto } = curr; 
          
          const foundItem = acc.find(item => item.id === id);
          if (foundItem) {
              foundItem.respuestas.push({ id_respuesta, resp, correcto });
          } else {
              acc.push({
                  id,
                  preg,
                  respuestas: [{ id_respuesta, resp, correcto }]
              });
          }
      
          return acc;
      }, []);
      setTimeout(function(){
        console.log("Hola Mundo");
    }, 2000);
      
      
      setPreguntas(JSON.parse(JSON.stringify(simplifiedJSON, null, 2)));
      } catch (error) {
        console.error('Error al obtener las preguntas:', error);
      }
    };

    fetchPreguntas();
  }, []);



  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('https://proyectolibrosminerva.com/Controller/TestController.php?opt=2&id='+alumno.id);
        console.log('https://proyectolibrosminerva.com/Controller/TestController.php?opt=2&id='+alumno.id)
        const imageData = response.data;

        // Obtener la URL de la imagen de la respuesta
        const imageUrl = imageData[0].url; // Ajusta esto según la estructura de tu respuesta

        setImageUrl(imageUrl);
      } catch (error) {
        console.error('Error al obtener la imagen:', error);
      }
    };

    fetchImage();
  }, []);

  const handleTest = () => {
    navigation.navigate("Test",{preguntas:preguntas,alumno:alumno})
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {imageUrl ? (
        <TouchableOpacity onPress={handleTest}> 
            <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
        </TouchableOpacity>
      ) : (
        <Text>Cargando imagen...</Text>
      )}
    </View>
  );
};


export default ExamenScreen;
