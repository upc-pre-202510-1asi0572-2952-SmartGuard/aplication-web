<!-- src/views/RegisterHomeView.vue -->
<template>
  <div class="flex flex-col flex-1 w-full px-8">
    <!-- Header -->
    <div
      class="bg-[#2A3240] flex flex-col sm:flex-row justify-between items-center gap-4 p-8 text-xl rounded-4xl md:rounded-t-4xl lg:rounded-b-none text-white">
      <!-- Regresar -->
      <Button _color="bg-[#555B66]" _texto="Regresar" @click="prevStep" />
      <div>
        <h1 class="text-3xl font-semibold mb-8 text-center">Registrar un nuevo hogar</h1>
        <p class="text-center font-light">
          {{
            step === 1
              ? 'Añade los primeros detalles'
              : step === 2
                ? 'Añade detalles básicos'
                : 'Añade detalles extras'
          }}
        </p>
      </div>
      <div class="flex flex-col gap-2 items-center">
        <span>PASO</span>
        <span class="font-black">{{ step }}/3</span>
      </div>
    </div>

    <!-- Contenido -->
    <div class="relative flex flex-col items-center gap-6 pb-8 text-black">
      <img class="h-full w-auto block my-4 z-10" src="../assets/homeregister.webp" alt="icon" />
      <div class="absolute rounded-b-4xl top-0 w-full lg:pb-24 bg-[#2A3240]"></div>
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 w-full max-w-2xl px-4">


        <!-- Paso 1: Nombre del hogar -->
        <div v-if="step === 1" class="flex flex-col items-center gap-6">
          <p class="text-center">¿Cuál es el nombre de tu hogar?</p>
          <InputTexto class="w-[300px]" _placeholder="Nombre de la vivienda" v-model="formData.name" />
          <p class="text-center">Sin inspiración? Intenta uno de estos nombres</p>
          <div class="flex flex-row justify-center flex-wrap gap-4">
            <Button type="button" _texto="Casa actual" class="rounded-4xl" @click="setName('Casa actual')" />
            <Button type="button" _texto="Oficina actual" @click="setName('Oficina actual')" />
            <Button type="button" _texto="Mi lugar feliz" @click="setName('Mi lugar feliz')" />
          </div>
        </div>

        <!-- Paso 2: Datos básicos -->
        <div v-if="step === 2" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputTexto _placeholder="Dirección completa" v-model="formData.address" />
          <InputTexto _placeholder="Tipo de propiedad" v-model="formData.propertyType" />
          <InputTexto _placeholder="Habitaciones" type="number" v-model="formData.bedrooms" />
          <InputTexto _placeholder="Baños" type="number" v-model="formData.bathrooms" />
        </div>

        <!-- Paso 3: Detalles extras -->
        <div v-if="step === 3" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputTexto _placeholder="Sistema de calefacción" v-model="formData.heating" />
          <InputTexto _placeholder="Agua (proveedor)" v-model="formData.waterSupply" />
          <InputTexto _placeholder="Internet (proveedor)" v-model="formData.internetProvider" />
          <InputTexto _placeholder="Sistema de seguridad" v-model="formData.securitySystem" />
          <InputTexto _placeholder="Smart Features" v-model="formData.smartFeatures" />
        </div>
      </form>

      <!-- Botón inferior -->
      <div class="rounded-4xl bg-white p-6 shadow-2xl">
        <Button class="w-[300px]" _color="bg-blue-500" :_texto="step < 3 ? 'Siguiente' : 'Finalizar Registro'"
          @click="handleSubmit" />
      </div>
    </div>
  </div>
</template>
<!-- registro  -->
<script lang="ts">
import { ref, reactive } from 'vue'
import Button from '../components/shared/Button.vue'
import InputTexto from '../components/shared/InputTexto.vue'
import router from "../router";

export default {
  name: 'RegisterHomeView',
  components: { Button, InputTexto },
  setup(_, { emit }) {
    const step = ref(1)
    const formData = reactive({
      name: '',
      address: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      heating: '',
      waterSupply: '',
      internetProvider: '',
      securitySystem: '',
      smartFeatures: ''
    })
    const setName = (name: string) => {
      formData.name = name
    }
    const nextStep = () => {
      if (step.value < 3) step.value++
    }

    const prevStep = () => {
      if (step.value > 1) step.value--
      else emit('back');
    }

    const handleSubmit = () => {
      if (step.value < 3) nextStep()
      else onFinish()
    }

    const onFinish = () => {
      console.log('Registro hogar completado:', formData)
      router.push('/home')
    }

    return { step, formData, nextStep, prevStep, handleSubmit, onFinish, setName }
  }
}
</script>

<style scoped></style>
