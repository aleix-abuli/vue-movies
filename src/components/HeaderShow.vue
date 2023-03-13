<script setup>
import { ref, watch, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useShowStore } from "../stores/shows";

const showStore = useShowStore();

const showGenres = ref(null);

const props = defineProps({
  show: Object,
  required: true,
});

watch(
  () => props.show,
  () => {
    showGenres.value = showStore.genres.filter((genre) =>
      props.show.genre_ids.includes(genre.id)
    );
  }
);

onMounted(() => {
  showGenres.value = showStore.genres.filter((genre) =>
    props.show.genre_ids.includes(genre.id)
  );
});
</script>

<template>
  <RouterLink :to="`/shows/${show.id}`">
    <img
      :src="
        show.backdrop_path
          ? `https://image.tmdb.org/t/p/w1280${show.backdrop_path}`
          : 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'
      "
      alt=""
    />
    <h1>{{ show.name }}</h1>
    <template v-if="showGenres">
      <p v-for="genre in showGenres" :key="genre.id">{{ genre.name }}</p>
    </template>
  </RouterLink>
</template>
