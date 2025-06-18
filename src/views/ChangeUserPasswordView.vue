<template>
  <WrapperScreen>
    <!-- Cargando -->
    <div v-if="!loaded" class="p-10 text-center text-gray-500">
      Cargando…
    </div>
    <!-- Formulario -->
    <div v-else class="max-w-md w-full mx-auto bg-white rounded-2xl shadow-2xl p-8">
      <h1 class="text-3xl font-semibold mb-6">Cambiar Contraseña</h1>
      <form @submit.prevent="onChangePassword" class="space-y-6">
        <div class="flex flex-col">
          <label for="currentPassword" class="mb-1 font-medium">Contraseña Actual</label>
          <input
              id="currentPassword"
              type="password"
              v-model="currentPassword"
              required
              class="border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Ingresa tu contraseña actual"
          />
        </div>

        <div class="flex flex-col">
          <label for="newPassword" class="mb-1 font-medium">Nueva Contraseña</label>
          <input
              id="newPassword"
              type="password"
              v-model="newPassword"
              required
              class="border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Ingresa la nueva contraseña"
          />
        </div>

        <div class="flex flex-col">
          <label for="confirmPassword" class="mb-1 font-medium">Confirmar Contraseña</label>
          <input
              id="confirmPassword"
              type="password"
              v-model="confirmPassword"
              required
              class="border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Repite la nueva contraseña"
          />
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm">
          {{ errorMessage }}
        </div>

        <div class="flex justify-end gap-4">
          <button
              type="button"
              @click="onCancel"
              class="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
              type="submit"
              class="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WrapperScreen from '../components/WrapperScreen.vue';

interface ChangePasswordPayload {
  Id: string;
  ContrasenaActual: string;
  NuevaContrasena: string;
  ConfirmacionContrasena: string;
}

export default defineComponent({
  name: 'ChangeUserPasswordView',
  components: { WrapperScreen },
  data() {
    return {
      loaded: false as boolean,
      userId: '' as string,
      currentPassword: '' as string,
      newPassword: '' as string,
      confirmPassword: '' as string,
      errorMessage: '' as string,
    };
  },
  async mounted() {
    try {
      const nick = localStorage.getItem('nickname');
      if (!nick) throw new Error('No hay usuario en storage');

      const backend = import.meta.env.VITE_BACKEND_API_URL!;
      const res = await fetch(
          `${backend}/api/v1/usuarioMysql/${encodeURIComponent(nick)}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: any = await res.json();

      // Sólo necesitamos el Id para el endpoint de cambio
      this.userId = data.Id;
      this.loaded = true;
    } catch (e: any) {
      console.error('Error cargando usuario:', e);
      alert('No se pudo cargar los datos de usuario.');
    }
  },
  methods: {
    async onChangePassword() {
      this.errorMessage = '';

      // Validaciones básicas en cliente
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = 'La nueva contraseña y su confirmación no coinciden.';
        return;
      }
      if (!this.currentPassword.trim() || !this.newPassword.trim()) {
        this.errorMessage = 'Ningún campo puede estar vacío.';
        return;
      }

      if (!confirm('¿Desea cambiar su contraseña?')) return;

      const payload: ChangePasswordPayload = {
        Id: this.userId,
        ContrasenaActual: this.currentPassword.trim(),
        NuevaContrasena: this.newPassword.trim(),
        ConfirmacionContrasena: this.confirmPassword.trim(),
      };

      try {
        const backend = import.meta.env.VITE_BACKEND_API_URL!;
        const res = await fetch(
            `${backend}/api/v1/usuario/contrasena`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            }
        );
        if (!res.ok) {
          // Si el backend rechaza, por ejemplo porque "aaa" no coincide, devuelve 400
          const errorBody = await res.json().catch(() => null);
          this.errorMessage = errorBody?.message || `Error ${res.status}`;
          return;
        }

        alert('Contraseña actualizada correctamente.');
        this.$router.push('/profile');
      } catch (err: any) {
        console.error('Error al cambiar contraseña:', err);
        this.errorMessage = 'Error al guardar la nueva contraseña.';
      }
    },
    onCancel() {
      this.$router.back();
    },
  },
});
</script>

<style scoped>
/* Tailwind ya cubre la mayoría de estilos */
</style>
