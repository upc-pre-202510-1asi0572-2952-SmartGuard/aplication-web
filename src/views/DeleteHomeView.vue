<!-- src/views/DeleteHomeView.vue -->
<template>
  <WrapperScreen>
    <div class="mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h1 class="text-2xl font-semibold mb-6 text-red-600">
        Eliminar Hogar
      </h1>
      <p v-if="errorMsg" class="text-red-600 text-sm">{{ errorMsg }}</p>
        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-bold truncate">{{ home.nombre }}</h2>
          <div class="text-sm w-full flex justify-between gap-4">
            <span class="font-bold">Dirección:</span>
            <span>{{ home.direccion }}</span>
          </div>

          <div class="text-sm w-full flex justify-between gap-4">
            <span class="font-bold">Tipo:</span>
            <span>{{ home.tipoPropiedad }}</span>
          </div>

          <div class="text-sm w-full flex justify-between gap-4">
            <span class="font-bold">Habitaciones:</span>
            <span>{{ home.habitaciones }}</span>
          </div>

          <div class="text-sm w-full flex justify-between gap-4">
            <span class="font-bold">Baños:</span>
            <span>{{ home.baños }}</span>
          </div>

          <div class="text-sm w-full flex justify-between gap-4">
            <span class="font-bold">Calefacción:</span>
            <span>{{ home.calefaccion ? 'Sí' : 'No' }}</span>
          </div>

          <div class="text-sm w-full flex justify-between gap-4">
            <span class="font-bold">Agua:</span>
            <span>{{ home.abastecimientoAgua }}</span>
          </div>

          <div class="text-sm w-full flex justify-between gap-4">
            <span class="font-bold">Internet:</span>
            <span>{{ home.proveedorInternet }}</span>
          </div>

          <div class="text-sm w-full flex justify-between gap-4">
            <span class="font-bold">Seguridad:</span>
            <span>{{ home.sistemaSeguridad }}</span>
          </div>

          <div class="text-sm w-full flex justify-between gap-4">
            <span class="font-bold">Smart Features:</span>
            <span>{{ home.funcionesInteligentes }}</span>
          </div>
          <img
              v-if="home.imgUrl"
              :src="home.imgUrl"
              :alt="`Foto de ${home.nombre}`"
              class="w-full h-48 object-cover rounded mt-2"
          />
          <div class="flex flex-col sm:flex-row justify-end gap-4 mt-6">
            <Button
                @click="onDeleteHome"
                class="bg-red-600 font-semibold"
                _texto="Confirmar Eliminación"
            />
            <Button @click="cancel"   _texto="Cancelar"  class="bg-gray-300 font-bold"/>
          </div>
        </div>
      </div>

  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter,useRoute  } from 'vue-router';
import WrapperScreen from '../components/WrapperScreen.vue';
import InputTexto from '../components/shared/InputTexto.vue';
import type {Home} from "../interfaces/Home.ts";
import normalizeKeys from "../utils/normalizeKeys.ts";
const backendUrl = import.meta.env.VITE_BACKEND_API_URL

const initialHome={
  id: '',
  nombre: '',
  direccion: '',
  tipoPropiedad: '',
  habitaciones: 0,
  baños: 0,
  calefaccion: false,
  nickname:'',
  abastecimientoAgua: '',
  proveedorInternet: '',
  sistemaSeguridad: '',
  funcionesInteligentes: 0,
  imgUrl: ''
}
export default defineComponent({
  name: 'DeleteHomeView',
  components: { WrapperScreen, InputTexto },
  setup() {
    const route = useRoute();
    const selectedHomeId = route.params.id;
    const router = useRouter();
    const step = ref<number>(1);
    const inputId = ref<string>('');
    const errorMsg = ref<string>('');
    const loading = ref<boolean>(false);
    const homes = ref<Home[]>([]);
    const home = ref<Home>(initialHome);



    async function loadSelectedHome(){
      errorMsg.value = '';
      if (!selectedHomeId) {
        errorMsg.value = 'Ingresa un ID válido.';
        return;
      }
      try {
        const hogarRes = await fetch(
            `${backendUrl}/api/v1/hogarMysql/${selectedHomeId}`
        );
        if (hogarRes.status === 404) {
          errorMsg.value = `No existe un hogar con ID ${selectedHomeId}.`;
          return;
        }
        if (!hogarRes.ok) throw new Error(`HTTP ${hogarRes.status}`);
        const hogarData:Home = await hogarRes.json();
        home.value = normalizeKeys(hogarData);
        step.value = 2;
      } catch (e) {
        errorMsg.value = 'Error al buscar el hogar.';
        console.error(e);
      }
    }

    const onDeleteHome = async () => {
      if (!selectedHomeId) return;
      if (!confirm(`¿Eliminar el hogar “${home.value.nombre}”?`)) return;
      try {
        const hogarRes = await fetch(
            `${backendUrl}/api/v1/hogarMysql/${selectedHomeId}`,
            { method: 'DELETE' }
        );
        if (!hogarRes.ok) throw new Error(`HTTP ${hogarRes.status}`);
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
    loadSelectedHome();

    return {
      homes,
      step,
      inputId,
      errorMsg,
      loading,
      selectedHomeId,
      home,
      loadSelectedHome,
      onDeleteHome,
      cancel
    };
  }
});
</script>

<style scoped>
/* No requiere estilos extra, usa Tailwind en el template */
</style>
