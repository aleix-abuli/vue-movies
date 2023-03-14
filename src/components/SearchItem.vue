<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
  show: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits('hideSearch');

console.log("got show", props.show);
</script>

<template>
  <RouterLink :to="`/shows/${show.id}`" class="search-result-container" @click="emit('hideSearch')">
    <img
      :src="
        show.backdrop_path
          ? `https://image.tmdb.org/t/p/w300${show.poster_path}`
          : 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'
      "
      :alt="`${show.name} image`"
      class="search-img"
    />
    <p>{{ show.name }}</p>
  </RouterLink>
</template>

<style>
.search-result-container {
    display: flex;
    background-color: #74688b;
    padding: 1rem;
    gap: 1rem;
    width: 30vw;
    border-bottom: 1px solid var(--purple);
}

.search-result-container p {
    font-size: 1.6rem;
    color: var(--white);
}

.search-img {
  width: 5vw;
  aspect-ratio: 2/3;
  object-fit: cover;
}

@media screen and (max-width: 768px) {
  .search-result-container {
    width: 100vw;
  }

  .search-img {
    width: 10vw;
  }
}
</style>
