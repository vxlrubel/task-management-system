import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import { users } from '@/services/endpoints'
import { ROLE_PERMISSIONS } from '@/config/permissions'

export const useAuth = defineStore('auth', () => {
  // local storage key
  const authUserKey = ref('auth_user')

  // state
  const isLoading = ref(false)
  const currentUserId = ref(null)
  const user = ref(null)

  // getters
  const isLoggedIn = computed(() => !!currentUserId.value)

  const permissions = computed(() => {
    if (!user.value) return []
    return ROLE_PERMISSIONS[user.value.role_id] || []
  })

  // actions
  function setUser(userData) {
    user.value = userData
    currentUserId.value = userData?.id || null
  }

  function hasPermission(permission) {
    return permissions.value.includes(permission)
  }

  async function loginUser(payload) {
    isLoading.value = true

    try {
      const { data } = await api.get(users.create, {
        params: {
          email: payload.email,
          password: payload.password,
          status: 'active',
        },
      })

      if (!data.length) {
        throw new Error('Invalid email or password')
      }

      const loggedInUser = data[0]

      setUser(loggedInUser)
      localStorage.setItem(authUserKey.value, JSON.stringify(loggedInUser))
    } catch (error) {
      throw new Error(error)
    } finally {
      isLoading.value = false
    }
  }

  function logoutUser() {
    user.value = null
    currentUserId.value = null
    localStorage.removeItem(authUserKey.value)
  }

  function loadFromStorage() {
    const stored = localStorage.getItem(authUserKey.value)
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }

  return {
    // state
    isLoading,
    currentUserId,
    user,

    // getters
    isLoggedIn,
    permissions,

    // actions
    loginUser,
    logoutUser,
    loadFromStorage,
    hasPermission,
  }
})
