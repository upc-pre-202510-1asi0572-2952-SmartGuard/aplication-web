<!-- src/views/EditHomeView.vue -->
<template>
  <WrapperScreen>
    <div class="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h1 class="text-2xl font-semibold mb-6">Editar Hogar </h1>
      <p v-if="errorMsg" class="text-red-600 text-sm mb-4">{{ errorMsg }}</p>
      <div class="space-y-4">
        <h2 class="text-xl font-medium mb-4">Datos a actualizar</h2>
        <form @submit.prevent="onUpdateHome" class="grid grid-cols-1 gap-4">
          <div class="h-[350px] overflow-y-scroll py-4 border-gray-300 border-t-1 border-b-1">
            <InputTexto label="Nombre" v-model="home.nombre" required />
            <InputTexto label="Dirección" v-model="home.direccion" required />
            <InputTexto label="Tipo de Propiedad" v-model="home.tipoPropiedad" required />
            <InputTexto label="Habitaciones" type="number" v-model.number="home.habitaciones" required />
            <InputTexto label="Baños" type="number" v-model.number="home.baños" required />
            <label class="flex items-center">
              <input type="checkbox" v-model="home.calefaccion" class="mr-2" />
              Calefacción
            </label>
            <InputTexto label="Abastecimiento de Agua" v-model="home.abastecimientoAgua" required />
            <InputTexto label="Proveedor de Internet" v-model="home.proveedorInternet" required />
            <InputTexto label="Sistema de Seguridad" v-model="home.sistemaSeguridad" required />
            <InputTexto label="Funciones Inteligentes" type="number" v-model.number="home.funcionesInteligentes"
                        required />
            <InputTexto
                label="URL Imagen"
                v-model="home.imgUrl"
                required
            />
          </div>
          <img v-if="home.imgUrl" :src="home.imgUrl" alt="Foto hogar" class="w-52 h-36 object-cover rounded mt-2" />
          <div class="flex justify-center mt-4 gap-4">
            <Button type="submit"  _texto="Guardar Cambios"  class="bg-green-600 font-bold"/>
            <Button @click="cancel"   _texto="Cancelar"  class="bg-gray-500 font-bold"/>
          </div>
        </form>
      </div>
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter,useRoute  } from 'vue-router';
import type { Home } from '../interfaces/Home.ts';
import InputTexto from '../components/shared/InputTexto.vue';
import WrapperScreen from '../components/WrapperScreen.vue';
import normalizeKeys from "../utils/normalizeKeys.ts";
const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
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
  name: 'EditHomeView',
  components: { WrapperScreen, InputTexto },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const selectedHomeId = route.params.id;
    const step = ref(1);
    const errorMsg = ref<string>('');

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

    const onUpdateHome = async () => {
      try {

        const request=home.value;
        const res = await fetch(
          `${backendUrl}/api/v1/hogarMysql`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        alert('🏠 Hogar actualizado correctamente.');
        router.push({ name: 'home' });
      } catch (e) {
        errorMsg.value = 'Error al actualizar el hogar.';
        console.error(e);
      }
    };

    const cancel = () => router.push({ name: 'home' });
    loadSelectedHome();
    return {
      loadSelectedHome,
      homes,
      step,
      errorMsg,
      selectedHomeId,
      home,
      onUpdateHome,
      cancel,
    };
  },
});
</script>

<style scoped></style>
