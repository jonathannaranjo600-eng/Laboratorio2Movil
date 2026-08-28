import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';

export default function HomeScreen({ navigation, agregarFoto }) {
  const [permisoCamara, pedirPermisoCamara] = useCameraPermissions();
  const [permisoUbicacion, pedirPermisoUbicacion] =
    Location.useForegroundPermissions();

  const [mostrarCamara, setMostrarCamara] = useState(false);
  const [foto, setFoto] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const cameraRef = useRef(null);

  // Pedimos los dos permisos una sola vez, apenas se abre esta pantalla.
  useEffect(() => {
    pedirPermisoCamara();
    pedirPermisoUbicacion();
  }, []);

  async function abrirCamara() {
    if (permisoCamara && permisoCamara.granted) {
      setMostrarCamara(true);
    }
  }

  async function tomarFoto() {
    if (cameraRef.current) {
      const fotoTomada = await cameraRef.current.takePictureAsync();
      setFoto(fotoTomada);
      setMostrarCamara(false);

      // Apenas se toma la fotografía, obtenemos la ubicación actual
      // para asociarla a esa captura.
      if (permisoUbicacion && permisoUbicacion.granted) {
        const ubicacionActual = await Location.getCurrentPositionAsync({});
        setUbicacion(ubicacionActual.coords);
      }
    }
  }

  function guardarFoto() {
    if (descripcion.trim() === '') {
      Alert.alert('Falta descripción', 'Escribe una descripción antes de guardar.');
      return;
    }

    const fotoNueva = {
      id: Date.now(),
      image: foto.uri,
      latitude: ubicacion.latitude,
      longitude: ubicacion.longitude,
      description: descripcion,
    };

    agregarFoto(fotoNueva);

    // Limpiamos todo para poder tomar la siguiente fotografía.
    setFoto(null);
    setUbicacion(null);
    setDescripcion('');

    Alert.alert('Guardado', 'La fotografía se guardó en la bitácora.');
  }

  // Mientras la cámara está abierta, mostramos solo la vista de la cámara.
  if (mostrarCamara) {
    return (
      <View style={styles.contenedorCamara}>
        <CameraView style={styles.camara} ref={cameraRef} facing="back" />
        <View style={styles.botonCapturar}>
          <Button title="Capturar" onPress={tomarFoto} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Tomar Fotografía</Text>
      <Text style={styles.texto}>
        Aquí se tomará la fotografía, se obtendrá la ubicación y se escribirá
        una descripción.
      </Text>

      {permisoCamara && !permisoCamara.granted && (
        <Text style={styles.error}>
          Necesitas permitir el acceso a la cámara para tomar fotografías.
        </Text>
      )}

      {permisoUbicacion && !permisoUbicacion.granted && (
        <Text style={styles.error}>
          Necesitas permitir el acceso a la ubicación para guardar las
          coordenadas.
        </Text>
      )}

      {foto && (
        <Image source={{ uri: foto.uri }} style={styles.previsualizacion} />
      )}

      {foto && ubicacion && (
        <View style={styles.espacio}>
          <Text>Latitud: {ubicacion.latitude}</Text>
          <Text>Longitud: {ubicacion.longitude}</Text>
        </View>
      )}

      {foto && ubicacion && (
        <TextInput
          style={styles.input}
          placeholder="Escribe una descripción..."
          value={descripcion}
          onChangeText={setDescripcion}
        />
      )}

      {foto && ubicacion && (
        <View style={styles.espacio}>
          <Button title="Guardar en la Bitácora" onPress={guardarFoto} />
        </View>
      )}

      <View style={styles.espacio}>
        <Button title="Tomar Fotografía" onPress={abrirCamara} />
      </View>

      <View style={styles.espacio}>
        <Button
          title="Ver fotografías guardadas"
          onPress={() => navigation.navigate('Fotografias')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  texto: {
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  previsualizacion: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginTop: 10,
  },
  espacio: {
    marginTop: 10,
  },
  contenedorCamara: {
    flex: 1,
  },
  camara: {
    flex: 1,
  },
  botonCapturar: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
});
