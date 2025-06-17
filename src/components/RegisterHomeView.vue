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
      <div class="absolute rounded-b-4xl top-0 w-full lg:pb-24 bg-[#2A3240]"></div>
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
              v-model="hogar.nombre"
          />
          <p class="text-center">Sin inspiración? Intenta uno de estos nombres</p>
          <div class="flex flex-row justify-center flex-wrap gap-4">
            <Button
                type="button"
                _texto="Casa actual"
                class="rounded-4xl"
                @click="setNombre('Casa actual')"
            />
            <Button
                type="button"
                _texto="Oficina actual"
                @click="setNombre('Oficina actual')"
            />
            <Button
                type="button"
                _texto="Mi lugar feliz"
                @click="setNombre('Mi lugar feliz')"
            />
          </div>
        </div>

        <!-- Paso 2 -->
        <div v-if="step === 2" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputTexto _placeholder="Dirección" v-model="hogar.direccion" />
          <InputTexto
              _placeholder="Tipo de Propiedad"
              v-model="hogar.tipoPropiedad"
          />
          <InputTexto
              _placeholder="Número de Habitaciones"
              type="number"
              v-model.number="hogar.habitaciones"
          />
          <InputTexto
              _placeholder="Número de Baños"
              type="number"
              v-model.number="hogar.baños"
          />
        </div>

        <!-- Paso 3 -->
        <div v-if="step === 3" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex items-center gap-2">
            <label class="font-medium">¿Tiene Calefacción?</label>
            <input
                type="checkbox"
                v-model="hogar.calefaccion"
                class="accent-blue-600"
            />
          </div>
          <InputTexto
              _placeholder="Abastecimiento de Agua"
              v-model="hogar.abastecimientoAgua"
          />
          <InputTexto
              _placeholder="Proveedor de Internet"
              v-model="hogar.proveedorInternet"
          />
          <InputTexto
              _placeholder="Sistema de Seguridad"
              v-model="hogar.sistemaSeguridad"
          />
          <InputTexto
              _placeholder="Funciones Inteligentes"
              type="number"
              v-model.number="hogar.funcionesInteligentes"
          />
          <InputTexto
              _placeholder="URL de la Imagen"
              v-model="hogar.imgUrl"
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
import { defineComponent, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Button from './shared/Button.vue';
import InputTexto from './shared/InputTexto.vue';
import type { Home } from '../interfaces/Home.ts';

export default defineComponent({
  name: 'RegisterHomeView',
  components: { Button, InputTexto },
  setup() {
    const router = useRouter();
    const step = ref(1);

    const hogar = reactive<Omit<Home, 'id'>>({
      nombre: '',
      direccion: '',
      tipoPropiedad: '',
      habitaciones: 0,
      baños: 0,
      calefaccion: false,
      nickname: localStorage.getItem('nickname') || '',
      abastecimientoAgua: '',
      proveedorInternet: '',
      sistemaSeguridad: '',
      funcionesInteligentes: 0,
      imgUrl: ''
    });

    const setNombre = (n: string) => (hogar.nombre = n);
    const prevStep = () => {
      if (step.value > 1) step.value--;
      else router.back();
    };
    const nextStep = () => {
      if (step.value < 3) step.value++;
    };
    const handleSubmit = () =>
        step.value < 3 ? nextStep() : onFinish();

    const onFinish = async () => {
      try {
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/hogarMysql`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(hogar)
            }
        );

        if (!res.ok) {
          alert('No se pudo registrar el hogar.');
          return;
        }

        alert(`✅ Hogar registrado correctamente!`);
        router.push({ name: 'home' });
      } catch (error) {
        console.error('Red:', error);
        alert('Error de red, no se pudo registrar el hogar.');
      }
    };

    return {
      step,
      hogar,
      setNombre,
      prevStep,
      handleSubmit
    };
  }
});
</script>

<style scoped></style>
