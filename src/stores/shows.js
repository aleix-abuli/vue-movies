import axios from "axios";
import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useShowStore = defineStore("shows", () => {
  const api_key = import.meta.env.VITE_API_KEY;
  const base_url = "https://api.themoviedb.org/3";

  const popularShows = ref(null);
  const topRatedShows = ref(null);
  const airingToday = ref(null);
  const airingThisWeek = ref(null);
  const genres = ref(null);

  async function getPopularShows(page) {
    const { data } = await axios.get(
      `${base_url}/tv/popular?api_key=${api_key}&language=en-US&page=${page}`
    );
    popularShows.value = data.results;
    console.log(popularShows.value);
    return data;
  }

  async function getTopShows(page) {
    console.log('adding shows in page', page);
    const { data } = await axios.get(
      `${base_url}/tv/top_rated?api_key=${api_key}&language=en-US&page=${page}`
    );
    topRatedShows.value = data.results;
    console.log(topRatedShows.value);
    return data;
  }

  async function getAiringToday(page) {
    const { data } = await axios.get(
      `${base_url}/tv/airing_today?api_key=${api_key}&language=en-US&page=${page}`
    );
    airingToday.value = data.results;
    console.log(airingToday.value);
    return data;
  }

  async function getAiringThisWeek(page) {
    const { data } = await axios.get(
      `${base_url}/tv/on_the_air?api_key=${api_key}&language=en-US&page=${page}`
    );
    airingThisWeek.value = data.results;
    console.log(airingThisWeek.value);
    return data;
  }

  async function paginateResults(page, string) {
    const { data } = await axios.get(
      `${base_url}/tv/${string}?api_key=${api_key}&language=en-US&page=${page}`
    );
    switch (string) {
      case 'popular':
        popularShows.value = popularShows.value.concat(data.results);
        break;
      case 'top_rated':
        topRatedShows.value = topRatedShows.value.concat(data.results);
        break;
      case 'airing_today':
        airingToday.value = airingToday.value.concat(data.results);
        break;
      case 'on_the_air':
        airingThisWeek.value = airingThisWeek.value.concat(data.results);
        break;
    }
  }

  async function getGenres() {
    const { data } = await axios.get(
      `${base_url}/genre/tv/list?api_key=${api_key}&language=en-US`
    );
    genres.value = data.genres;
  }

  /*------------------ TO BE DEVELOPED ------------------- */
  async function searchShow(string) {
    const { data } = await axios.get(
      `${base_url}/search/tv?api_key=${api_key}&language=en-US&page=1&query=${string}`
    );
    return data.results;
  }

  async function getShowDetails(id) {
    const { data } = await axios.get(
      `${base_url}/tv/${id}?api_key=${api_key}&language=en-US`
    );
    return data;
  }

  async function getShowSeasons(id, number) {
    const { data } = await axios.get(
      `${base_url}/tv/${id}/season/${number}?api_key=${api_key}&language=en-US`
    );
    return data;
  }

  async function getSimilarShows(id) {
    const { data } = await axios.get(
      `${base_url}/tv/${id}/similar?api_key=${api_key}&language=en-US`
    );
    return data;
  }

  async function getRecomms(id) {
    const { data } = await axios.get(
      `${base_url}/tv/${id}/recommendations?api_key=${api_key}&language=en-US`
    );
    return data;
  }

  return {
    popularShows,
    topRatedShows,
    airingToday,
    airingThisWeek,
    genres,
    getPopularShows,
    getTopShows,
    getAiringToday,
    getAiringThisWeek,
    paginateResults,
    getGenres,
    searchShow,
    getShowDetails,
    getShowSeasons,
    getSimilarShows,
    getRecomms,
  };
});
