import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import { users as endpoint } from '@/services/endpoints'

// Create axios instance

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)
  const userCount = computed(() => users.value.length)
  const hasUsers = computed(() => users.value.length > 0)

  const fetchUsers = async () => {
    loading.value = true
    error.value = null

    try {
      const { data } = await api.get(endpoint.list)
      users.value = data
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      console.error('Error fetching users:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchUserById = async (id) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await api.get(endpoint.single(id))
      return data
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      return null
    } finally {
      loading.value = false
    }
  }

  const createUser = async (userData) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await api.post(endpoint.create, userData)
      users.value.push(data)
      return data
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      return null
    } finally {
      loading.value = false
    }
  }
  const updateUser = async (userId, userData) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await api.patch(endpoint.update(userId), userData)
      const index = users.value.findIndex((user) => user.id === userId)
      if (index !== -1) {
        users.value[index] = data
      }

      return data
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      return null
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (id) => {
    try {
      if (!id) {
        throw new Error('User ID is required')
      }

      const response = await api.delete(endpoint.delete(id))
      users.value = users.value.filter((user) => user.id !== id)
      return response.data
    } catch (error) {
      console.error('Error deleting user:', error.response?.data || error.message)
      throw error
    }
  }

  return {
    users,
    loading,
    error,
    userCount,
    hasUsers,
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
  }
})
