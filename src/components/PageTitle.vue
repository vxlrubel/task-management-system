<template>
  <div class="font-bold capitalize">{{ pageTitle }}</div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitle = computed(() => {
  return route.name ? route.name.toString().replace(/-/g, ' ') : 'Page'
})
</script>
