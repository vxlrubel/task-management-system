<script setup>
import { RouterLink } from 'vue-router'
import IconPlus from '@/components/icons/IconPlus.vue'
import { useSidebarMenu } from '@/composables/sidebarMenu.js'
const { menuGroup } = useSidebarMenu()
</script>
<template v-if="menuGroup.length">
  <div v-for="(group, index) in menuGroup" :key="'group-' + index + 1" class="mb-5">
    <div class="text-[13px] capitalize font-medium mb-2 flex items-center justify-between">
      <div>{{ group.name }}</div>

      <template v-if="group?.addNew">
        <RouterLink
          :to="group.addNew"
          class="cursor-pointer h-6 w-6 flex items-center justify-center text-gray-500 hover:text-gray-50 transition-colors duration-200"
        >
          <IconPlus />
        </RouterLink>
      </template>
    </div>
    <RouterLink
      v-for="(item, idx) in group.items"
      :key="'item-' + idx + 1"
      :to="item.slug"
      class="flex mb-1 text-[14px] hover:bg-[hsl(210,5%,25%)] py-0.5"
    >
      <span
        class="h-5 w-5 flex items-center justify-center rounded-[3px] bg-blue-500 me-2 text-[12px] font-bold"
      >
        {{ item.icon }}
      </span>

      {{ item.name }}
    </RouterLink>
  </div>
</template>
