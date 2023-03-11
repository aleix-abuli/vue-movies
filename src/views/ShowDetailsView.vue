<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useShowStore } from '../stores/shows';

const showStore = useShowStore();
const route = useRoute();

const showData = ref(null);

onMounted(async() => {
    showData.value = await showStore.getShowDetails(route.params.id);
});

</script>

<template>
    <h1 v-if="showData">{{ showData.name }}</h1>
</template>