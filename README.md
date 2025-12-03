# Bot Boca Juniors - Reserva Automática de Entradas

Bot automatizado para monitorear y reservar asientos disponibles en eventos de Boca Juniors a través del sistema de socios.

## 📋 Descripción

Este bot realiza un monitoreo continuo de la disponibilidad de asientos en sectores específicos del estadio de Boca Juniors. Cuando encuentra disponibilidad en los sectores configurados, automáticamente intenta reservar el primer asiento disponible.

## 🚀 Características

- ✅ Monitoreo en tiempo real de disponibilidad de asientos
- ✅ Configuración flexible de sectores a monitorear
- ✅ Reserva automática del primer asiento disponible
- ✅ Sistema de reintentos configurable
- ✅ Soporte para múltiples sectores del estadio
- ✅ Login automático con credenciales por consola
- ✅ **Entrada de contraseña oculta (modo silencioso)**
- ✅ Sistema de logging mejorado con emojis informativos
- ✅ Manejo robusto de errores con reintentos automáticos
- ✅ Cierre graceful del navegador (Ctrl+C seguro)
- ✅ Configuración por variables de entorno (.env)

## 📦 Requisitos Previos

- Node.js (versión 18 o superior)
- pnpm (gestor de paquetes) o npm
- Google Chrome instalado (el bot usa Puppeteer para automatización del navegador)
- Credenciales válidas del sistema de socios de Boca Juniors (email y contraseña)

## 🔧 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Lapsa09/botboca2.git
cd botboca2
```

2. Instala las dependencias:

```bash
pnpm install
# o si usas npm
npm install
```

## ⚙️ Configuración

### Sectores Disponibles

Puedes configurar los sectores que deseas monitorear en el archivo `.env` usando la variable `SECTORES` (separados por coma):

```bash
SECTORES=I,F,G,J,H
```

Lista completa de sectores disponibles:

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

El bot te pedirá ingresar tus credenciales de forma segura:

```
=== Login a Boca Socios ===
Ingrese su email: tu-email@ejemplo.com
Ingrese su contraseña:
===========================
```

> 🔒 **Nota de Seguridad**: La contraseña se oculta completamente mientras la escribes (modo silencioso como en Linux/Unix). No se muestra ningún carácter, pero la contraseña se está capturando correctamente. Solo presiona Enter cuando termines.

Una vez ingresadas las credenciales, el bot:

1. Abrirá un navegador Chrome automatizado
2. Iniciará sesión en el sistema de Boca Socios
3. Navegará a la página de plateas del evento
4. Monitoreará la disponibilidad de sectores cada 2 segundos
5. Cuando encuentre disponibilidad, mostrará los asientos disponibles
6. Intentará reservar automáticamente el primer asiento disponible

### Salida de Ejemplo

```
Navegando a Boca Socios...
Intentando iniciar sesión...
Buscando botón de login...
Botón de login encontrado, haciendo clic...
¡Inicio de sesión exitoso!
Ingresando a la página principal...
Buscando sectores con disponibilidad...
Asientos disponibles en el sector I : 15
{ success: true, message: 'Reserva exitosa' }
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
- **Puppeteer** - Automatización del navegador para login y obtención de cookies
- **node-fetch** - Cliente HTTP para realizar peticiones a la API
- **readline** - Módulo para capturar credenciales por consola
- **npm** - Gestor de paquetes

## ⚠️ Advertencias

- **Uso Responsable**: Este bot está diseñado para uso personal. Úsalo de manera responsable y respeta los términos de servicio de Boca Juniors.
- **Seguridad**: El bot solicita credenciales por consola en cada ejecución. Nunca compartas tus credenciales ni las guardes en el código fuente.
- **Rate Limiting**: El bot hace peticiones cada 5 segundos. Modificar este intervalo puede resultar en bloqueos temporales.
- **Navegador**: El bot requiere Chrome instalado y abrirá una instancia del navegador durante la ejecución para realizar el login automático.

## � Licencia

ISC

## 👤 Autor

Lapsa09

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

## 📞 Soporte

Si encuentras algún problema o tienes preguntas, por favor abre un issue en el repositorio de GitHub.

---

**Nota**: Este proyecto es educativo y para uso personal. Asegúrate de cumplir con los términos y condiciones del sistema de socios de Boca Juniors.
