<script setup>
import { RouterLink, RouterView } from 'vue-router'
import PageTitle from './components/PageTitle.vue'
import { reactive } from 'vue'

const generalItems = reactive([
  { name: 'Dashboard', slug: '/', icon: 'D' },
  { name: 'My Task', slug: '/my-task', icon: 'm' },
  { name: 'Users', slug: '/users', icon: 'u' },
])

const menuGroup = reactive([
  { name: 'general', items: generalItems },
  { name: 'task', items: generalItems },
  { name: 'team', items: generalItems },
  { name: 'projects', items: generalItems },
  { name: 'Appearance', items: generalItems },
])
</script>

<template>
  <div class="flex h-dvh">
    <aside class="w-75 bg-[#2A2C2E] text-[#f2f3f4] h-dvh px-3">
      <RouterLink to="/" class="items-center flex h-10 font-bold">Task Management</RouterLink>
      <nav class="h-[calc(100dvh-40px)] overflow-y-auto scrollbar-hide">
        <template v-if="menuGroup.length">
          <div v-for="(group, index) in menuGroup" :key="'group-' + index + 1" class="mb-5">
            <div class="text-[13px] capitalize font-medium mb-2">{{ group.name }}</div>
            <RouterLink
              v-for="(item, idx) in group.items"
              :key="'item-' + idx + 1"
              :to="item.slug"
              class="flex mb-1 text-[14px]"
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
      </nav>
    </aside>
    <div class="flex-1 h-dvh">
      <div class="items-center flex h-10 px-4 bg-[#2A2C2E] text-[#f2f3f4]">
        <PageTitle />
      </div>
      <div class="h-[calc(100dvh-40px)] overflow-y-scroll p-3 bg-[#1D1F21] text-[#f2f3f4]">
        <RouterView />
      </div>
    </div>
  </div>
</template>
