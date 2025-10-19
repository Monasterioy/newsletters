<template>
  <v-app>
    <v-main>
      <div class="min-h-screen p-6 bg-gray-300">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2">
            <ArticleComponent />
          </div>
          <div class="lg:col-span-1">
            <SidebarCustomizer />
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import ArticleComponent from "./components/ArticleComponent.vue";
import CustomizerPanel from "./components/CustomizerPanel.vue";
import SidebarCustomizer from "./components/SidebarCustomizer.vue";
</script>
