<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useShowStore } from "../stores/shows";
import Loader from "../components/Loader.vue";
import ShowCarousel from "../components/ShowCarousel.vue";
import SeasonCarousel from "../components/SeasonCarousel.vue";

const showStore = useShowStore();
const route = useRoute();

const showData = ref(null);
const similarShows = ref(null);
const showRecomms = ref(null);
const currentSeason = ref(null);

const fetchInfo = async () => {
  showData.value = await showStore.getShowDetails(route.params.id);
  currentSeason.value = showData.value.seasons[0].season_number;
  similarShows.value = await showStore.getSimilarShows(route.params.id);
  showRecomms.value = await showStore.getRecomms(route.params.id);
};

watch(
  () => route.params.id,
  () => {
    fetchInfo();
    window.scrollTo(0, 0);
  }
);

onMounted(() => {
  fetchInfo();
});
</script>

<template>
  <template v-if="showData">
    <img
      :src="
        showData.backdrop_path
          ? `https://image.tmdb.org/t/p/w1280${showData.backdrop_path}`
          : 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'
      "
      alt=""
    />
    <h1>{{ showData.name }}</h1>
    <p>
      {{ showData.seasons.length }}
      {{ showData.seasons.length === 1 ? "season" : "seasons" }}
    </p>
    <p v-for="genre in showData.genres" :key="genre.id">{{ genre.name }}</p>
    <p>{{ showData.overview }}</p>
    <p
      v-for="season in showData.seasons"
      :key="season.id"
      @click="() => currentSeason = season.season_number"
    >
      {{ season.name }}
    </p>
    <SeasonCarousel :show_id="showData.id" :season_number="currentSeason" />
    <h2>Similar to this:</h2>
    <ShowCarousel v-if="similarShows" :shows="similarShows.results" />
    <h2>You might also like:</h2>
    <ShowCarousel v-if="showRecomms" :shows="showRecomms.results" />
  </template>
  <Loader v-else />
</template>

<style scoped>
img {
  width: 100%;
}
</style>
