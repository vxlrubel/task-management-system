<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Toast from 'primevue/toast'
import ConfirmPopup from 'primevue/confirmpopup'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

import ListItem from '@/components/ListItem.vue'
import SearchBox from '@/components/SearchBox.vue'
import PaginationItems from '@/components/PaginationItems.vue'

const confirm = useConfirm()
const toast = useToast()
const userStore = useUserStore()
const { users, loading, error, userCount, hasUsers } = storeToRefs(userStore)
const router = useRouter()
const route = useRoute()

// Pagination & Search state
const searchQuery = ref('')
const currentPage = ref(1)
const perPage = 10

// Filtered users based on search
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value

  const query = searchQuery.value.toLowerCase()
  return users.value.filter(
    (user) =>
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.username?.toLowerCase().includes(query),
  )
})

// Pagination calculations
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / perPage))

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  return filteredUsers.value.slice(start, end)
})

// Initialize page from URL
onMounted(() => {
  const pageParam = route.query.page
  if (pageParam && !isNaN(pageParam)) {
    currentPage.value = parseInt(pageParam)
  }
  userStore.fetchUsers()
})

// Watch for page changes and update URL
watch(currentPage, (newPage) => {
  router.push({ query: { page: newPage } })
})

// Watch route query changes (browser back/forward)
watch(
  () => route.query.page,
  (newPage) => {
    if (newPage && !isNaN(newPage)) {
      currentPage.value = parseInt(newPage)
    } else {
      currentPage.value = 1
    }
  },
)

// Handle search event
const handleSearch = (query) => {
  searchQuery.value = query
  currentPage.value = 1 // Reset to first page on search
}

// Handle page change event
const handlePageChange = (page) => {
  currentPage.value = page
}

const delUser = (id) => {
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
      userStore.deleteUser(id)
      toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Record deleted', life: 3000 })
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
    },
  })
}

const visitDetails = (id) => {
  router.push(`/user/show/${id}`)
}

const visitEdit = (id) => {
  router.push(`/user/${id}`)
}
</script>

<template>
  <div>
    <Toast />
    <ConfirmPopup></ConfirmPopup>

    <div class="mb-4 flex gap-4 items-center justify-center">
      <!-- Search Component -->
      <SearchBox placeholder="Search users by name, email, or username..." @search="handleSearch" />
    </div>

    <!-- Error message -->
    <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded mb-4">
      {{ error }}
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-gray-600">Loading users...</div>

    <!-- Users list -->
    <template v-else-if="hasUsers">
      <!-- Search results info -->
      <p class="text-sm mb-2">
        <span v-if="searchQuery">
          Found {{ filteredUsers.length }} user(s) matching "{{ searchQuery }}"
        </span>
        <span v-else> Total users: {{ userCount }} </span>
      </p>

      <!-- Users -->
      <div v-if="paginatedUsers.length > 0" class="space-y-2 mb-4">
        <ListItem
          :items="paginatedUsers"
          :onVisit="visitDetails"
          :onEdit="visitEdit"
          :onDelete="delUser"
        />
      </div>

      <!-- No results message -->
      <div v-else class="text-gray-500 mb-4">No users found matching "{{ searchQuery }}"</div>

      <!-- Pagination Component -->
      <PaginationItems
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />
    </template>

    <!-- No users message -->
    <div v-else class="text-gray-500">No users found. Click "Fetch Users" to load data.</div>
  </div>
</template>
