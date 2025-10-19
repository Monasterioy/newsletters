<template>
  <div>
    <!-- Botón para abrir drawer solo en mobile -->
    <button
      v-if="isMobile"
      @click="drawer = true"
      class="fixed top-4 right-4 p-2 bg-gray-800 text-white rounded z-50"
    >
      ⚙️ Personalizar
    </button>

    <!-- Drawer móvil -->

    <v-bottom-sheet v-if="isMobile" v-model="drawer">
      <CustomizerPanel />
    </v-bottom-sheet>

    <!-- Panel lateral normal -->
    <aside v-else>
      <CustomizerPanel />
    </aside>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useScreenSize } from "@/composables/useScreenSize";
import CustomizerPanel from "./CustomizerPanel.vue"; // Tu contenido del aside

const { isMobile } = useScreenSize();
const drawer = ref(false);
</script>
