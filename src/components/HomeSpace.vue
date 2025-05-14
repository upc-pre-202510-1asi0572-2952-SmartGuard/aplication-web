<template>
  <div class="flex flex-col w-full px-8">
    <!-- Header -->
    <div
      class="bg-[#2A3240] flex flex-row justify-between items-center gap-4 p-8 text-xl rounded-b-4xl lg:rounded-none">
      <Button _color="bg-[#555B66]" _texto="Regresar" @click="$emit('back')" />
      <div>
        <h2 class="text-center text-4xl font-black mb-8">Registrar un nuevo hogar</h2>
        <p class="text-center font-light">Añade los primeros detalles</p>
      </div>
      <div class="flex flex-col items-center text">
        <span>PASO</span>
        <span class="font-black">2/1</span>
      </div>
    </div>

    <!-- Content -->
    <div class="relative flex flex-col items-center gap-4 text-xl pb-8 text-black">
      <img class="h-full w-auto block mt-4 px-4 mb-4 z-10" src="../assets/homeRegister.png" alt="icon" />
      <div class="absolute rounded-b-4xl top-0 w-full lg:pb-24 bg-[#2A3240]"></div>

      <p>¿Cuál es el nombre de tu hogar?</p>
      <InputTexto class="lg:w-md" _placeholder="Mi Casa" :_onClick="handleClick" />

      <p class="font-black">Sin inspiración? Intenta uno de estos nombres</p>
      <div class="flex flex-row justify-center flex-wrap gap-4">
        <Button class="rounded-4xl" _texto="Casa actual" />
        <Button _texto="Oficina actual" />
        <Button _texto="Mi lugar feliz" />
      </div>

      <div class="flex flex-row flex-wrap gap-4 rounded-4xl bg-white p-8 lg:w-md shadow-2xl">
        <Button class="w-full" _texto="Finalizar Registro" @click="$emit('back')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Button from '../components/shared/Button.vue';
import InputTexto from '../components/shared/InputTexto.vue';

export default {
  components: {
    Button,
    InputTexto,
  },
  methods: {
    handleClick() {
      console.log("Botón clickeado desde la vista");
    }
  }
}
</script>

<style scoped></style>
