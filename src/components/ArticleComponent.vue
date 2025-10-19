<template>
  <div>
    <header
      :style="sectionGlobalStyles('header')"
      class="p-4 rounded h-80 gap-4 flex flex-col items-center justify-center"
    >
      <EditableText
        v-model="content.title.title"
        displayClass="text-2xl font-bold hover:border-2"
        @change="updateContentData"
      />

      <EditableText
        v-model="content.title.subtitle"
        displayClass="text-sm pt-1"
        @change="updateContentData"
      />
    </header>

    <main
      :style="sectionGlobalStyles('body')"
      class="flex flex-col justify-center items-center"
    >
      <div class="flex items-center justify-center bg-white mt-10">
        <v-img :src="content.body.img" contain :class="imageClass" />
      </div>
      <div
        class="flex flex-col gap-2 max-w-[700px] w-full justify-center items-center pt-10 px-10"
      >
        <EditableText
          v-model="content.body.title"
          displayClass="text-xl font-semibold mb-2 max-w-[200px] pt-10"
          @change="updateContentData"
        />

        <EditableText
          v-model="content.body.content"
          displayClass="leading-relaxed max-w-[600px] text-center"
          :showTextArea="true"
          @change="updateContentData"
        />

        <hr class="mt-4" />
        <div class="">
          <v-btn
            class="text-none"
            color="blue"
            min-width="92"
            rounded
            @click="dialog = false"
          >
            Close
          </v-btn>
        </div>
        <div class="py-10">
          <EditableText
            v-model="content.body.footer"
            displayClass="text-sm"
            @change="updateContentData"
          />
        </div>
      </div>
    </main>

    <!--  -->
    <footer
      :style="sectionGlobalStyles('footer')"
      class="text-xs flex py-10 justify-center items-center"
    >
      <div class="flex max-w-[700px] w-full justify-between px-3">
        <EditableText
          v-model="content.footer.content"
          displayClass=""
          @change="updateContentData"
        />

        <div class="flex gap-2">
          <v-img src="facebook.png" class="w-[20px]" contain></v-img>
          <v-img src="instagram.png" class="w-[20px]" contain></v-img>
          <v-img src="x.png" class="w-[20px]" contain></v-img>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, nextTick } from "vue";
import { useStyleStore } from "@/store/styleStore";
import { useContentStore } from "@/store/contentStore";
import { useScreenSize } from "@/composables/useScreenSize";

import EditableText from "./EditableText.vue";

const styleStore = useStyleStore();
const contentStore = useContentStore();
const { isMobile, width } = useScreenSize();

onMounted(() => {
  styleStore.loadFromLocalStorage();
  contentStore.loadFromLocalStorage();
});

const sectionGlobalStyles = (section, key) => {
  const specific = styleStore.state.global[section] || {};
  return {
    backgroundColor: specific.backgroundColor,
    color: specific.textColor,
    fontFamily: specific.fontFamily,
  };
};

const imageClass = computed(() => {
  if (width.value >= 1440) return "w-[700px]";
  if (width.value >= 1024) return "w-[600px]";
  if (width.value >= 768) return "w-[600px]";
  if (width.value >= 540) return "w-[250px]";
  if (width.value >= 425) return "w-[300px]";
  return "w-[300px]";
});

const content = computed(() => {
  return {
    title: contentStore.state.title,
    body: contentStore.state.body,
    footer: contentStore.state.footer,
  };
});

const updateContentData = () => {
  contentStore.setContet("title", "title", content.title.title);
  contentStore.setContet("title", "subtitle", content.title.subtitle);
  contentStore.setContet("body", "title", content.body.title);
  contentStore.setContet("body", "content", content.body.content);
  contentStore.setContet("body", "footer", content.body.footer);
  contentStore.setContet("footer", "content", content.footer.content);
};
</script>

<style scoped></style>
