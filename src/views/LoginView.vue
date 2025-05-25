<template>
  <section class="w-screen h-screen flex flex-col md:flex-row bg-gray-200 text-black overflow-auto">

    <!-- Sección Izquierda -->
    <section class="w-full md:w-1/2 bg-gray-100 flex flex-col items-center justify-center p-8">
      <img class="mb-6 xl:w-2xl md:w-60" src="../assets/smart-home/house-smart.png" alt="Logo" />
      <div class="text-center max-w-sm">
        <h1 class="uppercase font-bold text-xl mb-2">
          Más que seguridad, tranquilidad inteligente en tu hogar
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
          <InputTexto _placeholder="joe.doe@gmail.com" :_onClick="handleClick" />
          <InputTexto _placeholder="Contraseña" :_onClick="handleClick" />

          <div class="flex items-center gap-2 mt-2">
            <input type="checkbox" name="recuerda" id="recuerda"
              class="accent-blue-600 bg-transparent rounded focus:ring-0 focus:outline-none">
            <label for="recuerda" class="text-sm text-gray-700">Recuérdame</label>
          </div>

          <router-link to="/home" class="contents">
            <Button _texto="Ingresar" _color="bg-blue-500" />
          </router-link>

          <a href="#" class="text-blue-400 text-center text-sm hover:underline">¿Olvidaste tu contraseña?</a>
        </main>

        <footer class="flex flex-col gap-3 mt-4">
          <IngreseConGoogle _texto="Ingrese con Google" />
          <IngreseConFacebook _texto="Ingrese con Facebook" />
          <IngreseConApple _texto="Ingrese con Apple" />

          <div class="text-center text-sm">
            <span>¿Primera vez aquí? 
              <a href="https://youtube.com" class="text-blue-500 hover:underline">Regístrate gratis</a>
            </span>
          </div>
        </footer>

      </div>
    </section>
  </section>
</template>












<script lang="ts">
import Button from '../components/shared/Button.vue'
import InputTexto from '../components/shared/InputTexto.vue';
import IngreseConGoogle from '../components/login/IngreseConGoolge.vue';
import IngreseConFacebook from '../components/login/IngreseConFacebook.vue';
import IngreseConApple from '../components/login/IngreseConApple.vue';


export default {
    components: {
        Button,
        InputTexto,
        IngreseConGoogle,
        IngreseConApple,
        IngreseConFacebook
    },
    methods: {
        handleClick() {
            console.log("Botón clickeado desde la vista")
        }
    }
}
</script>



<style scopeed></style>