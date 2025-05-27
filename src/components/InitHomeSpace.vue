<!-- src/components/InitHomeSpace.vue -->
<template>
  <div class="p-8">
    <!-- Indicador de carga -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <span>Cargando hogares...</span>
    </div>

    <!-- Vista sin hogares -->
    <div
        v-else-if="homes.length === 0"
        class="bg-white rounded-2xl shadow-lg flex items-center justify-between
             w-full max-w-6xl mx-auto p-8 space-x-6"
    >
      <!-- Imagen + Texto a la izquierda -->
      <div class="flex items-center gap-6">
        <img
            src="../assets/smart-home/not-home.png"
            alt="Sin hogares"
            class="h-32 w-32 object-contain"
        />
        <div>
          <h1 class="text-gray-800 text-2xl font-semibold">
            No se ha registrado ningún hogar en tu cuenta
          </h1>
          <p class="text-gray-600">
            Para comenzar, registra un hogar desde el panel principal.
          </p>
        </div>
      </div>
      <!-- Botón a la derecha (patrón Z) -->
      <Button
          _texto="Registrar Hogar"
          class="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg"
          @click="onRegisterNext"
      />
    </div>

    <!-- Vista con hogares registrados -->
    <div v-else class="w-full max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">Hogares Registrados</h2>
        <Button
            _texto="Agregar Nuevo Hogar"
            class="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg"
            @click="onRegisterNext"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
            v-for="home in homes"
            :key="home.id"
            class="border rounded-lg p-4 bg-white shadow"
        >
          <h3 class="text-xl font-bold mb-2">{{ home.name }}</h3>
          <p><strong>Dirección:</strong> {{ home.address }}</p>
          <p><strong>Tipo:</strong> {{ home.propertyType }}</p>
          <p><strong>Habitaciones:</strong> {{ home.bedrooms }}</p>
          <p><strong>Baños:</strong> {{ home.bathrooms }}</p>
          <p><strong>Calefacción:</strong> {{ home.heating ? 'Sí' : 'No' }}</p>
          <p><strong>Agua:</strong> {{ home.waterSupply }}</p>
          <p><strong>Internet:</strong> {{ home.internetProvider }}</p>
          <p><strong>Seguridad:</strong> {{ home.securitySystem }}</p>
          <p><strong>Smart Features:</strong> {{ home.smartFeatures }}</p>
          <div class="mt-4"><strong>Foto:</strong>
             <img
                 :src="home.photoURL"
                 alt="Imagen de {{ home.name }}"
                 class="mt-2 max-h-70 w-full object-cover rounded"
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

    const loadHomes = async () => {
      try {
        const res = await fetch('http://localhost:3000/homes');
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

    return { homes, loading, onRegisterNext };
  }
});
</script>

<style scoped>
/* Ajustes opcionales de scroll o responsividad */
</style>
