<template>
  <WrapperScreen>
    <div v-if="profile" class="flex flex-col rounded-2xl gap-10 max-w-6xl w-full px-5 py-10 bg-white shadow-2xl">
      <h1 class="text-3xl font-semibold">Perfil de usuario</h1>

      <section class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div class="flex justify-center">
          <img :src="profile.photoUrl" alt="Profile" class="rounded-full h-40 w-40 object-cover" />
        </div>
        <div class="flex flex-col justify-center gap-4">
          <Button _texto="Editar Usuario" @click="onEditUser" _color="bg-blue-500" />
          <Button _texto="Cambiar Contraseña" @click="onChangePassword" _color="bg-blue-500" />
          <Button _texto="Eliminar cuenta" @click="onDeleteAccount" _color="bg-red-500" />
        </div>
      </section>

      <section class="grid grid-cols-2 gap-4 text-black">
        <InputTexto label="Nombre" v-model="profile.nombre" />
        <InputTexto label="Apellido" v-model="profile.apellido" />
        <InputTexto label="Fecha de Nacimiento" v-model="profile.fechaNacimiento" type="date" />
        <InputTexto label="Género" v-model="profile.genero" />
        <InputTexto label="Ocupación" v-model="profile.ocupacion" />
        <InputTexto label="Email" v-model="profile.email" type="email" />
        <InputTexto label="Ubicación" v-model="profile.ubicacion" />
        <InputTexto label="Dirección" v-model="profile.direccion" />
        <InputTexto label="Teléfono Celular" v-model="profile.telefono" type="tel" />
      </section>
    </div>

    <div v-else class="p-10 text-center text-gray-500">
      Cargando perfil…
    </div>
  </WrapperScreen>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import WrapperScreen from '../components/WrapperScreen.vue';
import Button from '../components/shared/Button.vue';
import normalizeKeys from "../utils/normalizeKeys.ts";
import type {Profile} from "../interfaces/Profile.ts"; // Un input readonly reutilizable

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
const nickname = localStorage.getItem('nickname') || '';
const errorMsg = ref<string>('');
const profile = ref<Profile | null>(null);
const router = useRouter();

async function loadSelectedProfile(){
  errorMsg.value = '';

  try {
    const profileRes = await fetch(
        `${backendUrl}/api/v1/usuarioMysql/${nickname}`
    );

    if (profileRes.status === 404) {
      errorMsg.value = `No existe un nickname ${nickname}.`;
      return;
    }
    if (!profileRes.ok) throw new Error(`HTTP ${profileRes.status}`);
    const profileData:Profile = await profileRes.json();
    console.log(profileData)
    console.log(normalizeKeys(profileData))
    profile.value = normalizeKeys(profileData);
  } catch (err) {
    errorMsg.value = 'Error perfil';
    console.error('Error cargando perfil:', err);
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
</script>
