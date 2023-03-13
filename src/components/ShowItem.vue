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
      :src="
      show.backdrop_path ?
      `https://image.tmdb.org/t/p/w300${show.poster_path}`
      :
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'
      "
      :alt="`${show.name} image`"
    />
    <p>{{ show.name }}</p>
  </RouterLink>
</template>
