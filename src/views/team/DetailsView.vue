<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTeamsStore } from '@/stores/teams'
import LinkBack from '@/components/LinkBack.vue'
import ItemsView from '@/components/ItemsView.vue'
const route = useRoute()
const teamStore = useTeamsStore()

onMounted(() => {
  teamStore.getTeamWithMembers(route.params.id)
})

const team = computed(() => teamStore.singleTeam)
const members = computed(() => teamStore.members)

console.log(members)

console.log(teamStore)
</script>

<template>
  <div class="max-w-xl mx-auto mt-10">
    <div class="flex items-center justify-between pb-3 border-b border-gray-600 mb-4">
      <div>
        <LinkBack />
      </div>
      <div class="flex-1 pl-3">Team Information:</div>
    </div>
    <div>
      <div>
        <div class="font-medium text-2xl">{{ team?.name }}</div>
        <div class="text-sm text-gray-400 mb-5">
          {{ team?.description }}
        </div>
        <div class="font-bold mb-4">Team Members</div>
      </div>
      <div class="space-y-3">
        <ItemsView :items="members" />
      </div>
    </div>
  </div>
</template>
