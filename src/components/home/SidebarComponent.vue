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
              :src="currentUser.foto"
              alt="Foto de perfil"
              class="w-6 h-6 object-cover rounded-full shadow-md"
          />
          <div class="hidden lg:flex flex-col gap-0">
            <span class="text-gray-600 text-sm">Bienvenido a casa,</span>
            <span class="text-black font-bold">{{ currentUser?.nombres }}</span>
          </div>
        </div>
        <LinkButton
            v-for="(link, i) in links"
            :key="i"
            :text="link.text"
            :iconClass="link.iconClass"
            :route="link.route"
            class="min-w-max"
        />
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import LinkButton from './LinkButton.vue';
import Button from '../shared/Button.vue';
import type {User} from "../../interfaces/User.ts";

interface Link {
  text: string;
  iconClass: string;
  route: string;
}

const links = ref<Link[]>([
  { text: 'Hogar', iconClass: 'pi pi-home', route: '/home' },
  { text: 'Accesos', iconClass: 'pi pi-clone', route: '/home' },
  { text: 'Miembros', iconClass: 'pi pi-users', route: '/members' },
  { text: 'Estadísticas', iconClass: 'pi pi-chart-line', route: '/stadisticas' },
  { text: 'Perfil', iconClass: 'pi pi-user', route: '/profile' },
  { text: 'Configuraciones', iconClass: 'pi pi-cog', route: '/configuration' },
  { text: 'Conseguir Premium', iconClass: 'pi pi-star', route: '/membership' },
  { text: 'Salir', iconClass: 'pi pi-sign-out', route: '/login' }
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

const currentUser = ref<User | null>(null);

onMounted(async () => {
  updateWidth();
  window.addEventListener('resize', updateWidth);
  try {
    const res = await fetch('http://localhost:3000/users');
    if (!res.ok) throw new Error('Error al obtener usuarios');
    const users: User[] = await res.json();
    currentUser.value = users[0] || null;
  } catch (e) {
    console.error(e);
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});
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
