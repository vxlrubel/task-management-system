<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Toast from 'primevue/toast'
import ConfirmPopup from 'primevue/confirmpopup'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
const confirm = useConfirm()
const toast = useToast()
const userStore = useUserStore()
const { users, loading, error, userCount, hasUsers } = storeToRefs(userStore)
const router = useRouter()
onMounted(() => {
  userStore.fetchUsers()
})

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
  <div class="p-4">
    <Toast />
    <ConfirmPopup></ConfirmPopup>
    <button
      @click.prevent="userStore.fetchUsers()"
      :disabled="loading"
      class="px-4 py-2 bg-blue-500 text-white rounded mb-4"
    >
      {{ loading ? 'Loading...' : 'Fetch Users' }}
    </button>

    <!-- Error message -->
    <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded mb-4">
      {{ error }}
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-gray-600">Loading users...</div>

    <!-- Users list -->
    <div v-else-if="hasUsers" class="space-y-2">
      <p class="text-sm mb-2">Total users: {{ userCount }}</p>
      <div class="border-b border-gray-600 border-l border-r">
        <div
          v-for="user in users"
          :key="user.id"
          @click="visitDetails(user.id)"
          class="p-3 border-t border-gray-600 cursor-pointer hover:bg-[hsl(210,6%,15%)]"
        >
          <div class="flex justify-between">
            <div class="font-medium">{{ user.name }}</div>
            <div>
              <button
                @click.stop="visitEdit(user.id)"
                type="button"
                class="bg-blue-500 text-sm inline-flex items-center justify-center h-8 w-8 rounded-full cursor-pointer hover:bg-blue-600 me-3"
              >
                <i class="pi pi-pen-to-square text-sm"></i>
              </button>
              <button
                @click.stop="delUser(user.id)"
                type="button"
                class="bg-red-500 text-sm inline-flex items-center justify-center h-8 w-8 rounded-full cursor-pointer hover:bg-red-600"
              >
                <i class="pi pi-trash text-sm"></i>
              </button>
            </div>
          </div>
          <p class="text-sm text-gray-400">{{ user.email }}</p>
        </div>
      </div>
    </div>

    <!-- No users message -->
    <div v-else class="text-gray-500">No users found. Click "Fetch Users" to load data.</div>
  </div>
</template>
