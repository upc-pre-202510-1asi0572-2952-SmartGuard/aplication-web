<template>
  <WrapperScreen>
    <div class="max-w-screen-2xl mx-auto px-8 py-8">
      <div class="bg-white rounded-xl shadow p-8">
        <h1 class="text-2xl font-semibold mb-6">Documentación</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <a
              v-for="(doc, idx) in docs"
              :key="idx"
              :href="doc.url"
              target="_blank"
              class="flex items-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div class="p-4 bg-blue-50 rounded-md">
              <DocumentTextIcon class="w-6 h-6 text-blue-500" />
            </div>
            <div class="ml-4">
              <h2 class="text-lg font-medium">{{ doc.title }}</h2>
              <p class="mt-1 text-gray-600">{{ doc.description }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { DocumentTextIcon } from '@heroicons/vue/24/outline';
import WrapperScreen from "../components/WrapperScreen.vue";

interface Doc {
  title: string;
  description: string;
  url: string;
}

export default defineComponent({
  name: 'DocumentationView',
  components: { WrapperScreen, DocumentTextIcon },
  setup() {
    const docs = ref<Doc[]>([
      {
        title: 'Manual de Usuario',
        description: 'Guía completa para usar todas las funciones de FaceLoock.',
        url: '/docs/manual_usuario.pdf'
      },
      {
        title: 'Guía Rápida de Instalación',
        description: 'Pasos esenciales para montar y configurar el dispositivo.',
        url: '/docs/guia_instalacion.pdf'
      },
      {
        title: 'Referencia de API',
        description: 'Documentación técnica de los endpoints REST de FaceLoock.',
        url: '/docs/api_reference.html'
      },
      {
        title: 'Términos y Condiciones',
        description: 'Políticas de uso y privacidad del servicio.',
        url: '/docs/terminos_condiciones.pdf'
      }
    ]);

    return { docs };
  }
});
</script>
