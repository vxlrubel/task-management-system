import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'
import { projectEndpoint } from '@/services/endpoints'

export const useProjectStore = defineStore('project', () => {
  const loading = ref(false)
  const error = ref(null)
  const projects = ref([])
  const projectCount = computed(() => projects.value.length)
  const hasProject = computed(() => projects.value.length > 0)

  const fetchProject = async () => {
    loading.value = true
    error.value = null

    try {
      const { data } = await api.get(projectEndpoint.list)
      projects.value = data

      console.log('Fetch Project: ', projectCount.value)
    } catch (error) {
      error.value = error
      throw new Error(error)
    } finally {
      loading.value = false
    }
  }

  //   return values
  return { loading, error, projects, projectCount, hasProject, fetchProject }
})
