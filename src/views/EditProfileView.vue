<template>
  <WrapperScreen>
    <!-- Si todavía no cargó, mostramos indicador -->
    <div v-if="!loaded" class="p-10 text-center text-gray-500">
      Cargando perfil…
    </div>

    <!-- Una vez cargado, mostramos el formulario -->
    <div v-else class="max-w-3xl w-full mx-auto bg-white rounded-2xl shadow-2xl p-8">
      <h1 class="text-3xl font-semibold mb-6">Editar Perfil</h1>
      <form @submit.prevent="onSaveProfile" class="space-y-6">
        <!-- Nombre / Apellido -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label class="mb-1 font-medium">Nombre</label>
            <input v-model="nombre" type="text" required
                   class="border border-gray-300 rounded-lg px-3 py-2"/>
          </div>
          <div class="flex flex-col">
            <label class="mb-1 font-medium">Apellido</label>
            <input v-model="apellido" type="text" required
                   class="border border-gray-300 rounded-lg px-3 py-2"/>
          </div>
        </div>

        <!-- Email / Teléfono -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label class="mb-1 font-medium">Email</label>
            <input v-model="email" type="email" required
                   class="border border-gray-300 rounded-lg px-3 py-2"/>
          </div>
          <div class="flex flex-col">
            <label class="mb-1 font-medium">Teléfono</label>
            <input v-model="telefono" type="tel" required
                   class="border border-gray-300 rounded-lg px-3 py-2"/>
          </div>
        </div>

        <!-- Fecha de Nacimiento / Género -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label class="mb-1 font-medium">Fecha de Nacimiento</label>
            <input v-model="fechaNacimiento" type="date" required
                   class="border border-gray-300 rounded-lg px-3 py-2"/>
          </div>
          <div class="flex flex-col">
            <label class="mb-1 font-medium">Género</label>
            <input v-model="genero" type="text" required
                   class="border border-gray-300 rounded-lg px-3 py-2"/>
          </div>
        </div>

        <!-- Ubicación / Dirección -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label class="mb-1 font-medium">Ubicación</label>
            <input v-model="ubicacion" type="text" required
                   class="border border-gray-300 rounded-lg px-3 py-2"/>
          </div>
          <div class="flex flex-col">
            <label class="mb-1 font-medium">Dirección</label>
            <input v-model="direccion" type="text" required
                   class="border border-gray-300 rounded-lg px-3 py-2"/>
          </div>
        </div>

        <!-- Ocupación / FotoPerfil -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label class="mb-1 font-medium">Ocupación</label>
            <input v-model="ocupacion" type="text" required
                   class="border border-gray-300 rounded-lg px-3 py-2"/>
          </div>
          <div class="flex flex-col">
            <label class="mb-1 font-medium">FotoPerfil (URL)</label>
            <input v-model="fotoPerfil" type="text" required
                   class="border border-gray-300 rounded-lg px-3 py-2"/>
          </div>
        </div>

        <!-- Botones -->
        <div class="flex justify-end gap-4">
          <button type="button" @click="onCancel"
                  class="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300">
            Cancelar
          </button>
          <button type="submit"
                  class="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600">
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

export default defineComponent({
  name: 'EditProfileView',
  components: { WrapperScreen },
  data() {
    return {
      loaded: false as boolean,
      userId: '' as string,
      nombre:   '',
      apellido: '',
      email:    '',
      telefono: '',
      fechaNacimiento: '',
      genero:   '',
      ubicacion:'',
      direccion:'',
      ocupacion:'',
      fotoPerfil:''
    };
  },
  async mounted() {
    try {
      // 1) Sacamos el nickname que guardaste al loguear
      const nick = localStorage.getItem('nickname');
      if (!nick) throw new Error('No hay usuario en storage');

      // 2) Hacemos GET por nickname
      const backend = import.meta.env.VITE_BACKEND_API_URL!;
      const res = await fetch(`${backend}/api/v1/usuarioMysql/${encodeURIComponent(nick)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const d: any = await res.json();

      // 3) Mapeamos al form
      this.userId          = d.Id;
      this.nombre          = d.Nombre;
      this.apellido        = d.Apellido;
      this.email           = d.Email;
      this.telefono        = d.Telefono;
      this.fechaNacimiento = d.FechaNacimiento.slice(0,10);
      this.genero          = d.Genero;
      this.ubicacion       = d.Ubicacion;
      this.direccion       = d.Direccion;
      this.ocupacion       = d.Ocupacion;
      this.fotoPerfil      = d.FotoPerfil;

      this.loaded = true;
    } catch (err) {
      console.error('Error cargando perfil:', err);
      alert('No se pudo cargar el perfil.');
    }
  },
  methods: {
    async onSaveProfile() {
      // validaciones...
      if (!this.nombre || !this.apellido /* etc */) {
        alert('Completa todos los campos.');
        return;
      }
      if (!confirm('¿Guardar cambios en tu perfil?')) return;

      try {
        const payload = {
          Id:              this.userId,
          Nombre:          this.nombre.trim(),
          Apellido:        this.apellido.trim(),
          Email:           this.email.trim(),
          Telefono:        this.telefono.trim(),
          FechaNacimiento: this.fechaNacimiento,
          Genero:          this.genero.trim(),
          Ubicacion:       this.ubicacion.trim(),
          Ocupacion:       this.ocupacion.trim(),
          Direccion:       this.direccion.trim()
        };
        const backend = import.meta.env.VITE_BACKEND_API_URL!;
        const res = await fetch(`${backend}/api/v1/usuarioMysql`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        alert('Perfil actualizado correctamente.');
        this.$router.push('/profile');
      } catch (e: any) {
        console.error('Error actualizando perfil:', e);
        alert('Error al guardar los cambios.');
      }
    },
    onCancel() {
      this.$router.back();
    }
  }
});
</script>

<style scoped>
/* ya estás usando Tailwind; aquí podrías incluir clases globales si quieres */
</style>
