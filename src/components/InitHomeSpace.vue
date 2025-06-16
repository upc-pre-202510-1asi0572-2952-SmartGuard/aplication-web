<template>
  <div class="p-4 sm:p-8">
    <!-- Selector de usuario (sólo uno por ahora) -->
    <div class="mb-6 flex items-center space-x-2">
      <label class="font-medium">Usuario:</label>
      <select v-model="selectedNickname" @change="loadHomes" class="border px-3 py-2 rounded">
        <option :value="nickname">{{ nickname }}</option>
      </select>
    </div>

    <!-- Indicador de carga -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <span>Cargando hogares...</span>
    </div>

    <!-- Si no hay hogares -->
    <div
        v-else-if="homes.length === 0"
        class="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center md:justify-between
             w-full max-w-6xl mx-auto p-6 sm:p-8 space-y-6 md:space-y-0 md:space-x-6"
    >
      <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
        <img
            src="../assets/smart-home/not-home.png"
            alt="Sin hogares"
            class="h-24 w-24 sm:h-32 sm:w-32 object-contain"
        />
        <div class="text-center sm:text-left">
          <h1 class="text-gray-800 text-xl sm:text-2xl font-semibold">
            No hay hogares registrados para “{{ selectedNickname }}”
          </h1>
          <p class="text-gray-600 text-sm sm:text-base">
            Para comenzar, registra un hogar desde el panel principal.
          </p>
        </div>
      </div>
      <Button
          _texto="Registrar Hogar"
          class="w-full md:w-auto bg-blue-500 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg"
          @click="onRegisterNext"
      />
    </div>

    <!-- Lista de hogares -->
    <div v-else class="w-full max-w-6xl mx-auto">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 class="text-2xl font-semibold">Hogares de {{ selectedNickname }}</h2>
        <div class="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 md:space-x-[-1px]">
          <Button
              _texto="Agregar Nuevo Hogar"
              class="w-full sm:w-auto bg-blue-500 text-white font-semibold px-4 sm:px-6 py-2 rounded-t-lg sm:rounded-l-lg"
              @click="onRegisterNext"
          />
          <router-link to="/home/edit" class="block w-full sm:w-auto">
            <Button
                _texto="Editar Hogar"
                class="w-full sm:w-auto bg-orange-500 text-white font-semibold px-4 sm:px-6 py-2"
            />
          </router-link>
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
            v-for="h in homes"
            :key="h.id"
            class="border rounded-lg p-4 bg-white shadow flex flex-col"
        >
          <h3 class="text-lg sm:text-xl font-bold mb-2">{{ h.nombre }}</h3>
          <p class="text-sm sm:text-base"><strong>Dirección:</strong> {{ h.direccion }}</p>
          <p class="text-sm sm:text-base"><strong>Tipo:</strong> {{ h.tipoPropiedad }}</p>
          <p class="text-sm sm:text-base"><strong>Habitaciones:</strong> {{ h.habitaciones }}</p>
          <p class="text-sm sm:text-base"><strong>Baños:</strong> {{ h.baños }}</p>
          <p class="text-sm sm:text-base"><strong>Calefacción:</strong> {{ h.calefaccion ? 'Sí' : 'No' }}</p>
          <p class="text-sm sm:text-base"><strong>Agua:</strong> {{ h.abastecimientoAgua }}</p>
          <p class="text-sm sm:text-base"><strong>Internet:</strong> {{ h.proveedorInternet }}</p>
          <p class="text-sm sm:text-base"><strong>Seguridad:</strong> {{ h.sistemaSeguridad }}</p>
          <p class="text-sm sm:text-base"><strong>Funciones Inteligentes:</strong> {{ h.funcionesInteligentes }}</p>
          <div class="mt-4">
            <strong>Imagen:</strong>
            <img
                :src="h.imgUrl"
                alt="Imagen de {{ h.nombre }}"
                class="mt-2 max-h-56 w-full object-cover rounded"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Button from '../components/shared/Button.vue';
import type { Home } from '../interfaces/Home.ts';

export default defineComponent({
  name: 'InitHomeSpace',
  components: { Button },
  emits: ['next'],
  setup(_, { emit }) {
    const nickname = localStorage.getItem('nickname')??"";
    const selectedNickname = ref<string>(nickname);
    const homes = ref<Home[]>([]);
    const loading = ref<boolean>(true);

    async function loadHomes() {
      loading.value = true;
      try {
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/hogares/propietario/${selectedNickname.value}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        homes.value = (data as any[]).map(d => ({
          id:                    d.Id,
          nombre:                d.Nombre,
          direccion:             d.Direccion,
          propietarioId:         d.PropietarioId,
          imgUrl:                d.ImgUrl,
          tipoPropiedad:         d.TipoPropiedad,
          habitaciones:          d.Habitaciones,
          baños:                 d.Baños,
          calefaccion:           d.Calefaccion,
          abastecimientoAgua:    d.AbastecimientoAgua,
          proveedorInternet:     d.ProveedorInternet,
          sistemaSeguridad:      d.SistemaSeguridad,
          funcionesInteligentes: d.FuncionesInteligentes,
          nickname:              d.PropietarioId  // si quieres verlo en el objeto
        }));
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

    // carga inicial
    loadHomes();

    return {
      nickname,
      selectedNickname,
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
