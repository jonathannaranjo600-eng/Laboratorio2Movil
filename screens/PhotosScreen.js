import { StyleSheet, Text, View } from 'react-native';

export default function PhotosScreen({ fotos }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Fotografías Tomadas</Text>

      {fotos.length === 0 && (
        <Text style={styles.texto}>
          Todavía no has tomado ninguna fotografía.
        </Text>
      )}
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
  },
});
