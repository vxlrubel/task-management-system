<template>
  <div class="page-title-container">
    <Transition name="slide-fade" mode="out-in">
      <div :key="pageTitle" class="font-bold capitalize">{{ pageTitle }}</div>
    </Transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitle = computed(() => {
  return route.name ? route.name.toString().replace(/-/g, ' ') : 'Loading...'
})
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
