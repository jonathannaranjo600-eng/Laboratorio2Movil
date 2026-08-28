import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import PhotosScreen from './screens/PhotosScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  // Aquí vive el array de fotografías. Se pasa a las pantallas como props.
  const [fotos, setFotos] = useState([]);

  function agregarFoto(fotoNueva) {
    setFotos([...fotos, fotoNueva]);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" options={{ title: 'Tomar Fotografía' }}>
          {(props) => <HomeScreen {...props} agregarFoto={agregarFoto} />}
        </Stack.Screen>
        <Stack.Screen name="Fotografias" options={{ title: 'Fotografías' }}>
          {(props) => <PhotosScreen {...props} fotos={fotos} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
