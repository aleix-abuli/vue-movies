<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
  show: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <RouterLink :to="`/shows/${show.id}`">
    <img
      :src="`https://image.tmdb.org/t/p/w300${show.backdrop_path}`"
      :alt="`${show.name} image`"
    />
    <p>{{ show.name }}</p>
  </RouterLink>
</template>
