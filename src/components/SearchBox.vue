<script setup>
import { ref, watch, defineProps } from 'vue'

defineProps({
  placeholder: {
    type: String,
    default: 'Search...',
  },
  searchFields: {
    type: Array,
    default: () => ['name', 'email', 'username', 'description'],
  },
})

const emit = defineEmits(['search'])

const searchQuery = ref('')

watch(searchQuery, (newValue) => {
  emit('search', newValue)
})
</script>

<template>
  <div class="w-full max-w-100">
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder"
      class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>
