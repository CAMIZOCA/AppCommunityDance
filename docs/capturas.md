# Capturas de pantalla para App Store y Google Play (MyMambo)

Investigación para preparar las capturas de tienda. Fecha de consulta: 2026-10-23.
Marcado: **(verificar)** = no confirmado en una fuente oficial leída en esta sesión.

## Requisitos App Store (App Store Connect)

- **iPhone (obligatorio):** al menos 1 captura de iPhone. La página oficial indica que es obligatoria la de **Dynamic Island (medium display)**: 1179×2556 o 1206×2622 (vertical). Una fuente secundaria dice que el obligatorio es 6.9" (1320×2868). **(verificar en vivo)**
  - Fuente: https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications
- **Tamaño maestro recomendado:** 1320×2868 (6.9"). La página dice que basta subir el tamaño más alto requerido y App Store Connect escala a los demás. Ese tamaño figura en la tabla oficial (Dynamic Island large). **(verificar)**
- **iPad:** 1 captura de 13" (2064×2752 o 2048×2732), solo si la app corre en iPad. Revisar `ios.supportsTablet` en `app.json`. **(verificar: no lo he revisado)**
- **Cantidad:** de 1 a 10 capturas por tamaño de dispositivo.
- **Formato:** .jpeg, .jpg o .png. **Sin canal alfa ni transparencias.**
- **Orientación:** vertical y horizontal tienen tamaños propios en la tabla oficial.
- **Contenido:** deben cumplir las App Store Review Guidelines.
  - Guía 2.3.3: las capturas deben mostrar la app en uso, no solo la pantalla de título, login o splash. Se admiten textos e imágenes superpuestos.
  - Fuente: https://developer.apple.com/app-store/review/guidelines/
  - Guía 2.3.10 (leída): trata sobre no incluir nombres o imágenes de otras plataformas móviles o marketplaces alternativos. No es la regla de marcos ni de textos.
  - La guía 2.3.9 (datos personales en capturas) **no la he leído (verificar)**.
- **Marcos de dispositivo:** la página oficial no dice si están permitidos. **(verificar)**
- **Idiomas:** las capturas se suben por localización. Si la app tiene i18n, cada idioma necesita sus capturas con el texto en ese idioma. **(verificar)**

## Requisitos Google Play (Play Console)

Fuente general: https://support.google.com/googleplay/android-developer/answer/9866151?hl=en

- **Capturas de teléfono**
  - Formato: JPEG o PNG de 24 bits, **sin alfa**.
  - Lado mínimo 320 px, lado máximo 3840 px.
  - El lado largo no puede superar **2 veces** el lado corto.
  - Cantidad: mínimo 2, máximo 8 por tipo de dispositivo.
  - Recomendado: 1080×1920 (9:16) o 1920×1080 (16:9). Es recomendación, no obligación.
- **Capturas de tablet (7" y 10")**
  - Entre 1080 y 7680 px, proporción 16:9 (horizontal) o 9:16 (vertical).
  - Mínimo 4, máximo 8 por tipo de dispositivo.
  - Si la app no soporta tablet, no es obligatorio. **(verificar)**
- **Gráfico de funciones (feature graphic):** 1024×500 px, JPEG o PNG de 24 bits sin alfa. Obligatorio, 1 imagen. Dejar logos y texto lejos de los bordes. Evitar blanco, negro o gris oscuro puro.
- **Icono de la app:** 512×512 px, PNG de 32 bits con alfa, máximo 1024 KB. Obligatorio, 1 imagen. Fuente de la página 9866151 (leída) y de un proveedor (verificar en Play Console).
- **Contenido:** mostrar la experiencia real de la app. Los textos (taglines) pueden ocupar como máximo el 20 % de la imagen. Evitar imágenes de dispositivo y manos. Evitar texto que no sea parte de la experiencia en tablet, porque puede recortarse.

## Herramientas

Entorno del proyecto: Windows 11. El simulador de iOS requiere macOS, por eso las capturas de iOS necesitan un Mac o **EAS Simulator** (nube).

| Herramienta | Coste | Pros | Contras | Encaja con Expo |
|---|---|---|---|---|
| **Figma** (plantilla gratuita de la comunidad) | Gratis (la plantilla y el plugin Apple Devices, según fuentes de terceros **(verificar)**) | Control total; funciona en Windows; plantillas con marcos de iPhone 6.9" y Android según vendedores **(verificar)** | Manual; tiempo estimado por un proveedor, no medido | Sí: solo se necesitan las PNG capturadas. Fuente de plantilla: https://aso.dev/figma/screenshot-template/ (proveedor, verificar) |
| **Canva** (app "App Screenshot Gen") | Gratis en parte; precio **(verificar)** | Muy rápido para textos y marcos; interfaz sencilla | Dependencia de la app de Canva; coste y vigencia de tamaños **(verificar)** | Sí: solo importa PNG. https://www.canva.com/apps/AAHAAOE60BI/app-screenshot-gen (verificar) |
| **fastlane frameit** | Gratis, open source | Automatizable (CLI); marcos iPhone, iPad y Android **(verificar)**; `Framefile.json` para textos y fondos | Requiere Ruby y macOS para iOS; sin título el resultado queda a resolución completa y no sube directo a App Store Connect (según la documentación de gema, verificar); documentación en docs.fastlane.tools (no accesible en esta sesión) | Sí, con PNG de `simctl` o `adb`. https://docs.fastlane.tools/actions/frameit/ (verificar) |
| **Servicios web** (AppScreenshotStudio, Screenhance, etc.) | De pago **(verificar precio)** | Rápidos; generan sets en tamaños de tienda | Coste; calidad y privacidad de subida de capturas **(verificar)** | Sí: solo importan PNG |
| **Expo + react-native-view-shot (`captureRef`)** | Gratis | Dentro de la propia app; funciona en Expo Go según la doc (v57) https://docs.expo.dev/versions/v57.0.0/sdk/captureRef/ | Solo captura vistas de la app, sin marcos ni tipografía de tienda; requiere `npx expo install react-native-view-shot` | Sí, pero se queda corto para el resultado final |
| **Capturas nativas** (`xcrun simctl io booted screenshot`, `adb exec-out screencap -p`) | Gratis | Captura limpia de simulador o emulador | `simctl` solo en Mac; `adb` funciona en Windows con emulador Android | Sí (captura de base) |
| **EAS Simulator** (skill `eas-simulator`) | De pago (servicio EAS) | Simulador iOS y Android en la nube; sirve sin Mac; la skill cubre capturas desde el simulador | Servicio experimental (según la skill); coste **(verificar)** | Sí: es de EAS, igual que el build |

**Respuesta a la pregunta de la skill `eas-simulator`:** según su descripción, sirve para ejecutar la app en un simulador iOS o Android en la nube de EAS, y su disparador incluye "screenshot my app". Es la vía para capturar iOS desde Windows. No he leído su contenido completo en esta sesión; verificar sintaxis actual de `eas simulator:*` antes de usarla.

## Plantilla recomendada (pasos concretos para este proyecto)

Recomendación: **capturas con simulador/emulador + composición en Figma** (gratis, sin Mac).

1. **Preparar datos de demo.** Crear grupos, pasos y eventos ficticios (sin nombres reales, fotos de personas ni correos). No modificar código de producción para esto; hacerlo con un fixture o datos de prueba fuera de `src/`.
2. **Capturar Android.** Emulador local en Windows; `adb exec-out screencap -p > capturas/android/01-galeria.png`. Tamaño 1080×1920 o superior.
3. **Capturar iOS.** Dos opciones:
   - EAS Simulator (skill `eas-simulator`): sin Mac.
   - `xcrun simctl` en un Mac, si lo hay. Tamaño de salida 1320×2868 (6.9"), que cubre los tamaños menores por escalado.
4. **Revisar que la app esté en modo oscuro.** `src/app/_layout.tsx` fuerza `colorScheme.set('dark')` (línea 17), aunque `app.json` tiene `userInterfaceStyle: "automatic"`. Las capturas deben salir en oscuro. Si más adelante se añade modo claro, habrá que decidir qué variante usar en tienda. **(verificar si las tiendas exigen variantes)**
5. **Componer en Figma.** Usar la plantilla gratuita (iPhone 6.9" y Android), colocar la captura real dentro del marco y añadir un titular por pantalla.
6. **Exportar.** iOS: PNG de 1320×2868 sin alfa. Android: PNG o JPEG de 1080×1920 sin alfa. Gráfico de funciones: 1024×500. Icono: 512×512 con alfa.
7. **Subir.** App Store Connect y Play Console, por idioma. Verificar tamaños en el validador antes de enviar.

## Reglas de contenido

- **Longitud del titular:** no hay límite oficial encontrado **(verificar)**. Recomendación propia: máximo 30 caracteres, una idea por titular.
- **Idioma:** un idioma por set de capturas, igual al idioma de la app. Si la app está localizada, un set por idioma.
- **Consistencia:** misma plantilla, tipografía, color de fondo y posición del titular en todas las capturas.
- **Datos personales:** no mostrar nombres reales, correos, teléfonos, fotos de personas ni ubicaciones reales. Usar datos ficticios.
- **Modo claro y oscuro:** la app fuerza el modo oscuro hoy (`src/app/_layout.tsx`). Capturar y componer en oscuro para que coincida con lo que el usuario ve.
- **Texto en capturas:** en Google Play, máximo 20 % de la imagen. En App Store, permitido por la guía 2.3.3, con capturas que muestren la app en uso.
- **Marcos de dispositivo:** permitidos en la práctica por la mayoría de apps; las tiendas no lo prohíben en las páginas leídas, pero no lo confirmé en una fuente oficial **(verificar)**.
- **Sin texto que no sea parte de la app** en tablet, porque se puede recortar.

## Pendientes de verificar

- Tamaño obligatorio de iPhone: Dynamic Island medium o 6.9" (fuentes contradictorias).
- Si la app soporta iPad (`app.json`).
- Precios de Figma, Canva y servicios web.
- Docs de fastlane frameit (no accesibles en esta sesión).
- Guía 2.3.9 de Apple (datos personales en capturas).
- Límite de longitud de titular y reglas de marcos de dispositivo en las tiendas.
