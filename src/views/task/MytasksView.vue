<script setup>
import { ref } from 'vue'
import TaskItem from '@/components/TaskItem.vue'

const tasks = ref([
  {
    id: '1',
    project_id: 1,
    parent_id: null,
    title: 'Design Dashboard UI',
    description: 'Create dashboard layout and components',
    priority: 'high',
    status: 'in_progress',
    start_date: '2026-01-05',
    due_date: '2026-01-15',
    created_by: 2,
    assigned_to: 3,
  },
  {
    id: '2',
    project_id: 1,
    parent_id: 1,
    title: 'Create Sidebar Component',
    description: 'Implement collapsible sidebar',
    priority: 'medium',
    status: 'todo',
    start_date: '2026-01-06',
    due_date: '2026-01-10',
    created_by: 2,
    assigned_to: 4,
  },
  {
    id: '3',
    project_id: 1,
    parent_id: null,
    title: 'Setup Pinia Stores',
    description: 'Create stores for auth, tasks, projects',
    priority: 'high',
    status: 'review',
    start_date: '2026-01-04',
    due_date: '2026-01-12',
    created_by: 2,
    assigned_to: 3,
  },
])

const handleClick = (item) => {
  alert(item)
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
    <div>
      <div class="font-bold mb-3">My Task</div>
      <TaskItem :items="tasks" :onItemClick="handleClick" />
    </div>
    <div>
      <div class="font-bold mb-3">Done</div>
      <TaskItem :items="tasks" />
    </div>
    <div>
      <div class="font-bold mb-3">Next Week</div>
      <TaskItem :items="tasks" />
    </div>
    <div>
      <div class="font-bold mb-3">Next day</div>
      <TaskItem :items="tasks" />
    </div>
  </div>
</template>
