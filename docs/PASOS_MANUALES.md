# Pasos manuales para publicar MyMambo

Lista de lo que tienes que hacer tú, como dueño de las cuentas, para completar y publicar la app. Va en orden: cada paso depende de los anteriores. Cada paso dice **qué hacer**, **dónde** y **cómo saber que quedó bien**.

Estado del repo a la fecha de este documento (2026-10-23), rama `fix/auditoria-app`:

- Expo SDK 57 (`expo ~57.0.25`), Expo Router, NativeWind, Zustand con persistencia local (AsyncStorage). **No hay servidor ni base de datos.**
- `app.json`: bundle ID y package Android `com.camizoca.miapp`, `owner` de Expo `camizoca`, scheme `miapp`, dominio `applinks:mymambo.app` (iOS) y `intentFilters` para `https://mymambo.app/unirse` (Android). El nombre visible actual es `mi-app`.
- `eas.json`: perfiles `development`, `preview` y `production`. En `submit.production` quedan tres placeholders.
- `design/export/` y `design/screenshots/` están vacías (solo `.gitkeep`).

Marcas usadas: **(verificar)** = no confirmado en una fuente oficial leída hoy. Los precios de Apple y Google sí se leyeron en su página oficial; aun así, confirma el precio en tu país antes de pagar.

---

## Sección A. Decisiones y diseño (antes de todo lo demás)

### Paso 1. Decidir la estrategia de backend

- **Qué:** decidir si la app sigue solo con datos locales o si se prepara un backend real.
- **Dónde:** es una decisión tuya; no hay nada que ejecutar todavía.
- **Por qué importa:** hoy los roles (alumno / profe) se guardan en el teléfono. Cualquiera que modifique el almacenamiento local puede cambiarse a profe. **Eso no es seguridad real.** Para publicar en tiendas esto es aceptable solo si la app es un prototipo sin datos sensibles ni permisos reales; si hay grupos compartidos entre personas, necesita backend.
- **Opción 1: seguir local.** Publicar sin servidor. Los grupos no se comparten entre teléfonos salvo por el enlace de invitación, que hoy no tiene servidor que lo resuelva (ver paso 13). Aceptable solo como versión de prueba.
- **Opción 2: preparar Supabase o Firebase.** Autenticación, base de datos y reglas de acceso del lado servidor. Más trabajo, pero los roles quedan protegidos. Requiere una cuenta del proveedor y tiempo de desarrollo (no se hace en este paso).
- **Cómo saber que quedó bien:** tienes escrita la opción elegida en una nota o en `docs/`, y sabes si la versión 1.0 sale con o sin backend.

### Paso 2. Confirmar el tema claro y oscuro

- **Qué:** confirmar qué tema se publica.
- **Dónde:** `src/app/_layout.tsx`, línea 17: `colorScheme.set('dark')`. Fuerza el modo oscuro aunque `app.json` tiene `userInterfaceStyle: "automatic"`.
- **Por qué importa:** la decisión que tienes es "claro y oscuro", pero el código hoy solo muestra oscuro. Hay que decidir si se quita el forzado (y se prueban los dos temas en la sección H) o si el oscuro es el único tema de la 1.0.
- **Cómo saber que quedó bien:** lo decides por escrito. Si eliges claro y oscuro, la sección H lo verifica.

### Paso 3. Exportar el diseño desde Claude Design

- **Qué:** exportar el handoff del diseño de Claude Design.
- **Dónde:**
  - HTML, CSS y README del handoff en `design/export/`.
  - Capturas de cada pantalla en `design/screenshots/`.
- **Por qué importa:** sin estos archivos no se puede comparar qué pantallas faltan ni qué colores y espaciados usar. El agente que implementa el diseño lee estas carpetas primero (ver `CLAUDE.md`, sección "Implementar un diseño").
- **Cómo saber que quedó bien:** `design/export/` contiene al menos un `README` y un HTML (no solo `.gitkeep`), y `design/screenshots/` contiene un PNG por pantalla. Comprueba con `dir design\export` y `dir design\screenshots`.

---

## Sección B. Cuentas de tienda

### Paso 4. Inscribirte en el Apple Developer Program

