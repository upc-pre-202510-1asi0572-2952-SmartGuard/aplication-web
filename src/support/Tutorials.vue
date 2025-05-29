<template>
  <WrapperScreen>
    <div class="max-w-screen-2xl mx-auto px-8 py-8">
      <div class="bg-white rounded-xl shadow p-8">
        <h1 class="text-2xl font-semibold mb-6">Tutoriales</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(video, idx) in tutorials" :key="idx" class="flex flex-col">
            <!-- Thumbnail -->
            <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                  :src="video.url"
                  frameborder="0"
                  allowfullscreen
                  class="w-full h-full"
              ></iframe>
            </div>
            <!-- Info -->
            <h2 class="mt-4 text-lg font-medium">{{ video.title }}</h2>
            <p class="mt-2 text-gray-600 flex-1">{{ video.description }}</p>
            <button
                @click="openVideo(video)
              "
                class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.868v4.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ver
            </button>
          </div>
        </div>
      </div>
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import WrapperScreen from "../components/WrapperScreen.vue";

interface Tutorial {
  title: string;
  description: string;
  url: string;
}

export default defineComponent({
  name: 'TutorialsView',
  components: { WrapperScreen },
  setup() {
    const tutorials = ref<Tutorial[]>([
      {
        title: 'Instalación de FaceLoock paso a paso',
        description: 'Aprende a montar y configurar tu dispositivo en minutos.',
        url: 'https://www.youtube.com/embed/VIDEO_ID_1'
      },
      {
        title: 'Gestión de usuarios y permisos',
        description: 'Cómo agregar, editar y revocar accesos de invitados.',
        url: 'https://www.youtube.com/embed/VIDEO_ID_2'
      },
      {
        title: 'Integración con Google Home y Alexa',
        description: 'Configura tu asistente para controlar FaceLoock por voz.',
        url: 'https://www.youtube.com/embed/VIDEO_ID_3'
      },
      {
        title: 'Resolución de problemas comunes',
        description: 'Soluciones a errores de conexión, reconocimiento y firmware.',
        url: 'https://www.youtube.com/embed/VIDEO_ID_4'
      },
      {
        title: 'Uso de funciones premium',
        description: 'Explora características exclusivas del plan Premium.',
        url: 'https://www.youtube.com/embed/VIDEO_ID_5'
      },
      {
        title: 'Optimización de rendimiento y seguridad',
        description: 'Mejores prácticas para mantener tu sistema seguro y rápido.',
        url: 'https://www.youtube.com/embed/VIDEO_ID_6'
      }
    ]);

    function openVideo(video: Tutorial) {
      window.open(video.url, '_blank');
    }

    return { tutorials, openVideo };
  }
});
</script>
