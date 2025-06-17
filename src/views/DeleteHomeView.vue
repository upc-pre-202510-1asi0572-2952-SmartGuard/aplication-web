<!-- src/views/DeleteHomeView.vue -->
<template>
  <WrapperScreen>
    <div class="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h1 class="text-2xl font-semibold mb-6 text-red-600">
        Eliminar Hogar por ID
      </h1>

      <!-- Paso 1: solicitar ID -->
      <div v-if="step === 1" class="space-y-4">
        <InputTexto
            _placeholder="ID del Hogar"
            type="text"
            v-model="inputId"
        />
        <p v-if="errorMsg" class="text-red-600 text-sm">{{ errorMsg }}</p>

        <div class="flex justify-center gap-4">
          <button
              @click="findHome"
              class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Buscar
          </button>
          <button
              @click="cancel"
              class="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>

      <!-- Paso 2: mostrar detalle y confirmación -->
      <div v-else class="space-y-6">
        <div v-if="loading" class="flex justify-center items-center h-48">
          <span>Cargando...</span>
        </div>

        <div v-else-if="home" class="space-y-4">
          <h2 class="text-xl font-bold truncate">{{ home.nombre }}</h2>
          <p class="text-sm"><strong>Dirección:</strong> {{ home.direccion }}</p>
          <p class="text-sm"><strong>Tipo:</strong> {{ home.tipoPropiedad }}</p>
          <p class="text-sm"><strong>Habitaciones:</strong> {{ home.habitaciones }}</p>
          <p class="text-sm"><strong>Baños:</strong> {{ home.baños }}</p>
          <p class="text-sm"><strong>Calefacción:</strong> {{ home.calefaccion ? 'Sí' : 'No' }}</p>
          <p class="text-sm"><strong>Agua:</strong> {{ home.abastecimientoAgua }}</p>
          <p class="text-sm"><strong>Internet:</strong> {{ home.proveedorInternet }}</p>
          <p class="text-sm"><strong>Seguridad:</strong> {{ home.sistemaSeguridad }}</p>
          <p class="text-sm"><strong>Smart Features:</strong> {{ home.funcionesInteligentes }}</p>
          <img
              v-if="home.imgUrl"
              :src="home.imgUrl"
              :alt="`Foto de ${home.nombre}`"
              class="w-full h-48 object-cover rounded mt-2"
          />
          <div class="flex flex-col sm:flex-row justify-end gap-4 mt-6">
            <button
                @click="onDeleteHome"
                class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 w-full sm:w-auto"
            >
              Confirmar Eliminación
            </button>
            <button
                @click="cancel"
                class="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg w-full sm:w-auto"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import WrapperScreen from '../components/WrapperScreen.vue';
import InputTexto from '../components/shared/InputTexto.vue';
import type { Home } from '../interfaces/Home.ts';

export default defineComponent({
  name: 'DeleteHomeView',
  components: { WrapperScreen, InputTexto },
  setup() {
    const router = useRouter();
    const step = ref<number>(1);
    const inputId = ref<string>('');
    const errorMsg = ref<string>('');
    const loading = ref<boolean>(false);
    const home = ref<Home | null>(null);

    const backend = import.meta.env.VITE_BACKEND_API_URL;

    const findHome = async () => {
      errorMsg.value = '';
      if (!inputId.value.trim()) {
        errorMsg.value = 'Ingresa un ID válido.';
        return;
      }
      loading.value = true;
      try {
        const res = await fetch(
            `${backend}/api/v1/hogarMysql/${encodeURIComponent(inputId.value.trim())}`
        );
        if (res.status === 404) {
          errorMsg.value = `No existe un hogar con ID ${inputId.value}.`;
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const d = await res.json();
        home.value = {
          id:            d.Id,
          nombre:          d.Nombre,
          direccion:       d.Direccion,
          tipoPropiedad:  d.TipoPropiedad,
          habitaciones:      d.Habitaciones,
          baños:     d.Baños,
          calefaccion:       d.Calefaccion,
          nickname: d.PropietarioId,
          abastecimientoAgua:   d.AbastecimientoAgua,
          proveedorInternet: d.ProveedorInternet,
          sistemaSeguridad:    d.SistemaSeguridad,
          funcionesInteligentes:     d.FuncionesInteligentes,
          imgUrl:      d.ImgUrl
        };
        step.value = 2;
      } catch (err) {
        errorMsg.value = 'Error al buscar el hogar.';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    const onDeleteHome = async () => {
      if (!home.value) return;
      if (!confirm(`¿Eliminar el hogar “${home.value.nombre}”?`)) return;
      try {
        const res = await fetch(
            `${backend}/api/v1/hogarMysql/${encodeURIComponent(inputId.value.trim())}`,
            { method: 'DELETE' }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        alert('🏠 Hogar eliminado correctamente.');
        router.push({ name: 'home' });
      } catch (err) {
        errorMsg.value = 'Error al eliminar el hogar.';
        console.error(err);
      }
    };

    const cancel = () => {
      router.push({ name: 'home' });
    };

    return {
      step,
      inputId,
      errorMsg,
      loading,
      home,
      findHome,
      onDeleteHome,
      cancel
    };
  }
});
</script>

<style scoped>
/* No requiere estilos extra, usa Tailwind en el template */
</style>
