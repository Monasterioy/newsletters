# Vue Article Customizer

Aplicación demo construida con **Vue 3 + Vite** que permite editar en vivo el contenido y personalizar estilos de un artículo (secciones `header`, `body` y `footer`) con persistencia en `localStorage`.

## Tecnologías

- **Vue 3** (Composition API)
- **Vite** como bundler
- **Vuetify** para componentes UI (`v-app`, `v-main`, `v-img`, `v-text-field`, `v-textarea`, `v-btn`, `v-expansion-panels`)
- **Pinia** para manejo de estado
- **TailwindCSS** para utilidades de estilo

## Estructura del proyecto

- `src/App.vue`: Layout principal. Renderiza `ArticleComponent` y `CustomizerPanel` dentro de `v-app`/`v-main`.
- `src/components/ArticleComponent.vue`: Vista del artículo. Aplica estilos globales por sección y permite edición inline del texto.
- `src/components/EditableText.vue`: Componente reutilizable para edición inline con `v-text-field`/`v-textarea` al hacer doble clic.
- `src/components/CustomizerPanel.vue`: Panel lateral para cambiar tema y estilos (color de fondo, color de texto, tipografía) a nivel global o por sección.
- `src/composables/useScreenSize.js`: Composable para detectar tamaño de pantalla.
- `src/store/styleStore.js`: Store Pinia para estilos. Contiene estado `global`/`specific`, temas predefinidos, y persistencia en `localStorage`.
- `src/store/contentStore.js`: Store Pinia para contenido del artículo con persistencia reactiva en `localStorage`.
- `src/assets/tailwind.css`: Entrada Tailwind. Configuración en `tailwind.config.cjs` y `postcss.config.cjs`.
- `vite.config.mjs`: Alias `@` hacia `src/` y configuración de `vite-plugin-vuetify`.

## Scripts

- `npm run dev`: Servidor de desarrollo (por defecto en `http://localhost:5173`).
- `npm run build`: Build de producción.
- `npm run preview`: Previsualización del build.

## Puesta en marcha

1. Requisitos: Node.js 18+ recomendado.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar en desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir en el navegador `http://localhost:5173`.

## Uso rápido

- Edición de texto: haz doble clic sobre títulos, subtítulos, cuerpo y pie para entrar en modo edición (`EditableText.vue`). Presiona Enter o quita el foco para guardar.
- Personalizar estilos: usa el panel `CustomizerPanel.vue` para cambiar fondo, texto y tipografía a nivel global o por sección (Header/Body/Footer). Los cambios se guardan automáticamente.
- Temas: selecciona un tema disponible en el panel (por ejemplo `claro`, `oscuro`). La acción invoca `store.applyTheme()` en `styleStore.js`.

## Persistencia

- Estilos: se guardan en `localStorage` bajo la clave `styleConfig` desde `styleStore.js`.
- Contenido: se guarda en `localStorage` bajo la clave `contentConfig` desde `contentStore.js` (se observa un `watch` profundo que persiste cada cambio).

## Notas de implementación

- Estilos por sección: `ArticleComponent.vue` aplica estilos computados por sección mediante `sectionGlobalStyles('header'|'body'|'footer')` leyendo `useStyleStore()`.
- Edición de contenido: `ArticleComponent.vue` usa `useContentStore()` y emite cambios a través de `updateContentData()`.
- Alias `@`: definido en `vite.config.mjs` para importar desde `src/`.
- Tailwind: utilidades aplicadas en layout y componentes; asegúrate de que `src/assets/tailwind.css` esté importado en tu punto de entrada (ej. `main.ts/js`).

## Posibles mejoras

- Añadir más temas en `styleStore.js`.
- Soporte para estilos específicos por componente además de por sección.
- Validaciones y límites de edición de texto.
- Tests de componentes con Vitest.

## Licencia

Este proyecto se distribuye con fines educativos/demostrativos. Ajusta la licencia según tus necesidades.
