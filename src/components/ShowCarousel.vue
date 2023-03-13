<script setup>
import { ref } from "vue";
import ShowItem from "./ShowItem.vue";

const scrollContainer = ref(null);

const props = defineProps({
  shows: {
    type: Array,
    required: true,
  },
  see_more: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["addShows"]);

const scrollLeft = () => {
  scrollContainer.value.scrollLeft -= (window.innerWidth - 200);
};

const scrollRight = () => {
  scrollContainer.value.scrollLeft += (window.innerWidth - 200);
};
</script>

<template>
  <div class="show-carousel-container">
    <button @click="scrollLeft" class="show-carousel-btn left">&lt;</button>
    <div class="show-carousel-flex snaps-inline" ref="scrollContainer">
      <ShowItem v-for="show in shows" :key="show.id" :show="show" />
      <button v-if="see_more && shows.length < 60" @click="emit('addShows')">
        + see more
      </button>
    </div>
    <button @click="scrollRight" class="show-carousel-btn right">></button>
  </div>
</template>
