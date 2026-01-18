import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'
import { team } from '@/services/endpoints'

export const useTeamsStore = defineStore('teams', () => {
  const loading = ref(false)
  const error = ref(null)
  const teams = ref([])
  const teamsCount = computed(() => teams.value.length)
  const hasTeam = computed(() => teams.value.length > 0)

  const getTeams = async () => {
    loading.value = true
    try {
      const { data } = await api.get(team.list)
      teams.value = data
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      console.error('Error fetching Teams:', err)
    } finally {
      loading.value = false
    }
  }

  return { loading, error, teams, teamsCount, hasTeam, getTeams }
})
