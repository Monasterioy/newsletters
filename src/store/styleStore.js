import { defineStore } from "pinia";
import { reactive } from "vue";

const defaultState = {
  global: {
    header: {
      backgroundColor: "#48a5e8",
      textColor: "#f9fafb",
      fontFamily: "Inter, system-ui, sans-serif",
    },
    body: {
      backgroundColor: "#FFFFFF",
      textColor: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
    },
    footer: {
      backgroundColor: "#FFFFFF",
      textColor: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
    },
  },
  specific: {
    header: {},
    body: {},
    footer: {},
  },
};

const themes = {
  claro: JSON.parse(JSON.stringify(defaultState)),
  oscuro: {
    global: {
      header: {
        backgroundColor: "#111827",
        textColor: "#f9fafb",
        fontFamily: "Inter, system-ui, sans-serif",
      },
      body: {
        backgroundColor: "#111827",
        textColor: "#f9fafb",
        fontFamily: "Inter, system-ui, sans-serif",
      },
      footer: {
        backgroundColor: "#111827",
        textColor: "#f9fafb",
        fontFamily: "Inter, system-ui, sans-serif",
      },
    },
    specific: {
      header: {},
      body: {},
      footer: {},
    },
  },
};

export const useStyleStore = defineStore("styleStore", () => {
  const state = reactive(JSON.parse(JSON.stringify(defaultState)));

  function setGlobalStyle(section, key, value) {
    if (!state.global[section]) state.global[section] = {};
    state.global[section][key] = value;
  }

  function setSpecificStyle(section, key, value) {
    if (!state.specific[section]) state.specific[section] = {};
    state.specific[section][key] = value;
  }

  function loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem("styleConfig");
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(state, parsed);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem("styleConfig", JSON.stringify(state));
  }

  function applyTheme(name) {
    const t = themes[name];
    if (!t) return;
    Object.assign(state.global, JSON.parse(JSON.stringify(t.global || {})));
    state.specific = JSON.parse(JSON.stringify(t.specific || {}));
    saveToLocalStorage();
  }

  function resetToDefault() {
    Object.assign(state, JSON.parse(JSON.stringify(defaultState)));
    saveToLocalStorage();
  }

  return {
    state,
    setGlobalStyle,
    setSpecificStyle,
    loadFromLocalStorage,
    saveToLocalStorage,
    applyTheme,
    resetToDefault,
    themes,
  };
});
