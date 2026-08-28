import { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';

export default function HomeScreen({ navigation }) {
  const [permisoCamara, pedirPermisoCamara] = useCameraPermissions();
  const [permisoUbicacion, pedirPermisoUbicacion] =
    Location.useForegroundPermissions();

  // Pedimos los dos permisos una sola vez, apenas se abre esta pantalla.
  useEffect(() => {
    pedirPermisoCamara();
    pedirPermisoUbicacion();
  }, []);

  return (
    <View style={styles.container}>
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

      <View style={styles.espacio}>
        <Button
          title="Ver fotografías guardadas"
          onPress={() => navigation.navigate('Fotografias')}
        />
      </View>
    </View>
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
  espacio: {
    marginTop: 20,
  },
});
