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

  async function fetchUserById(id) {
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

  async function createUser(userData) {
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

  return {
    users,
    loading,
    error,
    userCount,
    hasUsers,
    fetchUsers,
    fetchUserById,
    createUser,
  }
})
