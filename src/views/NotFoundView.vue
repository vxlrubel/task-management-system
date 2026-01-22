<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="h-full flex items-center justify-center flex-col gap-4">
    <div class="text-[80px] text-red-500 font-bold leading-none">404</div>
    <p class="text-3xl text-gray-400">Page Not Found</p>

    <RouterLink
      to="/"
      class="px-5 bg-blue-600 py-3 rounded-4xl hover:bg-blue-700 transition-colors duration-200"
      >Go to Dashboard</RouterLink
    >
  </div>
</template>
