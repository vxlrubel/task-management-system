<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import ListItem from '@/components/ListItem.vue'
const projectStore = useProjectStore()
const { loading, error, projects, hasProject } = storeToRefs(projectStore)

const router = useRouter()
onMounted(async () => {
  await projectStore.fetchProject()
})

const handleVisit = (id) => {
  const url = `/project/show/${id}`
  router.push(url)
  console.log('handle visit: ', url)
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
        :onVisit="handleVisit"
        :on-edit="handleEdit"
        :on-delete="handleDelete"
      />
    </template>
    <template v-else>
      <div>Not Found</div>
    </template>
  </div>
</template>
