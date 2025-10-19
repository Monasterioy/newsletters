import { ref, onMounted, onUnmounted } from "vue";

export function useScreenSize() {
  const width = ref(window.innerWidth);
  const isMobile = ref(width.value <= 768);

  const updateSize = () => {
    width.value = window.innerWidth;
    isMobile.value = width.value <= 768;
  };

  onMounted(() => window.addEventListener("resize", updateSize));
  onUnmounted(() => window.removeEventListener("resize", updateSize));

  return { width, isMobile };
}
