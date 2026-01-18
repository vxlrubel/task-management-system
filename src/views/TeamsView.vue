<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useTeamsStore } from '@/stores/teams'
import Badge from 'primevue/badge'

import Message from 'primevue/message'

import ProgressSpinner from 'primevue/progressspinner'

const teamStore = useTeamsStore()
const { loading, error, teams, teamsCount, hasTeam } = storeToRefs(teamStore)

onMounted(() => {
  teamStore.getTeams()
  console.log(loading.value)
})

const deleteTeam = (id) => {
  if (!confirm('Are you sure?')) return
  teams.value = []
  //   delete process here
}
</script>

<template>
  <div>
    <div class="text-sm border-b border-b-gray-400 mb-5 pb-2">
      All Teams <Badge :value="teamsCount"></Badge>
    </div>

    <div v-if="error" class="mb-5">
      <Message severity="error" :life="3000">Auto Disappear Message</Message>
    </div>

    <div v-if="loading" class="flex justify-center">
      <ProgressSpinner />
    </div>
    <div v-else-if="hasTeam">
      <div v-for="team in teams" :key="team.id" class="p-4 border border-gray-300 rounded">
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
