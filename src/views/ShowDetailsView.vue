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

const changeSeason = (season) => {
  if (currentSeason.value !== season.season_number)
    currentSeason.value = season.season_number;
  else currentSeason.value = null;
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
        <img :src="
          showData.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${showData.backdrop_path}`
            : 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'
        " alt="" class="show-details-img" />
      </div>
      <div class="show-details-info">
        <h1 class="show-details-title">{{ showData.name }}</h1>
        <div class="show-details-p-flex">
          <p class="show-details-p">
            {{ showData.first_air_date.split("-")[0] }}
          </p>
          <p class="show-details-p">
            {{ showData.seasons.length }}
            {{ showData.seasons.length === 1 ? "season" : "seasons" }}
          </p>
          <div>
            <p class="show-details-p">
              User rating: {{ showData.vote_average }}
            </p>
          </div>
        </div>
        <div class="genres-flex show-genres">
          <p v-for="genre in showData.genres" :key="genre.id" class="genre-tag">
            {{ genre.name }}
          </p>
        </div>
        <p class="show-details-p">{{ showData.overview }}</p>
      </div>
    </div>
    <div class="genres-flex show-genres-media">
      <p v-for="genre in showData.genres" :key="genre.id" class="genre-tag">
        {{ genre.name }}
      </p>
    </div>
    <p class="show-details-p-media">{{ showData.overview }}</p>
    <div class="show-details-season-container">
      <div class="show-details-s-names-flex">
        <p v-for="season in showData.seasons" :key="season.id" @click="changeSeason(season)" :class="
          currentSeason === season.season_number
            ? 'show-details-s selected'
            : 'show-details-s'
        ">
          {{ season.name }}
        </p>
      </div>
      <SeasonCarousel v-if="currentSeason !== null" :show_id="showData.id" :season_number="currentSeason" />
    </div>
    <h2 class="home-view-title">Similar to this <span>></span></h2>
    <ShowCarousel v-if="similarShows" :shows="similarShows.results" />
    <h2 class="home-view-title">You might also like <span>></span></h2>
    <ShowCarousel v-if="showRecomms" :shows="showRecomms.results" />
  </template>
  <Loader v-else />
</template>

<style>
.show-details-img {
  width: 100%;
  height: 70vh;
  object-fit: cover;
  object-position: center;
}

.show-details-gradient {
  height: 70vh;
}

.show-details-gradient::after {
  display: block;
  position: relative;
  background-image: linear-gradient(to bottom,
      rgba(255, 255, 255, 0) 0,
      var(--purple) 100%);
  margin-top: -80vh;
  height: 80vh;
  width: 100%;
  content: "";
}

.show-details-info {
  position: absolute;
  bottom: 5vh;
  width: 100%;
  padding: 0 6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
}

.show-details-title {
  font-size: 7rem;
  font-weight: 800;
  color: var(--white);
}

.show-details-p-flex {
  display: flex;
  gap: 1rem;
}

.show-details-p {
  color: var(--white);
  font-size: 1.6rem;
}

.show-details-p-media {
  display: none;
}

.show-genres-media {
  display: none;
}

.show-details-season-container {
  margin: 0 6rem;
  padding: 3rem;
  background-color: #74688b;
  border-radius: var(--border-radius);
}

.show-details-s-names-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.show-details-s {
  color: var(--white);
  font-size: 1.5rem;
  font-weight: 600;
  border: 2px solid var(--yellow);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
}

.selected {
  color: var(--purple);
  background-color: var(--yellow);
}

@media screen and (max-width: 768px) {
  .show-details-img {
    height: 40vh;
  }

  .show-details-gradient {
    height: 40vh;
  }

  .show-details-gradient::after {
    margin-top: -50vh;
    height: 50vh;
  }

  .show-details-info {
    padding: 0 3rem;
    justify-content: flex-end;
    align-items: center;
    bottom: 0;
  }

  .show-details-title {
    font-size: 4rem;
    text-align: center;
  }

  .show-details-p {
    display: none;
  }

  .show-details-p-media {
    display: block;
    color: var(--white);
    font-size: 1.6rem;
    padding: 1rem 3rem 3rem 3rem;
  }

  .show-genres {
    display: none;
  }

  .show-genres-media {
    display: flex;
    justify-content: center;
    margin: 1rem 3rem;
  }

  .show-details-season-container {
    margin: 0 3rem;
    padding: 1.5rem;
  }
}
</style>
