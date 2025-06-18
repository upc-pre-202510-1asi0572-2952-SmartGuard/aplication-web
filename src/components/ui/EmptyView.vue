<template>
  <div
      class="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center md:justify-between
           w-full max-w-6xl mx-auto p-6 sm:p-8 space-y-6 md:space-y-0 md:space-x-6"
  >
    <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
      <img
          src="../../assets/smart-home/not-home.png"
          alt="Sin datos"
          class="h-24 w-24 sm:h-32 sm:w-32 object-contain"
      />
      <div class="text-center sm:text-left">
        <h1 class="text-gray-800 text-xl sm:text-2xl font-semibold">
          {{ title }}
        </h1>
        <p class="text-gray-600 text-sm sm:text-base">
          {{ description }}
        </p>
      </div>
    </div>
    <div>
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  description: string
}>();
</script>
