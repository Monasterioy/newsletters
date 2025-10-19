import { defineStore } from "pinia";
import { reactive, watch } from "vue";

const content = {
  title: {
    title: "Mi Newsletter Personalizada",
    subtitle: "Subtítulo - Branding en vivo",
  },
  body: {
    title: "Título del artículo",
    content:
      "Este es un párrafo de ejemplo que demuestra cómo los estilos globales y específicos se aplican. Selecciona opciones en el panel de la derecha para ver los cambios en tiempo real.",
    footer: "Pequeña nota al pie del contenido del cuerpo",

    img: "https://previews.123rf.com/images/pixphoto/pixphoto1607/pixphoto160700116/60734743-lots-of-people-walking-on-a-city-street.jpg",
  },
  footer: {
    content: "© 2025 - Ejemplo de Newsletter",
  },
};

export const useContentStore = defineStore("contentStore", () => {
  const state = reactive(JSON.parse(JSON.stringify(content)));
  const setContet = (section, key, value) => {
    state[section][key] = value;
  };

  function loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem("contentConfig");
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(state, parsed);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem("contentConfig", JSON.stringify(state));
  }

  watch(
    () => state,
    () => {
      saveToLocalStorage();
    },
    { deep: true }
  );

  return {
    setContet,
    loadFromLocalStorage,
    saveToLocalStorage,
    state,
  };
});
