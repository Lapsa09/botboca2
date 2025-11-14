# Bot Boca Juniors - Reserva Automática de Entradas

Bot automatizado para monitorear y reservar asientos disponibles en eventos de Boca Juniors a través del sistema de socios.

## 📋 Descripción

Este bot realiza un monitoreo continuo de la disponibilidad de asientos en sectores específicos del estadio de Boca Juniors. Cuando encuentra disponibilidad en los sectores configurados, automáticamente intenta reservar el primer asiento disponible.

## 🚀 Características

- Monitoreo en tiempo real de disponibilidad de asientos
- Configuración flexible de sectores a monitorear
- Reserva automática del primer asiento disponible
- Sistema de reintentos cada 5 segundos
- Soporte para múltiples sectores del estadio

## 📦 Requisitos Previos

- Node.js (versión 14 o superior)
- pnpm (gestor de paquetes)
- Token de autenticación válido del sistema de socios de Boca Juniors

## 🔧 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Lapsa09/botboca2.git
cd botboca2
```

2. Instala las dependencias:

```bash
pnpm install
```

3. Configura tu token de autenticación en el archivo `index.js`:
   - Reemplaza el valor del campo `authorization` en el objeto `headers`
   - Actualiza el campo `cookie` con tus credenciales

## ⚙️ Configuración

### Sectores Disponibles

Puedes configurar los sectores que deseas monitorear editando el array `SECTORES` en `index.js`:

```javascript
const SECTORES = [
  "I",
  "H",
  // Descomenta los sectores que desees monitorear:
  // "F", "G", "J", "K", "LIC", "TS4", "TS5", etc.
];
```

Sectores disponibles incluyen:

- Plateas Altas: I, H, F, G, J, K
- Torres: TN1-5, TS1-5
- Palcos: PPN1-3, PPS1-3
- Plateas Medias: M, MD, MC, MI, CD, CI, AD, AC, AI, BD, BC, BI, DD, DI
- Plateas Bajas: LID, LIC, LV, LII, LPD, LPC, LD, LPI
- Plateas Preferenciales: PRS1-3, PRN1-3,
- Y muchos más...

## 🎯 Uso

Ejecuta el bot:

```bash
node index.js
```

El bot comenzará a:

1. Consultar la disponibilidad de sectores cada 5 segundos
2. Mostrar en consola cuántos sectores tienen disponibilidad
3. Cuando encuentre disponibilidad, mostrará los asientos disponibles
4. Intentará reservar automáticamente el primer asiento disponible

### Salida de Ejemplo

```
Sectores con disponibilidad: 2
Asientos disponibles en el sector 12345 : 15
Respuesta de la reserva: { success: true, message: "Reserva exitosa" }
```

## 📝 Estructura del Proyecto

```
botboca2/
├── index.js          # Archivo principal con la lógica del bot
├── package.json      # Configuración del proyecto y dependencias
├── .gitignore       # Archivos ignorados por git
└── README.md        # Este archivo
```

## 🛠️ Tecnologías

- **Node.js** - Entorno de ejecución
- **node-fetch** - Cliente HTTP para realizar peticiones a la API
- **pnpm** - Gestor de paquetes

## ⚠️ Advertencias

- **Uso Responsable**: Este bot está diseñado para uso personal. Úsalo de manera responsable y respeta los términos de servicio de Boca Juniors.
- **Seguridad**: Nunca compartas tu token de autenticación o cookies. Mantén tus credenciales seguras.
- **Rate Limiting**: El bot hace peticiones cada 5 segundos. Modificar este intervalo puede resultar en bloqueos temporales.

## 📄 Licencia

ISC

## 👤 Autor

Lapsa09

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

## 📞 Soporte

Si encuentras algún problema o tienes preguntas, por favor abre un issue en el repositorio de GitHub.

---

**Nota**: Este proyecto es educativo y para uso personal. Asegúrate de cumplir con los términos y condiciones del sistema de socios de Boca Juniors.
