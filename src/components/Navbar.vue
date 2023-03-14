<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useShowStore } from "../stores/shows";
import SearchItem from "./SearchItem.vue";

const showStore = useShowStore();

const valueToSearch = ref("");
const showSearch = ref(false);
const noResults = ref(false);
const searchResults = ref(null);

const search = async () => {
  const results = await showStore.searchShow(valueToSearch.value);
  if (valueToSearch.value !== "") searchResults.value = results.slice(0, 5);
  else searchResults.value = null;
  if (searchResults.value.length > 0) noResults.value = false;
  else noResults.value = true;
};
</script>

<template>
  <nav>
    <RouterLink to="/" class="nav-logo"
      ><span>Serial</span>Binger<span>.</span></RouterLink
    >
    <div class="search-flex">
      <img
        @click="() => (showSearch = !showSearch)"
        src="/glass.png"
        class="search-icon"
      />
      <input
        v-if="showSearch"
        type="text"
        @input="search"
        v-model="valueToSearch"
        placeholder="Search shows..."
      />
    </div>
  </nav>
  <div class="search-results-container" v-if="showSearch && searchResults">
    <SearchItem
      v-for="result in searchResults"
      :key="result.id"
      :show="result"
      @hideSearch="() => (showSearch = false)"
    />
  </div>
  <p v-if="showSearch && noResults" class="search-results-error">
    Sorry, we couldn't find anything.
  </p>
</template>

<style>
nav {
  width: 100%;
  height: 10vh;
  background-color: var(--black);
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 6rem;
}

.nav-logo {
  font-size: 2.5rem;
  color: var(--white);
}

.nav-logo span {
  font-size: 2.5rem;
  color: var(--yellow);
  font-weight: 800;
}

.search-flex {
  display: flex;
  gap: 1rem;
}

.search-icon {
  width: 2rem;
}

.search-results-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 2;
  position: fixed;
  top: 10vh;
  right: 0;
}

.search-results-error {
  z-index: 2;
  position: fixed;
  top: 10vh;
  right: 0;
  font-size: 1.6rem;
  color: var(--white);
  padding: 3rem 1rem;
  width: 30vw;
  border-bottom: 1px solid var(--purple);
  background-color: #74688b;
  text-align: center;
}

@media screen and (max-width: 768px) {
  nav {
    padding: 1rem 3rem;
  }

  .nav-logo {
    font-size: 2rem;
    color: var(--white);
  }

  .nav-logo span {
    font-size: 2rem;
    color: var(--yellow);
    font-weight: 800;
  }

  .search-results-error {
    width: 100vw;
  }
}

@media screen and (max-width: 360px) {
  .search-flex {
    flex-direction: column;
    align-items: flex-end;
  }

  .search-flex input {
    width: 30vw;
  }
}
</style>
