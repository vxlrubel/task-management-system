<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import { useTeamsStore } from '@/stores/teams'
import { useRouter } from 'vue-router'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { team } from '@/services/endpoints'

const router = useRouter()
const toast = useToast()
const teamStore = useTeamsStore()
const { loading } = storeToRefs(teamStore)
const teamName = ref('')
const teamDescription = ref('')
const currentUserId = ref(1) // current user login user ID

const createTeam = async () => {
  const payload = ref({
    name: teamName.value,
    description: teamDescription.value,
    created_by: currentUserId.value,
  })
  //   create a new user
  const result = await teamStore.createTeam(payload.value)

  if (result) {
    setTimeout(() => {
      router.push(team.list)
    }, 1500)
    successNotice()
  } else {
    throw new Error('User Create failed.')
  }
}

const successNotice = () => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Team Add Successfully.',
    life: 3000,
  })
}
</script>

<template>
  <form class="card grid grid-cols-1 gap-4 max-w-100 mx-auto" @submit.prevent="createTeam">
    <Toast />
    <div class="text-center">
      <i class="pi pi-user font-[100px]"></i>
    </div>
    <h2 class="text-2xl font-bold text-center mb-5">Add New Team</h2>

    <div>
      <div class="text-sm mb-1">Team Name</div>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText v-model="teamName" placeholder="Team name" />
      </InputGroup>
    </div>

    <div>
      <div class="text-sm mb-1">Description</div>
      <Textarea v-model="teamDescription" rows="5" class="w-full" style="resize: none" />
    </div>

    <Button type="submit" label="Submit" icon="pi pi-check" :loading="loading" />
  </form>
</template>
