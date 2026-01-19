<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth'
const auth = useAuth()
const router = useRouter()

const signOut = () => {
  auth.logoutUser()
  router.push('/login')
}
</script>

<template>
  <div class="font-bold flex items-center gap-3 justify-end">
    <RouterLink to="/login">
      <i class="pi pi-sign-in"></i>
    </RouterLink>
    <button
      v-if="auth.isLoggedIn"
      @click="signOut"
      class="cursor-pointer text-red-600 hover:text-gray-50 transition-colors duration-300"
    >
      <i class="pi pi-power-off"></i>
    </button>
  </div>
</template>
