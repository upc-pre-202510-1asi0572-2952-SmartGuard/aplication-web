<template>
  <WrapperScreen>
    <div v-if="user !== null" class="max-w-md w-full mx-auto bg-white rounded-2xl shadow-2xl p-8">
      <h1 class="text-3xl font-semibold mb-6">Cambiar Contraseña</h1>
      <form @submit.prevent="onChangePassword" class="space-y-6">
        <!-- Contraseña actual -->
        <div class="flex flex-col">
          <label for="currentPassword" class="mb-1 font-medium">Contraseña Actual</label>
          <input
              id="currentPassword"
              type="password"
              v-model="currentPassword"
              required
              class="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <!-- Nueva contraseña -->
        <div class="flex flex-col">
          <label for="newPassword" class="mb-1 font-medium">Nueva Contraseña</label>
          <input
              id="newPassword"
              type="password"
              v-model="newPassword"
              required
              class="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <!-- Confirmar nueva contraseña -->
        <div class="flex flex-col">
          <label for="confirmPassword" class="mb-1 font-medium">Confirmar Contraseña</label>
          <input
              id="confirmPassword"
              type="password"
              v-model="confirmPassword"
              required
              class="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <!-- Botones Guardar / Cancelar -->
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

    <div v-else class="p-10 text-center text-gray-500">
      Cargando…
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WrapperScreen from '../components/WrapperScreen.vue';
import type { User } from '../interfaces/User.ts';

export default defineComponent({
  name: 'ChangeUserPasswordView',
  components: { WrapperScreen },
  data() {
    return {
      user: null as User | null,
      currentPassword: '' as string,
      newPassword: '' as string,
      confirmPassword: '' as string,
    };
  },
  async mounted() {
    try {
      const res = await fetch('https://fake-api-smartguard.vercel.app/users');
      if (!res.ok) throw new Error('Error al cargar usuario');
      const users: User[] = await res.json();
      if (users.length === 0) throw new Error('No hay usuarios disponibles');
      this.user = users[0];
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async onChangePassword() {
      if (!this.user) return;

      // Validar contraseña actual
      if (this.currentPassword !== this.user.password) {
        alert('La contraseña actual no coincide.');
        return;
      }

      // Validar que nueva y confirmación coincidan
      if (this.newPassword !== this.confirmPassword) {
        alert('La nueva contraseña y su confirmación no coinciden.');
        return;
      }

      // Validar que la nueva no esté vacía
      if (!this.newPassword.trim()) {
        alert('La nueva contraseña no puede estar vacía.');
        return;
      }

      const confirmed = confirm('¿Desea cambiar su contraseña?');
      if (!confirmed) return;

      try {
        // Clonar usuario y solo modificar password/confirmpassword
        const updatedUser: User = {
          ...this.user,
          password: this.newPassword.trim(),
          confirmpassword: this.confirmPassword.trim()
        };

        const res = await fetch(
            `https://fake-api-smartguard.vercel.app/users/${this.user.id}`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedUser),
            }
        );

        if (res.ok) {
          alert('Contraseña actualizada correctamente.');
          this.$router.push('/profile');
        } else {
          alert(`Error al actualizar contraseña. Status: ${res.status}`);
        }
      } catch (error: any) {
        console.error('Error al cambiar contraseña:', error);
        alert(`Error al guardar cambios: ${error.message}`);
      }
    },
    onCancel() {
      this.$router.back();
    },
  },
});
</script>

<style scoped>
</style>
