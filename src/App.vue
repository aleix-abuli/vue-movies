<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useShowStore } from "./stores/shows";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { getMemoedVNodeCall } from "@vue/compiler-core";

/* const api_key = import.meta.env.VITE_API_KEY;
console.log(api_key);

const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${api_key}`)
const responseData = await response.json()
console.log(responseData?.results); */

</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>

<style scoped>
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
