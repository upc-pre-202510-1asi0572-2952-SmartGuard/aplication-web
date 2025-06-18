<template>
  <div class="p-4 sm:p-8">
    <!-- Header -->
    <HeaderView
        :title="`Gestión de Hogares de “${nickname}”`"
        subtitle="Gestiona tus Hogares IoT y controla el acceso de tu hogar."
    >
      <template #actions>
        <Button
            _texto="Agregar Nuevo Hogar"
            class="bg-blue-500 text-white font-semibold w-full"
            @click="onRegisterNext"
        />
      </template>
    </HeaderView>

    <!-- Si no hay hogares -->
    <EmptyView
        v-if="homes.length === 0"
        :title="`No hay hogares registrados para “${nickname}”`"
        description="Para comenzar, registra un hogar desde el panel principal."
    />

    <!-- Indicador de carga -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <span>Cargando hogares...</span>
    </div>
    <!-- Lista de hogares -->
      <div class="flex flex-col items-center sm:flex-row justify-between sm:items-center mb-6  w-full gap-4">

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
            v-for="h in homes"
            :key="h.id"
            class="bg-white rounded-2xl shadow hover:shadow-lg transform hover:scale-[1.02] transition p-6 flex flex-col gap-2"
        >
          <h3 class="text-lg sm:text-xl font-bold mb-2">{{ h.nombre }}</h3>
          <div class="text-sm sm:text-base w-full flex justify-between gap-4">
            <span class="font-bold">Dirección:</span>
            <span>{{h.direccion}}</span>
          </div>

          <div class="text-sm sm:text-base w-full flex justify-between gap-4">
            <span class="font-bold">Tipo:</span>
            <span>{{ h.tipoPropiedad }}</span>
          </div>

          <div class="text-sm sm:text-base w-full flex justify-between gap-4">
            <span class="font-bold">Habitaciones:</span>
            <span>{{ h.habitaciones }}</span>
          </div>

          <div class="text-sm sm:text-base w-full flex justify-between gap-4">
            <span class="font-bold">Baños:</span>
            <span>{{ h.baños }}</span>
          </div>

          <div class="text-sm sm:text-base w-full flex justify-between gap-4">
            <span class="font-bold">Calefacción:</span>
            <span>{{ h.calefaccion ? 'Sí' : 'No' }}</span>
          </div>

          <div class="text-sm sm:text-base w-full flex justify-between gap-4">
            <span class="font-bold">Agua:</span>
            <span>{{ h.abastecimientoAgua }}</span>
          </div>

          <div class="text-sm sm:text-base w-full flex justify-between gap-4">
            <span class="font-bold">Internet:</span>
            <span>{{ h.proveedorInternet }}</span>
          </div>

          <div class="text-sm sm:text-base w-full flex justify-between gap-4">
            <span class="font-bold">Seguridad:</span>
            <span>{{ h.sistemaSeguridad }}</span>
          </div>

          <div class="text-sm sm:text-base w-full flex justify-between gap-4">
            <span class="font-bold">Funciones Inteligentes:</span>
            <span>{{ h.funcionesInteligentes }}</span>
          </div>
          <div class="mt-4">
            <strong>Imagen:</strong>
            <img
                :src="h.imgUrl"
                :alt="`Imagen de ${h.nombre }`"
                class="mt-2 max-h-56 w-full object-cover rounded"
            />
          </div>
          <router-link :to="`/home/edit/${h.id}`" class="block w-full sm:w-auto">
            <Button
                _texto="Editar Hogar"
                class="bg-orange-500 text-white font-semibold w-full"
            />
          </router-link>
          <router-link :to="`/home/delete/${h.id}`"  class="block w-full sm:w-auto">
            <Button
                _texto="Eliminar Hogar"
                class="bg-red-500 text-white font-semibold w-full  "
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Button from '../components/shared/Button.vue';
import type { Home } from '../interfaces/Home.ts';
import normalizeKeys from "../utils/normalizeKeys.ts";
import HeaderView from "./ui/HeaderView.vue";

export default defineComponent({
  name: 'InitHomeSpace',
  components: {HeaderView, Button },
  emits: ['next'],
  setup(_, { emit }) {
    const nickname = localStorage.getItem('nickname')??"";
 
    const homes = ref<Home[]>([]);
    const loading = ref<boolean>(true);

    async function loadHomes() {
      loading.value = true;
      try {
        const hogarRes = await fetch(
            `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/hogares/propietario/${nickname}`
        );
        if (!hogarRes.ok) throw new Error(`HTTP ${hogarRes.status}`);
        const hogarData = await hogarRes.json();

        homes.value = hogarData.map(normalizeKeys)

      } catch (e) {
        console.error('Error cargando hogares:', e);
        homes.value = [];
      } finally {
        loading.value = false;
      }
    }

    function onRegisterNext() {
      emit('next');
    }

    loadHomes();

    return {
      nickname,
      homes,
      loading,
      loadHomes,
      onRegisterNext
    };
  }
});
</script>

<style scoped>
/* Tailwind aplicado directamente en el template */
</style>
