<template>
  <div class="flex flex-col flex-1 w-full px-8">
    <!-- Header -->
    <div
        class="bg-[#2A3240] flex flex-col sm:flex-row justify-between items-center gap-4 p-8 text-xl rounded-4xl md:rounded-t-4xl lg:rounded-b-none text-white"
    >
      <Button _color="bg-[#555B66]" _texto="Regresar" @click="prevStep" />
      <div>
        <h1 class="text-3xl font-semibold mb-8 text-center">
          Registrar un nuevo hogar
        </h1>
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
      <img
          class="h-full w-auto block my-4 z-10"
          src="../assets/homeregister.webp"
          alt="icon"
      />
      <div
          class="absolute rounded-b-4xl top-0 w-full lg:pb-24 bg-[#2A3240]"
      ></div>
      <form
          @submit.prevent="handleSubmit"
          class="flex flex-col gap-4 w-full max-w-2xl px-4"
      >
        <!-- Paso 1 -->
        <div v-if="step === 1" class="flex flex-col items-center gap-6">
          <p class="text-center">¿Cuál es el nombre de tu hogar?</p>
          <InputTexto
              class="w-[300px]"
              _placeholder="Ej. Casa Los Pinos"
              v-model="home.name"
          />
          <p class="text-center">
            Sin inspiración? Intenta uno de estos nombres
          </p>
          <div class="flex flex-row justify-center flex-wrap gap-4">
            <Button
                type="button"
                _texto="Casa actual"
                class="rounded-4xl"
                @click="setName('Casa actual')"
            />
            <Button
                type="button"
                _texto="Oficina actual"
                @click="setName('Oficina actual')"
            />
            <Button
                type="button"
                _texto="Mi lugar feliz"
                @click="setName('Mi lugar feliz')"
            />
          </div>
        </div>

        <!-- Paso 2 -->
        <div v-if="step === 2" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputTexto
              _placeholder="Dirección"
              v-model="home.address"
          />
          <InputTexto
              _placeholder="Tipo de Vivienda"
              v-model="home.propertyType"
          />
          <InputTexto
              _placeholder="Número de Habitaciones"
              type="number"
              v-model.number="home.bedrooms"
          />
          <InputTexto
              _placeholder="Número de Baños"
              type="number"
              v-model.number="home.bathrooms"
          />
        </div>

        <!-- Paso 3 -->
        <div v-if="step === 3" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex items-center gap-2">
            <label class="font-medium">Tiene Calefacción?</label>
            <input
                type="checkbox"
                v-model="home.heating"
                class="accent-blue-600"
            />
          </div>
          <InputTexto
              _placeholder="Proveedor de Agua Potable"
              v-model="home.waterSupply"
          />
          <InputTexto
              _placeholder="Proveedor de Internet"
              v-model="home.internetProvider"
          />
          <InputTexto
              _placeholder="Proveedor de Sistema de Seguridad"
              v-model="home.securitySystem"
          />
          <InputTexto
              _placeholder="Número de Dispositivos inteligentes"
              type="number"
              v-model.number="home.smartFeatures"
          />
          <InputTexto
              _placeholder="Imagen de la Vivienda (Copiar URL)"
              v-model="home.photoURL"
          />
        </div>
      </form>

      <!-- Botón inferior -->
      <div class="rounded-4xl bg-white p-6 shadow-2xl">
        <Button
            class="w-[300px]"
            _color="bg-blue-500"
            :_texto="step < 3 ? 'Siguiente' : 'Finalizar Registro'"
            @click="handleSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Button from './shared/Button.vue'
import InputTexto from './shared/InputTexto.vue'
import type {Home} from "../interfaces/Home.ts";

export default defineComponent({
  name: 'RegisterHomeView',
  components: { Button, InputTexto },
  emits: ['back', 'registered'],
  setup(_, { emit }) {
    const router = useRouter()
    const step = ref(1)

    const home = reactive<Omit<Home,'id'>>({
      name: '',
      address: '',
      propertyType: '',
      bedrooms: 0,
      bathrooms: 0,
      heating: false,
      waterSupply: '',
      internetProvider: '',
      securitySystem: '',
      smartFeatures: 0,
      photoURL: ''
    })

    const setName   = (n: string) => (home.name = n)
    const prevStep  = () => (step.value > 1 ? step.value-- : emit('back'))
    const nextStep  = () => step.value < 3 && step.value++
    const handleSubmit = () =>
        step.value < 3 ? nextStep() : onFinish()

    const onFinish = async () => {
      const listRes = await fetch('https://fake-api-smartguard.vercel.app/homes')
      if (!listRes.ok) {
        alert('No se pudo obtener lista de hogares')
        return
      }
      const homes = (await listRes.json()) as Array<{id: string|number}>
      const numericIds = homes.map(h => Number(h.id))
          .filter(n => !isNaN(n))
      const nextId = numericIds.length > 0
          ? Math.max(...numericIds) + 1
          : 1
      const payload: Home = {
        id:             nextId,
        name:           home.name,
        address:        home.address,
        propertyType:   home.propertyType,
        bedrooms:       home.bedrooms,
        bathrooms:      home.bathrooms,
        heating:        home.heating,
        waterSupply:    home.waterSupply,
        internetProvider: home.internetProvider,
        securitySystem: home.securitySystem,
        smartFeatures:  home.smartFeatures,
        photoURL:       home.photoURL
      }

      const res = await fetch('https://fake-api-smartguard.vercel.app/homes', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload)
      })
      if (!res.ok) {
        alert('No se pudo registrar el hogar. Intenta de nuevo.')
        return
      }

      const newHome: Home = await res.json()
      alert(`Hogar registrado correctamente (id: ${newHome.id})`)
      router.push({ name: 'home' })
    }

    return {
      step,
      home,
      setName,
      prevStep,
      handleSubmit
    }
  }
})
</script>



<style scoped></style>
