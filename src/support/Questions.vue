<template>
  <WrapperScreen>
    <div class="max-w-6xl mx-auto h-screen">
      <!-- Contenedor blanco fijo al viewport -->
      <div class="bg-white rounded-xl shadow p-8 flex flex-col h-full">
        <!-- Título -->
        <h1 class="text-2xl font-semibold">Preguntas frecuentes</h1>

        <!-- Lista scrollable -->
        <div class="mt-4 flex-1 overflow-y-auto">
          <div v-for="(item, idx) in faqs" :key="idx" class="border-b last:border-b-0">
            <button
                @click="toggle(idx)"
                class="w-full flex justify-between items-center py-4 focus:outline-none"
            >
              <span class="font-medium text-left">{{ item.question }}</span>
              <svg
                  :class="{
                  'transform rotate-180': item.open,
                  'transform rotate-0': !item.open
                }"
                  class="w-5 h-5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="item.open" class="pl-4 pb-4 text-gray-700">
              {{ item.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </WrapperScreen>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import WrapperScreen from "../components/WrapperScreen.vue";

export default defineComponent({
  name: 'QuestionView',
  components: { WrapperScreen },
  setup() {
    const faqs = reactive([
      { question: '¿Cómo instalo FaceLoock en mi puerta?', answer: 'La instalación es muy sencilla: monta el dispositivo en el marco de la puerta siguiendo la guía rápida, conéctalo a tu red Wi-Fi y descarga la app FaceLoock. Luego registra tu perfil facial desde la sección de configuración de la app.', open: true },
      { question: '¿Qué nivel de seguridad ofrece el reconocimiento facial?', answer: 'Utilizamos algoritmos con encriptación AES-256 y una tasa de falsos positivos inferior al 0.1%. Además, todos los datos biométricos se almacenan de forma segura y cifrada.', open: true },
      { question: '¿Qué sucede si FaceLoock no me reconoce?', answer: 'En caso de fallo, puedes usar un código temporal enviado a tu móvil, generar un acceso QR o solicitar desbloqueo remoto a través de la app.', open: true },
      { question: '¿Puedo añadir múltiples usuarios con diferentes permisos?', answer: 'Sí. Desde la app puedes agregar hasta 50 usuarios y asignarles permisos específicos, como horarios de acceso o acceso solo a ciertas puertas.', open: true },
      { question: '¿FaceLoock funciona en condiciones de poca iluminación?', answer: 'Sí. Cuenta con sensores infrarrojos y cámaras de alta sensibilidad que garantizan reconocimiento preciso en entornos con poca luz.', open: true },
      { question: '¿Cómo se gestionan mis datos biométricos?', answer: 'Tus datos faciales se procesan y almacenan localmente en el dispositivo y en la nube cifrada con estándares GDPR, garantizando privacidad y control total sobre tu información.', open: true },
      { question: '¿FaceLoock se integra con otros dispositivos de domótica?', answer: 'Por supuesto. Es compatible con Google Home, Alexa e IFTTT para automatizar rutinas de tu hogar inteligente.', open: true },
      { question: '¿Qué planes de suscripción ofrece FaceLoock?', answer: 'Ofrecemos un plan Básico con historial de 7 días y notificaciones estándar, y un plan Premium con historial ilimitado, respaldo en la nube y soporte prioritario.', open: true },
      { question: '¿Cómo recibo las notificaciones en tiempo real?', answer: 'Puedes configurar alertas push en la app, correos electrónicos o SMS según tus preferencias desde el menú de Notificaciones.', open: true },
      { question: '¿Qué opciones de acceso alternativo existen?', answer: 'Además del reconocimiento facial, tienes acceso mediante códigos temporales, QR y desbloqueo remoto a través de la app.', open: true },
      { question: '¿Puedo consultar el historial de accesos?', answer: 'Sí. La sección de Historial en la app muestra fecha, hora y usuario de cada acceso, con filtros por rango de fecha y por usuario.', open: true },
      { question: '¿Cómo actualizo el firmware de FaceLoock?', answer: 'Las actualizaciones pueden ser automáticas o manuales desde la app, en la sección de "Firmware" bajo Configuración.', open: true },
      { question: '¿FaceLoock funciona sin conexión a internet?', answer: 'Sí. En modo offline el dispositivo sigue reconociendo y guardando logs localmente, sincronizándose cuando recupera conexión.', open: true },
      { question: '¿Cómo revoco el acceso a un usuario?', answer: 'Desde la app, ve a "Gestión de usuarios", selecciona el usuario y pulsa "Revocar acceso". El cambio es instantáneo.', open: true },
      { question: '¿Qué garantía y soporte técnico incluye mi suscripción?', answer: 'Incluye un año de garantía, soporte por chat y correo, y auditorías de seguridad semestrales para garantizar el correcto funcionamiento.', open: true }
    ]);

    function toggle(index: number) {
      faqs[index].open = !faqs[index].open;
    }

    return { faqs, toggle };
  }
});
</script>
