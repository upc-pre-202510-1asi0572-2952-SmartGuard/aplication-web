<template>
  <WrapperScreen>
    <div class="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h1 class="text-2xl font-semibold mb-6">Editar Perfil</h1>
      <p v-if="errorMsg" class="text-red-600 text-sm mb-4">{{ errorMsg }}</p>

      <form @submit.prevent="onSaveProfile" class="grid grid-cols-1 gap-4">
        <!-- Contenedor scrollable -->
        <div class="h-[400px] overflow-y-scroll py-4 border-t border-b border-gray-300 space-y-4">
          <InputTexto label="Nombre" v-model="profile.nombre" required />
          <InputTexto label="Apellido" v-model="profile.apellido" required />
          <InputTexto label="Email" type="email" v-model="profile.email" required />
          <InputTexto label="Teléfono" type="tel" v-model="profile.telefono" required />
          <InputTexto label="Fecha de Nacimiento" type="date" v-model="fechaNacimientoFormateada" required />
          <InputTexto label="Género" v-model="profile.genero" required />
          <InputTexto label="Ubicación" v-model="profile.ubicacion" required />
          <InputTexto label="Dirección" v-model="profile.direccion" required />
          <InputTexto label="Ocupación" v-model="profile.ocupacion" required />
          <InputTexto label="Foto Perfil (URL)" v-model="profile.photoUrl" required />
        </div>

        <!-- Imagen de perfil -->
        <img v-if="profile.photoUrl" :src="profile.photoUrl" alt="Foto perfil" class="w-40 h-40 object-cover rounded-full mt-2 self-center" />

        <!-- Botones -->
        <div class="flex justify-center mt-4 gap-4">
          <Button type="submit" _texto="Guardar Cambios" class="bg-blue-600 font-bold" />
          <Button type="button" @click="onCancel" _texto="Cancelar" class="bg-gray-500 font-bold" />
        </div>
      </form>
    </div>
  </WrapperScreen>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import WrapperScreen from '../components/WrapperScreen.vue';
import InputTexto from '../components/shared/InputTexto.vue';
import Button from '../components/shared/Button.vue';
import normalizeKeys from '../utils/normalizeKeys.ts';
import type { Profile } from '../interfaces/Profile.ts';

const urlBackend = import.meta.env.VITE_BACKEND_API_URL!;
const nickname = localStorage.getItem('nickname') ?? '';

const errorMsg = ref('');
const profile = ref<Profile>({
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
  contrasenia: '',
  photoUrl: '',
});

const router = useRouter();

const loadProfile = async () => {
  try {
    const res = await fetch(`${urlBackend}/api/v1/usuarioMysql/${nickname}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: Profile = await res.json();
    profile.value = normalizeKeys(data);
  } catch (err) {
    console.error('Error cargando perfil:', err);
    errorMsg.value = 'No se pudo cargar el perfil.';
  }
};

onMounted(loadProfile);

const onSaveProfile = async () => {
  try {
    const res = await fetch(`${urlBackend}/api/v1/usuarioMysql`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile.value)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    alert('Perfil actualizado correctamente.');
    router.push({ name: 'Profile' });
  } catch (err) {
    console.error('Error actualizando perfil:', err);
    errorMsg.value = 'Error al guardar los cambios.';
  }
};

const onCancel = () => router.back();

const fechaNacimientoFormateada = computed({
  get() {
    if (!profile.value.fechaNacimiento) return '';
    return profile.value.fechaNacimiento.split('T')[0];
  },
  set(value: string) {
    profile.value.fechaNacimiento = value;
  }
});
</script>

<style scoped></style>
