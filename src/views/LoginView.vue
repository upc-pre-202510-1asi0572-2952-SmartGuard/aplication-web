<template>
  <section class="w-screen h-screen flex flex-col md:flex-row bg-gray-200 text-black overflow-auto">

    <!-- Sección Izquierda (sin cambios) -->
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

          <div class="flex flex-col relative">
            <label class="mb-1">Contraseña</label>
            <input
                :type="showPassword ? 'text' : 'password'"
                v-model="loginPassword"
                placeholder="Contraseña"
                class="border border-gray-300 rounded-lg px-3 py-2 pr-10"
            />
            <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute right-3 top-9 text-gray-500 focus:outline-none"
            >
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
                <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4.03 3.97a.75.75 0 10-1.06 1.06l1.41 1.41A9.013 9.013 0 001 10c.73 2.89 4 7 9 7 1.86 0 3.59-.5 5.07-1.35l1.41 1.41a.75.75 0 101.06-1.06l-14-14zM10 5c2.76 0 5 2.24 5 5 0 1.17-.38 2.25-1.03 3.12L8.88 7.03A4.978 4.978 0 0110 5z" />
              </svg>
            </button>
          </div>

          <div v-if="errorMessage" class="text-red-500 text-sm">
            {{ errorMessage }}
          </div>

          <div class="flex items-center gap-2 mt-2">
            <input
                type="checkbox"
                id="recuerda"
                v-model="rememberMe"
                class="accent-blue-600 bg-transparent rounded focus:ring-0 focus:outline-none"
            />
            <label for="recuerda" class="text-sm text-gray-700">Recuérdame</label>
          </div>

          <Button _texto="Ingresar" _color="bg-blue-500" @click="onLogin" />

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
import IngreseConGoogle from '../components/login/IngreseConGoolge.vue';
import IngreseConFacebook from '../components/login/IngreseConFacebook.vue';
import IngreseConApple from '../components/login/IngreseConApple.vue';
import type { User } from '../interfaces/User.ts';

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

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
    const showPassword = ref(false);
    const errorMessage = ref('');
    const rememberMe = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const onLogin = async () => {
      errorMessage.value = '';
      try {
        const res = await fetch(`${backendUrl}/api/v1/logeo`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: loginEmail.value,
            password: loginPassword.value
          })
        });
        if (!res.ok) {
          if (res.status === 401) {
            errorMessage.value = 'Credenciales incorrectas';
          } else {
            throw new Error(`HTTP ${res.status}`);
          }
          return;
        }

        // Asumimos que el POST devuelve el objeto User
        const user: User = await res.json();

        localStorage.setItem('nickname', user.Nickname);

        router.push('/home');
      } catch (e) {
        console.error('Error al iniciar sesión:', e);
        errorMessage.value = 'No se pudo iniciar sesión. Intenta de nuevo.';
      }
    };

    return {
      loginEmail,
      loginPassword,
      showPassword,
      togglePasswordVisibility,
      rememberMe,
      errorMessage,
      onLogin
    };
  }
});
</script>

<style scoped></style>
