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
  currentSeason.value = null;
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
    <div>
      <div class="show-details-gradient">
        <img
          :src="
            showData.backdrop_path
              ? `https://image.tmdb.org/t/p/w1280${showData.backdrop_path}`
              : 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'
          "
          alt=""
          class="show-details-img"
        />
      </div>
      <div class="show-details-info">
        <h1 class="show-details-title">{{ showData.name }}</h1>
        <p class="show-details-p">
          {{ showData.seasons.length }}
          {{ showData.seasons.length === 1 ? "season" : "seasons" }}
        </p>
        <div class="genres-flex">
          <p v-for="genre in showData.genres" :key="genre.id" class="genre-tag">
            {{ genre.name }}
          </p>
        </div>
        <p class="show-details-p">{{ showData.overview }}</p>
      </div>
    </div>
    <div class="show-details-season-container">
      <div class="show-details-s-names-flex">
        <p
          v-for="season in showData.seasons"
          :key="season.id"
          @click="() => (currentSeason = season.season_number)"
          :class="
            currentSeason === season.season_number
              ? 'show-details-s selected'
              : 'show-details-s'
          "
        >
          {{ season.name }}
        </p>
      </div>
      <SeasonCarousel
        v-if="currentSeason"
        :show_id="showData.id"
        :season_number="currentSeason"
      />
    </div>
    <h2 class="home-view-title">Similar to this <span>></span></h2>
    <ShowCarousel v-if="similarShows" :shows="similarShows.results" />
    <h2 class="home-view-title">You might also like <span>></span></h2>
    <ShowCarousel v-if="showRecomms" :shows="showRecomms.results" />
  </template>
  <Loader v-else />
</template>
