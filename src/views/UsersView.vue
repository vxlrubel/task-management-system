<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { RouterLink } from 'vue-router'

const userStore = useUserStore()
const { users, loading, error, userCount, hasUsers } = storeToRefs(userStore)

import { onMounted } from 'vue'
onMounted(() => {
  userStore.fetchUsers()
})
</script>
<template>
  <div class="p-4">
    <button
      @click.prevent="userStore.fetchUsers()"
      :disabled="loading"
      class="px-4 py-2 bg-blue-500 text-white rounded mb-4"
    >
      {{ loading ? 'Loading...' : 'Fetch Users' }}
    </button>

    <!-- Error message -->
    <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded mb-4">
      {{ error }}
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-gray-600">Loading users...</div>

    <!-- Users list -->
    <div v-else-if="hasUsers" class="space-y-2">
      <p class="text-sm mb-2">Total users: {{ userCount }}</p>
      <div v-for="user in users" :key="user.id" class="p-4 border border-gray-300 rounded">
        <div class="flex justify-between">
          <div class="font-medium">{{ user.name }}</div>
          <div>
            <RouterLink
              :to="'/user/' + user.id"
              type="button"
              class="bg-blue-500 text-sm inline-flex items-center justify-center h-8 w-8 rounded-full cursor-pointer hover:bg-blue-600 me-3"
            >
              <i class="pi pi-pen-to-square text-sm"></i>
            </RouterLink>
            <button
              @click="userStore.deleteUser(user.id)"
              type="button"
              class="bg-red-500 text-sm inline-flex items-center justify-center h-8 w-8 rounded-full cursor-pointer hover:bg-red-600"
            >
              <i class="pi pi-trash text-sm"></i>
            </button>
          </div>
        </div>
        <p class="text-sm text-gray-300">{{ user.email }}</p>
      </div>
    </div>

    <!-- No users message -->
    <div v-else class="text-gray-500">No users found. Click "Fetch Users" to load data.</div>
  </div>
</template>
