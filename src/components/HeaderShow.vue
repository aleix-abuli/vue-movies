<script setup>
import { ref, watch, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useShowStore } from "../stores/shows";

const showStore = useShowStore();

const showGenres = ref(null);

const props = defineProps({
  show: {
    type: Object,
    required: true,
  },
  current_display: {
    type: Number,
    required: true,
  },
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
<transition name="fade" mode="out-in">
  <RouterLink :to="`/shows/${show.id}`" :key="show">
    <div class="header-show-gradient">
        <img
          :src="
            show.backdrop_path
              ? `https://image.tmdb.org/t/p/w1280${show.backdrop_path}`
              : 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'
          "
          :alt="`${show.name} backdrop image`"
          class="header-show-img"
        />
      </div>
      <div class="header-show-info">
        <h2 class="header-show-title">{{ show.name }}</h2>
        <template v-if="showGenres">
          <p v-for="genre in showGenres" :key="genre.id" class="genre-tag">{{ genre.name }}</p>
        </template>
        <div class="header-show-spans">
          <span :class="current_display === 0 ? 'header-show-full' : 'header-show-empty'"></span>
          <span :class="current_display === 1 ? 'header-show-full' : 'header-show-empty'"></span>
          <span :class="current_display === 2 ? 'header-show-full' : 'header-show-empty'"></span>
        </div>
      </div>
    </RouterLink>
  </transition>
</template>
