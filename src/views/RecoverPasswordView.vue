<!-- src/views/RecoverPasswordView.vue -->
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

        <main class="flex flex-col gap-4">
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputTexto from '../components/shared/InputTexto.vue'
import Button from '../components/shared/Button.vue'

export default {
  name: 'RecoverPasswordView',
  components: { InputTexto, Button },
  setup() {
    const router = useRouter()
    const step = ref(1)
    const email = ref('')
    const code = ref('')
    const newPassword = ref('')
    const confirmPassword = ref('')

    const submitEmail = async () => {
      // Lógica: llamar API para enviar código al email
      // await api.sendRecoveryCode({ email: email.value })
      step.value = 2
    }

    const submitReset = async () => {
      if (newPassword.value !== confirmPassword.value) {
        return alert('Las contraseñas no coinciden.')
      }
      // Lógica: llamar API para validar código y cambiar contraseña
      // await api.resetPassword({ email: email.value, code: code.value, newPassword: newPassword.value })
      await router.push('/login')
    }

    return {
      step,
      email,
      code,
      newPassword,
      confirmPassword,
      submitEmail,
      submitReset
    }
  }
}
</script>

<style scoped></style>
