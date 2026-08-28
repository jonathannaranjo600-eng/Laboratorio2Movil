# Bitácora Geográfica

Laboratorio académico para el curso de Dispositivos Móviles. Es una aplicación
hecha con **React Native + Expo** que usa recursos nativos del celular (cámara
y GPS) para crear una pequeña bitácora de fotografías: cada foto se guarda
junto con la ubicación donde fue tomada y una descripción escrita por el
usuario.

## Tecnologías utilizadas

- [Expo](https://expo.dev/) (React Native)
- React Navigation (`@react-navigation/native` + `@react-navigation/native-stack`) para moverse entre pantallas
- `expo-camera` para tomar fotografías
- `expo-location` para obtener latitud y longitud
- `useState` de React para guardar las fotografías mientras la app está abierta

No se usa base de datos, backend ni almacenamiento permanente: las
fotografías solo existen mientras la aplicación está abierta.

## Instalación de dependencias

1. Tener instalado [Node.js](https://nodejs.org/) y npm.
2. Clonar este repositorio y entrar a la carpeta del proyecto.
3. Instalar las dependencias:

```bash
npm install
```

## Cómo iniciar el proyecto

```bash
npx expo start
```

Esto abre el "Metro Bundler" de Expo en la terminal y muestra un código QR.

## Cómo probarlo en un dispositivo físico

La cámara y el GPS son hardware real, por lo que esta app debe probarse en un
celular físico (no funciona igual en un emulador/simulador):

1. Instalar la app **Expo Go** en el celular (disponible en Google Play y App
   Store).
2. Con el celular y la computadora conectados a la **misma red Wi-Fi**,
   correr `npx expo start` en la computadora.
3. Escanear el código QR que aparece en la terminal:
   - Android: desde la app Expo Go, opción "Scan QR code".
   - iOS: desde la app de Cámara del celular.
4. La app se abrirá dentro de Expo Go. Al entrar a la pantalla "Tomar
   Fotografía", el celular pedirá permiso de cámara y de ubicación.

## Permisos que necesita la app

- **Cámara**: para tomar la fotografía de la bitácora.
- **Ubicación**: para obtener la latitud y longitud del lugar donde se tomó
  la fotografía.

Si el usuario niega alguno de estos permisos, la aplicación no se cierra ni
se rompe: simplemente muestra un mensaje explicando que ese permiso es
necesario.

## Qué hace cada pantalla

### Tomar Fotografía (pantalla inicial)

- Pide permiso de cámara y ubicación al abrirse.
- Botón para abrir la cámara y tomar una fotografía.
- Al tomar la foto, obtiene automáticamente la ubicación actual (latitud y
  longitud).
- Muestra una previsualización de la foto junto con las coordenadas.
- Permite escribir una descripción de la fotografía.
- Botón "Guardar en la Bitácora" que agrega la fotografía (con su ubicación y
  descripción) a la lista de fotografías de la app.
- Botón para ir a la pantalla "Fotografías Tomadas".

### Fotografías Tomadas

- Muestra la lista de todas las fotografías guardadas durante la sesión
  actual de la app.
- Cada fotografía se muestra en una tarjeta simple con: la imagen, la
  latitud, la longitud y la descripción escrita por el usuario.
- Si todavía no se ha guardado ninguna fotografía, muestra un mensaje
  indicándolo.
