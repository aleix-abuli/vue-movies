<script setup>
import { onMounted, ref } from "vue";
import { useShowStore } from "../stores/shows";
import HomeHeader from "../components/HomeHeader.vue";
import ShowCarousel from "../components/ShowCarousel.vue";

const showStore = useShowStore();

const popularPage = ref(1);
const topPage = ref(1);
const airingTodayPage = ref(1);
const airingWeekPage = ref(1);

const addPopular = async () => {
  popularPage.value += 1;
  await showStore.paginateResults(popularPage.value, 'popular');
};

const addTop = async () => {
  topPage.value += 1;
  await showStore.paginateResults(topPage.value, 'top_rated');
};

const addAiringToday = async () => {
  airingTodayPage.value += 1;
  await showStore.paginateResults(airingTodayPage.value, 'airing_today');
};

const addAiringWeek = async () => {
  airingWeekPage.value += 1;
  await showStore.paginateResults(airingWeekPage.value, 'on_the_air');
};

onMounted(async () => {
  await showStore.getPopularShows(popularPage.value);
  await showStore.getTopShows(topPage.value);
  await showStore.getAiringToday(airingTodayPage.value);
  await showStore.getAiringThisWeek(airingWeekPage.value);
  await showStore.getGenres();
});
</script>

<template>
  <header>
    <HomeHeader v-if="showStore.popularShows && showStore.genres" :shows="showStore.popularShows.slice(0,3)"/>
  </header>
  <main>
    <h2 class="home-view-title">What's hot <span>></span></h2>
    <ShowCarousel
      v-if="showStore.popularShows"
      :shows="showStore.popularShows"
      :see_more="true"
      @addShows="addPopular"
    />
    <h2 class="home-view-title">Top rated TV shows <span>></span></h2>
    <ShowCarousel
      v-if="showStore.topRatedShows"
      :shows="showStore.topRatedShows"
      :see_more="true"
      @addShows="addTop"
    />
    <h2 class="home-view-title">Airing today <span>></span></h2>
    <ShowCarousel
      v-if="showStore.airingToday"
      :shows="showStore.airingToday"
      :see_more="true"
      @addShows="addAiringToday"
    />
    <h2 class="home-view-title">Airing this week <span>></span></h2>
    <ShowCarousel
      v-if="showStore.airingThisWeek"
      :shows="showStore.airingThisWeek"
      :see_more="true"
      @addShows="addAiringWeek"
    />
  </main>
</template>
