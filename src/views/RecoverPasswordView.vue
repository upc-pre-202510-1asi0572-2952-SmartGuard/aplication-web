<template>
  <section class="w-screen h-screen flex flex-col md:flex-row bg-gray-200 text-black overflow-auto">

    <!-- Sección Izquierda -->
    <section class="w-full md:w-1/2 bg-gray-100 flex flex-col items-center justify-center p-8">
      <img
          class="mb-6 xl:w-2xl md:w-60"
          src="../assets/smart-home/house-smart.png"
          alt="Ilustración recuperar contraseña"
      />
      <div class="text-center max-w-sm">
        <h1 class="uppercase font-bold text-xl mb-2">
          ¿Olvidaste tu contraseña?
        </h1>
        <span class="text-gray-600">
          Ingresa tu correo y te enviaremos un código de recuperación
        </span>
      </div>
    </section>

    <!-- Sección Derecha -->
    <section class="w-full md:w-1/2 flex justify-center bg-white p-6 md:p-10">
      <div class="flex flex-col gap-4 w-full max-w-xl bg-white p-6 md:p-8 rounded-xl shadow-md">

        <header class="mb-6 text-center">
          <h2 class="text-2xl font-semibold mb-1">
            Recuperar contraseña
          </h2>
          <span class="text-gray-500">
            {{ step === 1
              ? 'Paso 1: Solicita el código en base a un email registrado'
              : 'Paso 2: Restablece tu contraseña' }}
          </span>
        </header>

        <main class="flex flex-col gap-4 flex-1 overflow-y-auto">
          <form @submit.prevent="step === 1 ? submitEmail() : submitReset()">

            <!-- Paso 1: email -->
            <div v-if="step === 1" class="flex flex-col gap-4">
              <InputTexto
                  _placeholder="Correo electrónico"
                  type="email"
                  v-model="email"
              />
            </div>

            <!-- Paso 2: código + nueva contraseña -->
            <div v-else class="flex flex-col gap-4">
              <InputTexto
                  _placeholder="Código de verificación"
                  v-model="code"
              />
              <InputTexto
                  _placeholder="Nueva contraseña"
                  type="password"
                  v-model="newPassword"
              />
              <InputTexto
                  _placeholder="Confirmar contraseña"
                  type="password"
                  v-model="confirmPassword"
              />
            </div>

            <!-- Botón centrado y separado -->
            <div class="flex justify-center mt-6">
              <Button
                  type="submit"
                  :_texto="step === 1 ? 'Enviar código' : 'Restablecer contraseña'"
                  _color="bg-blue-500"
              />
            </div>
          </form>
        </main>

        <footer class="text-center text-sm mt-4">
          <router-link to="/login" class="text-blue-500 hover:underline">
            Volver al inicio de sesión
          </router-link>
        </footer>

      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import InputTexto from '../components/shared/InputTexto.vue';
import Button from '../components/shared/Button.vue';

export default defineComponent({
  name: 'RecoverPasswordView',
  components: { InputTexto, Button },
  setup() {
    const router = useRouter();
    const step = ref<number>(1);
    const email = ref<string>('');
    const code = ref<string>('');
    const generatedCode = ref<string>('');
    const userId = ref<number | null>(null);
    const newPassword = ref<string>('');
    const confirmPassword = ref<string>('');

    const submitEmail = async () => {
      if (!email.value) return alert('Ingresa un email válido.');
      try {
        const res = await fetch(`http://localhost:3000/users?email=${email.value}`);
        const users = await res.json();
        if (!users.length) {
          return alert('Email no registrado.');
        }
        userId.value = users[0].id;
        generatedCode.value = Math.floor(100000 + Math.random() * 900000).toString();
        alert(`Tu código de recuperación es: ${generatedCode.value}`);
        step.value = 2;
      } catch (err) {
        console.error(err);
        alert('Error al solicitar código de recuperación.');
      }
    };

    const submitReset = async () => {
      if (code.value !== generatedCode.value) {
        return alert('Código incorrecto.');
      }
      if (newPassword.value !== confirmPassword.value) {
        return alert('Las contraseñas no coinciden.');
      }
      if (userId.value === null) {
        return alert('Usuario no válido.');
      }
      try {
        await fetch(`http://localhost:3000/users/${userId.value}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: newPassword.value, confirmpassword: newPassword.value })
        });
        alert('Contraseña actualizada correctamente.');
        router.push('/login');
      } catch (err) {
        console.error(err);
        alert('Error al restablecer la contraseña.');
      }
    };

    return {
      step,
      email,
      code,
      newPassword,
      confirmPassword,
      submitEmail,
      submitReset
    };
  }
});
</script>

<style scoped>
/* Ajustes específicos si los necesitas */
</style>
