<template>
  <WrapperScreen>
    <div class="max-w-7xl mx-auto py-8">
      <!-- Contenedor blanco adaptado -->
      <div class="bg-white rounded-xl shadow p-8">
        <!-- Título -->
        <h1 class="text-2xl font-semibold mb-6">Contacto</h1>

        <!-- Formulario -->
        <form @submit.prevent="sendMessage" class="grid grid-cols-1 gap-6">
          <!-- Nombre -->
          <div>
            <label for="name" class="block text-gray-700 mb-1">Nombre</label>
            <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="Tu nombre"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
            />
          </div>

          <!-- Correo Electrónico -->
          <div>
            <label for="email" class="block text-gray-700 mb-1">Correo electrónico</label>
            <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="Tu email"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
            />
          </div>

          <!-- Asunto -->
          <div>
            <label for="subject" class="block text-gray-700 mb-1">Asunto</label>
            <input
                id="subject"
                v-model="form.subject"
                type="text"
                placeholder="Asunto"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
            />
          </div>

          <!-- Mensaje -->
          <div>
            <label for="message" class="block text-gray-700 mb-1">Mensaje</label>
            <textarea
                id="message"
                v-model="form.message"
                rows="6"
                placeholder="Escribe tu mensaje"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
            ></textarea>
          </div>

          <!-- Botón Enviar -->
          <div class="flex justify-end">
            <button
                type="submit"
                class="px-8 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import WrapperScreen from "../components/WrapperScreen.vue";

export default defineComponent({
  name: 'ContactView',
  components: { WrapperScreen },
  setup() {
    const form = reactive({ name: '', email: '', subject: '', message: '' });

    function sendMessage() {
      console.log('Mensaje enviado', form);
      form.name = '';
      form.email = '';
      form.subject = '';
      form.message = '';
      alert('Tu mensaje ha sido enviado. ¡Gracias!');
    }

    return { form, sendMessage };
  }
});
</script>
