<script setup>
defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <RouterLink
    :to="to"
    class="w-13 h-7 items-center justify-center bg-[hsl(210,6%,20%)] inline-flex text-sm hover:bg-[hsl(210,6%,25%)] transition-colors"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="18px"
      viewBox="0 -960 960 960"
      width="18px"
      fill="currentColor"
    >
      <path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z" />
    </svg>
  </RouterLink>
</template>
