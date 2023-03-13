<script setup>
import { ref } from "vue";
import ShowItem from "./ShowItem.vue";

const props = defineProps({
  shows: {
    type: Array,
    required: true,
  },
  see_more: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["addShows"]);
</script>

<template>
  <div>
    <ShowItem v-for="show in shows" :key="show.id" :show="show" />
    <button v-if="see_more && shows.length < 60" @click="emit('addShows')">+ see more</button>
  </div>
</template>

<style scoped>
div {
  display: flex;
}
</style>