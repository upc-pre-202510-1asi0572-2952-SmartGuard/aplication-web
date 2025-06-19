<template>
  <WrapperScreen>
    <div v-if="profile" class="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl px-6 py-10 flex flex-col gap-10">
      <h1 class="text-3xl font-semibold text-center sm:text-left">Perfil de usuario</h1>

      <section class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div class="flex justify-center">
          <img :src="profile.photoUrl" alt="Foto de perfil" class="rounded-full w-40 h-40 object-cover border shadow" />
        </div>

        <div class="flex flex-col gap-4 items-center md:items-start">
          <Button _texto="Editar Usuario" @click="onEditUser" _color="bg-blue-500" />
          <Button _texto="Cambiar Contraseña" @click="onChangePassword" _color="bg-blue-500" />
          <Button _texto="Eliminar cuenta" @click="onDeleteAccount" _color="bg-red-500" />
        </div>
      </section>

      <section class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputTexto label="Nombre" v-model="profile.nombre" />
        <InputTexto label="Apellido" v-model="profile.apellido" />
        <InputTexto label="Fecha de Nacimiento" v-model="fechaNacimientoFormateada" type="date" />
        <InputTexto label="Género" v-model="profile.genero" />
        <InputTexto label="Ocupación" v-model="profile.ocupacion" />
        <InputTexto label="Email" v-model="profile.email" type="email" />
        <InputTexto label="Ubicación" v-model="profile.ubicacion" />
        <InputTexto label="Dirección" v-model="profile.direccion" />
        <InputTexto label="Teléfono Celular" v-model="profile.telefono" type="tel" />
      </section>
    </div>

    <div v-else class="p-10 text-center text-gray-500">Cargando perfil…</div>
  </WrapperScreen>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import WrapperScreen from '../components/WrapperScreen.vue';
import Button from '../components/shared/Button.vue';
import normalizeKeys from "../utils/normalizeKeys";
import type { Profile } from "../interfaces/Profile";

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
const nickname = localStorage.getItem('nickname') || '';
const errorMsg = ref<string>('');
const profile = ref<Profile | null>(null);
const router = useRouter();

async function loadSelectedProfile() {
  errorMsg.value = '';

  try {
    const res = await fetch(`${backendUrl}/api/v1/usuarioMysql/${nickname}`);
    if (res.status === 404) {
      errorMsg.value = `No existe un nickname ${nickname}.`;
      return;
    }

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data: Profile = await res.json();
    profile.value = normalizeKeys(data);
  } catch (err) {
    errorMsg.value = 'Error al cargar perfil.';
    console.error(err);
  }
}

onMounted(loadSelectedProfile);

const onEditUser = () => router.push('/profile/edit');
const onChangePassword = () => router.push('/profile/change-password');

const onDeleteAccount = async () => {
  if (!profile.value) return;
  if (!confirm('¿Eliminar tu cuenta?')) return;

  try {
    await fetch(`${backendUrl}/api/v1/usuarioMysql/${profile.value.id}`, {
      method: 'DELETE'
    });
    localStorage.clear();
    router.push('/login');
  } catch {
    alert('Error al eliminar la cuenta.');
  }
};

const fechaNacimientoFormateada = computed({
  get() {
    return profile.value?.fechaNacimiento?.split('T')[0] || '';
  },
  set(value: string) {
    if (profile.value) profile.value.fechaNacimiento = value;
  }
});
</script>
