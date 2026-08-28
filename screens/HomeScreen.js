import { StyleSheet, Text, View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tomar Fotografía</Text>
      <Text style={styles.texto}>
        Aquí se tomará la fotografía, se obtendrá la ubicación y se escribirá
        una descripción.
      </Text>

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
  espacio: {
    marginTop: 20,
  },
});
