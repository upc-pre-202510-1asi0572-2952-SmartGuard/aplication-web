<!-- src/views/EditHomeView.vue -->
<template>
  <WrapperScreen>
    <div class="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h1 class="text-2xl font-semibold mb-6">Editar Hogar por ID</h1>

      <!-- Paso 1: pedir ID -->
      <div v-if="step === 1" class="space-y-4">
        <InputTexto
            _placeholder="ID del Hogar"
            type="number"
            v-model.number="inputId"
        />
        <p v-if="errorMsg" class="text-red-600 text-sm">{{ errorMsg }}</p>

        <div class="flex justify-center gap-4">
          <button
              @click="findHome"
              class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Buscar
          </button>
          <button
              @click="cancel"
              class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </div>

      <!-- Paso 2: formulario de edición -->
      <div v-else class="space-y-4">
        <h2 class="text-xl font-medium">Editando hogar ID: {{ home.id }}</h2>
        <form @submit.prevent="onUpdateHome" class="grid grid-cols-1 gap-4">
          <InputTexto label="Nombre" v-model="home.name" required />
          <InputTexto label="Dirección" v-model="home.address" required />
          <InputTexto label="Tipo de Propiedad" v-model="home.propertyType" required />
          <InputTexto label="Habitaciones" type="number" v-model.number="home.bedrooms" required />
          <InputTexto label="Baños" type="number" v-model.number="home.bathrooms" required />
          <label class="flex items-center">
            <input type="checkbox" v-model="home.heating" class="mr-2" /> Calefacción
          </label>
          <InputTexto label="Suministro de Agua" v-model="home.waterSupply" required />
          <InputTexto label="Proveedor de Internet" v-model="home.internetProvider" required />
          <InputTexto label="Sistema de Seguridad" v-model="home.securitySystem" required />
          <InputTexto label="Smart Features" type="number" v-model.number="home.smartFeatures" required />
          <InputTexto label="URL de Foto" v-model="home.photoURL" />
          <img
              v-if="home.photoURL"
              :src="home.photoURL"
              alt="Foto hogar"
              class="w-52 h-36 object-cover rounded mt-2"
          />
          <div class="flex justify-end mt-4">
            <button
                type="submit"
                class="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type {Home} from "../interfaces/Home.ts";
import InputTexto from "../components/shared/InputTexto.vue";
import WrapperScreen from "../components/WrapperScreen.vue";

export default defineComponent({
  name: 'EditHomeView',
  components: { WrapperScreen, InputTexto },
  setup() {
    const router = useRouter();
    const step = ref(1);
    const inputId = ref<number | null>(null);
    const errorMsg = ref('');

    const home = reactive<Home>({
      id: 0,
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
      photoURL: '',
    });

    const findHome = async () => {
      errorMsg.value = '';
      if (!inputId.value || inputId.value <= 0) {
        errorMsg.value = 'Ingresa un ID válido.';
        console.log('Error:', errorMsg.value);
        return;
      }
      try {
        const res = await fetch(`https://fake-api-smartguard.vercel.app/homes/${inputId.value}`);
        if (res.status === 404) {
          errorMsg.value = `No existe un hogar con ID ${inputId.value}.`;
          console.log('Error:', errorMsg.value);
          return;
        }
        const data = await res.json();
        Object.assign(home, data);
        step.value = 2;
      } catch (e) {
        errorMsg.value = 'Error al buscar el hogar.';
        console.log('Error:', e);
      }
    };

    const onUpdateHome = async () => {
      try {
        const res = await fetch(`https://fake-api-smartguard.vercel.app/homes/${home.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(home),
        });
        if (!res.ok) throw new Error('Error al actualizar');
        console.log('Hogar actualizado:', home);
        router.push({ name: 'home' });
      } catch (e) {
        errorMsg.value = 'Error al actualizar el hogar.';
        console.log('Error:', e);
      }
    };

    const cancel = () => {
      router.push({ name: 'home' });
    };

    return { step, inputId, errorMsg, home, findHome, onUpdateHome, cancel };
  },
});
</script>

<style scoped>
/* Ajustes de estilo adicionales si los necesitas */
</style>
