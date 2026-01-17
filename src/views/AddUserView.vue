<script setup>
import { ref } from 'vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import Toast from 'primevue/toast'

import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()

const userStore = useUserStore()

const roles = ref([
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Hr' },
  { id: 3, name: 'Employee' },
])

const role = ref()
const name = ref('')
const email = ref('')
const password = ref()
const avatar = ref('admin.png')
const status = ref('active')

const addUser = async () => {
  const payload = ref({
    role_id: role.value ?? 3,
    name: name.value,
    email: email.value,
    password: password.value,
    avatar: avatar.value,
    status: status.value,
  })

  //   create a new user
  const result = await userStore.createUser(payload.value)

  if (result) {
    setTimeout(() => {
      router.push('/users')
    }, 1500)
    successNotice()
    reset()
  } else {
    throw new Error('User Create failed.')
  }
}

const reset = () => {
  role.value = ''
  name.value = ''
  email.value = ''
  password.value = ''
}

const successNotice = () => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'User Add Successfully.',
    life: 3000,
  })
}
</script>

<template>
  <form class="card grid grid-cols-1 gap-4 max-w-100 mx-auto" @submit.prevent="addUser">
    <Toast />
    <div class="text-center">
      <i class="pi pi-user font-[100px]"></i>
    </div>
    <h2 class="text-2xl font-bold text-center mb-5">Add New User</h2>

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
        <Password v-model="password" :invalid="!password" promptLabel="Enter a password" />
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
