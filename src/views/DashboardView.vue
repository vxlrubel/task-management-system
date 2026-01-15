<template>
  <div>
    <div>Dashboard</div>
    <p>Count: {{ cn.count }}</p>
    <p>Double Count: {{ cn.doubleCount }}</p>
    <button
      @click="cn.increment()"
      class="py-2 px-4 bg-blue-600 text-gray-50 me-3 hover:bg-blue-700"
    >
      Increment
    </button>
    <button
      @click="cn.decrement()"
      class="py-2 px-4 bg-blue-600 text-gray-50 me-3 hover:bg-blue-700"
    >
      decrement
    </button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const cn = useCounterStore()
</script>
