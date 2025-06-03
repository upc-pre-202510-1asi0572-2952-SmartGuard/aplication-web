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
            type="number"
            v-model.number="inputId"
        />
        <!-- Mensaje de error debajo del input -->
        <p v-if="errorMsg" class="text-red-600 text-sm">{{ errorMsg }}</p>

        <div class="flex justify-center gap-9">
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
          <h2 class="text-xl font-bold truncate">{{ home.name }}</h2>
          <p class="text-sm"><strong>Dirección:</strong> {{ home.address }}</p>
          <p class="text-sm"><strong>Tipo:</strong> {{ home.propertyType }}</p>
          <p class="text-sm"><strong>Habitaciones:</strong> {{ home.bedrooms }}</p>
          <p class="text-sm"><strong>Baños:</strong> {{ home.bathrooms }}</p>
          <p class="text-sm">
            <strong>Calefacción:</strong> {{ home.heating ? 'Sí' : 'No' }}
          </p>
          <p class="text-sm"><strong>Agua:</strong> {{ home.waterSupply }}</p>
          <p class="text-sm"><strong>Internet:</strong> {{ home.internetProvider }}</p>
          <p class="text-sm"><strong>Seguridad:</strong> {{ home.securitySystem }}</p>
          <p class="text-sm"><strong>Smart Features:</strong> {{ home.smartFeatures }}</p>
          <img
              v-if="home.photoURL"
              :src="home.photoURL"
              :alt="`Foto de ${home.name}`"
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
import WrapperScreen from "../components/WrapperScreen.vue";
import InputTexto from "../components/shared/InputTexto.vue";
import type {Home} from "../interfaces/Home.ts";


export default defineComponent({
  name: 'DeleteHomeView',
  components: { WrapperScreen, InputTexto },
  setup() {
    const router = useRouter();
    const step = ref(1);
    const inputId = ref<number | null>(null);
    const errorMsg = ref('');
    const home = ref<Home | null>(null);
    const loading = ref(false);

    const findHome = async () => {
      errorMsg.value = '';
      if (!inputId.value || inputId.value <= 0) {
        errorMsg.value = 'Ingresa un ID válido.';
        return;
      }

      loading.value = true;
      try {
        const res = await fetch(`https://fake-api-smartguard.vercel.app/homes/${inputId.value}`);
        if (res.status === 404) {
          errorMsg.value = `No existe un hogar con ID ${inputId.value}.`;
          return;                 // <— No avanzamos al paso 2
        }
        home.value = await res.json();
        step.value = 2;           // <— Sólo si encontramos datos
      } catch {
        errorMsg.value = 'Error al buscar el hogar.';
      } finally {
        loading.value = false;
      }
    };

    const onDeleteHome = async () => {
      if (!home.value) return;
      try {
        await fetch(`https://fake-api-smartguard.vercel.app/homes/${inputId.value}`, { method: 'DELETE' });
        router.push({ name: 'home' });
      } catch {
        errorMsg.value = 'Error al eliminar el hogar.';
      }
    };

    const cancel = () => {
      router.push({ name: 'home' });
    };

    return {
      step,
      inputId,
      errorMsg,
      home,
      loading,
      findHome,
      onDeleteHome,
      cancel
    };
  }
});
</script>

<style scoped>
/* Responsive tweaks si los necesitas */
</style>
