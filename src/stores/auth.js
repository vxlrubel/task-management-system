import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', () => {
  // local stroage key
  const authUserKey = ref('auth_user')
  // state
  const currentUserId = ref(null)
  const user = ref(null)
  const isLoggedIn = computed(() => !!currentUserId.value)

  // actions
  function setUser(userData) {
    user.value = userData
    currentUserId.value = userData?.id || null
  }

  function loginUser(userData) {
    setUser(userData)

    // persist (optional)
    localStorage.setItem(authUserKey.value, JSON.stringify(userData))
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
    currentUserId,
    user,

    // getters
    isLoggedIn,

    // actions
    loginUser,
    logoutUser,
    loadFromStorage,
  }
})
