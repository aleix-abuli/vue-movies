import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMovieStore = defineStore("movies", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
  }

  return { count, doubleCount, increment };
});
