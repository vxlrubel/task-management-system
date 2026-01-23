<script setup>
import { RouterLink, RouterView } from 'vue-router'
import PageTitle from './components/PageTitle.vue'
import LoginRegister from '@/components/LoginRegister.vue'
import SidebarMenu from '@/components/SidebarMenu.vue'
</script>

<template>
  <div class="flex h-dvh">
    <aside class="w-75 bg-[hsl(210,5%,17%)] text-[#f2f3f4] h-dvh ps-3">
      <RouterLink to="/" class="items-center flex h-10 font-bold">Task Management</RouterLink>
      <nav class="h-[calc(100dvh-40px)] overflow-y-auto scrollbar-hide">
        <SidebarMenu />
      </nav>
    </aside>
    <div class="flex-1 h-dvh">
      <div class="items-center flex h-10 px-4 bg-[#2A2C2E] text-[#f2f3f4] justify-between">
        <PageTitle />
        <LoginRegister />
      </div>
      <div
        class="h-[calc(100dvh-40px)] overflow-y-auto scrollbar-hide py-3 px-4 bg-[#1D1F21] text-[#f2f3f4]"
      >
        <RouterView v-slot="{ Component }">
          <Transition name="fade-slide" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>
