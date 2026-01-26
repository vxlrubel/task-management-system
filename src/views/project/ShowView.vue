<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore()
const { project } = storeToRefs(projectStore)
const route = useRoute()

onMounted(async () => {
  projectStore.fetchProjectById(route.params.id)
})
</script>

<template>
  <div>
    <pre>{{ project }}</pre>
  </div>
</template>
