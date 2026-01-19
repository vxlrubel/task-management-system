<script setup>
import { ref } from 'vue'
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
const email = ref('')
const password = ref('')

function login() {
  const payload = {
    id: 1,
    email: email.value,
    password: password.value,
  }

  auth.loginUser(payload)

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
        <Password v-model="password" :invalid="!password" promptLabel="Enter a password" />
      </InputGroup>
    </div>
    <Button type="submit" label="Login" icon="pi pi-check" />
  </form>
</template>
