<template>
  <WrapperScreen>
    <!-- Mostrar formulario solo si userId está cargado -->
    <div v-if="userId !== null" class="max-w-3xl w-full mx-auto bg-white rounded-2xl shadow-2xl p-8">
      <h1 class="text-3xl font-semibold mb-6">Editar Perfil</h1>
      <form @submit.prevent="onSaveProfile" class="space-y-6">
        <!-- Nombres y Apellidos -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label for="nombres" class="mb-1 font-medium">Nombres</label>
            <input
                id="nombres"
                type="text"
                v-model="nombres"
                required
                class="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div class="flex flex-col">
            <label for="apellidos" class="mb-1 font-medium">Apellidos</label>
            <input
                id="apellidos"
                type="text"
                v-model="apellidos"
                required
                class="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <!-- Email y Teléfono -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label for="email" class="mb-1 font-medium">Email</label>
            <input
                id="email"
                type="email"
                v-model="email"
                required
                class="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div class="flex flex-col">
            <label for="telefono" class="mb-1 font-medium">Teléfono Celular</label>
            <input
                id="telefono"
                type="tel"
                v-model="telefono"
                required
                class="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <!-- Ubicación y Dirección -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label for="ubicacion" class="mb-1 font-medium">Ubicación</label>
            <input
                id="ubicacion"
                type="text"
                v-model="ubicacion"
                required
                class="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div class="flex flex-col">
            <label for="direccion" class="mb-1 font-medium">Dirección</label>
            <input
                id="direccion"
                type="text"
                v-model="direccion"
                required
                class="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <!-- Fecha de Nacimiento y Género -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label for="fechadenacimiento" class="mb-1 font-medium">Fecha de Nacimiento</label>
            <input
                id="fechadenacimiento"
                type="date"
                v-model="fechadenacimiento"
                required
                class="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div class="flex flex-col">
            <label for="genero" class="mb-1 font-medium">Género</label>
            <input
                id="genero"
                type="text"
                v-model="genero"
                required
                class="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <!-- Ocupación y Foto -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label for="ocupacion" class="mb-1 font-medium">Ocupación</label>
            <input
                id="ocupacion"
                type="text"
                v-model="ocupacion"
                required
                class="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div class="flex flex-col">
            <label for="foto" class="mb-1 font-medium">Foto (URL)</label>
            <input
                id="foto"
                type="text"
                v-model="foto"
                required
                class="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <!-- Botones Guardar / Cancelar -->
        <div class="flex justify-end gap-4">
          <button type="button" @click="onCancel" class="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300">
            Cancelar
          </button>
          <button type="submit" class="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>

    <div v-else class="p-10 text-center text-gray-500">
      Cargando perfil…
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WrapperScreen from '../components/WrapperScreen.vue';
import type { User } from '../interfaces/User.ts';

export default defineComponent({
  name: 'EditProfileView',
  components: { WrapperScreen },
  data() {
    return {
      userId: null as number | null,
      nombres: '',
      apellidos: '',
      email: '',
      telefono: '',
      ubicacion: '',
      direccion: '',
      fechadenacimiento: '',
      genero: '',
      ocupacion: '',
      foto: '',
      // Campos adicionales a conservar
      password: '',
      confirmpassword: '',
      terminos: false as boolean,
    };
  },
  async mounted() {
    try {
      const res = await fetch('https://fake-api-smartguard.vercel.app/users');
      if (!res.ok) throw new Error('Error al cargar usuario');
      const users: User[] = await res.json();
      if (users.length === 0) throw new Error('No hay usuarios disponibles');
      const usr = users[0];

      this.userId = usr.id;
      this.nombres = usr.nombres;
      this.apellidos = usr.apellidos;
      this.email = usr.email;
      this.telefono = usr.telefono;
      this.ubicacion = usr.ubicacion;
      this.direccion = usr.direccion;
      this.fechadenacimiento = usr.fechadenacimiento;
      this.genero = usr.genero;
      this.ocupacion = usr.ocupacion;
      this.foto = usr.foto;

      // Conservamos estos campos para enviarlos de vuelta en el PUT
      this.password = usr.password;
      this.confirmpassword = usr.confirmpassword;
      this.terminos = usr.terminos;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async onSaveProfile() {
      if (
          !this.userId ||
          !this.nombres.trim() ||
          !this.apellidos.trim() ||
          !this.email.trim() ||
          !this.telefono.trim() ||
          !this.ubicacion.trim() ||
          !this.direccion.trim() ||
          !this.fechadenacimiento ||
          !this.genero.trim() ||
          !this.ocupacion.trim() ||
          !this.foto.trim()
      ) {
        alert('Complete todos los campos antes de guardar.');
        return;
      }

      const confirmed = confirm('¿Desea guardar los cambios en su perfil?');
      if (!confirmed) return;

      try {
        const payload: User = {
          id: this.userId,
          nombres: this.nombres.trim(),
          apellidos: this.apellidos.trim(),
          email: this.email.trim(),
          password: this.password,
          confirmpassword: this.confirmpassword,
          telefono: this.telefono.trim(),
          ubicacion: this.ubicacion.trim(),
          direccion: this.direccion.trim(),
          fechadenacimiento: this.fechadenacimiento,
          genero: this.genero.trim(),
          ocupacion: this.ocupacion.trim(),
          foto: this.foto.trim(),
          terminos: this.terminos,
        };

        const res = await fetch(
            `https://fake-api-smartguard.vercel.app/users/${this.userId}`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            }
        );

        if (res.ok) {
          alert('Perfil actualizado correctamente.');
          this.$router.push('/profile');
        } else {
          alert(`Error al actualizar perfil. Status: ${res.status}`);
        }
      } catch (error: any) {
        console.error('Error al guardar perfil:', error);
        alert(`Error al guardar los cambios: ${error.message}`);
      }
    },
    onCancel() {
      this.$router.back();
    },
  },
});
</script>

<style scoped>
.form-wrapper {
  max-width: 600px;
  width: 90%;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
