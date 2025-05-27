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
          <!-- Campos básicos -->
          <InputTexto _placeholder="Nombres" v-model="user.nombres" />
          <InputTexto _placeholder="Apellidos" v-model="user.apellidos" />
          <InputTexto _placeholder="Correo electrónico" v-model="user.email" />
          <InputTexto _placeholder="Contraseña" type="password" v-model="user.password" />
          <InputTexto _placeholder="Confirmar contraseña" type="password" v-model="user.confirmpassword" />

          <!-- Opciones avanzadas -->
          <a class="text-blue-400 text-sm hover:underline" @click="toggleAdvanced">
            {{ showAdvanced ? 'Ocultar opciones avanzadas' : 'Mostrar opciones avanzadas' }}
          </a>
          <div v-if="showAdvanced" class="flex flex-col gap-4 h-[300px] py-2 overflow-y-scroll">
            <InputTexto _placeholder="Teléfono" v-model="user.telefono" />
            <InputTexto _placeholder="Ubicación" v-model="user.ubicacion" />
            <InputTexto _placeholder="Dirección" v-model="user.direccion" />
            <InputTexto _placeholder="Fecha de nacimiento" type="date" v-model="user.fechadenacimiento" />
            <InputTexto _placeholder="Género" v-model="user.genero" />
            <InputTexto _placeholder="Ocupación" v-model="user.ocupacion" />
            <InputTexto _placeholder="URL de foto de perfil" v-model="user.foto" />
            <div class="flex items-center gap-2">
              <input type="checkbox" v-model="user.terminos" class="accent-blue-600 focus:ring-0" />
              <label class="text-sm text-gray-700">Acepto términos y condiciones</label>
            </div>
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
import type { User } from '../interfaces/User';

interface RegisterUser extends Omit<User, 'id'> {
  password: string;
  confirmpassword: string;
  terminos: boolean;
}

export default defineComponent({
  name: 'RegisterView',
  components: { InputTexto, Button },
  setup() {
    const router = useRouter();

    const user = reactive<RegisterUser>({
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
      password: '',
      confirmpassword: '',
      terminos: false
    });

    const showAdvanced = ref(false);
    const toggleAdvanced = () => showAdvanced.value = !showAdvanced.value;

    const onRegister = async () => {
      // Validaciones básicas
      if (!user.password || user.password !== user.confirmpassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      if (!user.terminos) {
        alert('Debes aceptar términos y condiciones');
        return;
      }

      try {
        // Revisar lista usuarios y calcular nextId
        const listRes = await fetch('http://localhost:3000/users');
        if (!listRes.ok) throw new Error('No se pudo obtener lista de usuarios');
        const users: Array<{id: number}> = await listRes.json();
        const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

        const payload: any = { id: nextId, ...user };

        const res = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Error al registrar usuario');
        const newUser = await res.json();
        console.log('Usuario registrado con id numérico:', newUser.id);
        router.push('/home');
      } catch (error) {
        console.error(error);
        alert('Hubo un problema al registrar. Intenta nuevamente.');
      }
    };

    return { user, showAdvanced, toggleAdvanced, onRegister };
  }
});
</script>

<style scoped></style>
