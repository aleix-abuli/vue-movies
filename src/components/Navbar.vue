<script setup>
import { RouterLink } from "vue-router";
import SearchBar from "./SearchBar.vue";
</script>

<template>
  <nav>
    <RouterLink to="/" class="nav-logo"
      ><span>Serial</span>Binger<span>.</span></RouterLink
    >
    <!-- <SearchBar /> -->
  </nav>
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

@media screen and (max-width: 768px) {
  nav {
    padding: 1rem 3rem;
  }
}
</style>
