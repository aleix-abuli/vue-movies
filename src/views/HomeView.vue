<script setup>
import { onMounted, ref } from "vue";
import { useShowStore } from "../stores/shows";
import ShowCarousel from "../components/ShowCarousel.vue";

const showStore = useShowStore();

onMounted(async () => {
  await showStore.getPopularShows(1);
  await showStore.getTopShows(1);
  await showStore.getAiringToday(1);
  await showStore.getAiringThisWeek(1);
});
</script>

<template>
  <header>
    <h1>Welcome to Serialized</h1>
  </header>
  <main>
    <h2>What's hot</h2>
    <ShowCarousel
      v-if="showStore.popularShows"
      :shows="showStore.popularShows.results"
    />
    <h2>Top rated TV shows</h2>
    <ShowCarousel
      v-if="showStore.topRatedShows"
      :shows="showStore.topRatedShows.results"
    />
    <h2>Airing today</h2>
    <ShowCarousel
      v-if="showStore.airingToday"
      :shows="showStore.airingToday.results"
    />
    <h2>Airing this week</h2>
    <ShowCarousel
      v-if="showStore.airingThisWeek"
      :shows="showStore.airingThisWeek.results"
    />
  </main>
</template>
