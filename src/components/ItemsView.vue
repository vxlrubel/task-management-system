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
const itemInitials = (name) => {
  if (!name) return ''
  return name
    .split(' ')
    .map((n) => n[0].toUpperCase())
    .slice(0, 2)
    .join('')
}
const handleClick = (item) => {
  if (props.onItemClick) props.onItemClick(item)
}
</script>
<template>
  <div>
    <div
      class="flex mb-2 hover:bg-gray-600/20 cursor-pointer"
      v-for="(item, index) in items"
      @click="handleClick(item)"
      :key="item.id + index"
    >
      <div
        class="h-14 w-14 rounded-full bg-gray-600 flex items-center justify-center text-white text-[17px] font-bold"
      >
        {{ itemInitials(item.name) }}
      </div>

      <!-- Content -->
      <div class="flex-1 pl-3">
        <div class="font-medium">
          {{ item.name }}
          <span
            v-if="item.status === 'active'"
            class="inline-flex h-2 w-2 ml-1 rounded-full bg-green-400"
          ></span>
        </div>
        <div class="text-sm text-gray-400">
          {{ item.email }} <span v-if="item.team_role">| {{ item.team_role }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
