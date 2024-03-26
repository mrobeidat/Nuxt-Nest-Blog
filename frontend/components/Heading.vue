<template>
  <div class="px-4 py-4">
    <h1 class="text-6xl font-bold text-neutral-300">{{ title }}</h1>
    <p v-if="description" class="mt-4 text-2xl text-neutral-300">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>