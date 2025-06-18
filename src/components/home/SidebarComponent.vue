<template>
  <aside class="bg-white text-black border-b border-gray-300 p-4">
    <!-- Logo + Toggle móvil -->
    <div class="flex items-center justify-between px-2">
      <div class="flex items-center gap-2">
        <img src="../../assets/smart-home/logo-smart-home.png" class="w-6 h-6" alt="Logo" />
        <span class="text-xl font-bold hidden lg:inline">FaceLock</span>
      </div>
      <Button class="md:hidden" _texto="☰" @click="toggleMenu" />
    </div>
    <!-- Navegación -->
    <div v-show="isExpanded || isDesktop" class="mt-4 overflow-x-auto md:overflow-visible">
      <nav class="flex md:flex-col gap-4 whitespace-nowrap" role="navigation">
        <!-- Usuario -->
        <div class="px-2 flex flex-row justify-start gap-2 items-center">
          <img
              v-if="currentUser"
              :src="currentUser.photoUrl"
              alt="Foto de perfil"
              class="w-6 h-6 object-cover rounded-full shadow-md"
          />
          <div class="hidden lg:flex flex-col gap-0">
            <span class="text-gray-600 text-sm">Bienvenido a casa,</span>
            <span class="text-black font-bold">{{ currentUser?.nombre }}</span>
          </div>
        </div>
        <!-- Links -->
        <template v-for="(link, i) in links" :key="i">
          <LinkButton
              v-if="link.text !== 'Salir'"
              :text="link.text"
              :iconClass="link.iconClass"
              :route="link.route"
              class="min-w-max"
          />
        </template>
        <!-- Botón de Logout -->
        <button
            @click="logout"
            class="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded min-w-max"
        >
          <i class="pi pi-sign-out"></i>
          <span>Salir</span>
        </button>
      </nav>
    </div>
  </aside>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import LinkButton from './LinkButton.vue';
import Button from '../shared/Button.vue';
import normalizeKeys from "../../utils/normalizeKeys.ts";
import type {Profile} from "../../interfaces/Profile.ts";
const initialProfile = {
  id: '',
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  fechaNacimiento: '',
  genero: '',
  ubicacion: '',
  ocupacion: '',
  direccion: '',
  contrasenia:'',
  photoUrl:'',
};


interface Link {
  text: string;
  iconClass: string;
  route: string;
}

const router = useRouter();
const backendUrl = import.meta.env.VITE_BACKEND_API_URL!;

const links = ref<Link[]>([
  { text: 'Hogar', iconClass: 'pi pi-home', route: '/home' },
  { text: 'Dispositivos', iconClass: 'pi pi-desktop', route: '/device-management' },
  { text: 'Accesos', iconClass: 'pi pi-clone', route: '/access' },
  { text: 'Miembros', iconClass: 'pi pi-users', route: '/members' },
  { text: 'Estadísticas', iconClass: 'pi pi-chart-line', route: '/stadisticas' },
  { text: 'Perfil', iconClass: 'pi pi-user', route: '/profile' },
  { text: 'Configuraciones', iconClass: 'pi pi-cog', route: '/configuration' },
  { text: 'Conseguir Premium', iconClass: 'pi pi-star', route: '/membership' },
  { text: 'Ayuda y Soporte', iconClass: 'pi pi-question-circle', route: '/support' },
  // quitamos el link de 'Salir' aquí para manejarlo aparte
]);

const isExpanded = ref(false);
const isDesktop = ref(window.innerWidth >= 768);
const updateWidth = () => {
  isDesktop.value = window.innerWidth >= 768;
  isExpanded.value = isDesktop.value;
};
const toggleMenu = () => {
  isExpanded.value = !isExpanded.value;
};

const currentUser = ref<Profile>(initialProfile);

onMounted(async () => {
  updateWidth();
  window.addEventListener('resize', updateWidth);

  try {
    const nickname = localStorage.getItem('nickname');
    if (!nickname) throw new Error('No hay usuario logueado');
    const res = await fetch(
        `${backendUrl}/api/v1/usuarioMysql/${nickname}`
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data:Profile  = await res.json();
    currentUser.value= normalizeKeys(data)
  } catch (e) {
    console.error(e);
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});

// Función de logout
function logout() {
  localStorage.removeItem('nickname');
  router.push({ name: 'login' });
}
</script>

<style scoped>
div[role="navigation"]::-webkit-scrollbar {
  height: 6px;
}
div[role="navigation"]::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}
</style>
