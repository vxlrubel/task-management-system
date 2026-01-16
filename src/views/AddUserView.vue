<script setup>
import { ref } from 'vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const { createUser } = storeToRefs(userStore)

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

const addUser = () => {
  const payload = ref({
    role_id: role.value.id,
    name: name.value,
    email: email.value,
    password: password.value,
    avatar: avatar.value,
    status: status.value,
  })

  //   create a new user
  userStore.createUser(payload.value)
}
</script>

<template>
  <form class="card grid grid-cols-1 gap-4 max-w-100 mx-auto" @submit.prevent="addUser">
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
      <Select v-model="role" :options="roles" optionLabel="name" placeholder="Select role" />
    </InputGroup>
    <Button type="submit" label="Submit" icon="pi pi-check" />
  </form>
</template>
