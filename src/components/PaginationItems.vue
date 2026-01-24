<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
    default: 1,
  },
  totalPages: {
    type: Number,
    required: true,
    default: 1,
  },
})

const emit = defineEmits(['page-change'])

// Generate page numbers for pagination display
const pageNumbers = computed(() => {
  const pages = []
  const total = props.totalPages
  const current = props.currentPage

  if (total <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)

    if (current > 3) {
      pages.push('...')
    }

    // Show pages around current page
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i)
      }
    }

    if (current < total - 2) {
      pages.push('...')
    }

    // Always show last page
    if (!pages.includes(total)) {
      pages.push(total)
    }
  }

  return pages
})

const goToPage = (page) => {
  if (page === '...' || page < 1 || page > props.totalPages) return
  emit('page-change', page)
}
</script>

<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center gap-2">
    <!-- Previous button -->
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      aria-label="Previous page"
    >
      &lt;
    </button>

    <!-- Page numbers -->
    <button
      v-for="page in pageNumbers"
      :key="page"
      @click="goToPage(page)"
      :disabled="page === '...'"
      :class="[
        'px-3 py-1 rounded border transition-colors',
        page === currentPage
          ? 'bg-blue-500 text-white border-blue-500'
          : page === '...'
            ? 'border-transparent cursor-default'
            : 'border-gray-300 hover:bg-gray-100',
      ]"
      :aria-label="page === '...' ? 'More pages' : `Page ${page}`"
      :aria-current="page === currentPage ? 'page' : undefined"
    >
      {{ page }}
    </button>

    <!-- Next button -->
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      aria-label="Next page"
    >
      &gt;
    </button>
  </div>
</template>
