import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)
  const apiEndPoint = ref('/users')
  const userCount = computed(() => users.value.length)
  const hasUsers = computed(() => users.value.length > 0)

  const fetchUsers = async () => {
    loading.value = true
    error.value = null

    try {
      const { data } = await api.get(apiEndPoint.value)
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
      const { data } = await api.get(`${apiEndPoint.value}/${id}`)
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
      const { data } = await api.post(apiEndPoint.value, userData)
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
      const { data } = await api.patch(`${apiEndPoint.value}/${userId}`, userData)
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

      const response = await api.delete(`${apiEndPoint.value}/${id}`)
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