- **Qué:** crear o usar un Apple ID con autenticación de dos factores y pagar la membresía anual.
- **Dónde:** https://developer.apple.com/programs/ (inscripción) y https://developer.apple.com/account (cuenta).
- **Costo:** 99 USD al año según la página oficial consultada el 2026-10-23 (puede variar por país; **(verificar)** tu precio local al pagar). Puede tardar en activarse desde unas horas hasta un par de días.
- **Cómo:** entra con tu Apple ID, elige "Individual" o "Organización" y paga. Si es organización, Apple pide datos legales y verificación de D-U-N-S (**(verificar)**).
- **Cómo saber que quedó bien:** en https://developer.apple.com/account ves "Membership" con estado activo y tu **Team ID** (10 caracteres). Guarda el Team ID; lo necesitas en el paso 13.

### Paso 5. Crear la app en App Store Connect y obtener el ascAppId

- **Qué:** crear el registro de la app y copiar su identificador numérico.
- **Dónde:** https://appstoreconnect.apple.com → **Apps** → **+** → **Nueva app**.
  - Plataforma: iOS.
  - Nombre: el nombre público (decidir: "MyMambo" o "mi-app"; ver paso 25).
  - Idioma principal.
  - Bundle ID: `com.camizoca.miapp` (debe existir en Certificates, IDs & Profiles; si no aparece, **créalo tú** en developer.apple.com → Identifiers, o déjalo para que EAS lo cree en el primer build).
  - SKU: cualquier texto único, por ejemplo `mymambo-ios-1`.
- **Dónde está el ascAppId:** en la app, pestaña **App Store** → **Información de la app** (App Information) → sección **Información general** → campo **Apple ID**. Es un número de 9 a 10 dígitos (verificar: el número exacto cambia por app).
- **Cómo saber que quedó bien:** tienes el número. Lo usas en el paso 10.

### Paso 6. Registrarte en Google Play Console

- **Qué:** crear la cuenta de desarrollador de Google Play.
- **Dónde:** https://play.google.com/console/signup
- **Costo:** pago único de **25 USD** (página oficial de Google consultada el 2026-10-23; **(verificar)** precio local).
- **Cómo:** elige cuenta **Personal** u **Organización**, paga con tarjeta de crédito o débito (no se aceptan tarjetas prepagas), y verifica tu identidad con documento oficial y tarjeta a tu nombre legal.
- **Importante (verificar):** las cuentas personales creadas después del 13 de noviembre de 2023 deben completar una prueba cerrada con un número mínimo de testers durante varios días antes de publicar en producción (Google indica el requisito; el número y los días son **(verificar)** en la Ayuda de Play Console).
- **Cómo saber que quedó bien:** en Play Console ves tu cuenta con estado verificado, sin avisos de verificación pendiente.

### Paso 7. Crear la app en Google Play Console

- **Qué:** crear la ficha de la app.
- **Dónde:** Play Console → **Crear app**.
  - Nombre: el mismo que en iOS (paso 25).
  - Idioma predeterminado.
  - App o juego: App. Gratis o de pago: decidir.
  - Declaraciones obligatorias (política, exportación, etc.): aceptarlas tú.
- **Package name:** `com.camizoca.miapp`. Se fija en el primer envío y **no se puede cambiar**.
- **Cómo saber que quedó bien:** la app aparece en la lista de apps con estado "Borrador" y el package name correcto.

---

## Sección C. Credenciales y configuración de EAS

### Paso 8. Iniciar sesión en EAS y verificar la cuenta

- **Qué:** entrar a EAS desde la terminal del proyecto.
- **Dónde:** terminal en `D:\appProjects\mi-app`.
- **Comandos:**
  ```bash
  npx eas-cli@latest login
  npx eas-cli@latest whoami
  ```
- **Cómo:** `login` abre el navegador para autenticarte. Usa la cuenta Expo **`camizoca`** (es el `owner` de `app.json`). Si entras con otra cuenta, `eas build` no encontrará el proyecto.
- **Cómo saber que quedó bien:** `whoami` muestra `camizoca`. Si muestra otro nombre, cierra sesión con `npx eas-cli@latest logout` y vuelve a entrar.

### Paso 9. Dejar que EAS cree las credenciales de firma

