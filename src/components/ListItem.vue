<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  onVisit: {
    type: Function,
    default: null,
  },
  onEdit: {
    type: Function,
    default: null,
  },
  onDelete: {
    type: Function,
    default: null,
  },
})

const notFound = ref('No record found!')

const handleClick = (item) => {
  if (props.onVisit) props.onVisit(item.id)
}

const handleEdit = (item) => {
  if (props.onEdit) props.onEdit(item.id)
}

const handleDelete = (item) => {
  if (props.onDelete) props.onDelete(item.id)
}
</script>

<template>
  <div v-if="items.length === 0">{{ notFound }}</div>
  <div v-else class="border-b border-gray-600 border-l border-r">
    <div
      class="p-3 border-t border-gray-600 cursor-pointer hover:bg-[hsl(210,6%,15%)]"
      v-for="(item, index) in items"
      :key="'item-' + index + 1"
      @click.prevent.stop="handleClick(item)"
    >
      <div class="flex justify-between">
        <div class="flex-1 font-medium">{{ item?.name }}</div>
        <div>
          <button
            @click.prevent.stop="handleEdit(item)"
            type="button"
            class="bg-blue-500 text-sm inline-flex items-center justify-center h-8 w-8 rounded-full cursor-pointer hover:bg-blue-600 me-3"
          >
            <i class="pi pi-pen-to-square text-sm"></i>
          </button>
          <button
            @click.prevent.stop="handleDelete(item)"
            class="bg-red-500 text-sm inline-flex items-center justify-center h-8 w-8 rounded-full cursor-pointer hover:bg-red-600"
            type="button"
          >
            <i class="pi pi-trash text-sm"></i>
          </button>
        </div>
      </div>
      <p class="text-sm text-gray-400">{{ item?.email }} {{ item?.description }}</p>
    </div>
  </div>
</template>
