<template>
  <div :class="keyboardClass"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import layout from "simple-keyboard-layouts/build/layouts/russian";

const props = defineProps({
  keyboardClass: {
    type: String,
    default: "simple-keyboard"
  },
  input: {
    type: String
  }
});

const emit = defineEmits(["onChange", "onKeyPress"]);

const keyboard = ref(null);

const onChange = (inputValue) => {
  emit("onChange", inputValue);
};

const onKeyPress = (button) => {
  emit("onKeyPress", button);

  if (button === "{shift}" || button === "{lock}") {
    handleShift();
  }
};

const handleShift = () => {
  if (!keyboard.value) return;

  const currentLayout = keyboard.value.options.layoutName;
  const shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.value.setOptions({
    layoutName: shiftToggle,
  });
};

onMounted(() => {
  keyboard.value = new Keyboard(props.keyboardClass, {
    onChange,
    onKeyPress,
    ...layout
  });
});

watch(
  () => props.input,
  (newInput) => {
    if (keyboard.value) {
      keyboard.value.setInput(newInput);
    }
  }
);
</script>
