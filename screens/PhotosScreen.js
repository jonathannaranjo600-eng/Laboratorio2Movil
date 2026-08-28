import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

export default function PhotosScreen({ fotos }) {
  function renderFoto({ item }) {
    return (
      <View style={styles.tarjeta}>
        <Image source={{ uri: item.image }} style={styles.imagen} />
        <Text>Latitud: {item.latitude}</Text>
        <Text>Longitud: {item.longitude}</Text>
        <Text>Descripción: {item.description}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Fotografías Tomadas</Text>

      {fotos.length === 0 && (
        <Text style={styles.texto}>
          Todavía no has tomado ninguna fotografía.
        </Text>
      )}

      <FlatList
        data={fotos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFoto}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  texto: {
    textAlign: 'center',
    marginTop: 20,
  },
  lista: {
    paddingBottom: 20,
  },
  tarjeta: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  imagen: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
});
