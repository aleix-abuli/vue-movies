import axios from "axios";
import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useShowStore = defineStore("shows", () => {
  const api_key = import.meta.env.VITE_API_KEY;
  const base_url = "https://api.themoviedb.org/3/tv/";

  const popularShows = ref(null);
  const topRatedShows = ref(null);
  const airingToday = ref(null);
  const airingThisWeek = ref(null);

  async function getPopularShows(page) {
    const { data } = await axios.get(
      `${base_url}popular?api_key=${api_key}&language=en-US&page=${page}`
    );
    popularShows.value = data;
    console.log(popularShows.value);
    return data;
  }

  async function getTopShows(page) {
    const { data } = await axios.get(
      `${base_url}top_rated?api_key=${api_key}&language=en-US&page=${page}`
    );
    topRatedShows.value = data;
    console.log(topRatedShows.value);
    return data;
  }

  async function getAiringToday(page) {
    const { data } = await axios.get(
      `${base_url}top_rated?api_key=${api_key}&language=en-US&page=${page}`
    );
    airingToday.value = data;
    console.log(airingToday.value);
    return data;
  }

  async function getAiringThisWeek(page) {
    const { data } = await axios.get(
      `${base_url}top_rated?api_key=${api_key}&language=en-US&page=${page}`
    );
    airingThisWeek.value = data;
    console.log(airingThisWeek.value);
    return data;
  }

  async function getShowDetails(id) {
    const { data } = await axios.get(
      `${base_url}${id}?api_key=${api_key}&language=en-US`
    );
    return data;
  }

  return {
    popularShows,
    topRatedShows,
    airingToday,
    airingThisWeek,
    getPopularShows,
    getTopShows,
    getAiringToday,
    getAiringThisWeek,
    getShowDetails
  };
});
