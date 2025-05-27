<template>
  <section class="w-screen h-screen flex flex-col md:flex-row bg-gray-200 text-black overflow-auto">

    <!-- Sección Izquierda -->
    <section class="w-full md:w-1/2 bg-gray-100 flex flex-col items-center justify-center p-8">
      <img class="mb-6 xl:w-2xl md:w-60" src="../assets/smart-home/house-smart.png" alt="Logo" />
      <div class="text-center max-w-sm">
        <h1 class="uppercase font-bold text-xl mb-2">
          Más que seguridad, tranquilidad inteligente en tu hogar.
        </h1>
        <span class="text-gray-600">
          Consigue tu cerradura inteligente y dale mayor seguridad a tu hogar
        </span>
      </div>
    </section>

    <!-- Sección Derecha -->
    <section class="w-full md:w-1/2 flex justify-center bg-white p-6 md:p-10">
      <div class="flex flex-col gap-4 w-full max-w-xl bg-white p-6 md:p-8 rounded-xl shadow-md">

        <header class="mb-6 text-center">
          <h1 class="text-2xl font-semibold mb-1">Inicio</h1>
          <span class="text-gray-500">¡Bienvenido! Por favor, ingresa tus datos</span>
        </header>

        <main class="flex flex-col gap-4">
          <div class="flex flex-col">
            <label class="mb-1">Correo electrónico</label>
            <input
                type="email"
                v-model="loginEmail"
                placeholder="joe.doe@gmail.com"
                class="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div class="flex flex-col">
            <label class="mb-1">Contraseña</label>
            <input
                type="password"
                v-model="loginPassword"
                placeholder="Contraseña"
                class="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div class="text-red-500 text-sm" v-if="errorMessage">
            {{ errorMessage }}
          </div>

          <div class="flex items-center gap-2 mt-2">
            <input type="checkbox" name="recuerda" id="recuerda"
                   v-model="rememberMe"
                   class="accent-blue-600 bg-transparent rounded focus:ring-0 focus:outline-none">
            <label for="recuerda" class="text-sm text-gray-700">Recuérdame</label>
          </div>

          <Button
              _texto="Ingresar"
              _color="bg-blue-500"
              @click="onLogin"
          />

          <div class="w-full text-center mt-4">
            <router-link to="/recoverpassword" class="text-blue-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </router-link>
          </div>
        </main>

        <footer class="flex flex-col gap-3 mt-4">
          <IngreseConGoogle _texto="Ingrese con Google" />
          <IngreseConFacebook _texto="Ingrese con Facebook" />
          <IngreseConApple _texto="Ingrese con Apple" />

          <div class="text-center text-sm">
            <span>¿Primera vez aquí?
               <router-link to="/register" class="text-blue-500 hover:underline">
               Regístrate gratis
               </router-link>
            </span>
          </div>
        </footer>

      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../components/shared/Button.vue';
import InputTexto from '../components/shared/InputTexto.vue';
import IngreseConGoogle from '../components/login/IngreseConGoolge.vue';
import IngreseConFacebook from '../components/login/IngreseConFacebook.vue';
import IngreseConApple from '../components/login/IngreseConApple.vue';
import type { User } from '../interfaces/User';

export default defineComponent({
  name: 'LoginView',
  components: {
    Button,
    IngreseConGoogle,
    IngreseConFacebook,
    IngreseConApple
  },
  setup() {
    const router = useRouter();
    const loginEmail = ref('');
    const loginPassword = ref('');
    const errorMessage = ref('');
    const rememberMe = ref(false);

    const onLogin = async () => {
      errorMessage.value = '';
      try {
        const res = await fetch('http://localhost:3000/users');
        if (!res.ok) throw new Error('Error obteniendo usuarios');
        const users: User[] = await res.json();
        const match = users.find(
            u => u.email === loginEmail.value && u.password === loginPassword.value
        );
        if (!match) {
          errorMessage.value = 'Email o contraseña incorrectos';
          return;
        }
        // Opcional: guardar sesión
        if (rememberMe.value) {
          localStorage.setItem('loggedUser', JSON.stringify(match));
        }
        router.push('/home');
      } catch (e) {
        console.error(e);
        errorMessage.value = 'No se pudo iniciar sesión. Intenta de nuevo.';
      }
    };

    return {
      loginEmail,
      loginPassword,
      rememberMe,
      errorMessage,
      onLogin
    };
  }
});
</script>

<style scoped></style>
