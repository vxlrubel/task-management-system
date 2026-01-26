<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '@/stores/project'
import ListItem from '@/components/ListItem.vue'
const projectStore = useProjectStore()

const { loading, error, projects, hasProject } = storeToRefs(projectStore)

onMounted(async () => {
  await projectStore.fetchProject()
})

const handleVisit = (id) => {
  alert('Handle visit:', id)
}

const handleEdit = (id) => {
  alert('Handle Edit: ', id)
}

const handleDelete = (id) => {
  alert('Handle Delete: ', id)
}
</script>

<template>
  <div>
    <template v-if="error">
      <div>{{ error }}</div>
    </template>
    <template v-if="loading">
      <div>Loading...</div>
    </template>
    <template v-else-if="hasProject && !loading">
      <ListItem
        :items="projects"
        :on-visit="handleVisit"
        :on-edit="handleEdit"
        :on-delete="handleDelete"
      />
    </template>
    <template v-else>
      <div>Not Found</div>
    </template>
  </div>
</template>