- **Qué:** no hace falta crear certificados ni keystores a mano. EAS los genera y los guarda en la nube.
- **Dónde:** la primera vez que ejecutes un build (paso 17 y siguientes) EAS pregunta si quieres que genere y administre las credenciales. **Responde que sí.**
- **Para ver o revisar después:**
  ```bash
  npx eas-cli@latest credentials --platform ios
  npx eas-cli@latest credentials --platform android
  ```
- **iOS (verificar):** EAS puede crear el certificado de distribución y el perfil de aprovisionamiento. Te pide iniciar sesión con tu Apple ID y el código 2FA.
- **Android (verificar):** EAS crea el keystore. **No lo borres.** Si lo pierdes, la app no puede actualizarse en Google Play.
- **Cómo saber que quedó bien:** `credentials` lista el certificado iOS y el keystore Android como "configured", sin errores.

### Paso 10. Reemplazar los placeholders de `eas.json` (iOS)

- **Qué:** cambiar dos valores en `submit.production.ios`.
- **Dónde:** `D:\appProjects\mi-app\eas.json`, líneas 20 a 23.
  - `REEMPLAZAR_ASC_APP_ID` → el número del paso 5 (Apple ID de la app).
  - `REEMPLAZAR_APPLE_ID` → el correo de tu Apple ID de desarrollador (no lo pongas en el repo si es privado; si el repo es público, usa un correo de equipo).
- **Cómo saber que quedó bien:** ya no aparece `REEMPLAZAR` en iOS. Comprueba con `findstr REEMPLAZAR eas.json`: debe quedar solo la ruta de Android.

### Paso 11. Crear la clave de cuenta de servicio de Google Play

