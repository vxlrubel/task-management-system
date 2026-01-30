import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import { taskEndpoint } from '@/services/endpoints'

export const useTaskStore = defineStore('task', () => {
  const loading = ref(false)
  const error = ref(null)
  const task = ref({})
  const tasks = ref([])
  const taskCount = ref()
  const projectTasks = ref([])
  const hasTask = computed(() => tasks.value.length > 0)

  //   fetch single task
  const fetchTask = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get(taskEndpoint.single(id))
      task.value = data
    } catch (error) {
      error.value = error
      console.log(error)
      throw new Error(error)
    } finally {
      loading.value = true
    }
  }

  //   fetch all tasks
  const fetchTasks = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get(taskEndpoint.list)
      tasks.value = data
    } catch (error) {
      error.value = error
      console.log(error)
      throw new Error(error)
    } finally {
      loading.value = true
    }
  }

  //   fetch tasks by project id
  const fetchTaskByProjectId = async (projectId) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await api.get(taskEndpoint.list, {
        params: {
          project_id: projectId,
        },
      })

      // 1️⃣ Parent tasks
      const parents = data
        .filter((task) => task.parent_id === null)
        .map((parent) => ({
          ...parent,
          children: [],
        }))

      // 2️⃣ Child tasks
      const children = data.filter((task) => task.parent_id !== null)

      // 3️⃣ Attach children to parents
      children.forEach((child) => {
        const parent = parents.find((p) => p.id === child.parent_id)
        if (parent) {
          parent.children.push(child)
        }
      })

      projectTasks.value = parents
    } catch (err) {
      error.value = 'Failed to fetch tasks'
      console.error(err)
    } finally {
      loading.value = false

      console.log(projectTasks.value)
    }
  }

  return {
    loading,
    error,
    task,
    tasks,
    taskCount,
    hasTask,
    projectTasks,
    fetchTask,
    fetchTasks,
    fetchTaskByProjectId,
  }
})
