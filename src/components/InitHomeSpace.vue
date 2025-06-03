<!-- src/components/InitHomeSpace.vue -->
<template>
  <div class="p-4 sm:p-8">
    <!-- Indicador de carga -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <span>Cargando hogares...</span>
    </div>

    <!-- Vista sin hogares -->
    <div
        v-else-if="homes.length === 0"
        class="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center md:justify-between
             w-full max-w-6xl mx-auto p-6 sm:p-8 space-y-6 md:space-y-0 md:space-x-6"
    >
      <!-- Imagen + Texto a la izquierda -->
      <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
        <img
            src="../assets/smart-home/not-home.png"
            alt="Sin hogares"
            class="h-24 w-24 sm:h-32 sm:w-32 object-contain"
        />
        <div class="text-center sm:text-left">
          <h1 class="text-gray-800 text-xl sm:text-2xl font-semibold">
            No se ha registrado ningún hogar en tu cuenta
          </h1>
          <p class="text-gray-600 text-sm sm:text-base">
            Para comenzar, registra un hogar desde el panel principal.
          </p>
        </div>
      </div>
      <!-- Botón a la derecha (patrón Z) -->
      <Button
          _texto="Registrar Hogar"
          class="w-full md:w-auto bg-blue-500 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg"
          @click="onRegisterNext"
      />
    </div>

    <!-- Vista con hogares registrados -->
    <div v-else class="w-full max-w-6xl mx-auto">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 class="text-2xl font-semibold">Hogares Registrados</h2>
        <div class="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-0 md:space-x-[-1px]">
          <!-- Agregar Hogar -->
          <Button
              _texto="Agregar Nuevo Hogar"
              class="w-full sm:w-auto bg-blue-500 text-white font-semibold px-4 sm:px-6 py-2 rounded-t-lg sm:rounded-l-lg"
              @click="onRegisterNext"
          />
          <!-- Editar Hogar -->
          <router-link to="/home/edit" class="block w-full sm:w-auto">
            <Button
                _texto="Editar Hogar"
                class="w-full sm:w-auto bg-orange-500 text-white font-semibold px-4 sm:px-6 py-2"
            />
          </router-link>
          <!-- Eliminar Hogar -->
          <router-link to="/home/delete" class="block w-full sm:w-auto">
            <Button
                _texto="Eliminar Hogar"
                class="w-full sm:w-auto bg-red-500 text-white font-semibold px-4 sm:px-6 py-2 rounded-b-lg sm:rounded-r-lg"
            />
          </router-link>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div
            v-for="home in homes"
            :key="home.id"
            class="border rounded-lg p-4 bg-white shadow flex flex-col"
        >
          <h3 class="text-lg sm:text-xl font-bold mb-2">{{ home.name }}</h3>
          <p class="text-sm sm:text-base"><strong>Dirección:</strong> {{ home.address }}</p>
          <p class="text-sm sm:text-base"><strong>Tipo:</strong> {{ home.propertyType }}</p>
          <p class="text-sm sm:text-base"><strong>Habitaciones:</strong> {{ home.bedrooms }}</p>
          <p class="text-sm sm:text-base"><strong>Baños:</strong> {{ home.bathrooms }}</p>
          <p class="text-sm sm:text-base"><strong>Calefacción:</strong> {{ home.heating ? 'Sí' : 'No' }}</p>
          <p class="text-sm sm:text-base"><strong>Agua:</strong> {{ home.waterSupply }}</p>
          <p class="text-sm sm:text-base"><strong>Internet:</strong> {{ home.internetProvider }}</p>
          <p class="text-sm sm:text-base"><strong>Seguridad:</strong> {{ home.securitySystem }}</p>
          <p class="text-sm sm:text-base"><strong>Smart Features:</strong> {{ home.smartFeatures }}</p>
          <div class="mt-4">
            <strong>Foto:</strong>
            <img
                :src="home.photoURL"
                alt="Imagen de {{ home.name }}"
                class="mt-2 max-h-56 w-full object-cover rounded"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Button from '../components/shared/Button.vue';
import type {Home} from "../interfaces/Home.ts";

export default defineComponent({
  name: 'InitHomeSpace',
  components: { Button },
  emits: ['next'],
  setup(_, { emit }) {
    const homes = ref<Home[]>([]);
    const loading = ref(true);
    const selectedHomeId = ref<number | null>(null);

    const loadHomes = async () => {
      try {
        const res = await fetch('https://fake-api-smartguard.vercel.app/homes');
        if (!res.ok) throw new Error('Error cargando hogares');
        homes.value = await res.json();
      } catch (e) {
        console.error(e);
        homes.value = [];
      } finally {
        loading.value = false;
      }
    };

    const onRegisterNext = () => {
      emit('next');
    };

    onMounted(loadHomes);

    return { homes, loading, selectedHomeId, onRegisterNext };
  }
});
</script>

<style scoped>
</style>
