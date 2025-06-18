<template>
  <div class="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
    <div>
      <h1 class="text-4xl font-bold text-gray-800 max-w-[500px]">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="mt-1 text-gray-600">{{ subtitle }}</p>
    </div>
    <div class="flex flex-col gap-4">
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  subtitle?: string
}>();
</script>
