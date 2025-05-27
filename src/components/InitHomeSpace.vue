<template>
  <div class="flex justify-center items-center ">
    <div class="flex flex-col justify-center items-center gap-4 max-w-4xl">
      <div class="flex flex-col gap-2 text-center">
        <h1 class="text-gray-800 text-2xl font-semibold">
          No se ha registrado ningún hogar en tu cuenta
        </h1>
        <span class="text-gray-600">Para comenzar, registra un hogar desde el panel principal.</span>
      </div>
      <img src="../assets/smart-home/not-home.png" alt="" />
      <Button _texto="Registrar Hogar" class="w-md" @click="$emit('next')" />
    </div>
  </div>
</template>

<script lang="ts">
import Button from '../components/shared/Button.vue';

export default {
  components: {
    Button,
  }
}
</script>

<style scoped></style>
