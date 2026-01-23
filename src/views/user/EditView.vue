<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Select from 'primevue/select'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const userId = route.params.id
const name = ref('')
const email = ref('')
const password = ref('')
const role = ref()
const roles = ref([
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Hr' },
  { id: 3, name: 'Employee' },
])

const fetchUser = async (userId) => {
  const response = await userStore.fetchUserById(userId)
  console.log(response)
  name.value = response?.name
  email.value = response?.email
  password.value = response?.password
  role.value = response?.role_id
}

onMounted(async () => {
  await fetchUser(userId)
})

const showPassword = ref(false)

const handleSubmit = async () => {
  const newPayload = {
    role_id: role.value,
    name: name.value,
    email: email.value,
    password: password.value,
  }

  const result = await userStore.updateUser(userId, newPayload)

  if (result) {
    router.push('/users')
  } else {
    console.error('Failed to update user')
  }
}

// Watch for route param changes
</script>

<template>
  <form
    class="card grid grid-cols-1 gap-4 max-w-100 mx-auto"
    @submit.prevent="handleSubmit(userId, updateData)"
  >
    <div class="text-center">
      <i class="pi pi-user font-[100px]"></i>
    </div>
    <h2 class="text-2xl font-bold text-center mb-5">Update User</h2>

    <div>
      <div class="text-sm mb-1">Enter Name</div>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText v-model="name" placeholder="Name" />
      </InputGroup>
    </div>

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

        <template v-if="showPassword">
          <InputText v-model="password" />
        </template>
        <template v-else>
          <Password v-model="password" :invalid="!password" promptLabel="Enter a password" />
        </template>

        <InputGroupAddon @click="showPassword = !showPassword">
          <template v-if="showPassword">
            <i class="pi pi-eye-slash"></i>
          </template>
          <template v-else>
            <i class="pi pi-eye"></i>
          </template>
        </InputGroupAddon>
      </InputGroup>
    </div>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-map"></i>
      </InputGroupAddon>
      <Select
        v-model="role"
        :options="roles"
        optionLabel="name"
        optionValue="id"
        placeholder="Select role"
      />
    </InputGroup>
    <Button type="submit" label="Submit" icon="pi pi-check" />
  </form>
</template>
