<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  show: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <RouterLink :to="`/shows/${show.id}`" class="show-item-container">
    <img
      :src="
        show.backdrop_path
          ? `https://image.tmdb.org/t/p/w300${show.poster_path}`
          : 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'
      "
      :alt="`${show.name} image`"
      class="show-item-img"
    />
    <p class="show-item-p">{{ show.name }}</p>
  </RouterLink>
</template>

<style>
.show-item-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 200px;
}

.show-item-img {
  border-radius: var(--border-radius);
  width: 200px;
  aspect-ratio: 2/3;
  object-fit: cover;
  object-position: center;
}

.show-item-p {
  font-size: 1.6rem;
  text-align: center;
  color: var(--white);
  white-space: break-spaces;
  max-width: 100%;
  text-overflow: ellipsis;
}

@media screen and (max-width: 768px) {
  .show-item-img {
    width: 120px;
  }
}
</style>
