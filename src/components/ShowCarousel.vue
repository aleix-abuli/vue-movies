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
  scrollContainer.value.scrollLeft -= window.innerWidth - 200;
};

const scrollRight = () => {
  scrollContainer.value.scrollLeft += window.innerWidth - 200;
};
</script>

<template>
  <div class="show-carousel-container">
    <button @click="scrollLeft" class="show-carousel-btn left">&lt;</button>
    <div class="show-carousel-flex snaps-inline" ref="scrollContainer">
      <ShowItem v-for="show in shows" :key="show.id" :show="show" />
      <button
        v-if="see_more && shows.length < 60"
        @click="emit('addShows')"
        class="show-carousel-see-more"
      >
        Load more
      </button>
    </div>
    <button @click="scrollRight" class="show-carousel-btn right">></button>
  </div>
</template>

<style>
.show-carousel-container {
  position: relative;
}

.show-carousel-flex {
  display: flex;
  gap: 3rem;
  overflow-x: auto;
  white-space: nowrap;
  overscroll-behavior-inline: contain;
  padding: 0 6rem;
}

.show-carousel-btn {
  position: absolute;
  top: calc(50% - 25px);
  z-index: 1;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0;
  font-size: 2rem;
  font-weight: 900;
  color: var(--purple);
  border: 3px solid var(--purple);
  background-color: var(--white);
}

.left {
  left: 2rem;
}

.right {
  right: 2rem;
}

.snaps-inline {
  scroll-snap-type: inline mandatory;
  scroll-padding-inline: 6rem;
}

.snaps-inline > * {
  scroll-snap-align: start;
}

.show-carousel-flex::-webkit-scrollbar {
  display: none;
}

.show-carousel-see-more {
  background-color: #74688b;
  color: var(--white);
  width: 200px;
  height: 300px;
  flex-shrink: 0;
  border: 0;
  border-radius: var(--border-radius);
  font-size: 1.6rem;
}

@media screen and (max-width: 768px) {
  .show-carousel-flex {
    gap: 1rem;
    padding: 0 3rem;
  }

  .show-carousel-btn {
    display: none;
  }

  .snaps-inline {
    scroll-padding-inline: 3rem;
  }

  .show-carousel-see-more {
    width: 120px;
    height: 180px;
  }
}
</style>