- **Qué:** una clave JSON que deja a EAS subir builds a Play Console.
- **Dónde:**
  1. Google Cloud Console (https://console.cloud.google.com) → crea o elige un proyecto → **IAM y administración** → **Cuentas de servicio** → **Crear cuenta de servicio**. Anota su correo (termina en `iam.gserviceaccount.com`).
  2. En esa cuenta de servicio, **Claves** → **Agregar clave** → **Crear clave nueva** → **JSON**. Se descarga un archivo.
  3. Play Console → **Usuarios y permisos** (o **Configuración → Acceso a la API**, según la versión de la consola; **(verificar)**). Invita al correo de la cuenta de servicio y dale permisos de lanzamiento (publicar en pistas de prueba).
  4. Guía de Expo con pasos y menús actualizados: https://expo.fyi/creating-google-service-account (**(verificar)**).
- **Dónde guardarla:** fuera del repo, por ejemplo en `C:\Users\<tu-usuario>\secrets\mymambo-play.json`.
  - Verifica que `.gitignore` incluye `*.json` de claves o la ruta exacta. Si no está, añádela y **no hagas commit** del archivo.
  - No pegues el contenido de la clave en chats, issues ni commits.
- **Actualizar `eas.json`:** cambia `REEMPLAZAR_RUTA_CLAVE_JSON` (línea 25) por la ruta absoluta del archivo, por ejemplo `C:\\Users\\<tu-usuario>\\secrets\\mymambo-play.json` (escapa las barras). Alternativa: subirla a EAS con `npx eas-cli@latest credentials --platform android` → **Google Service Account** → **Set up a Google Service Account Key for Play Store Submissions**, y así no depende de la ruta local.
- **Cómo saber que quedó bien:** `npx eas-cli@latest submit --platform android --profile production --help` no da error de ruta, y en el paso 30 el envío llega a Play Console.

---

## Sección D. Dominio y enlaces de invitación

### Paso 12. Confirmar que `mymambo.app` es del equipo

- **Qué:** verificar que el dominio está registrado a nombre de tu equipo y que puedes controlar su contenido.
- **Dónde:** registrador del dominio (por ejemplo, Cloudflare, Namecheap o el que uses). Revisa el WHOIS o el panel.
- **Cómo saber que quedó bien:** puedes editar archivos o rutas de `https://mymambo.app/` (por hosting propio, Cloudflare Pages o EAS Hosting).
- **Si no es tuyo:** no publiques nada. Cambia el dominio en `app.json` (`ios.associatedDomains` y `intentFilters`) y en `src/components/InviteSheet.tsx` (línea 27). Eso es un cambio de código: pídelo en un nuevo encargo.

### Paso 13. Publicar el archivo de Apple (iOS)

- **Qué:** publicar `apple-app-site-association` para que iOS abra `https://mymambo.app/unirse/...` dentro de la app.
- **Dónde:** `https://mymambo.app/.well-known/apple-app-site-association` (sin extensión).
- **Contenido (verificar el formato con la doc de Apple: developer.apple.com → Associated Domains):**
  ```json
  {
    "applinks": {
      "details": [
        {
          "appIDs": ["TEAM_ID.com.camizoca.miapp"],
          "components": [{ "/": "/unirse/*" }]
        }
      ]
    }
  }
  ```
  Reemplaza `TEAM_ID` por el Team ID del paso 4.
- **Reglas (verificar):** HTTPS con certificado válido, sin redirecciones, `Content-Type: application/json`, sin autenticación.
- **Cómo saber que quedó bien:** `curl -I https://mymambo.app/.well-known/apple-app-site-association` responde `200` y el tipo JSON. Después abre el enlace en un iPhone con la app instalada (paso 15).

### Paso 14. Publicar el archivo de Android

- **Qué:** publicar `assetlinks.json` para que Android abra `https://mymambo.app/unirse/...` dentro de la app.
- **Dónde:** `https://mymambo.app/.well-known/assetlinks.json`.
- **Huella SHA-256:** sácala con `npx eas-cli@latest credentials --platform android` (keystore de producción). Es una línea tipo `AA:BB:...`.
- **Contenido (verificar el formato en developer.android.com → App Links):**
  ```json
  [
    {
      "relation": ["delegate_permission/common.handle_all_urls"],
      "target": {
        "namespace": "android_app",
        "package_name": "com.camizoca.miapp",
        "sha256_cert_fingerprints": ["SHA256_DE_EAS"]
      }
    }
  ]
  ```
- **Cómo saber que quedó bien:** `curl -I https://mymambo.app/.well-known/assetlinks.json` responde `200`. Además, la API de verificación de Google (`digitalassetlinks.googleapis.com`) debe devolver el paquete (**(verificar)** la URL exacta en la doc de Android). En el teléfono, abrir el enlace debe ofrecer la app sin preguntar.

### Paso 15. Probar los enlaces de invitación

- **Qué:** comprobar que `https://mymambo.app/unirse/<código>` abre la app y no el navegador.
- **Dónde:** en el teléfono con el build del paso 17 instalado.
- **Cómo:** desde las notas del teléfono, pega un enlace del tipo `https://mymambo.app/unirse/XXXX` y tócalo.
- **Cómo saber que quedó bien:** se abre la app en la pantalla de unirse a grupo con el código ya cargado. Si abre el navegador, revisa los pasos 13 y 14 (en iOS, reinstalar la app a veces hace falta para que iOS descargue el archivo).

---

## Sección E. Builds de prueba

### Paso 16. Entender por qué Expo Go puede no bastar

- **Qué:** conviene probar con un **development build** (`expo-dev-client`), no solo con Expo Go.
- **Motivo:** el proyecto ya tiene `expo-dev-client` instalado y configuración que solo existe en un build propio: `ios.associatedDomains`, `intentFilters` de Android (enlaces de invitación), `scheme: "miapp"` y los textos de permiso de cámara y fotos. Expo Go usa su propia identidad de app, así que **no sirve para probar enlaces de invitación**.
- **Sobre módulos nativos (verificar):** `expo-camera` y `expo-image-picker` pueden funcionar en Expo Go porque vienen incluidos, pero no hay confirmación en la doc de v57 leída hoy. La doc oficial dice que un development build es "tu propia versión de Expo Go donde puedes usar cualquier librería nativa y cambiar cualquier configuración nativa".
- **Cómo saber que quedó bien:** decides que la prueba de enlaces se hace con build de desarrollo o preview, no con Expo Go.

### Paso 17. Generar el build de prueba para Android

- **Qué:** un APK instalable para pruebas internas.
- **Dónde:** terminal del proyecto.
- **Comando:**
  ```bash
  npx eas-cli@latest build --profile preview --platform android
  ```
- **Cómo:** espera a que termine en la nube (el enlace del build aparece en la terminal). Ábrelo desde el teléfono Android y descarga el APK. Acepta instalar desde fuentes desconocidas solo para este APK de tu cuenta.
- **Cómo saber que quedó bien:** la terminal muestra el build como "finished" y la app abre sin pantalla de error.

### Paso 18. Generar el build de prueba para iOS

- **Qué:** un build instalable en iPhone para pruebas.
- **Comando:**
  ```bash
  npx eas-cli@latest build --profile preview --platform ios
  ```
- **Requisito (verificar):** la distribución interna de iOS solo instala en iPhones registrados en tu cuenta. Para registrar tu iPhone: `npx eas-cli@latest device:create` (genera un enlace; ábrelo en el iPhone y acepta el perfil). Luego se regenera el build para incluir el dispositivo.
- **Cómo saber que quedó bien:** el enlace de instalación abre en Safari del iPhone registrado y la app se instala.

### Paso 19. Probar en el teléfono

- **Qué:** instalar los builds del paso 17 y 18 y revisar que la app abre y funciona.
- **Cómo saber que quedó bien:** la app abre en ambos teléfonos y llegas a la pantalla principal sin errores. Anota qué falla para la sección H.

---

## Sección F. Política de privacidad y fichas de privacidad

### Paso 20. Escribir y publicar la política de privacidad

- **Qué:** un documento público con qué datos guarda la app, para qué, dónde y cómo se borran.
- **Quién la escribe:** tú (el titular). Si el proyecto va en serio, revisarla con un abogado o usar una plantilla (**(verificar)** requisitos legales de tu país).
- **Contenido mínimo:** qué datos se guardan en el teléfono (grupos, pasos, eventos, fotos y videos que el usuario elige), que la app pide cámara (para escanear el QR de invitación y para tomar fotos) y acceso a fotos, si hay envío a servidores (sí/no según el paso 1), cómo borrar datos, contacto.
- **Dónde alojarla:** en una URL pública y sin login, por ejemplo `https://mymambo.app/privacidad` (usa el mismo hosting del paso 12).
- **Cómo saber que quedó bien:** abres la URL en una ventana de incógnito y se lee sin iniciar sesión. Esa URL la pegas en el paso 22 y en Play Console.

### Paso 21. Llenar la declaración de privacidad en App Store Connect

- **Qué:** declarar qué datos recoge la app.
- **Dónde:** App Store Connect → tu app → **Información de la app** → **Privacidad de datos** (App Privacy).
- **Qué declarar (verificar según el código real):**
  - **Fotos o videos:** si el usuario sube fotos a eventos y pasos, y si se guardan solo en el teléfono, no se marcan como "recopilados" salvo que salgan del dispositivo.
  - **Cámara:** se usa para escanear QR y tomar fotos; no es un tipo de dato, es permiso. Declara según el código (revisar uso con `expo-camera`).
  - Si no hay envío de datos fuera del teléfono (paso 1, opción local), la respuesta puede ser "No recopilamos datos" (**(verificar)** con la guía de Apple).
- **Cómo saber que quedó bien:** la etiqueta de privacidad aparece completa, sin secciones vacías, y coincide con la política del paso 20.

### Paso 22. Llenar la ficha de seguridad de datos en Google Play

- **Qué:** la "Seguridad de los datos" (Data safety) de Play Console.
- **Dónde:** Play Console → tu app → **Contenido de la app** → **Seguridad de los datos**.
- **Qué declarar:** lo mismo que en el paso 21, con las mismas respuestas. Añade la URL de la política del paso 20.
- **Cómo saber que quedó bien:** la sección muestra "Completa" y no tiene avisos rojos.

### Paso 23. Clasificación por edad

- **Qué:** responder el cuestionario de clasificación.
- **Dónde:**
  - iOS: App Store Connect → **Clasificación por edad** (cuestionario).
  - Android: Play Console → **Contenido de la app** → **Clasificación de contenido** (cuestionario IARC).
- **Cómo:** responde según el contenido real (app de baile, sin violencia ni contenido adulto; si hay fotos de usuarios, marca "contenido generado por usuarios" donde corresponda; **(verificar)** en cada cuestionario).
- **Cómo saber que quedó bien:** cada tienda muestra una clasificación asignada.

---

## Sección G. Capturas y metadatos de tienda

### Paso 24. Preparar las capturas

- **Qué:** seguir la guía completa en `docs/capturas.md`.
- **Resumen:**
  1. Crear datos de demo ficticios (sin nombres reales, fotos de personas ni correos). Usa un fixture o datos de prueba fuera de `src/` (`docs/capturas.md`, paso 1).
  2. Capturar Android en el emulador con `adb` y iOS con EAS Simulator (sin Mac) o `simctl` en un Mac.
  3. Componer en Figma (plantilla gratuita; el precio y la vigencia de las plantillas son **(verificar)**).
  4. Exportar: iOS PNG de 1320×2868 sin alfa (mínimo 1 captura de iPhone, **(verificar)** cuál es obligatoria); Android PNG o JPEG de 1080×1920 sin alfa.
- **Cómo saber que quedó bien:** tienes al menos 2 capturas de Android y 1 de iPhone, sin datos reales, subidas a las fichas en los pasos 25 y 26.

### Paso 25. Escribir los textos de la ficha

- **Qué:** nombre, subtítulo, descripción, palabras clave, URL de soporte, categoría e idiomas.
- **Dónde:** App Store Connect (versión 1.0 → **Información de la versión** y **Información de la app**) y Play Console (**Ficha de Play Store**).
- **Campos a rellenar:**
  - Nombre (decidir "MyMambo" o "mi-app"; ver decisiones abajo).
  - Subtítulo de iOS (límite de 30 caracteres **(verificar)**).
  - Descripción corta y larga de Android (límite de 80 y 4000 caracteres **(verificar)**).
  - Palabras clave de iOS (límite de 100 caracteres **(verificar)**).
  - URL de soporte y URL de política de privacidad (paso 20).
  - Categoría: sugerida "Estilo de vida" o "Salud y forma física" (**(verificar)**; elige la que describa mejor la app).
  - Idiomas: la app está en español; si solo lanzas en español, basta un idioma (**(verificar)** qué idiomas exigen las tiendas como mínimo).
- **Cómo saber que quedó bien:** las dos tiendas no muestran avisos de campos vacíos o fuera de límite.

### Paso 26. Subir gráficos de tienda de Android

- **Qué:** icono de 512×512 y gráfico de funciones de 1024×500 (obligatorios en Play).
- **Dónde:** Play Console → **Ficha de Play Store** → **Recursos gráficos**.
- **Cómo saber que quedó bien:** Play Console no marca errores en esa sección. Revisa en el paso 31.

---

## Sección H. Pruebas manuales antes de publicar

Haz estas pruebas en los builds del paso 17 y 18. Marca cada una:

- [ ] **Alumno no ve nada del profe.** Entra como alumno y revisa que no aparecen acciones ni datos de profe (crear pasos o grupos, editar, borrar). Cómo saber que quedó bien: no hay ningún botón de profe visible.
- [ ] **Grupos y pasos sobreviven al reinicio.** Crea un grupo y un paso, cierra la app del todo (no solo al fondo), ábrela y comprueba que siguen. Cómo saber que quedó bien: los datos están igual.
- [ ] **Cancelar el picker no sube nada.** Abre galería o cámara, cancela, y comprueba que no aparece ninguna foto nueva ni se guarda nada. Cómo saber que quedó bien: la lista no cambia.
- [ ] **Enlace de invitación.** Probar el paso 15 en ambos teléfonos. Cómo saber que quedó bien: abre la app con el código.
- [ ] **Modo claro y oscuro.** Cambia el tema del teléfono y revisa las pantallas principales (según la decisión del paso 2). Cómo saber que quedó bien: textos legibles y sin fondos blancos o negros sobre colores de la app.

Cuando todas estén marcadas, pasa a la sección I.

---

## Sección I. Envío a las tiendas

### Paso 27. Generar el build de producción

- **Qué:** generar los builds firmados de tienda.
- **Comandos:**
  ```bash
  npx eas-cli@latest build --profile production --platform ios
  npx eas-cli@latest build --profile production --platform android
  ```
- **Cómo:** el perfil `production` tiene `autoIncrement: true`, así que EAS sube el número de build solo. No edites la versión a mano.
- **Cómo saber que quedó bien:** ambos builds terminan como "finished" sin errores de firma.

### Paso 28. Enviar la build de iOS a TestFlight

- **Qué:** subir el build a App Store Connect.
- **Comando:**
  ```bash
  npx eas-cli@latest submit --platform ios --profile production
  ```
- **Cómo:** pide tu Apple ID y el código 2FA (o usa las credenciales de `eas.json`). Si pide una app-specific password, créala en https://appleid.apple.com (**(verificar)**; no la pegues en el repo).
- **Cómo saber que quedó bien:** en App Store Connect → **TestFlight** aparece el build tras unos minutos de procesamiento, con estado listo para probar.

### Paso 29. Probar en TestFlight

- **Qué:** instalar la build de TestFlight y repetir la sección H con un iPhone real.
- **Dónde:** App Store Connect → **TestFlight** → **Pruebas internas** → añade tu cuenta como tester.
- **Cómo saber que quedó bien:** la app instalada desde TestFlight pasa la sección H completa.

### Paso 30. Enviar la build de Android a la pista interna

- **Qué:** subir el AAB a Play Console.
- **Comando:**
  ```bash
  npx eas-cli@latest submit --platform android --profile production
  ```
- **Importante:** la primera subida crea el release en la pista interna en estado **borrador** hasta que completes la ficha. Si no quieres esto, sube el primer release a mano o pon `releaseStatus: "draft"` en el perfil de `eas.json` y termina en Play Console (doc de Expo: https://docs.expo.dev/submit/android/).
- **Cómo saber que quedó bien:** Play Console → **Pruebas** → **Pruebas internas** muestra el release con la versión nueva.

### Paso 31. Probar en la pista interna de Google Play

- **Qué:** instalar desde Play Store (pista interna) y repetir la sección H.
- **Dónde:** Play Console → **Pruebas** → **Pruebas internas** → **Testers** → añade los correos de prueba y copia el enlace de invitación.
- **Cómo saber que quedó bien:** la app se instala desde el enlace y pasa la sección H.

### Paso 32. Enviar a revisión de App Store

- **Qué:** enviar la versión 1.0 a revisión de Apple.
- **Dónde:** App Store Connect → tu app → **Versión 1.0** → **Añadir para revisión** → **Enviar a revisión**.
- **Cómo saber que quedó bien:** el estado cambia a "En revisión". La respuesta de Apple llega por correo y en App Store Connect.

### Paso 33. Pasar Google Play de pista interna a producción

- **Qué:** promover el release a producción.
- **Dónde:** Play Console → **Pruebas internas** → **Promover a producción**. Antes, en cuentas personales, cumple la prueba cerrada de Google (ver paso 6, **(verificar)**).
- **Cómo saber que quedó bien:** Play Console → **Producción** muestra el release en revisión o publicado.

---

## Sección J. Decisiones pendientes para ti

Estas no las puedo decidir yo:

1. **Backend (paso 1):** ¿app local o Supabase/Firebase para la 1.0?
2. **Tema (paso 2):** ¿claro y oscuro (quitar el forzado a oscuro) o solo oscuro?
3. **Nombre público:** ¿"MyMambo" o "mi-app"? Hoy `app.json` dice `mi-app`; las capturas y la descripción deben usar el mismo.
4. **iPad:** ¿la app soporta iPad? `app.json` no tiene `ios.supportsTablet`, así que no se declara (**(verificar)** qué implica para las capturas).
5. **Idiomas:** ¿solo español o también otros?
6. **Pruebas automáticas:** Jest ya está configurado (`npm test`, con `jest-expo`), pero hoy solo hay un archivo de prueba (`src/store/__tests__/roles.test.ts`). Decide si la 1.0 exige más cobertura antes de publicar.

---

## Orden resumido

1. Decisiones (backend, tema) → 2. Diseño exportado → 3. Cuentas (Apple, ASC, Google, Play) → 4. EAS login y credenciales → 5. Placeholders de `eas.json` → 6. Dominio y archivos `.well-known` → 7. Builds preview y pruebas en teléfono → 8. Privacidad, clasificación y textos → 9. Capturas → 10. Pruebas manuales → 11. Build production → 12. Envío a TestFlight y pista interna → 13. Revisión y producción.
