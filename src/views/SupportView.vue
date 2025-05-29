<template>
  <WrapperScreen>
    <div class="max-w-6xl mx-auto">
      <!-- Contenedor blanco -->
      <div class="bg-white rounded-xl shadow p-8 space-y-8">
        <!-- Título -->
        <h1 class="text-3xl font-semibold">Ayuda y Soporte</h1>

        <!-- Barra de búsqueda -->
        <div>
          <input
              type="text"
              placeholder="¿En qué podemos ayudarte?"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <!-- Cards de opciones -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Preguntas frecuentes -->
          <router-link to="/support/questions" class="block">
            <div class="flex items-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
              <div class="p-4 bg-blue-50 rounded-md">
                <QuestionMarkCircleIcon class="w-6 h-6 text-blue-500" />
              </div>
              <span class="ml-4 text-lg font-medium">Preguntas frecuentes</span>
            </div>
          </router-link>

          <!-- Contacto -->
          <router-link to="/support/contact" class="block">
            <div class="flex items-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
                <div class="p-4 bg-blue-50 rounded-md">
                  <EnvelopeIcon class="w-6 h-6 text-blue-500" />
                </div>
               <span class="ml-4 text-lg font-medium">Contacto</span>
            </div>
          </router-link>

          <!-- Chat en vivo -->
          <router-link to="/support/livechat" class="block">
            <div class="flex items-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
              <div class="p-4 bg-blue-50 rounded-md">
                <ChatBubbleLeftRightIcon class="w-6 h-6 text-blue-500" />
              </div>
              <span class="ml-4 text-lg font-medium">Chat en vivo</span>
            </div>
          </router-link>

          <!-- Tutoriales -->
          <router-link to="/support/tutorials" class="block">
          <div class="flex items-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
              <div class="p-4 bg-blue-50 rounded-md">
                <PlayIcon class="w-6 h-6 text-blue-500" />
              </div>
              <span class="ml-4 text-lg font-medium">Tutoriales</span>
            </div>
          </router-link>

          <!-- Documentación -->
          <router-link to="/support/documentation" class="block">
            <div class="flex items-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
              <div class="p-4 bg-blue-50 rounded-md">
                <DocumentTextIcon class="w-6 h-6 text-blue-500" />
              </div>
              <span class="ml-4 text-lg font-medium">Documentación</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </WrapperScreen>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import WrapperScreen from "../components/WrapperScreen.vue";
import {EnvelopeIcon, PlayIcon, QuestionMarkCircleIcon} from "@heroicons/vue/16/solid";
import {ChatBubbleLeftRightIcon} from "@heroicons/vue/24/outline";
import {DocumentTextIcon} from "@heroicons/vue/24/solid";

export default defineComponent({
  name: 'SupportView',
  components: {
    WrapperScreen,
    QuestionMarkCircleIcon,
    EnvelopeIcon,
    ChatBubbleLeftRightIcon,
    PlayIcon,
    DocumentTextIcon
  }
});
</script>


<style scoped>

</style>