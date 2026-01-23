<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  onItemClick: {
    type: Function,
    default: null,
  },
})

const handleClick = (item) => {
  if (props.onItemClick) props.onItemClick(item)
}
</script>

<template>
  <div v-if="items.length === 0">No task found.</div>
  <div v-else class="space-y-2">
    <div
      class="text-[14px] text-gray-300"
      v-for="(item, index) in items"
      :key="index"
      @click="handleClick(item)"
    >
      <div
        class="flex py-1 cursor-pointer transition-colors duration-200 hover:bg-[hsl(210,6%,18%)]"
      >
        <div class="flex-1">
          {{ item?.title }}
        </div>
        <div>{{ item?.due_date }}</div>
      </div>
    </div>
  </div>
</template>
