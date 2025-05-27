```vue
<!-- src/views/RegisterView.vue -->
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
          <InputTexto _placeholder="Nombres" v-model="user.name" />
          <InputTexto _placeholder="Apellidos" v-model="user.apellido" />
          <InputTexto _placeholder="Correo electrónico" v-model="user.email" />
          <InputTexto _placeholder="Contraseña" type="password" v-model="user.password" />
          <InputTexto _placeholder="Confirmar contraseña" type="password" v-model="user.confirm" />

          <!-- Opciones avanzadas -->
          <a class="text-blue-400 text-sm hover:underline" @click="toggleAdvanced">
            {{ showAdvanced ? 'Ocultar opciones avanzadas' : 'Mostrar opciones avanzadas' }}
          </a>
          <div v-if="showAdvanced" class="flex flex-col gap-4 h-[300px] py-2 overflow-y-scroll">
            <InputTexto _placeholder="Teléfono" v-model="user.phone" />
            <InputTexto _placeholder="Dirección completa" v-model="user.address" />
            <InputTexto _placeholder="Fecha de nacimiento" type="date" v-model="user.birthDate" />
            <InputTexto _placeholder="Género" v-model="user.gender" />
            <InputTexto _placeholder="Ocupación" v-model="user.occupation" />
            <InputTexto _placeholder="URL de foto de perfil" v-model="user.profilePhotoUrl" />
            <div class="flex items-center gap-2">
              <input type="checkbox" v-model="user.terms" class="accent-blue-600 focus:ring-0" />
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import InputTexto from '../components/shared/InputTexto.vue'
import Button from '../components/shared/Button.vue'
import { User } from '../interfaces/User.ts'

export default {
  name: 'RegisterView',
  components: { InputTexto, Button },
  setup() {
    const router = useRouter()

    const user = reactive(new User())
    const showAdvanced = ref(false)
    const toggleAdvanced = () => { showAdvanced.value = !showAdvanced.value }

    const onRegister = () => {
      // Guarda directamente el objeto user
      console.log('Guardando usuario:', user)
      localStorage.setItem('userProfile', JSON.stringify(user))
      router.push('/home')
    }

    return { user, showAdvanced, toggleAdvanced, onRegister }
  }
}
</script>

<style scoped></style>
```
