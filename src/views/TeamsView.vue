<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useTeamsStore } from '@/stores/teams'
import Badge from 'primevue/badge'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import ConfirmPopup from 'primevue/confirmpopup'
import { useConfirm } from 'primevue/useconfirm'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'

const confirm = useConfirm()
const toast = useToast()
const teamStore = useTeamsStore()
const { loading, error, teams, teamsCount, hasTeam } = storeToRefs(teamStore)

onMounted(() => {
  teamStore.getTeams()
  console.log(loading.value)
})

const deleteTeam = (id) => {
  confirm.require({
    message: 'Do you want to delete this record?',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: 'No',
      severity: 'danger',
      outlined: true,
    },
    acceptProps: {
      label: 'Yes',
      severity: 'info',
    },
    accept: () => {
      teamStore.deleteTeam(id)
      toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Record deleted', life: 3000 })
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
    },
  })
}
</script>

<template>
  <div>
    <Toast />
    <ConfirmPopup></ConfirmPopup>
    <div class="text-sm border-b border-b-gray-400 mb-5 pb-2">
      All Teams <Badge :value="teamsCount"></Badge>
    </div>

    <div v-if="error" class="mb-5">
      <Message severity="error" :life="3000">{{ error }}</Message>
    </div>

    <div v-if="loading" class="flex justify-center">
      <ProgressSpinner />
    </div>
    <div v-else-if="hasTeam" class="space-y-2 border-b border-gray-600 border-l border-r">
      <div
        v-for="team in teams"
        :key="team.id"
        class="p-3 border-t border-gray-600 cursor-pointer hover:bg-[hsl(210,6%,15%)]"
      >
        <div class="flex justify-between">
          <div class="font-medium">{{ team.name }}</div>
          <div>
            <RouterLink
              :to="'/team/' + team.id"
              type="button"
              class="bg-blue-500 text-sm inline-flex items-center justify-center h-8 w-8 rounded-full cursor-pointer hover:bg-blue-600 me-3"
            >
              <i class="pi pi-pen-to-square text-sm"></i>
            </RouterLink>
            <button
              @click="deleteTeam(team.id)"
              type="button"
              class="bg-red-500 text-sm inline-flex items-center justify-center h-8 w-8 rounded-full cursor-pointer hover:bg-red-600"
            >
              <i class="pi pi-trash text-sm"></i>
            </button>
          </div>
        </div>

        <p class="text-sm text-gray-400 line-clamp-1">
          {{ team?.description }}
        </p>
      </div>
    </div>
    <div v-else>No Team found</div>
  </div>
</template>
