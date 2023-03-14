<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useShowStore } from "./stores/shows";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { getMemoedVNodeCall } from "@vue/compiler-core";

</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>