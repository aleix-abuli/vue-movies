<script setup>
import { ref } from "vue";
import HeaderShow from "./HeaderShow.vue";

const currentDisplay = ref(0);

const props = defineProps({
  shows: Array,
  required: true,
});

setInterval(() => {
  if(currentDisplay.value < 2) currentDisplay.value += 1;
  else currentDisplay.value = 0;

  console.log(currentDisplay.value)
  console.log(props.shows)
}, 3000);
</script>

<template>
  <HeaderShow :show="shows[currentDisplay]" />
  <span>{{ currentDisplay === 0 ? 'selected' : 'nonsel' }}</span>
  <span>{{ currentDisplay === 1 ? 'selected' : 'nonsel' }}</span>
  <span>{{ currentDisplay === 2 ? 'selected' : 'nonsel' }}</span>
</template>
