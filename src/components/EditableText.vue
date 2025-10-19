<template>
  <div class="editable-text">
    <!-- Modo visual -->
    <span v-if="!isEditing" :class="displayClass" @dblclick="startEditing">
      {{ modelValue || placeholder }}
    </span>

    <!-- Modo edición -->
    <div v-else-if="isEditing && !showTextArea" class="inline-block">
      <v-text-field
        v-model="editableValue"
        variant="outlined"
        density="compact"
        hide-details
        autofocus
        class="min-w-[200px] max-w-full"
        @blur="stopEditing"
        @keyup.enter="stopEditing"
      />
    </div>
    <div v-else-if="isEditing && showTextArea">
      <v-textarea
        v-model="editableValue"
        variant="outlined"
        density="compact"
        hide-details
        autofocus
        class="min-w-[600px] max-w-full"
        @blur="stopEditing"
        @keyup.enter="stopEditing"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  displayClass: {
    type: String,
    default: "text-lg font-semibold cursor-pointer hover:border-b",
  },
  placeholder: {
    type: String,
  },
  showTextArea: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const isEditing = ref(false);
const editableValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    editableValue.value = val;
  }
);

function startEditing() {
  isEditing.value = true;
  nextTick(() => {
    // auto-focus if Vuetify handles it differently
  });
}

function stopEditing() {
  isEditing.value = false;
  emit("update:modelValue", editableValue.value);
  emit("change", editableValue.value);
}
</script>

<style scoped>
.editable-text {
  display: inline-block;
}
</style>
