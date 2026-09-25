# mi-app

Base: Expo SDK 57 + Expo Router + NativeWind v4 + TypeScript.

App para la escuela de baile **MyMambo** (cliente), desarrollada por **Marvin Baptista**.

## Arrancar

```powershell
npm install
npx expo start          # escanea el QR con el iPhone (Expo Go)
npx expo start --tunnel # si el iPhone no conecta
```

## Cambiar el nombre de la app

Edita `name`, `slug` y `scheme` en `app.json` (y `name` en `package.json`).

## Diseño

- Colores/radios/fuentes: `src/theme/tokens.js`
- Export de Claude Design: `design/export/`
- Capturas de referencia: `design/screenshots/`

## Publicar (iOS)

```powershell
eas login
eas build:configure
eas build -p ios
eas submit -p ios
```
