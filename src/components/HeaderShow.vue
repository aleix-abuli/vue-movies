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
        <div v-if="showGenres" class="genres-flex">
          <p v-for="genre in showGenres" :key="genre.id" class="genre-tag">
            {{ genre.name }}
          </p>
        </div>
        <div class="header-show-spans">
          <span
            :class="
              current_display === 0 ? 'header-show-full' : 'header-show-empty'
            "
          ></span>
          <span
            :class="
              current_display === 1 ? 'header-show-full' : 'header-show-empty'
            "
          ></span>
          <span
            :class="
              current_display === 2 ? 'header-show-full' : 'header-show-empty'
            "
          ></span>
        </div>
      </div>
    </RouterLink>
  </transition>
</template>

<style>
.header-show-img {
  width: 100%;
  height: 60vh;
  object-fit: cover;
  object-position: top;
}

.header-show-gradient {
  height: 60vh;
}

.header-show-gradient::after {
  display: block;
  position: relative;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0,
    var(--purple) 100%
  );
  margin-top: -50vh;
  height: 50vh;
  width: 100%;
  content: "";
}

.header-show-info {
  position: absolute;
  bottom: 5vh;
  width: 100%;
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.header-show-title {
  font-size: 7rem;
  font-weight: 800;
  color: var(--white);
  text-align: center;
}

.header-show-spans {
  display: flex;
  justify-content: space-between;
  width: 70px;
  margin-top: 1rem;
}

.header-show-full {
  width: 15px;
  height: 15px;
  background-color: var(--white);
  border: 3px solid var(--white);
  border-radius: 50%;
}

.header-show-empty {
  width: 15px;
  height: 15px;
  border: 3px solid var(--white);
  border-radius: 50%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .header-show-img {
    height: 50vh;
  }

  .header-show-gradient {
    height: 50vh;
  }

  .header-show-gradient::after {
    margin-top: -40vh;
    height: 40vh;
  }

  .header-show-title {
    font-size: 5rem;
    font-weight: 800;
    color: var(--white);
    text-align: center;
  }
}
</style>
