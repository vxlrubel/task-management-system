<script setup>
import LinkBack from '@/components/LinkBack.vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

import { useTaskStore } from '@/stores/task'
import { useProjectStore } from '@/stores/project'
import { useUserStore } from '@/stores/user'

import IconPlus from '@/components/icons/IconPlus.vue'
import DatePicker from 'primevue/datepicker'
import Editor from 'primevue/editor'
const userStore = useUserStore()

const projectStore = useProjectStore()
const { loading, project } = storeToRefs(projectStore)
const route = useRoute()
const taskStore = useTaskStore()
const { projectTasks } = storeToRefs(taskStore)

onMounted(async () => {
  projectStore.fetchProjectById(route.params.id)
})
onMounted(async () => {
  taskStore.fetchTaskByProjectId(route.params.id)
})
</script>

<template>
  <div>
    <div class="py-1 border-b border-gray-600 mb-3 flex items-center gap-2">
      <LinkBack />
      <button type="button" class="button">Create</button>
    </div>
    <pre>{{ projectTasks }}</pre>
    <template v-if="loading">
      <div>Loading...</div>
    </template>

    <template v-else>
      <div>
        <p>{{ project?.name ?? 'Not defined' }}</p>
        <p class="text-sm text-gray-300">{{ project?.description ?? 'No description' }}</p>
      </div>

      <div class="mt-3">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div class="grid grid-cols-1 text-sm border-t border-l border-r border-gray-600">
            <div class="task-list" v-for="task in projectTasks" :key="task.id">
              <div class="flex-1 p-1">{{ task?.title }}</div>
              <div
                class="w-60 p-1 flex items-center gap-1 border-l border-gray-600 text-[13px] relative z-10"
              >
                <IconPlus />
                Asign
                {{ userStore.getUserNameById(task.assigned_to) }}
              </div>
              <div
                class="w-40 p-1 flex items-center gap-1 border-l border-gray-600 custom-date-picker"
              >
                <span>{{ task.due_date }}</span>
                <!-- <DatePicker v-model="task.due_date" /> -->
              </div>
            </div>
          </div>

          <div>
            <!-- <Editor v-model="value" editorStyle="height: 320px" /> -->
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
