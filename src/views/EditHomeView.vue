<!-- src/views/EditHomeView.vue -->
<template>
  <WrapperScreen>
    <div class="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h1 class="text-2xl font-semibold mb-6">Editar Hogar por ID</h1>

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

      <div v-else class="space-y-4">
        <h2 class="text-xl font-medium mb-4">Editando hogar ID: {{ home.id }}</h2>
        <form @submit.prevent="onUpdateHome" class="grid grid-cols-1 gap-4">
          <InputTexto label="Nombre" v-model="home.nombre" required />
          <InputTexto label="Dirección" v-model="home.direccion" required />
          <InputTexto
              label="Tipo de Propiedad"
              v-model="home.tipoPropiedad"
              required
          />
          <InputTexto
              label="Habitaciones"
              type="number"
              v-model.number="home.habitaciones"
              required
          />
          <InputTexto
              label="Baños"
              type="number"
              v-model.number="home.baños"
              required
          />
          <label class="flex items-center">
            <input type="checkbox" v-model="home.calefaccion" class="mr-2" />
            Calefacción
          </label>
          <InputTexto
              label="Abastecimiento de Agua"
              v-model="home.abastecimientoAgua"
              required
          />
          <InputTexto
              label="Proveedor de Internet"
              v-model="home.proveedorInternet"
              required
          />
          <InputTexto
              label="Sistema de Seguridad"
              v-model="home.sistemaSeguridad"
              required
          />
          <InputTexto
              label="Funciones Inteligentes"
              type="number"
              v-model.number="home.funcionesInteligentes"
              required
          />
          <InputTexto label="URL de Imagen" v-model="home.imgUrl" />
          <img
              v-if="home.imgUrl"
              :src="home.imgUrl"
              alt="Foto hogar"
              class="w-52 h-36 object-cover rounded mt-2"
          />
          <div class="flex justify-center mt-4 space-x-4">
            <button
                type="submit"
                class="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700"
            >
              Guardar Cambios
            </button>
            <button
                type="button"
                @click="cancel"
                class="bg-gray-500 text-white px-8 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancelar
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
import type { Home } from '../interfaces/Home.ts';
import InputTexto from '../components/shared/InputTexto.vue';
import WrapperScreen from '../components/WrapperScreen.vue';

export default defineComponent({
  name: 'EditHomeView',
  components: { WrapperScreen, InputTexto },
  setup() {
    const router = useRouter();
    const step = ref(1);
    const inputId = ref<string>('');
    const errorMsg = ref<string>('');

    // Nickname del usuario (no editable aquí)
    const nickname = localStorage.getItem('nickname') || '';

    const home = reactive<Home>({
      id:       undefined,
      nombre:   '',
      direccion:'',
      tipoPropiedad: '',
      habitaciones:  0,
      baños:         0,
      calefaccion:   false,
      nickname,  // asignamos pero no se muestra
      abastecimientoAgua:    '',
      proveedorInternet:     '',
      sistemaSeguridad:      '',
      funcionesInteligentes: 0,
      imgUrl:                ''
    });

    const backend = import.meta.env.VITE_BACKEND_API_URL;

    const findHome = async () => {
      errorMsg.value = '';
      if (!inputId.value.trim()) {
        errorMsg.value = 'Ingresa un ID válido.';
        return;
      }
      try {
        const res = await fetch(
            `${backend}/api/v1/hogarMysql/${inputId.value.trim()}`
        );
        if (res.status === 404) {
          errorMsg.value = `No existe un hogar con ID ${inputId.value}.`;
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const d = await res.json();
        home.id                   = d.Id;
        home.nombre               = d.Nombre;
        home.direccion            = d.Direccion;
        home.tipoPropiedad        = d.TipoPropiedad;
        home.habitaciones         = d.Habitaciones;
        home.baños                = d.Baños;
        home.calefaccion          = d.Calefaccion;
        home.abastecimientoAgua   = d.AbastecimientoAgua;
        home.proveedorInternet    = d.ProveedorInternet;
        home.sistemaSeguridad     = d.SistemaSeguridad;
        home.funcionesInteligentes= d.FuncionesInteligentes;
        home.imgUrl               = d.ImgUrl;
        step.value = 2;
      } catch (e) {
        errorMsg.value = 'Error al buscar el hogar.';
        console.error(e);
      }
    };

    const onUpdateHome = async () => {
      try {
        // armamos el body incluyendo el nickname
        const payload = {
          Id:                    home.id,
          Nombre:                home.nombre,
          Direccion:             home.direccion,
          TipoPropiedad:         home.tipoPropiedad,
          Habitaciones:          home.habitaciones,
          Baños:                 home.baños,
          Calefaccion:           home.calefaccion,
          AbastecimientoAgua:    home.abastecimientoAgua,
          ProveedorInternet:     home.proveedorInternet,
          SistemaSeguridad:      home.sistemaSeguridad,
          FuncionesInteligentes: home.funcionesInteligentes,
          ImgUrl:                home.imgUrl,
          Nickname:              home.nickname
        };
        const res = await fetch(
            `${backend}/api/v1/hogarMysql`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
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

    return {
      step,
      inputId,
      errorMsg,
      home,
      findHome,
      onUpdateHome,
      cancel,
    };
  },
});
</script>

<style scoped></style>
