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

  async function getPopularShows(page) {
    const { data } = await axios.get(
      `${base_url}/tv/popular?api_key=${api_key}&language=en-US&page=${page}`
    );
    popularShows.value = data;
    console.log(popularShows.value);
    return data;
  }

  async function getTopShows(page) {
    const { data } = await axios.get(
      `${base_url}/tv/top_rated?api_key=${api_key}&language=en-US&page=${page}`
    );
    topRatedShows.value = data;
    console.log(topRatedShows.value);
    return data;
  }

  async function getAiringToday(page) {
    const { data } = await axios.get(
      `${base_url}/tv/top_rated?api_key=${api_key}&language=en-US&page=${page}`
    );
    airingToday.value = data;
    console.log(airingToday.value);
    return data;
  }

  async function getAiringThisWeek(page) {
    const { data } = await axios.get(
      `${base_url}/tv/top_rated?api_key=${api_key}&language=en-US&page=${page}`
    );
    airingThisWeek.value = data;
    console.log(airingThisWeek.value);
    return data;
  }


  /*------------------ TO BE DEVELOPED ------------------- */
  /* async function searchShow(string) {
    const { data } = await axios.get(
      `${base_url}/search/tv?api_key=${api_key}&language=en-US&page=1&query=${string}`
    );
    console.log('SEARCH', data);
  } */

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
    console.log(`fetching similars with id ${id}`, data.results.slice(0,5));
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
    getPopularShows,
    getTopShows,
    getAiringToday,
    getAiringThisWeek,
    /* searchShow, */
    getShowDetails,
    getShowSeasons,
    getSimilarShows,
    getRecomms
  };
});
