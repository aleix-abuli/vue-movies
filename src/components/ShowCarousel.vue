<script setup>
import { ref } from 'vue';
import ShowItem from './ShowItem.vue';

const props = defineProps({
  shows: {
    type: Array,
    required: true
  }
});

const displaying = ref(props.shows.slice(0,5));
</script>

<template>
    <ShowItem v-for="show in displaying" :key="show.id" :show="show"/>
</template>

