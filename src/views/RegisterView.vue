<template>
  <section class="w-screen h-screen flex flex-col md:flex-row bg-gray-200 text-black overflow-auto">
    <!-- Sección Izquierda -->
    <section class="w-full md:w-1/2 bg-gray-100 flex flex-col items-center justify-center p-8">
      <img class="mb-6 xl:w-2xl md:w-60" src="../assets/smart-home/house-smart.png" alt="Ilustración registro" />
      <div class="text-center max-w-sm">
        <h1 class="uppercase font-bold text-xl mb-2">Regístrate gratis</h1>
        <span class="text-gray-600">Crea tu cuenta para controlar tu hogar inteligentemente</span>
      </div>
    </section>

    <!-- Sección Derecha -->
    <section class="w-full md:w-1/2 flex justify-center bg-white p-6 md:p-10">
      <div class="flex flex-col gap-4 w-full max-w-xl bg-white p-6 md:p-8 rounded-xl shadow-md">

        <header class="mb-6 text-center">
          <h2 class="text-2xl font-semibold mb-1">Registro</h2>
          <span class="text-gray-500">Completa tus datos para empezar</span>
        </header>

        <main class="flex flex-col gap-4">
          <!-- Campos obligatorios -->
          <InputTexto _placeholder="Nombre" v-model="user.nombre" />
          <InputTexto _placeholder="Apellido" v-model="user.apellido" />
          <InputTexto _placeholder="Nickname" v-model="user.Nickname" />
          <InputTexto _placeholder="Correo electrónico" v-model="user.email" />
          <InputTexto _placeholder="Contraseña" type="password" v-model="user.contrasenia" />

          <!-- Opciones avanzadas -->
          <a class="text-blue-400 text-sm hover:underline" @click="toggleAdvanced">
            {{ showAdvanced ? 'Ocultar opciones avanzadas' : 'Mostrar opciones avanzadas' }}
          </a>
          <div v-if="showAdvanced" class="flex flex-col gap-4 h-[300px] py-2 overflow-y-scroll">
            <InputTexto _placeholder="Teléfono" v-model="user.telefono" />
            <InputTexto _placeholder="Ubicación" v-model="user.ubicacion" />
            <InputTexto _placeholder="Dirección" v-model="user.direccion" />
            <InputTexto _placeholder="Fecha de nacimiento" type="date" v-model="user.fechaNacimiento" />
            <InputTexto _placeholder="Género" v-model="user.genero" />
            <InputTexto _placeholder="Ocupación" v-model="user.ocupacion" />
            <InputTexto _placeholder="URL de foto de perfil" v-model="user.fotoPerfil" />
            <InputTexto _placeholder="Ruta Rostros" v-model="user.rutaRostros" />
          </div>

          <!-- Botón de registro -->
          <Button _texto="Registrarse" _color="bg-blue-500" @click.prevent="onRegister" />
        </main>

        <footer class="flex flex-col gap-3 mt-4">
          <div class="text-center text-sm mt-4">
            <span>¿Ya tienes cuenta?
              <router-link to="/login" class="text-blue-500 hover:underline">Inicia sesión</router-link>
            </span>
          </div>
        </footer>

      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import InputTexto from '../components/shared/InputTexto.vue';
import Button from '../components/shared/Button.vue';
import type { User } from '../interfaces/User.ts';

const backendUrl = import.meta.env.VITE_BACKEND_API_URL as string;

export default defineComponent({
  name: 'RegisterView',
  components: { InputTexto, Button },
  setup() {
    const router = useRouter();

    // Sólo los campos que el endpoint JSON POST /api/v1/usuarioMysql espera
    const user = reactive<Partial<User>>({
      nombre: '',
      apellido: '',
      Nickname: '',
      contrasenia: '',
      rutaRostros: '',
      email: '',
      telefono: '',
      fotoPerfil: '',
      fechaNacimiento: '',
      genero: '',
      ubicacion: '',
      ocupacion: '',
      direccion: ''
    });

    const showAdvanced = ref(false);
    const toggleAdvanced = () => (showAdvanced.value = !showAdvanced.value);

    const onRegister = async () => {
      // Validación mínima
      if (!user.contrasenia) {
        alert('Ingresa una contraseña');
        return;
      }

      try {
        const payload = {
          Nombre: user.nombre,
          Apellido: user.apellido,
          Nickname: user.Nickname,
          Contrasenia: user.contrasenia,
          RutaRostros: user.rutaRostros,
          Email: user.email,
          Telefono: user.telefono,
          FotoPerfil: user.fotoPerfil,
          FechaNacimiento: user.fechaNacimiento,
          Genero: user.genero,
          Ubicacion: user.ubicacion,
          Ocupacion: user.ocupacion,
          Direccion: user.direccion
        };

        const res = await fetch(`${backendUrl}/api/v1/usuarioMysql`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log('Usuario creado:', data);

        router.push('/login');
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Hubo un problema al registrar. Intenta nuevamente.');
      }
    };

    return { user, showAdvanced, toggleAdvanced, onRegister };
  }
});
</script>

<style scoped></style>
