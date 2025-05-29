<template>
  <WrapperScreen>
    <div class="max-w-screen-2xl mx-auto px-8 py-8 h-screen flex flex-col">
      <div class="bg-white rounded-xl shadow flex-1 p-6 flex flex-col">
        <!-- Título -->
        <h1 class="text-2xl font-semibold mb-4">Chat en vivo</h1>

        <!-- Área de mensajes -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto mb-4 space-y-4">
          <div
              v-for="(msg, idx) in messages"
              :key="idx"
              class="flex"
              :class="msg.sender === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div
                :class="[
                'p-3 rounded-lg max-w-xs',
                msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
              ]"
            >
              {{ msg.text }}
            </div>
          </div>
        </div>

        <!-- Formulario de envío -->
        <form @submit.prevent="sendMessage" class="flex">
          <input
              v-model="newMessage"
              type="text"
              placeholder="Escribe tu mensaje..."
              class="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue';
import WrapperScreen from "../components/WrapperScreen.vue";

interface Message {
  text: string;
  sender: 'user' | 'support';
}

export default defineComponent({
  name: 'ChatView',
  components: { WrapperScreen },
  setup() {
    const messages = ref<Message[]>([
      { text: 'Hola, ¿en qué puedo ayudarte?', sender: 'support' }
    ]);
    const newMessage = ref('');
    const messagesContainer = ref<HTMLElement | null>(null);

    const scrollToBottom = () => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    };

    const sendMessage = () => {
      const text = newMessage.value.trim();
      if (!text) return;
      messages.value.push({ text, sender: 'user' });
      newMessage.value = '';
      nextTick(scrollToBottom);

      // Simular respuesta de soporte
      setTimeout(() => {
        messages.value.push({ text: 'Gracias por tu mensaje. Pronto te responderemos.', sender: 'support' });
        nextTick(scrollToBottom);
      }, 1000);
    };

    onMounted(scrollToBottom);

    return { messages, newMessage, sendMessage, messagesContainer };
  }
});
</script>
