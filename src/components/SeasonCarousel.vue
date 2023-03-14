<script setup>
import { onMounted, ref, watch } from "vue";
import { useShowStore } from "../stores/shows";

const showStore = useShowStore();

const episodes = ref(null);

const props = defineProps({
  show_id: {
    type: Number,
    required: true,
  },
  season_number: {
    type: Number,
    required: true,
  },
});

const fetchEpisodes = async () => {
  episodes.value = await showStore.getShowSeasons(
    props.show_id,
    props.season_number
  );
};

watch(
  () => props.season_number,
  () => {
    fetchEpisodes();
  }
);

watch(episodes, () => {
  console.log('Episodes length', episodes.value);
})

onMounted(async () => {
  fetchEpisodes();
});
</script>

<template>
  <div v-if="episodes" :class="episodes.episodes.length < 5 ? 'season-carousel-grid' : 'season-carousel-grid-2'">
    <div v-for="episode in episodes.episodes" :key="episode.id" class="season-carousel-item">
      <img
        :src="
          episode.still_path
            ? `https://image.tmdb.org/t/p/w300${episode.still_path}`
            : 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'
        "
        :alt="`${episode.name} image`"
        class="season-carousel-img"
      />
      <p class="season-carousel-p">{{ episode.episode_number }}. {{ episode.name }}</p>
    </div>
  </div>
</template>
