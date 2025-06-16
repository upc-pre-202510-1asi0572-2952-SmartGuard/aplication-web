<template>
  <WrapperScreen>
    <div v-if="user" class="flex flex-col rounded-2xl gap-10 max-w-6xl w-full px-5 py-10 bg-white shadow-2xl">
      <h1 class="text-3xl font-semibold">Perfil de usuario</h1>

      <section class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div class="flex justify-center">
          <img
              :src="user.fotoPerfil"
              alt="Profile"
              class="rounded-full h-40 w-40 object-cover"
          />
        </div>
        <div class="flex flex-col justify-center gap-4">
          <Button _texto="Editar Usuario" @click="onEditUser" _color="bg-blue-500" />
          <Button _texto="Cambiar Contraseña" @click="onChangePassword" _color="bg-blue-500" />
          <Button _texto="Eliminar cuenta" @click="onDeleteAccount" _color="bg-red-500" />
        </div>
      </section>

      <section class="grid grid-cols-2 gap-4 text-black">
        <div class="flex flex-col">
          <label class="mb-1 font-medium">Nombre</label>
          <input
              type="text"
              :value="user.nombre"
              readonly
              class="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div class="flex flex-col">
          <label class="mb-1 font-medium">Apellido</label>
          <input
              type="text"
              :value="user.apellido"
              readonly
              class="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div class="flex flex-col">
          <label class="mb-1 font-medium">Fecha de Nacimiento</label>
          <input
              type="date"
              :value="user.fechaNacimiento.slice(0, 10)"
              readonly
              class="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div class="flex flex-col">
          <label class="mb-1 font-medium">Género</label>
          <input
              type="text"
              :value="user.genero"
              readonly
              class="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div class="flex flex-col">
          <label class="mb-1 font-medium">Ocupación</label>
          <input
              type="text"
              :value="user.ocupacion"
              readonly
              class="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div class="flex flex-col">
          <label class="mb-1 font-medium">Email</label>
          <input
              type="email"
              :value="user.email"
              readonly
              class="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div class="flex flex-col">
          <label class="mb-1 font-medium">Ubicación</label>
          <input
              type="text"
              :value="user.ubicacion"
              readonly
              class="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div class="flex flex-col">
          <label class="mb-1 font-medium">Dirección</label>
          <input
              type="text"
              :value="user.direccion"
              readonly
              class="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div class="flex flex-col">
          <label class="mb-1 font-medium">Teléfono Celular</label>
          <input
              type="tel"
              :value="user.telefono"
              readonly
              class="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </section>
    </div>

    <div v-else class="p-10 text-center text-gray-500">
      Cargando perfil…
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../components/shared/Button.vue';
import WrapperScreen from '../components/WrapperScreen.vue';
import type { User } from '../interfaces/User.ts';

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;


export default defineComponent({
  name: 'PerfilUsuarioView',
  components: { Button, WrapperScreen },
  data() {
    return {
      user: null as User | null
    };
  },
  async mounted() {
    try {
      localStorage.getItem('nickname');
      const nickname = localStorage.getItem('nickname');
      const res = await fetch(
          `${backendUrl}/api/v1/usuarioMysql/${nickname}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      this.user = {
        id:              data.Id,
        nombre:          data.Nombre,
        apellido:        data.Apellido,
        Nickname:        data.Nickname,
        contrasenia:     data.Contrasenia,
        rutaRostros:     data.RutaRostros,
        email:           data.Email,
        telefono:        data.Telefono,
        fotoPerfil:      data.FotoPerfil,
        fechaNacimiento: data.FechaNacimiento,
        genero:          data.Genero,
        ubicacion:       data.Ubicacion,
        ocupacion:       data.Ocupacion,
        direccion:       data.Direccion,
        // Estos dos son frontend-only para cumplir la interfaz
        confirmpassword: '',
        terminos:        false
      };
    } catch (error) {
      console.error('Error cargando perfil:', error);
    }
  },
  methods: {
    onEditUser() {
      this.$router.push('/profile/edit');
    },
    onChangePassword() {
      this.$router.push('/profile/change-password');
    },
    async onDeleteAccount() {
      if (!this.user) return;
      if (!confirm('¿Eliminar tu cuenta?')) return;
      try {
        await fetch(
            `${backendUrl}/api/v1/usuarioMysql/${encodeURIComponent(this.user.Nickname)}`,
            { method: 'DELETE' }
        );
        this.$router.push('/login');
      } catch {
        alert('Error al eliminar la cuenta.');
      }
    }
  }
});
</script>

<style scoped>
/* Tailwind aplicado directamente en el template */
</style>
