import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'
import { teamEndpoint, memberEndpoint } from '@/services/endpoints'

export const useTeamsStore = defineStore('teams', () => {
  const loading = ref(false)
  const error = ref(null)
  const teams = ref([])
  const singleTeam = ref(null)
  const teamsCount = computed(() => teams.value.length)
  const hasTeam = computed(() => teams.value.length > 0)
  const members = ref([])

  const getTeams = async () => {
    loading.value = true
    try {
      const { data } = await api.get(teamEndpoint.list)
      teams.value = data
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      console.error('Error fetching Teams:', err)
    } finally {
      loading.value = false
    }
  }
  const getTeamWithMembers = async (id) => {
    loading.value = true
    try {
      // Get team
      const { data: team } = await api.get(teamEndpoint.single(id))
      singleTeam.value = team

      const { data: teamMembers } = await api.get(memberEndpoint.list, {
        params: { team_id: id },
      })
      if (!teamMembers.length) {
        members.value = []
        return true
      }

      const userIds = teamMembers.map((m) => m.user_id)

      // Fetch users
      const { data: users } = await api.get('/users', {
        params: { id: userIds },
      })

      // Merge user + team role
      members.value = teamMembers.map((tm) => {
        const user = users.find((u) => u.id == tm.user_id)
        return {
          ...user,
          team_role: tm.role,
        }
      })
      return true
    } catch (error) {
      console.error(error)
      return false
    } finally {
      loading.value = false
    }
  }

  const deleteTeam = async (id) => {
    try {
      if (!id) {
        throw new Error('Team ID is required')
      }

      const response = await api.delete(teamEndpoint.delete(id))
      teams.value = teams.value.filter((t) => t.id !== id)
      return response.data
    } catch (error) {
      console.error('Error deleting team:', error.response?.data || error.message)
      throw error
    }
  }
  const createTeam = async (payload) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await api.post(teamEndpoint.create, payload)
      teams.value.push(data)
      return data
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    teams,
    singleTeam,
    members,
    teamsCount,
    hasTeam,
    getTeams,
    getTeamWithMembers,
    deleteTeam,
    createTeam,
  }
})
