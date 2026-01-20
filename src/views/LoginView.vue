<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import Toast from 'primevue/toast'

import { useToast } from 'primevue/usetoast'

import { useAuth } from '@/stores/auth'

const router = useRouter()
const toast = useToast()
const auth = useAuth()
const { isLoading, isLoggedIn } = storeToRefs(auth)
const email = ref('')
const password = ref('')

function loginWorning() {
  toast.add({
    severity: 'warn',
    summary: 'Warning',
    detail: 'Please enter email and password.',
    life: 3000,
  })
}

async function login() {
  if (!email.value || !password.value) {
    loginWorning()
    return
  }

  const payload = {
    email: email.value,
    password: password.value,
  }

  try {
    await auth.loginUser(payload)

    if (isLoggedIn.value) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Login Successfully.',
        life: 3000,
      })

      setTimeout(() => {
        router.push('/')
      }, 1500)
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Login Failed',
      detail: error.message || 'Invalid credentials',
      life: 3000,
    })
  }
}
</script>

<template>
  <form class="card grid grid-cols-1 gap-4 max-w-100 mx-auto" @submit.prevent="login">
    <Toast />
    <div class="text-center">
      <i class="pi pi-user font-[100px]"></i>
    </div>
    <h2 class="text-2xl font-bold text-center mb-5">Login</h2>

    <div>
      <div class="text-sm mb-1">Email Address</div>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-at"></i>
        </InputGroupAddon>
        <InputText v-model="email" placeholder="Enter email address." />
      </InputGroup>
    </div>
    <div>
      <div class="text-sm mb-1">Password</div>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-key"></i>
        </InputGroupAddon>
        <Password v-model="password" placeholder="Enter a password" />
      </InputGroup>
    </div>
    <Button type="submit" label="Login" :loading="isLoading" icon="pi pi-check" />
  </form>
</template>
