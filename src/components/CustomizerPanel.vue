<template>
  <aside
    class="p-4 bg-white rounded-lg shadow"
    :class="isMobile ? 'w-full' : 'w-80'"
  >
    <h2 class="text-lg font-bold mb-3 text-center">Personalizar Estilos</h2>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>Globales</v-expansion-panel-title>
        <v-expansion-panel-text>
          <section class="mb-4">
            <div class="space-y-2">
              <!-- Tema -->
              <div class="flex gap-3">
                <label class="text-sm block pt-1">Tema:</label>
                <select
                  class="border rounded px-2 py-1 w-full"
                  v-model="selectedTheme"
                  @change="onChangeTheme"
                >
                  <option value="">Personalizado</option>
                  <option v-for="t in themeList" :key="t" :value="t">
                    {{ t }}
                  </option>
                </select>
              </div>
              <div class="border-t border-gray-300 my-3"></div>
              <!-- Color de fondo -->
              <div class="flex gap-3">
                <label class="block text-sm mt-1">Fondo</label>
                <input
                  type="color"
                  v-model="globalPreview.backgroundColor"
                  @input="applyGlobal('backgroundColor')"
                />
              </div>

              <div class="border-t border-gray-300 my-3"></div>
              <!-- Color de texto -->
              <div class="flex gap-3">
                <label class="block text-sm mt-2">Texto</label>
                <input
                  type="color"
                  v-model="globalPreview.textColor"
                  @input="applyGlobal('textColor')"
                />
              </div>

              <div class="border-t border-gray-300 my-3"></div>
              <!-- Tipografía -->
              <div class="flex gap-3">
                <label class="block text-sm mt-2">Tipografía</label>
                <select
                  v-model="globalPreview.fontFamily"
                  @change="applyGlobal('fontFamily')"
                  class="w-full"
                >
                  <option value="Inter, system-ui, sans-serif">
                    Inter (predeterminado)
                  </option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="'Courier New', monospace">Courier New</option>
                </select>
              </div>
            </div>
          </section>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>Específicos</v-expansion-panel-title>
        <v-expansion-panel-text>
          <section class="mb-4">
            <div class="flex gap-3">
              <label class="block text-sm pt-1">Sección: </label>
              <select v-model="selectedSection" class="w-full mb-2">
                <option value="header">Header</option>
                <option value="body">Body</option>
                <option value="footer">Footer</option>
              </select>
            </div>
            <div class="border-t border-gray-300 my-3"></div>
            <div class="flex gap-3">
              <label class="block text-sm">Fondo</label>
              <input
                type="color"
                v-model="localSpecific.backgroundColor"
                @input="applySpecific('backgroundColor')"
              />
            </div>
            <div class="border-t border-gray-300 my-3"></div>
            <div class="flex gap-3">
              <label class="block text-sm mt-2">Texto </label>
              <input
                type="color"
                v-model="localSpecific.textColor"
                @input="applySpecific('textColor')"
              />
            </div>

            <div class="border-t border-gray-300 my-3"></div>
            <div class="flex gap-3">
              <label class="block text-sm mt-2">Tipografía</label>
              <select
                v-model="localSpecific.fontFamily"
                @change="applySpecific('fontFamily')"
                class="w-full"
              >
                <option value="">(usar global)</option>
                <option value="Inter, system-ui, sans-serif">Inter</option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="'Courier New', monospace">Courier New</option>
              </select>
            </div>
          </section>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="flex gap-2 mt-3">
      <button
        @click="resetAll"
        class="flex-1 py-1 rounded bg-gray-800 text-white"
      >
        Reset
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useStyleStore } from "@/store/styleStore";
import { useScreenSize } from "@/composables/useScreenSize";

const store = useStyleStore();
const { isMobile } = useScreenSize();

// Tema seleccionado
const themeList = Object.keys(store.themes || {});
const selectedTheme = ref("");

// Sección seleccionada para estilos específicos
const selectedSection = ref("header");

// Estilo global mostrado en la UI (solo para visualización)
const globalPreview = reactive({
  backgroundColor: "#ffffff",
  textColor: "#111827",
  fontFamily: "Inter, system-ui, sans-serif",
});

// Estilos específicos de la sección actual
const localSpecific = reactive({
  backgroundColor: "",
  textColor: "",
  fontFamily: "",
});

onMounted(() => {
  store.loadFromLocalStorage();
  syncGlobalPreview();
});

// --- Sincronizar vista previa global (muestra el del header) ---
function syncGlobalPreview() {
  const header = store.state.global.header;
  globalPreview.backgroundColor = header.backgroundColor;
  globalPreview.textColor = header.textColor;
  globalPreview.fontFamily = header.fontFamily;
}

// --- Aplicar un cambio global a todas las secciones ---
function applyGlobal(key) {
  const value = globalPreview[key];
  ["header", "body", "footer"].forEach((section) => {
    store.setGlobalStyle(section, key, value);
  });
  store.saveToLocalStorage();
}

// --- Aplicar cambio específico ---
function applySpecific(key) {
  const valuetest = localSpecific[key];
  store.setGlobalStyle(selectedSection.value, key, valuetest);
  store.saveToLocalStorage();
}

// --- Limpiar estilos específicos ---
function clearSpecific() {
  store.state.specific[selectedSection.value] = {};
  store.saveToLocalStorage();
  localSpecific.backgroundColor = "";
  localSpecific.textColor = "";
  localSpecific.fontFamily = "";
}

// --- Cambiar tema ---
function onChangeTheme() {
  if (selectedTheme.value) {
    store.applyTheme(selectedTheme.value);
    syncGlobalPreview();
  }
}

// --- Reset total ---
function resetAll() {
  store.resetToDefault();
  syncGlobalPreview();
  localSpecific.backgroundColor = "";
  localSpecific.textColor = "";
  localSpecific.fontFamily = "";
}
</script>
