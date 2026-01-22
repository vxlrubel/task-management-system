<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import AppLink from '@/components/AppLink.vue'
const userStore = useUserStore()

const route = useRoute()

const id = route.params.id
const userInfo = ref(null)

onMounted(async () => {
  try {
    const result = await userStore.fetchUserById(id)

    if (result) {
      userInfo.value = result
      console.info('User loaded successfully')
    } else {
      console.warn('User not found')
    }
  } catch (error) {
    console.error('Failed to load user:', error)
  }
})
</script>

<template>
  <div class="max-w-xl mx-auto mt-10">
    <div class="flex items-center justify-between pb-3 border-b border-gray-600 mb-4">
      <div>
        <AppLink to="/users" />
      </div>
      <div class="flex-1 pl-3">User Information:</div>
    </div>
    <div>
      <div class="font-medium">
        {{ userInfo?.name }}
      </div>
      <div class="text-sm text-gray-400">{{ userInfo?.email }}</div>
    </div>
  </div>
</template>
