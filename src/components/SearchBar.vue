<script setup>
import { ref } from "vue";
import { useShowStore } from "../stores/shows";

const showStore = useShowStore();

const valueToSearch = ref("");

const search = async() => {
    console.log('searching');
    await showStore.searchShow(valueToSearch.value);
};
</script>

<template>
  <input
  type="text"
  @input="search"
  v-model="valueToSearch"
  />
</template>
